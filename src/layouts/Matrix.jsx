import { Check, Minus } from 'lucide-react';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

// Checkmark grid (e.g. which plan includes which feature).
export default function Matrix({ scene }) {
  return (
    <div className="scene-pad matrix">
      <Eyebrow scene={scene} />
      <h1 className="h-title rise" style={{ '--i': 0 }}>
        <Rich text={scene.title} />
      </h1>
      <table className="mx rise" style={{ '--i': 1 }}>
        <thead>
          <tr>
            <th scope="col">
              <span className="sr-only">Feature</span>
            </th>
            {scene.columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scene.rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {r.values.map((v, i) => (
                <td key={i}>
                  {v === true ? (
                    <span className="yes">
                      <Check size={40} strokeWidth={2.5} />
                      <span className="sr-only">Included</span>
                    </span>
                  ) : v === false ? (
                    <span className="no">
                      <Minus size={36} />
                      <span className="sr-only">Not included</span>
                    </span>
                  ) : (
                    <span className="val">{v}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {scene.footer && <p className="footnote">{scene.footer}</p>}
    </div>
  );
}
