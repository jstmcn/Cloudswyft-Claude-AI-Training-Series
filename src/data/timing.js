// Timing plan derived from the scene durations in src/sections/.
// Approved run of show: 28:00 of scenes + 2:00 transitions = 30:00.
import { MAIN_PARTS } from './presentation.js';

export const TARGET_SECONDS = 30 * 60;
export const TRANSITIONS_SECONDS = 120;

export const PART_TARGETS = { 1: 180, 2: 180, 3: 300, 4: 240, 5: 300, 6: 240, 7: 240 };

export function partSeconds(part) {
  return part.scenes.reduce((sum, s) => sum + (s.duration || 0), 0);
}

export function timingReport() {
  const parts = MAIN_PARTS.map((p) => ({
    id: p.id,
    title: p.title,
    seconds: partSeconds(p),
    target: PART_TARGETS[p.id],
  }));
  const scenesTotal = parts.reduce((s, p) => s + p.seconds, 0);
  return {
    parts,
    scenesTotal,
    total: scenesTotal + TRANSITIONS_SECONDS,
    target: TARGET_SECONDS,
    ok: scenesTotal + TRANSITIONS_SECONDS === TARGET_SECONDS && parts.every((p) => p.seconds === p.target),
  };
}
