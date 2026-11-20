import { useCallback, useEffect, useRef, useState } from 'react';

/** Presenter clock: total session time plus time spent on the current scene. */
export function useSessionTimer(sceneKey) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [sceneElapsed, setSceneElapsed] = useState(0);
  const last = useRef(null);

  useEffect(() => {
    setSceneElapsed(0);
  }, [sceneKey]);

  useEffect(() => {
    if (!running) return undefined;
    last.current = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      const dt = (now - last.current) / 1000;
      last.current = now;
      setElapsed((e) => e + dt);
      setSceneElapsed((e) => e + dt);
    }, 250);
    return () => clearInterval(id);
  }, [running]);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    setElapsed(0);
    setSceneElapsed(0);
  }, []);

  return { running, elapsed, sceneElapsed, start, pause, reset };
}

export const fmtTime = (s) => {
  const sign = s < 0 ? '-' : '';
  const a = Math.abs(Math.round(s));
  return `${sign}${Math.floor(a / 60)}:${String(a % 60).padStart(2, '0')}`;
};
