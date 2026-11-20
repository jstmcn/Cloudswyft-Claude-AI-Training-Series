import { MAIN_PARTS, SCENES } from '../data/presentation.js';

// One segment per part. Click a segment to jump to the start of that part.
export default function ProgressIndicator({ scene, onJump }) {
  if (scene.appendix) return <div className="progress-ref">Reference · not timed</div>;

  return (
    <nav className="progress" aria-label="Presentation progress">
      {MAIN_PARTS.map((part) => {
        let fill = 0;
        if (part.id < scene.partId) fill = 1;
        else if (part.id === scene.partId) fill = (scene.indexInPart + 1) / part.scenes.length;
        const first = SCENES.findIndex((s) => s.partId === part.id);
        return (
          <button
            key={part.id}
            type="button"
            onClick={() => onJump(first)}
            aria-label={`Part ${part.id}: ${part.title}`}
            aria-current={part.id === scene.partId ? 'step' : undefined}
          >
            <span>
              <i style={{ width: `${fill * 100}%` }} />
            </span>
          </button>
        );
      })}
    </nav>
  );
}
