import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Eyebrow } from '../components/SceneFrame.jsx';

// Reference appendix slides (R1–R7). Denser by design: backup detail for Q&A.
export default function Reference({ scene }) {
  const Body = KINDS[scene.kind] || Pending;
  return (
    <div className={`scene-pad reference refkind-${scene.kind}`}>
      <Eyebrow scene={scene} />
      <h1 className="h-title ref-title">{scene.title}</h1>
      <Body scene={scene} />
      {scene.footer && <p className="footnote">{scene.footer}</p>}
    </div>
  );
}

const RATING = { Strong: 'r-strong', Good: 'r-good', Limited: 'r-limited' };

function Table({ scene }) {
  return (
    <div className={`ref-row${scene.side ? ' with-side' : ''}`}>
      <table className={`ref-table${scene.wide ? ' wide' : ''}`}>
        <thead>
          <tr>
            {scene.columns.map((c, i) => (
              <th key={c} scope="col" className={i === 1 && scene.id === 'R1' ? 'ref-claude' : undefined}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scene.rows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell, i) =>
                i === 0 ? (
                  <th key={i} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={i} className={RATING[cell] ? `rating ${RATING[cell]}` : undefined}>
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {scene.side && (
        <aside className="ref-side">
          {scene.side.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </section>
          ))}
        </aside>
      )}
    </div>
  );
}

function Stats({ scene }) {
  return (
    <>
      <div className="ref-stats">
        {scene.stats.map((s) => (
          <div key={s.value} className="ref-stat">
            <b>{s.value}</b>
            <span>{s.label}</span>
            <small>{s.source}</small>
          </div>
        ))}
      </div>
      {scene.note && <p className="ref-note">{scene.note}</p>}
    </>
  );
}

function Cards({ scene }) {
  return (
    <div className="ref-cards">
      {scene.cards.map((c) => (
        <div key={c.label} className="ref-card">
          <span className="ref-sample">{c.sample}</span>
          <b>{c.label}</b>
          <span>{c.text}</span>
        </div>
      ))}
    </div>
  );
}

function Prompts({ scene }) {
  const [copied, setCopied] = useState(null);
  const copy = async (i, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied(null), 2500);
    } catch {
      setCopied(-1);
    }
  };
  return (
    <div className="ref-prompts">
      {scene.prompts.map((p, i) => (
        <div key={p.label} className="ref-prompt">
          <b>{p.label}</b>
          <small>{p.feature}</small>
          <p>“{p.prompt}”</p>
          <span className="ref-out">Expected: {p.output}</span>
          <button type="button" className="mini-btn" onClick={() => copy(i, p.prompt)}>
            {copied === i ? <Check size={18} /> : <Copy size={18} />} {copied === i ? 'Copied' : 'Copy prompt'}
          </button>
        </div>
      ))}
      {copied === -1 && <p className="ref-note">Copy blocked by the browser: select the text and press Ctrl+C.</p>}
    </div>
  );
}

function List({ scene }) {
  return (
    <ol className="ref-list">
      {scene.items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ol>
  );
}

function Pending({ scene }) {
  return <p className="ref-note">No content defined for {scene.id}.</p>;
}

const KINDS = { table: Table, stats: Stats, cards: Cards, prompts: Prompts, list: List };
