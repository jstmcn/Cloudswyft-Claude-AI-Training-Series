import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, RotateCcw } from 'lucide-react';
import { SCENES } from '../data/presentation.js';
import { NARRATION } from '../data/narration.js';
import { DOCUMENTARIES } from '../data/documentaries.js';
import { GAMES } from '../data/games.js';
import { listen, post } from '../media/deckChannel.js';
import { fmtTime } from '../hooks/useSessionTimer.js';

export function sceneName(s) {
  if (!s) return '';
  if (s.layout === 'documentary') return `Documentary: ${DOCUMENTARIES[s.docId].title}`;
  if (s.layout === 'game') return `Game: ${GAMES[s.gameId].title}`;
  return s.title;
}

/** Script with [stage directions] shown as separate cues. */
function Script({ text }) {
  const parts = text.split(/(\[[^\]]*\])/g).filter(Boolean);
  return (
    <p className="notes-script">
      {parts.map((p, i) =>
        p.startsWith('[') ? (
          <span key={i} className="notes-cue">
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </p>
  );
}

export function SceneNotes({ scene }) {
  if (scene.layout === 'documentary') {
    const doc = DOCUMENTARIES[scene.docId];
    return (
      <>
        <p className="notes-hint">Press P (or play) to start. Narration file: {scene.audioFile}</p>
        {doc.beats.map((b) => (
          <p key={b.t} className="notes-script">
            <span className="notes-time">{fmtTime(b.t)}</span> {b.caption}
          </p>
        ))}
      </>
    );
  }
  if (scene.layout === 'game') {
    const g = GAMES[scene.gameId];
    return (
      <>
        <p className="notes-script">
          <span className="notes-cue">Presenter, live</span> {g.cue}
        </p>
        <p className="notes-hint">{g.url ? `Link: ${g.url}` : 'Game not published yet: use the backup question on the slide.'}</p>
        <p className="notes-hint">Answer key:</p>
        {g.questions?.map((q) => (
          <p key={q.q} className="notes-script">
            {q.q} <b>→ {q.options[q.answer]}</b>
          </p>
        ))}
        {g.pairs?.map(([a, b]) => (
          <p key={a} className="notes-script">
            {a} <b>→ {b}</b>
          </p>
        ))}
      </>
    );
  }
  if (scene.layout === 'reference') return <p className="notes-hint">Reference slide: no narration. Use for Q&amp;A.</p>;
  const text = NARRATION[scene.id];
  if (!text) return <p className="notes-hint">No script for this scene. Speak live.</p>;
  return (
    <>
      <Script text={text} />
      {scene.audioFile && <p className="notes-hint">Narration file: {scene.audioFile}</p>}
    </>
  );
}

// Separate presenter window (opened with N). Not shared to Teams: share only the main window.
export default function NotesApp() {
  const [state, setState] = useState({ id: null, step: 0 });

  useEffect(() => {
    document.title = 'Presenter notes · Claude AI';
    const off = listen((m) => {
      if (m.type === 'scene') setState({ id: m.id, step: m.step });
    });
    post({ type: 'hello' });
    return off;
  }, []);

  const i = SCENES.findIndex((s) => s.id === state.id);
  const scene = SCENES[i];
  const next = SCENES[i + 1];
  const cmd = (c) => post({ type: 'cmd', cmd: c });

  return (
    <div className="notes-app">
      {!scene ? (
        <p className="notes-hint">Waiting for the presentation window… Keep both windows in the same browser.</p>
      ) : (
        <>
          <header className="notes-head">
            <span className="notes-id">{scene.id}</span>
            <div>
              <h1>{sceneName(scene)}</h1>
              <span>
                {scene.appendix ? 'Reference' : `Part ${scene.partId} · ${scene.partTitle}`} · planned {scene.duration ? fmtTime(scene.duration) : '—'}
                {scene.build ? ` · step ${state.step + 1} of ${scene.buildCount}` : ''}
              </span>
            </div>
          </header>
          <div className="notes-controls">
            <button type="button" className="btn" onClick={() => cmd('prev')}>
              <ChevronLeft size={18} /> Back
            </button>
            <button type="button" className="btn" onClick={() => cmd('toggle')}>
              <Play size={18} /> Play / pause
            </button>
            <button type="button" className="btn" onClick={() => cmd('replay')}>
              <RotateCcw size={18} /> Replay
            </button>
            <button type="button" className="btn primary" onClick={() => cmd('next')}>
              Next <ChevronRight size={18} />
            </button>
          </div>
          <section className="notes-body">
            <SceneNotes scene={scene} />
          </section>
          {next && (
            <footer className="notes-next">
              Next: <b>{next.id}</b> {sceneName(next)}
            </footer>
          )}
        </>
      )}
    </div>
  );
}
