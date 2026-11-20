import { useState } from 'react';
import { CornerDownRight, Paperclip } from 'lucide-react';
import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

// Tabbed scene. `demo`: prompt -> prepared sample result. `feature`: what it does + when to use.
export default function Tabs({ scene }) {
  const [active, setActive] = useState(0);
  const tab = scene.tabs[active];
  const demo = scene.variant === 'demo';

  return (
    <div className={`scene-pad tabs tabs-${scene.variant}`}>
      <Eyebrow scene={scene} />
      <h1 className="h-title rise" style={{ '--i': 0 }}>
        <Rich text={scene.title} />
      </h1>

      <div className="tab-list rise" role="tablist" style={{ '--i': 1 }}>
        {scene.tabs.map((t, i) => (
          <button
            key={t.label}
            id={`tab-${scene.id}-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`panel-${scene.id}`}
            className={`tab${i === active ? ' on' : ''}`}
            onClick={() => setActive(i)}
          >
            <Icon name={t.icon} size={34} />
            {t.label}
          </button>
        ))}
      </div>

      <div
        className="tab-panel"
        role="tabpanel"
        id={`panel-${scene.id}`}
        aria-labelledby={`tab-${scene.id}-${active}`}
        key={active}
      >
        {demo ? (
          <div className="demo">
            <div className="demo-prompt">
              <span className="demo-who">You</span>
              {tab.attachment && (
                <span className="chip-file">
                  <Paperclip size={22} /> {tab.attachment}
                </span>
              )}
              <p>{tab.prompt}</p>
            </div>
            <div className="demo-result">
              <span className="demo-who claude">
                <CornerDownRight size={26} /> Claude
              </span>
              {tab.code ? (
                <pre className="code">
                  {tab.code.map(([mark, line], i) => (
                    <span key={i} className={mark === '+' ? 'add' : mark === '-' ? 'del' : ''}>
                      {mark || ' '} {line}
                      {'\n'}
                    </span>
                  ))}
                </pre>
              ) : (
                <p className="demo-text">{tab.result}</p>
              )}
              {tab.note && <p className="demo-note">{tab.note}</p>}
            </div>
            <span className="illustrative">Illustrative example · prepared in advance, not live AI</span>
          </div>
        ) : (
          <div className="feature">
            <span className="feature-icon">
              <Icon name={tab.icon} size={120} strokeWidth={1.4} />
            </span>
            <div className="feature-body">
              <h2>{tab.label}</h2>
              <ul>
                {tab.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <p className="when">
                <b>Use when</b> {tab.when}
              </p>
            </div>
          </div>
        )}
      </div>

      {scene.footer && <p className="footnote">{scene.footer}</p>}
    </div>
  );
}
