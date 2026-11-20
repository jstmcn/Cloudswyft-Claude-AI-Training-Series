import { X } from 'lucide-react';
import { SCENES } from '../data/presentation.js';
import { fmtTime } from '../hooks/useSessionTimer.js';
import { TARGET_SECONDS } from '../data/timing.js';

// Presenter timer (T): session clock vs. the planned position in the 30-minute run of show.
export default function TimerPanel({ timer, index, onClose }) {
  const scene = SCENES[index];
  const plannedStart = scene.appendix
    ? null
    : SCENES.slice(0, index).reduce((t, s) => t + (s.appendix ? 0 : s.duration), 0);
  const delta = plannedStart === null ? null : timer.elapsed - plannedStart;

  return (
    <aside className="timer" aria-label="Presenter timer">
      <div className="timer-row">
        <span>Session</span>
        <b>
          {fmtTime(timer.elapsed)} <small style={{ fontSize: 12, color: 'var(--muted)' }}>/ {fmtTime(TARGET_SECONDS)}</small>
        </b>
      </div>
      <div className="timer-row">
        <span>This scene</span>
        <b>
          {fmtTime(timer.sceneElapsed)}{' '}
          <small style={{ fontSize: 12, color: 'var(--muted)' }}>/ {scene.duration ? fmtTime(scene.duration) : '—'}</small>
        </b>
      </div>
      {delta !== null && (
        <div className="timer-row">
          <span>Plan</span>
          <span className={delta > 15 ? 'behind' : 'ahead'}>
            {Math.abs(delta) <= 15 ? 'On time' : delta > 0 ? `${fmtTime(delta)} behind` : `${fmtTime(-delta)} ahead`}
          </span>
        </div>
      )}
      <div className="timer-actions">
        {timer.running ? (
          <button type="button" className="btn" onClick={timer.pause}>
            Pause
          </button>
        ) : (
          <button type="button" className="btn" onClick={timer.start}>
            Start
          </button>
        )}
        <button type="button" className="btn" onClick={timer.reset}>
          Reset
        </button>
        <button type="button" className="btn" onClick={onClose} aria-label="Close timer" style={{ marginLeft: 'auto' }}>
          <X size={14} />
        </button>
      </div>
    </aside>
  );
}
