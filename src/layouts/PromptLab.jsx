import { useState } from 'react';
import { CornerDownRight } from 'lucide-react';
import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';
import { PROMPT_PARTS, SCENARIOS } from '../data/promptLab.js';

// Toggle the four prompt parts on and off; the prompt and the prepared sample answer update.
export default function PromptLab({ scene }) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [on, setOn] = useState({});
  const sc = SCENARIOS[scenarioIdx];
  const count = PROMPT_PARTS.filter((p) => on[p.key]).length;
  const quality = count === 4 ? 'strong' : count >= 2 ? 'partial' : 'weak';

  const pick = (i) => {
    setScenarioIdx(i);
    setOn({});
  };

  return (
    <div className="scene-pad promptlab">
      <Eyebrow scene={scene} />
      <div className="lab-head">
        <h1 className="h-title rise" style={{ '--i': 0 }}>
          <Rich text={scene.title} />
        </h1>
        <div className="lab-scenarios rise" role="group" aria-label="Scenario" style={{ '--i': 1 }}>
          {SCENARIOS.map((s, i) => (
            <button key={s.id} type="button" className={`pill${i === scenarioIdx ? ' on' : ''}`} onClick={() => pick(i)} aria-pressed={i === scenarioIdx}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="lab-grid">
        <div className="lab-left">
          <div className="lab-toggles" role="group" aria-label="Prompt parts">
            {PROMPT_PARTS.map((p, i) => (
              <button
                key={p.key}
                type="button"
                className={`lab-toggle rise${on[p.key] ? ' on' : ''}`}
                style={{ '--i': i + 2 }}
                onClick={() => setOn((o) => ({ ...o, [p.key]: !o[p.key] }))}
                aria-pressed={!!on[p.key]}
              >
                <Icon name={p.icon} size={36} />
                {p.label}
              </button>
            ))}
          </div>
          <div className="lab-prompt">
            <span className="demo-who">Your prompt</span>
            <p>
              {count === 0 ? (
                <span>{sc.weak}</span>
              ) : (
                PROMPT_PARTS.filter((p) => on[p.key]).map((p) => (
                  <span key={p.key} className={`seg seg-${p.key}`}>
                    {sc.parts[p.key]}{' '}
                  </span>
                ))
              )}
            </p>
          </div>
        </div>

        <div className={`lab-result q-${quality}`}>
          <div className="lab-meter" aria-label={`${count} of 4 prompt parts`}>
            {PROMPT_PARTS.map((p) => (
              <i key={p.key} className={on[p.key] ? 'on' : ''} />
            ))}
            <span>{quality === 'strong' ? 'Strong prompt' : quality === 'partial' ? 'Getting better' : 'Weak prompt'}</span>
          </div>
          <span className="demo-who claude">
            <CornerDownRight size={26} /> Claude
          </span>
          <p className="demo-text" key={`${sc.id}-${quality}`}>
            {sc.results[quality]}
          </p>
          <span className="illustrative">Illustrative example · prepared in advance, not live AI</span>
        </div>
      </div>
    </div>
  );
}
