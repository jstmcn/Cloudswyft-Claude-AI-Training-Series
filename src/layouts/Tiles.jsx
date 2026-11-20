import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Icon from '../components/Icon.jsx';
import Rich from '../components/Rich.jsx';
import { Eyebrow } from '../components/SceneFrame.jsx';

// Icon tiles. Variants: grid (many small, click for details), big (3–4 large), chips (quotes).
export default function Tiles({ scene }) {
  const [open, setOpen] = useState(null);
  const variant = scene.variant || 'grid';
  const hasDetail = scene.tiles.some((t) => t.detail || t.example);
  const tile = open === null ? null : scene.tiles[open];

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(null);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open]);

  return (
    <div className={`scene-pad tiles tiles-${variant}`}>
      <Eyebrow scene={scene} />
      <h1 className="h-title rise" style={{ '--i': 0 }}>
        <Rich text={scene.title} />
      </h1>
      {scene.hint && <p className="hint rise">{scene.hint}</p>}

      <div className="tile-grid" style={{ '--cols': scene.columns || scene.tiles.length }}>
        {scene.tiles.map((t, i) => {
          const Tag = hasDetail ? 'button' : 'div';
          return (
            <Tag
              key={t.label}
              type={hasDetail ? 'button' : undefined}
              className={`tile rise${open === i ? ' on' : ''}`}
              style={{ '--i': Math.min(i, 10) + 1 }}
              onClick={hasDetail ? () => setOpen(open === i ? null : i) : undefined}
              aria-expanded={hasDetail ? open === i : undefined}
            >
              <span className="tile-icon">
                <Icon name={t.icon} size={variant === 'grid' ? 44 : 72} strokeWidth={1.6} />
              </span>
              <span className="tile-label">{t.label}</span>
            </Tag>
          );
        })}
      </div>

      {tile && (
        <div className="detail" role="status">
          <span className="detail-icon">
            <Icon name={tile.icon} size={48} />
          </span>
          <div className="detail-body">
            <b>{tile.label}</b>
            {tile.detail && <span>{tile.detail}</span>}
            {tile.example && (
              <span>
                <em>e.g.</em> {tile.example}
              </span>
            )}
            {tile.access && <small>Access: {tile.access}</small>}
          </div>
          <button type="button" className="mini-btn" onClick={() => setOpen(null)} aria-label="Close details">
            <X size={22} />
          </button>
        </div>
      )}

      {scene.footer && !tile && <p className="footnote">{scene.footer}</p>}
    </div>
  );
}
