import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

// Audience question: the presenter clicks a tile each time someone names it in chat.
// Shift+click (or right-click) removes one.
export default function Question({ scene }) {
  const [counts, setCounts] = useState(() => scene.options.map(() => 0));
  const max = Math.max(1, ...counts);
  const top = counts.some((c) => c > 0) ? counts.indexOf(Math.max(...counts)) : -1;

  const bump = (i, d) => setCounts((c) => c.map((v, j) => (j === i ? Math.max(0, v + d) : v)));

  return (
    <div className="scene-pad question">
      <div className="question-left">
        <Eyebrow scene={scene} />
        <h1 className="h-hero rise" style={{ '--i': 0 }}>
          <Rich text={scene.title} highlight={scene.highlight} />
        </h1>
        {scene.hint && (
          <p className="hint rise" style={{ '--i': 1 }}>
            {scene.hint}
          </p>
        )}
      </div>
      <div className="question-options">
        {scene.options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            className={`opt rise${i === top ? ' on' : ''}`}
            style={{ '--i': i + 1 }}
            onClick={(e) => bump(i, e.shiftKey ? -1 : 1)}
            onContextMenu={(e) => {
              e.preventDefault();
              bump(i, -1);
            }}
            aria-label={`${o.label}: ${counts[i]} votes. Click to add one.`}
          >
            <span className="opt-icon">
              <Icon name={o.icon} size={44} />
            </span>
            <span className="opt-label">{o.label}</span>
            <span className="opt-bar" aria-hidden="true">
              <i style={{ width: `${(counts[i] / max) * 100}%` }} />
            </span>
            <span className="opt-count">{counts[i]}</span>
          </button>
        ))}
        <button
          type="button"
          className="mini-btn"
          onClick={() => setCounts(scene.options.map(() => 0))}
          disabled={counts.every((c) => c === 0)}
        >
          <RotateCcw size={18} /> Reset
        </button>
      </div>
    </div>
  );
}
