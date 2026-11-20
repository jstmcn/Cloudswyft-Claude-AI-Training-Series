import { useCallback, useEffect, useRef, useState } from 'react';
import { Maximize, Pause, Play, RotateCcw } from 'lucide-react';
import { DOCUMENTARIES } from '../data/documentaries.js';
import { audio } from '../media/audioManager.js';
import { useAudio } from '../hooks/useAudio.js';
import { fmtTime } from '../hooks/useSessionTimer.js';
import Icon from './Icon.jsx';
import VideoPlayer from './VideoPlayer.jsx';

/**
 * Documentary scene: an animated timeline of beats synced to a narration track.
 * - With narration audio: the audio clock drives the animation.
 * - Without audio (not recorded yet): a silent clock runs it so it can be rehearsed.
 * - With `video` set in documentaries.js: plays the MP4 instead.
 */
export default function Documentary({ scene, api }) {
  const doc = DOCUMENTARIES[scene.docId];
  if (doc.video) return <VideoPlayer doc={doc} captions={api.captions} />;
  return <AnimatedDocumentary doc={doc} scene={scene} captions={api.captions} />;
}

function AnimatedDocumentary({ doc, scene, captions }) {
  const a = useAudio();
  const rootRef = useRef(null);
  const ours = a.src === scene.audioSrc;
  const silent = !ours || a.status === 'missing' || a.status === 'idle';

  // Silent clock (used when there is no narration file yet).
  const [silentTime, setSilentTime] = useState(0);
  const [silentPlaying, setSilentPlaying] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    if (!silentPlaying) return undefined;
    let last = performance.now();
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      setSilentTime((t) => {
        const nt = t + dt;
        if (nt >= doc.duration) {
          setSilentPlaying(false);
          return doc.duration;
        }
        return nt;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [silentPlaying, doc.duration]);

  const time = silent ? silentTime : a.currentTime;
  const playing = silent ? silentPlaying : a.status === 'playing';
  const ended = time >= doc.duration - 0.05 || (!silent && a.status === 'ended');

  const toggle = useCallback(() => {
    if (silent) {
      if (silentTime >= doc.duration) setSilentTime(0);
      setSilentPlaying((p) => !p);
    } else audio.toggle();
  }, [silent, silentTime, doc.duration]);

  const replay = useCallback(() => {
    if (silent) {
      setSilentTime(0);
      setSilentPlaying(true);
    } else audio.replay();
  }, [silent]);

  const seek = (t) => {
    if (silent) setSilentTime(t);
    else audio.seek(t);
  };

  // Keyboard P / R and dock buttons arrive as `deck:media` events.
  useEffect(() => {
    const onMedia = (e) => (e.detail === 'replay' ? replay() : toggle());
    window.addEventListener('deck:media', onMedia);
    return () => window.removeEventListener('deck:media', onMedia);
  }, [toggle, replay]);

  const fullscreen = async () => {
    try {
      if (document.fullscreenElement === rootRef.current) await document.exitFullscreen();
      else await rootRef.current.requestFullscreen();
    } catch {
      /* not allowed here; the whole app can still go fullscreen with F */
    }
  };

  let beatIndex = 0;
  doc.beats.forEach((b, i) => {
    if (time >= b.t) beatIndex = i;
  });
  const beat = doc.beats[beatIndex];
  const started = time > 0 || playing;

  return (
    <div className="doc" ref={rootRef}>
      <div className="doc-rings" aria-hidden="true" />
      <div className="doc-label">
        <span>Documentary {scene.docId}</span> {doc.title}
      </div>

      {!started ? (
        <div className="doc-poster">
          <h2>{doc.title}</h2>
          <button type="button" className="doc-big-play" onClick={toggle} aria-label={`Play documentary: ${doc.title}`}>
            <Play size={64} />
          </button>
          <p>{fmtTime(doc.duration)} · press P or click play</p>
        </div>
      ) : (
        <div className={`doc-beat${beat.title ? ' is-title' : ''}`} key={beatIndex}>
          <div className="doc-icons">
            {beat.icons.map((ic, i) => (
              <span key={ic + i} className="doc-icon" style={{ '--i': i }}>
                <Icon name={ic} size={beat.title ? 120 : 96} strokeWidth={1.4} />
              </span>
            ))}
          </div>
          {beat.time && <div className="doc-time">{beat.time}</div>}
          <div className="doc-text">{beat.text}</div>
        </div>
      )}

      {captions && started && (
        <div className="doc-captions" aria-live="polite">
          {beat.caption || (silent ? 'Narration not recorded yet: captions appear with the voice track.' : '')}
        </div>
      )}

      <div className="doc-controls">
        <button type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <Pause size={28} /> : <Play size={28} />}
        </button>
        <button type="button" onClick={replay} aria-label="Replay">
          <RotateCcw size={26} />
        </button>
        <div
          className="doc-track"
          role="slider"
          tabIndex={0}
          aria-label="Documentary position"
          aria-valuemin={0}
          aria-valuemax={doc.duration}
          aria-valuenow={Math.round(time)}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            seek(((e.clientX - r.left) / r.width) * doc.duration);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
              e.stopPropagation();
              e.preventDefault();
              seek(Math.min(doc.duration, Math.max(0, time + (e.key === 'ArrowRight' ? 5 : -5))));
            }
          }}
        >
          <i style={{ width: `${Math.min(100, (time / doc.duration) * 100)}%` }} />
          {doc.beats.map((b) => (
            <b key={b.t} style={{ left: `${(b.t / doc.duration) * 100}%` }} />
          ))}
        </div>
        <span className="doc-clock">
          {fmtTime(time)} / {fmtTime(doc.duration)}
        </span>
        {silent && <span className="doc-flag">Voice pending · silent preview</span>}
        {ended && <span className="doc-flag ok">Finished · press → to continue</span>}
        <button type="button" onClick={fullscreen} aria-label="Fullscreen documentary">
          <Maximize size={24} />
        </button>
      </div>
    </div>
  );
}
