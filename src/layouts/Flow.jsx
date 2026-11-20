import { Fragment } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

// Steps that build in one at a time (→ reveals the next, or narration cues do).
// Variants: arrows, timeline, formula.
export default function Flow({ scene, api }) {
  const variant = scene.variant || 'arrows';
  const visible = scene.build ? api.step + 1 : scene.steps.length;
  const Join = variant === 'formula' ? Plus : ArrowRight;

  return (
    <div className={`scene-pad flow flow-${variant}`}>
      <Eyebrow scene={scene} />
      {scene.kicker && <span className="kicker rise">{scene.kicker}</span>}
      <h1 className="h-title rise" style={{ '--i': 0 }}>
        <Rich text={scene.title} />
      </h1>

      <div className="flow-row">
        {variant === 'timeline' && <div className="timeline-line" aria-hidden="true" />}
        {scene.steps.map((s, i) => {
          const shown = i < visible;
          return (
            <Fragment key={s.label}>
              {i > 0 && variant !== 'timeline' && (
                <span className={`flow-join${shown ? ' shown' : ''}`} aria-hidden="true">
                  <Join size={44} strokeWidth={2} />
                </span>
              )}
              <div className={`flow-step${shown ? ' shown' : ''}${s.accent ? ' accent' : ''}`} aria-hidden={!shown}>
                {variant === 'timeline' ? (
                  <span className="flow-dot" />
                ) : (
                  <span className="flow-icon">
                    <Icon name={s.icon} size={64} strokeWidth={1.6} />
                  </span>
                )}
                <span className="flow-label">{s.label}</span>
                {s.sub && <span className="flow-sub">{s.sub}</span>}
              </div>
            </Fragment>
          );
        })}
      </div>

      {scene.build && visible < scene.steps.length && <p className="hint build-hint">Press → to reveal</p>}
      {scene.footer && <p className="footnote">{scene.footer}</p>}
    </div>
  );
}
