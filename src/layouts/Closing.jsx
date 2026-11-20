import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

export default function Closing({ scene }) {
  return (
    <div className="scene-pad closing">
      <Eyebrow scene={scene} />
      <h1 className="h-hero rise" style={{ '--i': 0 }}>
        <Rich text={scene.title} />
      </h1>
      <div className="pillars">
        {scene.pillars.map((p, i) => (
          <div key={p.label} className="pillar rise" style={{ '--i': i + 1 }}>
            <Icon name={p.icon} size={64} strokeWidth={1.6} />
            {p.label}
          </div>
        ))}
      </div>
      <div className="closing-ask rise" style={{ '--i': 6 }}>
        <Icon name="chat" size={44} />
        <span>{scene.question}</span>
        <small>Reply in the Teams chat</small>
      </div>
      <p className="thanks rise" style={{ '--i': 7 }}>
        {scene.thanks}
      </p>
    </div>
  );
}
