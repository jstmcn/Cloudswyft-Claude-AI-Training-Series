import { useCallback, useEffect, useRef, useState } from 'react';
import { SCENES, LAST_MAIN_INDEX } from '../data/presentation.js';
import { audio } from '../media/audioManager.js';
import { mediaCommand } from '../media/mediaCommand.js';
import { listen, post } from '../media/deckChannel.js';
import { soundscape, soundFor } from '../media/soundscape.js';
import { SceneNotes, sceneName } from './NotesApp.jsx';
import { useAudio } from '../hooks/useAudio.js';
import { useFullscreen } from '../hooks/useFullscreen.js';
import { useSessionTimer } from '../hooks/useSessionTimer.js';
import Stage from './Stage.jsx';
import SceneRenderer from './SceneRenderer.jsx';
import PresenterControls from './PresenterControls.jsx';
import Navigation from './Navigation.jsx';
import TimerPanel from './TimerPanel.jsx';
import StartScreen from './StartScreen.jsx';

const IDLE_MS = 3000;

function indexFromHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const i = SCENES.findIndex((s) => s.id === id);
  return i < 0 ? 0 : i;
}

export default function Presentation() {
  const [index, setIndex] = useState(indexFromHash);
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [idle, setIdle] = useState(false);

  const scene = SCENES[index];
  const maxStep = scene.buildCount - 1;
  const a = useAudio();
  const fs = useFullscreen();
  const timer = useSessionTimer(scene.id);

  // ---------- Navigation ----------
  const go = useCallback((i, { toEnd = false } = {}) => {
    if (i < 0 || i >= SCENES.length) return;
    setIndex(i);
    setStep(toEnd ? SCENES[i].buildCount - 1 : 0);
  }, []);

  const next = useCallback(() => {
    if (step < maxStep) return setStep(step + 1);
    const n = index + 1;
    // The main flow stops at the closing scene; the appendix opens from the menu.
    if (n < SCENES.length && SCENES[n].appendix === scene.appendix) go(n);
  }, [step, maxStep, index, scene, go]);

  const prev = useCallback(() => {
    if (step > 0) return setStep(step - 1);
    const p = index - 1;
    if (p >= 0 && SCENES[p].appendix === scene.appendix) go(p, { toEnd: true });
  }, [step, index, scene, go]);

  // Keep the scene in the address bar so a reload returns to the same slide.
  useEffect(() => {
    window.history.replaceState(null, '', `#${scene.id}`);
  }, [scene.id]);

  useEffect(() => {
    const onHash = () => go(indexFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [go]);

  // ---------- Narration ----------
  useEffect(() => {
    if (!started) return;
    // Documentaries load their track but wait for the presenter to press Play.
    audio.load(scene.audioSrc, { autoplay: scene.layout !== 'documentary' });
  }, [scene, started]);

  // Narration cues reveal build steps in sync with the voice (cues added in Phase 5).
  useEffect(() => {
    if (!scene.cues || a.src !== scene.audioSrc) return;
    const passed = scene.cues.filter((c) => a.currentTime >= c).length;
    if (passed - 1 > step) setStep(Math.min(passed - 1, maxStep));
  }, [a.currentTime, a.src, scene, step, maxStep]);

  // Optional auto-advance after narration ends (only on scenes marked autoAdvance).
  const autoRef = useRef({});
  autoRef.current = { autoAdvance, scene, index };
  useEffect(
    () =>
      audio.onEnded((src) => {
        const { autoAdvance: on, scene: s, index: i } = autoRef.current;
        if (!on || !s.autoAdvance || src !== s.audioSrc) return;
        setTimeout(() => {
          if (autoRef.current.index === i && i + 1 <= LAST_MAIN_INDEX) go(i + 1);
        }, 1200);
      }),
    [go]
  );

  // ---------- Background music + interaction sounds ----------
  // Music follows the dock's mute/volume and ducks while a voice is playing.
  useEffect(() => {
    soundscape.setOutput({ muted: a.muted, volume: a.volume });
  }, [a.muted, a.volume]);

  useEffect(() => {
    soundscape.duck('narration', a.status === 'playing');
  }, [a.status]);

  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest?.('button, a.btn, [role="tab"], .ba-layer');
      if (!el || el.disabled || el.getAttribute('aria-disabled') === 'true') return;
      soundscape.sfx(soundFor(el));
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // ---------- Presenter notes window (N) ----------
  const [notesInline, setNotesInline] = useState(false);
  const cmdRef = useRef({});
  cmdRef.current = { next, prev, scene, index, step };

  useEffect(() => {
    post({ type: 'scene', id: scene.id, step });
  }, [scene.id, step]);

  useEffect(
    () =>
      listen((m) => {
        const c = cmdRef.current;
        if (m.type === 'hello') post({ type: 'scene', id: c.scene.id, step: c.step });
        if (m.type !== 'cmd') return;
        if (m.cmd === 'next') c.next();
        else if (m.cmd === 'prev') c.prev();
        else if (m.cmd === 'toggle' || m.cmd === 'replay') mediaCommand(c.scene, m.cmd);
      }),
    []
  );

  const openNotes = useCallback(() => {
    const url = `${window.location.pathname}?notes`;
    const w = window.open(url, 'cip-notes', 'width=720,height=820');
    // Popup blocked: fall back to an in-page panel (visible to the audience if shared).
    if (!w) setNotesInline((v) => !v);
  }, []);

  // ---------- Start ----------
  const start = useCallback(
    async ({ fullscreen }) => {
      audio.unlock();
      soundscape.start(); // must run inside the Start click (browser autoplay rule)
      setStarted(true);
      timer.start();
      if (fullscreen) await fs.enter();
    },
    [fs, timer]
  );

  // ---------- Keyboard ----------
  useEffect(() => {
    const onKey = (e) => {
      if (!started) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      if (t.closest && t.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key === ' ' && t.closest && t.closest('button, a')) return; // let Space press the button
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          go(0);
          break;
        case 'End':
          go(LAST_MAIN_INDEX);
          break;
        case 'f':
        case 'F':
          fs.toggle();
          break;
        case 's':
        case 'S':
          setMenuOpen((o) => !o);
          break;
        case 'p':
        case 'P':
          mediaCommand(scene, 'toggle');
          break;
        case 'r':
        case 'R':
          mediaCommand(scene, 'replay');
          break;
        case 'm':
        case 'M':
          audio.setMuted(!audio.getState().muted);
          break;
        case 't':
        case 'T':
          setTimerOpen((o) => !o);
          break;
        case 'c':
        case 'C':
          setCaptions((c) => !c);
          break;
        case 'n':
        case 'N':
          openNotes();
          break;
        case 'b':
        case 'B':
          soundscape.setMusicOn(!soundscape.musicOn);
          break;
        case 'Escape':
          setMenuOpen(false);
          setTimerOpen(false);
          setNotesInline(false);
          break;
        default:
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [started, next, prev, go, fs, scene, openNotes]);

  // ---------- Hide the dock and cursor when the mouse is still ----------
  useEffect(() => {
    let id;
    const wake = () => {
      setIdle(false);
      clearTimeout(id);
      id = setTimeout(() => setIdle(true), IDLE_MS);
    };
    wake();
    window.addEventListener('mousemove', wake);
    window.addEventListener('pointerdown', wake);
    return () => {
      clearTimeout(id);
      window.removeEventListener('mousemove', wake);
      window.removeEventListener('pointerdown', wake);
    };
  }, []);

  const api = { next, prev, go, step, captions, started };

  return (
    <div className={`app${idle && started && !menuOpen ? ' is-idle' : ''}`}>
      <Stage>
        <SceneRenderer key={scene.id} scene={scene} api={api} />
      </Stage>

      {started && (
        <PresenterControls
          scene={scene}
          audioState={a}
          hidden={idle && !menuOpen}
          canPrev={step > 0 || (index > 0 && SCENES[index - 1].appendix === scene.appendix)}
          canNext={step < maxStep || (index + 1 < SCENES.length && SCENES[index + 1].appendix === scene.appendix)}
          onPrev={prev}
          onNext={next}
          isFullscreen={fs.isFullscreen}
          onFullscreen={fs.toggle}
          autoAdvance={autoAdvance}
          onAutoAdvance={() => setAutoAdvance((v) => !v)}
          captions={captions}
          onCaptions={() => setCaptions((v) => !v)}
          onMenu={() => setMenuOpen(true)}
          timerOpen={timerOpen}
          onTimer={() => setTimerOpen((v) => !v)}
          onNotes={openNotes}
        />
      )}

      {notesInline && (
        <aside className="notes-inline" aria-label="Presenter notes">
          <p className="notes-warn">Popup blocked: these notes are visible to anyone watching this window. Allow popups and press N again.</p>
          <h2>
            {scene.id} · {sceneName(scene)}
          </h2>
          <SceneNotes scene={scene} />
          <button type="button" className="btn" onClick={() => setNotesInline(false)}>
            Close (Esc)
          </button>
        </aside>
      )}

      {menuOpen && (
        <Navigation
          currentIndex={index}
          onSelect={(i) => {
            go(i);
            setMenuOpen(false);
          }}
          onClose={() => setMenuOpen(false)}
        />
      )}

      {timerOpen && <TimerPanel timer={timer} index={index} onClose={() => setTimerOpen(false)} />}

      {!started && <StartScreen onStart={start} />}
    </div>
  );
}
