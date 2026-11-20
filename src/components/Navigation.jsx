import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { PARTS, SCENES } from '../data/presentation.js';
import { DOCUMENTARIES } from '../data/documentaries.js';
import { GAMES } from '../data/games.js';
import { fmtTime } from '../hooks/useSessionTimer.js';

function sceneLabel(s) {
  if (s.layout === 'documentary') return DOCUMENTARIES[s.docId].title;
  if (s.layout === 'game') return GAMES[s.gameId].title;
  return s.title;
}

function sceneTag(s) {
  if (s.layout === 'documentary') return 'Video';
  if (s.layout === 'game') return 'Game';
  if (s.optional) return 'Optional';
  return '';
}

// Section menu (S): jump to any scene, including the untimed Reference appendix.
export default function Navigation({ currentIndex, onSelect, onClose }) {
  const current = useRef(null);
  useEffect(() => {
    current.current?.scrollIntoView({ block: 'center' });
    current.current?.focus();
  }, []);

  return (
    <div className="overlay" onClick={onClose}>
      <nav className="menu" aria-label="Sections" onClick={(e) => e.stopPropagation()}>
        <div className="menu-head">
          <h2>Sections</h2>
          <button type="button" className="dock-btn" onClick={onClose} aria-label="Close sections (Esc)">
            <X size={20} />
          </button>
        </div>
        <div className="menu-list">
          {PARTS.map((part) => {
            const secs = part.scenes.reduce((t, s) => t + (s.duration || 0), 0);
            return (
              <section className="menu-part" key={part.id}>
                <h3>
                  {part.appendix ? 'Reference' : `Part ${part.id} · ${part.title}`}
                  <span>{part.appendix ? 'untimed' : fmtTime(secs)}</span>
                </h3>
                {part.scenes.map((s) => {
                  const i = SCENES.findIndex((x) => x.id === s.id);
                  const full = SCENES[i];
                  const isCurrent = i === currentIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      ref={isCurrent ? current : undefined}
                      className={`menu-item${isCurrent ? ' current' : ''}`}
                      onClick={() => onSelect(i)}
                      aria-current={isCurrent ? 'page' : undefined}
                    >
                      <span className="id">{s.id}</span>
                      <span>{sceneLabel(full)}</span>
                      <span className="tag">{sceneTag(full)}</span>
                    </button>
                  );
                })}
              </section>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
