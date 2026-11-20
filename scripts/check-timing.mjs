// Checks that scene durations add up to the approved 30-minute plan.
// Run with: npm run check:timing
import { readdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const dir = path.resolve('src/sections');
const TARGETS = { 1: 180, 2: 180, 3: 300, 4: 240, 5: 300, 6: 240, 7: 240 };
const TRANSITIONS = 120;
const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const files = (await readdir(dir)).filter((f) => /^part\d/.test(f)).sort();
let total = 0;
let ok = true;
for (const f of files) {
  const part = (await import(pathToFileURL(path.join(dir, f)).href)).default;
  const secs = part.scenes.reduce((s, sc) => s + (sc.duration || 0), 0);
  total += secs;
  const good = secs === TARGETS[part.id];
  ok &&= good;
  console.log(`${good ? 'OK ' : 'OFF'}  Part ${part.id} ${part.title.padEnd(24)} ${fmt(secs)} (target ${fmt(TARGETS[part.id])})`);
}
console.log(`     Transitions${' '.repeat(22)}${fmt(TRANSITIONS)}`);
console.log(`     Total${' '.repeat(28)}${fmt(total + TRANSITIONS)} (target 30:00)`);
ok &&= total + TRANSITIONS === 1800;
if (!ok) {
  console.error('Timing does not match the approved plan.');
  process.exit(1);
}
