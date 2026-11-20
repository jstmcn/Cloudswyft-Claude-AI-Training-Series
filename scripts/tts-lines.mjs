// Writes the list of lines to synthesize for the temporary Windows-voice narration.
//   scripts/tts-lines.json         one entry per narrated scene  (p{part}-s{n}.wav)
//   scripts/tts-doc-lines.json     one entry per documentary beat (doc{N}-b{i}.wav)
// Run: node scripts/tts-lines.mjs
import { readdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve('.');
const imp = async (p) => import(pathToFileURL(path.join(root, p)).href);
const { NARRATION, spokenText } = await imp('src/data/narration.js');
const { DOCUMENTARIES } = await imp('src/data/documentaries.js');

// Spell a few words the way the voice should say them.
const say = (t) =>
  spokenText(t)
    .replace(/CloudSwyft/g, 'Cloud Swift')
    .replace(/\bAPI\b/g, 'A P I')
    .replace(/\bIDE\b/g, 'I D E')
    .replace(/\bQA\b/g, 'Q A');

const files = (await readdir(path.join(root, 'src/sections'))).filter((f) => /^part\d/.test(f)).sort();
const scenes = [];
for (const f of files) {
  const part = (await imp(`src/sections/${f}`)).default;
  part.scenes.forEach((s, i) => {
    if (NARRATION[s.id]) scenes.push({ file: `p${part.id}-s${i + 1}.wav`, text: say(NARRATION[s.id]) });
  });
}
const beats = [];
for (const [id, doc] of Object.entries(DOCUMENTARIES)) {
  doc.beats.forEach((b, i) => beats.push({ file: `doc${id}-b${i}.wav`, text: say(b.caption) }));
}
await writeFile(path.join(root, 'scripts/tts-lines.json'), JSON.stringify(scenes, null, 1));
await writeFile(path.join(root, 'scripts/tts-doc-lines.json'), JSON.stringify(beats, null, 1));
console.log(`${scenes.length} scene lines, ${beats.length} documentary beat lines`);
