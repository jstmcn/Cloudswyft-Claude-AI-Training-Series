import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { ArrowRight, Copy, ExternalLink, Gamepad2, LifeBuoy, MonitorPlay, X } from 'lucide-react';
import { GAMES, isEducaplayUrl } from '../data/games.js';
import { audio } from '../media/audioManager.js';
import { soundscape } from '../media/soundscape.js';
import { Eyebrow } from './SceneFrame.jsx';

/**
 * Educaplay game scene: instructions, launch, copy link, QR code, optional embed,
 * presenter cue and Continue. Buttons stay disabled until a real URL is set in games.js.
 */
export default function GameLauncher({ scene, api }) {
  const game = GAMES[scene.gameId];
  const ready = isEducaplayUrl(game.url);
  const badLink = !!game.url && !ready;
  const canEmbed = ready && isEducaplayUrl(game.embedUrl);
  const [qr, setQr] = useState(null);
  const [copied, setCopied] = useState(null);
  const [embedOpen, setEmbedOpen] = useState(false);
  const [backup, setBackup] = useState(0); // 0 hidden, 1 question, 2 question + answer

  useEffect(() => {
    if (!ready) return;
    QRCode.toDataURL(game.url, { margin: 1, width: 360, color: { dark: '#0B1E46', light: '#FFFFFF' } })
      .then(setQr)
      .catch(() => setQr(null));
  }, [ready, game.url]);

  // Music ducks under an embedded game (it has its own sounds).
  useEffect(() => {
    soundscape.duck('game', embedOpen);
    return () => soundscape.duck('game', false);
  }, [embedOpen]);

  const copy = async () => {
    if (!ready) return;
    try {
      await navigator.clipboard.writeText(game.url);
      setCopied('Link copied. Paste it in the Teams chat.');
    } catch {
      setCopied('Copy blocked: select the link and press Ctrl+C.');
    }
    setTimeout(() => setCopied(null), 3500);
  };

  return (
    <div className="scene-pad game">
      <div className="game-main">
        <Eyebrow scene={scene} />
        <div className="game-badge rise" style={{ '--i': 0 }}>
          <Gamepad2 size={34} /> Game {scene.gameId} of 7 · {game.type}
        </div>
        <h1 className="h-title rise" style={{ '--i': 1 }}>
          {game.title}
        </h1>
        <ol className="game-steps rise" style={{ '--i': 2 }}>
          {game.instructions.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>

        <div className="game-actions rise" style={{ '--i': 3 }}>
          {ready ? (
            <a className="btn primary big" href={game.url} target="_blank" rel="noopener noreferrer" onClick={() => audio.pause()}>
              <ExternalLink size={26} /> Launch game
            </a>
          ) : (
            <button type="button" className="btn primary big" aria-disabled="true" disabled>
              <ExternalLink size={26} /> Launch game
            </button>
          )}
          <button type="button" className="btn big" onClick={copy} disabled={!ready}>
            <Copy size={26} /> Copy link
          </button>
          {canEmbed && (
            <button
              type="button"
              className="btn big"
              onClick={() => {
                audio.pause();
                setEmbedOpen(true);
              }}
            >
              <MonitorPlay size={26} /> Play here
            </button>
          )}
          <button type="button" className="btn big" onClick={api.next}>
            Continue <ArrowRight size={26} />
          </button>
        </div>

        <div className="game-link rise" style={{ '--i': 4 }}>
          {ready ? (
            <input id={`game-link-${scene.gameId}`} readOnly value={game.url} onFocus={(e) => e.target.select()} aria-label="Game link" />
          ) : badLink ? (
            <span className="pending">Link ignored: only https://…educaplay.com links are accepted. Check src/data/games.js.</span>
          ) : (
            <span className="pending">Pending publication · link and QR appear once the game is published on Educaplay</span>
          )}
          {copied && <span className="copied">{copied}</span>}
        </div>

        {game.backup && (
          <div className="backup">
            {backup === 0 ? (
              <button type="button" className="mini-btn" onClick={() => setBackup(1)}>
                <LifeBuoy size={20} /> No internet? Backup question
              </button>
            ) : (
              <div className="backup-card" role="status">
                <b>{game.backup.q}</b>
                {backup === 2 ? (
                  <span>{game.backup.a}</span>
                ) : (
                  <button type="button" className="mini-btn" onClick={() => setBackup(2)}>
                    Show answer
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <aside className="game-side rise" style={{ '--i': 2 }}>
        <div className="qr">
          {ready && qr ? <img src={qr} alt={`QR code for ${game.title}`} /> : <span>QR code<br />pending</span>}
        </div>
        <div className="cue">
          <b>Presenter cue</b>
          <span>{game.cue}</span>
        </div>
      </aside>

      {embedOpen && (
        <div className="embed">
          <iframe src={game.embedUrl} title={game.title} allow="fullscreen" />
          <button type="button" className="btn" onClick={() => setEmbedOpen(false)}>
            <X size={20} /> Close game
          </button>
        </div>
      )}
    </div>
  );
}
