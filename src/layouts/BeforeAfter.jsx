import { useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';
import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

// Drag the divider (or click a side, or use the arrow keys on the handle) to compare.
export default function BeforeAfter({ scene }) {
  const [pos, setPos] = useState(50); // % of width shown for "before"
  const box = useRef(null);
  const dragging = useRef(false);

  const fromEvent = (e) => {
    const r = box.current.getBoundingClientRect();
    setPos(Math.min(92, Math.max(8, ((e.clientX - r.left) / r.width) * 100)));
  };

  const Side = ({ data, kind }) => (
    <div className={`ba-side ${kind}`}>
      <h2>{data.label}</h2>
      <ul>
        {data.items.map((it) => (
          <li key={it.label}>
            <Icon name={it.icon} size={40} />
            {it.label}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="scene-pad beforeafter">
      <Eyebrow scene={scene} />
      <h1 className="h-title rise" style={{ '--i': 0 }}>
        <Rich text={scene.title} />
      </h1>
      <div
        className="ba-box rise"
        style={{ '--i': 1, '--pos': `${pos}%` }}
        ref={box}
        onPointerMove={(e) => dragging.current && fromEvent(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerLeave={() => (dragging.current = false)}
      >
        <div className="ba-layer after" onClick={() => setPos(8)}>
          <Side data={scene.after} kind="after" />
        </div>
        <div className="ba-layer before" onClick={() => setPos(92)}>
          <Side data={scene.before} kind="before" />
        </div>
        <button
          type="button"
          className="ba-handle"
          aria-label="Compare manual and Claude-assisted. Use left and right arrows."
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture?.(e.pointerId);
          }}
          onPointerMove={(e) => dragging.current && fromEvent(e)}
          onPointerUp={() => (dragging.current = false)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
              e.preventDefault();
              e.stopPropagation();
              setPos((p) => Math.min(92, Math.max(8, p + (e.key === 'ArrowRight' ? 10 : -10))));
            }
          }}
        >
          <GripVertical size={30} />
        </button>
      </div>
      {scene.hint && <p className="hint">{scene.hint}</p>}
    </div>
  );
}
