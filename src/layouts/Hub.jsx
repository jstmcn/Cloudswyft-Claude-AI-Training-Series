import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

// Hub-and-spoke diagram: Claude in the middle, connected apps around it.
export default function Hub({ scene }) {
  const n = scene.nodes.length;
  const cx = 640;
  const cy = 290;
  const rx = 470;
  const ry = 220;
  // Nodes evenly around an ellipse, starting at the top.
  const pts = scene.nodes.map((_, i) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });

  return (
    <div className="scene-pad hub">
      <Eyebrow scene={scene} />
      <h1 className="h-title rise" style={{ '--i': 0 }}>
        <Rich text={scene.title} />
      </h1>
      <div className="hub-canvas">
        <svg viewBox="0 0 1280 580" aria-hidden="true">
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} className="hub-orbit" />
          {pts.map((p, i) => (
            <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} className="hub-line" />
          ))}
        </svg>
        <div className="hub-center rise" style={{ left: cx, top: cy, '--i': 1 }}>
          <Rich text={scene.center} />
        </div>
        {scene.nodes.map((node, i) => (
          <div key={node.label} className="hub-node rise" style={{ left: pts[i].x, top: pts[i].y, '--i': i + 2 }}>
            <span>
              <Icon name={node.icon} size={44} />
            </span>
            {node.label}
          </div>
        ))}
      </div>
      {scene.footer && <p className="footnote">{scene.footer}</p>}
    </div>
  );
}
