import { useState } from 'react';
import { ArrowUp, ChevronDown, Mic, Plus, SlidersHorizontal } from 'lucide-react';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

// Simplified drawing of the claude.ai layout (Canva slide 4) with clickable hotspots.
const SPOTS = [
  // x/y are stage pixels inside the drawing (measured against the mock layout below).
  { n: 1, x: 240, y: 283, label: 'Sidebar & history', text: 'Reopen past chats. Collapse it for more space.' },
  { n: 2, x: 240, y: 101, label: 'New chat', text: 'Start fresh when the topic changes.' },
  { n: 3, x: 240, y: 198, label: 'Projects', text: 'Group files and instructions for ongoing work.' },
  { n: 4, x: 1110, y: 278, label: 'Chat input', text: 'Type your request. Shift+Enter adds a new line.' },
  { n: 5, x: 322, y: 356, label: '+ Attach', text: 'Upload files and images, or add from connected apps.' },
  { n: 6, x: 950, y: 306, label: 'Model selector', text: 'Pick a model. Options depend on your plan.' },
];

export default function AppTour({ scene }) {
  const [open, setOpen] = useState(null);
  const spot = open === null ? null : SPOTS[open];

  return (
    <div className="scene-pad apptour">
      <Eyebrow scene={scene} />
      <h1 className="h-title rise" style={{ '--i': 0 }}>
        <Rich text={scene.title} />
      </h1>
      <div className="tour">
        <div className="mock rise" style={{ '--i': 1 }} aria-hidden="true">
          <div className="mock-side">
            <b className="mock-brand">Claude</b>
            <span className="mock-btn">+ New chat</span>
            <span>Chats</span>
            <span>Projects</span>
            <span>Artifacts</span>
            <span className="mock-faint">Recents</span>
            <span className="mock-faint">· Q3 report</span>
            <span className="mock-faint">· Lab guide</span>
            <span className="mock-user">Name · Plan</span>
          </div>
          <div className="mock-main">
            <p className="mock-hello">How can I help you today?</p>
            <div className="mock-input">
              <span className="mock-ph">Ask Claude anything…</span>
              <div className="mock-tools">
                <Plus size={28} />
                <SlidersHorizontal size={26} />
                <span className="mock-model">
                  Model <ChevronDown size={22} />
                </span>
                <Mic size={26} />
                <span className="mock-send">
                  <ArrowUp size={24} />
                </span>
              </div>
            </div>
          </div>
        </div>
        {SPOTS.map((s, i) => (
          <button
            key={s.n}
            type="button"
            className={`spot${open === i ? ' on' : ''}`}
            style={{ left: s.x, top: s.y }}
            onClick={() => setOpen(open === i ? null : i)}
            aria-label={`${s.n}. ${s.label}`}
            aria-expanded={open === i}
          >
            {s.n}
          </button>
        ))}
        <div className="tour-info" role="status">
          {spot ? (
            <>
              <span className="tour-n">{spot.n}</span>
              <b>{spot.label}</b>
              <span>{spot.text}</span>
            </>
          ) : (
            <span className="tour-hint">Click a number to explore</span>
          )}
        </div>
      </div>
      <p className="footnote">Simplified drawing. Labels and options vary by plan, platform and feature rollout.</p>
    </div>
  );
}
