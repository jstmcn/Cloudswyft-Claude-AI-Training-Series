import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

export default function Columns({ scene }) {
  return (
    <div className="scene-pad columns">
      <Eyebrow scene={scene} />
      <h1 className="h-title rise" style={{ '--i': 0 }}>
        <Rich text={scene.title} />
      </h1>
      <div className="col-row" style={{ '--cols': scene.columns.length }}>
        {scene.columns.map((c, ci) => (
          <section
            key={c.heading}
            className={`col rise${c.accent ? ' accent' : ''}${c.muted ? ' muted' : ''}`}
            style={{ '--i': ci + 1 }}
          >
            <header>
              {c.icon && <Icon name={c.icon} size={44} />}
              <h2>{c.heading}</h2>
            </header>
            <ul>
              {c.items.map((it, i) => (
                <li key={it.label} className="rise" style={{ '--i': ci + i + 2 }}>
                  <Icon name={it.icon} size={34} />
                  {it.label}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {scene.footer && <p className="footnote">{scene.footer}</p>}
    </div>
  );
}
