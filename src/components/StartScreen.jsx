import { useEffect, useRef } from 'react';
import { Maximize, Play } from 'lucide-react';

const LOGO = `${import.meta.env.BASE_URL}images/brand/cloudswyft-logo-on-light.png`;

// Browsers block sound until the first click, so the session starts here.
export default function StartScreen({ onStart }) {
  const first = useRef(null);
  useEffect(() => first.current?.focus(), []);

  return (
    <div className="start" role="dialog" aria-modal="true" aria-labelledby="start-title">
      <div className="start-card">
        <img src={LOGO} alt="CloudSwyft" />
        <h1 id="start-title">Claude AI: Beyond Conversational AI</h1>
        <p>30-minute interactive session. Share this browser window in Teams with “Include sound” turned on.</p>
        <div className="start-actions">
          <button ref={first} type="button" className="btn primary" onClick={() => onStart({ fullscreen: true })}>
            <Maximize size={18} /> Start in fullscreen
          </button>
          <button type="button" className="btn" onClick={() => onStart({ fullscreen: false })}>
            <Play size={18} /> Start in window
          </button>
        </div>
        <p className="kbd-hint">
          <kbd>→</kbd> next · <kbd>←</kbd> back · <kbd>S</kbd> sections · <kbd>P</kbd> pause voice · <kbd>R</kbd> replay ·{' '}
          <kbd>M</kbd> mute · <kbd>F</kbd> fullscreen · <kbd>T</kbd> timer · <kbd>C</kbd> captions · <kbd>N</kbd> notes window · <kbd>B</kbd> music
        </p>
      </div>
    </div>
  );
}
