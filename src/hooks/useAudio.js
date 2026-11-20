import { useSyncExternalStore } from 'react';
import { audio } from '../media/audioManager.js';

/** Live narration state: { src, status, currentTime, duration, muted, volume, unlocked } */
export function useAudio() {
  return useSyncExternalStore(audio.subscribe, audio.getState);
}
