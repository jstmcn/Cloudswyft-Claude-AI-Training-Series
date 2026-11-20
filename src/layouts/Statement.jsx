import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

export default function Statement({ scene }) {
  return (
    <div className="scene-pad statement">
      <Eyebrow scene={scene} />
      {scene.icon && (
        <span className="statement-icon rise" style={{ '--i': 0 }}>
          <Icon name={scene.icon} size={88} strokeWidth={1.5} />
        </span>
      )}
      <h1 className="h-hero rise" style={{ '--i': 1 }}>
        <Rich text={scene.title} />
      </h1>
      {scene.subtitle && (
        <p className="lead rise" style={{ '--i': 2 }}>
          {scene.subtitle}
        </p>
      )}
      {scene.note && (
        <p className="footnote rise" style={{ '--i': 3 }}>
          {scene.note}
        </p>
      )}
    </div>
  );
}
