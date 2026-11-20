import { useEffect, useRef, useState } from 'react';
import { Maximize, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { audio } from '../media/audioManager.js';
import { soundscape } from '../media/soundscape.js';
import { fmtTime } from '../hooks/useSessionTimer.js';

const BASE = import.meta.env.BASE_URL;

/**
 * MP4 player for documentaries, used only when `video` is set in documentaries.js.
 * Stops narration while playing so audio never overlaps.
 */
export default function VideoPlayer({ doc, captions }) {
  const ref = useRef(null);
  const wrap = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(doc.duration);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    for (const t of v.textTracks) t.mode = captions ? 'showing' : 'hidden';
  }, [captions]);

  // Music ducks while the video plays.
  useEffect(() => {
    soundscape.duck('video', playing && !muted);
    return () => soundscape.duck('video', false);
  }, [playing, muted]);

  const toggle = () => {
    const v = ref.current;
    if (!v || error) return;
    if (v.paused) {
      audio.stop();
      v.play().catch(() => setError('The browser blocked playback. Click play again.'));
    } else v.pause();
  };
  const replay = () => {
    const v = ref.current;
    if (!v || error) return;
    v.currentTime = 0;
    audio.stop();
    v.play().catch(() => {});
  };

  useEffect(() => {
    const onMedia = (e) => (e.detail === 'replay' ? replay() : toggle());
    window.addEventListener('deck:media', onMedia);
    return () => window.removeEventListener('deck:media', onMedia);
  });

  return (
    <div className="doc video" ref={wrap}>
      {error ? (
        <div className="doc-poster">
          <h2>{doc.title}</h2>
          <p className="doc-error">{error}</p>
        </div>
      ) : (
        <video
          ref={ref}
          src={`${BASE}videos/${doc.video}`}
          playsInline
          muted={muted}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || doc.duration)}
          onError={() => setError(`Video file not found: public/videos/${doc.video}`)}
        >
          {doc.captions && <track kind="captions" srcLang="en" label="English" src={`${BASE}captions/${doc.captions}`} default />}
        </video>
      )}
      <div className="doc-controls">
        <button type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} disabled={!!error}>
          {playing ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button type="button" onClick={replay} aria-label="Replay" disabled={!!error}>
          <RotateCcw size={26} />
        </button>
        <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute video' : 'Mute video'}>
          {muted ? <VolumeX size={26} /> : <Volume2 size={26} />}
        </button>
        <div className="doc-track" aria-hidden="true">
          <i style={{ width: `${(time / duration) * 100}%` }} />
        </div>
        <span className="doc-clock">
          {fmtTime(time)} / {fmtTime(duration)}
        </span>
        <button
          type="button"
          onClick={() => wrap.current?.requestFullscreen?.().catch(() => {})}
          aria-label="Fullscreen video"
        >
          <Maximize size={24} />
        </button>
      </div>
    </div>
  );
}
