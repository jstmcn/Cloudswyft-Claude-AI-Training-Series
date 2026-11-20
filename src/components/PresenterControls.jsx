import { useSyncExternalStore } from 'react';
import {
  Captions, ChevronLeft, ChevronRight, Maximize, Minimize, Menu, MousePointerClick, Music,
  NotebookText, Pause, Play, Repeat, RotateCcw, Timer, Volume2, VolumeX,
} from 'lucide-react';
import { audio } from '../media/audioManager.js';
import { soundscape } from '../media/soundscape.js';
import { mediaCommand } from '../media/mediaCommand.js';

function narrationStatus(scene, a) {
  if (scene.layout === 'game') return { text: 'Game: narration off', warn: false };
  if (scene.layout === 'reference') return { text: 'Reference: no narration', warn: false };
  if (!scene.audioSrc) return { text: 'No narration', warn: false };
  if (a.src !== scene.audioSrc) return { text: 'Loading voice…', warn: false };
  switch (a.status) {
    case 'missing':
      return { text: `Voice pending · read script (N)`, warn: true };
    case 'blocked':
      return { text: 'Click play to allow sound', warn: true };
    case 'playing':
      return { text: 'Voice playing', warn: false };
    case 'paused':
      return { text: 'Voice paused', warn: false };
    case 'ended':
      return { text: 'Voice finished', warn: false };
    default:
      return { text: 'Voice ready', warn: false };
  }
}

function Btn({ label, onClick, children, on, disabled }) {
  return (
    <button
      type="button"
      className={`dock-btn${on ? ' on' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={on === undefined ? undefined : !!on}
      title={label}
    >
      {children}
    </button>
  );
}

export default function PresenterControls(props) {
  const { scene, audioState: a, hidden } = props;
  const status = narrationStatus(scene, a);
  const isDoc = scene.layout === 'documentary';
  const voiceUsable = isDoc || (scene.audioSrc && a.src === scene.audioSrc && a.status !== 'missing');
  const playing = !isDoc && a.status === 'playing';
  const snd = useSyncExternalStore(soundscape.subscribe, soundscape.getState);

  return (
    <div className={`dock${hidden ? ' hidden' : ''}`} role="toolbar" aria-label="Presenter controls">
      <Btn label="Sections (S)" onClick={props.onMenu}>
        <Menu size={20} />
      </Btn>
      <span className="dock-sep" />
      <Btn label="Previous (←)" onClick={props.onPrev} disabled={!props.canPrev}>
        <ChevronLeft size={22} />
      </Btn>
      <Btn label="Next (→)" onClick={props.onNext} disabled={!props.canNext}>
        <ChevronRight size={22} />
      </Btn>
      <span className="dock-sep" />
      <Btn
        label={isDoc ? 'Play / pause documentary (P)' : playing ? 'Pause narration (P)' : 'Play narration (P)'}
        onClick={() => mediaCommand(scene, 'toggle')}
        disabled={!voiceUsable}
      >
        {playing ? <Pause size={20} /> : <Play size={20} />}
      </Btn>
      <Btn label="Replay (R)" onClick={() => mediaCommand(scene, 'replay')} disabled={!voiceUsable}>
        <RotateCcw size={19} />
      </Btn>
      <Btn label={a.muted ? 'Unmute (M)' : 'Mute (M)'} onClick={() => audio.setMuted(!a.muted)} on={a.muted}>
        {a.muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </Btn>
      <input
        id="dock-volume"
        className="dock-vol"
        type="range"
        min="0"
        max="1"
        step="0.05"
        value={a.muted ? 0 : a.volume}
        onChange={(e) => audio.setVolume(Number(e.target.value))}
        aria-label="Volume"
      />
      <span className={`dock-status${status.warn ? ' warn' : ''}`} aria-live="polite">
        {status.text}
      </span>
      <span className="dock-sep" />
      <Btn label="Background music (B)" onClick={() => soundscape.setMusicOn(!snd.musicOn)} on={snd.musicOn}>
        <Music size={19} />
      </Btn>
      <Btn label="Click sounds" onClick={() => soundscape.setSfxOn(!snd.sfxOn)} on={snd.sfxOn}>
        <MousePointerClick size={19} />
      </Btn>
      <span className="dock-sep" />
      {isDoc && (
        <Btn label="Captions (C)" onClick={props.onCaptions} on={props.captions}>
          <Captions size={20} />
        </Btn>
      )}
      <Btn label="Auto-advance after narration" onClick={props.onAutoAdvance} on={props.autoAdvance}>
        <Repeat size={19} />
      </Btn>
      <Btn label="Presenter notes window (N)" onClick={props.onNotes}>
        <NotebookText size={20} />
      </Btn>
      <Btn label="Presenter timer (T)" onClick={props.onTimer} on={props.timerOpen}>
        <Timer size={20} />
      </Btn>
      <Btn label={props.isFullscreen ? 'Exit fullscreen (F)' : 'Fullscreen (F)'} onClick={props.onFullscreen}>
        {props.isFullscreen ? <Minimize size={19} /> : <Maximize size={19} />}
      </Btn>
    </div>
  );
}
