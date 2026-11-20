import ProgressIndicator from './ProgressIndicator.jsx';

const LOGO = `${import.meta.env.BASE_URL}images/brand/cloudswyft-logo-on-light.png`;

// Shared chrome on every scene: logo, series pill, progress line, scene number.
export default function SceneFrame({ scene, onJump, children, bare = false }) {
  return (
    <>
      {!bare && (
        <header className="frame-top">
          <img src={LOGO} alt="CloudSwyft" />
          <span className="series-pill">Claude AI Training Series</span>
        </header>
      )}
      {children}
      <ProgressIndicator scene={scene} onJump={onJump} />
      <span className="scene-num">{scene.id}</span>
    </>
  );
}

export function Eyebrow({ scene }) {
  if (scene.appendix) return <span className="eyebrow">Reference</span>;
  return (
    <span className="eyebrow">
      {String(scene.partId).padStart(2, '0')} · {scene.partTitle}
    </span>
  );
}
