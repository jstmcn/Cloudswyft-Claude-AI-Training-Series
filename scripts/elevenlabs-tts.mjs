// Generates narration MP3s with ElevenLabs from the approved scripts.
//
// Setup (once): create .env.local in the project folder with
//   ELEVENLABS_API_KEY=your-key-here
//   ELEVENLABS_VOICE_ID=voice-id-here        (optional; see --list-voices)
// The key is read only by this local script. It is never bundled into the
// presentation (Vite only exposes variables starting with VITE_), and
// .env.local is git-ignored.
//
// Usage:
//   node scripts/elevenlabs-tts.mjs --list-voices
//   node scripts/elevenlabs-tts.mjs --only p1-s1        (one test clip)
//   node scripts/elevenlabs-tts.mjs                     (all scenes + documentaries)
//
// Documentaries are generated as one take each, with pauses between lines, using
// the timestamp endpoint. The real start time of each line is written to
// src/data/doc-timings.js so the animation and captions follow the voice.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const OUT = path.join(root, 'public/audio/narration');
const MODEL = 'eleven_multilingual_v2';
const FORMAT = 'mp3_44100_128';

// ---------- config ----------
async function loadEnv() {
  const env = {};
  const file = path.join(root, '.env.local');
  if (existsSync(file)) {
    for (const line of (await readFile(file, 'utf8')).split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return { ...env, ...process.env };
}
const env = await loadEnv();
const KEY = env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error('Missing ELEVENLABS_API_KEY. Add it to .env.local (see the top of this file).');
  process.exit(1);
}
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : null);

async function api(p, body) {
  const res = await fetch(`https://api.elevenlabs.io${p}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json', Accept: body ? 'application/json' : 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`ElevenLabs ${res.status}: ${t.slice(0, 300)}`);
  }
  return res;
}

if (flag('--list-voices')) {
  const data = await (await api('/v1/voices')).json();
  for (const v of data.voices) {
    const l = v.labels || {};
    console.log(`${v.voice_id}  ${v.name.padEnd(24)} ${[l.gender, l.accent, l.age, l.description || l.use_case].filter(Boolean).join(', ')}`);
  }
  process.exit(0);
}

const VOICE = opt('--voice') || env.ELEVENLABS_VOICE_ID;
if (!VOICE) {
  console.error('No voice chosen. Run with --list-voices, then set ELEVENLABS_VOICE_ID in .env.local or pass --voice <id>.');
  process.exit(1);
}

const settings = { stability: 0.5, similarity_boost: 0.75, style: 0.15, use_speaker_boost: true };

async function speak(text) {
  const res = await api(`/v1/text-to-speech/${VOICE}/with-timestamps?output_format=${FORMAT}`, {
    text,
    model_id: MODEL,
    voice_settings: settings,
  });
  const json = await res.json();
  return { audio: Buffer.from(json.audio_base64, 'base64'), alignment: json.alignment };
}

// ---------- content ----------
const { NARRATION, spokenText } = await import(new URL('../src/data/narration.js', import.meta.url));
const { DOCUMENTARIES } = await import(new URL('../src/data/documentaries.js', import.meta.url));
const { readdir } = await import('node:fs/promises');
const say = (t) => spokenText(t).replace(/CloudSwyft/g, 'CloudSwift');

const partFiles = (await readdir(path.join(root, 'src/sections'))).filter((f) => /^part\d/.test(f)).sort();
const jobs = [];
for (const f of partFiles) {
  const part = (await import(new URL(`../src/sections/${f}`, import.meta.url))).default;
  part.scenes.forEach((s, i) => {
    if (NARRATION[s.id]) jobs.push({ name: `p${part.id}-s${i + 1}`, scene: s.id, text: say(NARRATION[s.id]) });
  });
}
for (const [id, doc] of Object.entries(DOCUMENTARIES)) jobs.push({ name: `doc${id}`, doc: id });

const only = opt('--only');
const todo = only ? jobs.filter((j) => j.name === only) : jobs;
if (!todo.length) {
  console.error(`Nothing matches --only ${only}. Names look like p1-s1 or doc1.`);
  process.exit(1);
}

await mkdir(OUT, { recursive: true });
const timingsFile = path.join(root, 'src/data/doc-timings.js');
const timings = { ...(await import(new URL('../src/data/doc-timings.js', import.meta.url))).default };

for (const j of todo) {
  if (j.doc) {
    // One take per documentary; a pause between beats keeps them apart.
    const doc = DOCUMENTARIES[j.doc];
    const lines = doc.beats.map((b) => say(b.caption));
    const PAUSE = ' <break time="2.5s" /> ';
    const text = lines.join(PAUSE);
    const { audio, alignment } = await speak(text);
    // Find where each line starts in the character alignment.
    const starts = [];
    let cursor = 0;
    for (const line of lines) {
      const idx = text.indexOf(line, cursor);
      starts.push(alignment.character_start_times_seconds[idx] ?? 0);
      cursor = idx + line.length;
    }
    const end = alignment.character_end_times_seconds.at(-1);
    timings[j.doc] = { starts: starts.map((s) => Math.round(s * 10) / 10), length: Math.round(end * 10) / 10 };
    await writeFile(path.join(OUT, `${j.name}.mp3`), audio);
    console.log(`${j.name}.mp3  ${end.toFixed(1)}s  beats at ${timings[j.doc].starts.join(', ')}s`);
  } else {
    const { audio, alignment } = await speak(j.text);
    const end = alignment.character_end_times_seconds.at(-1);
    await writeFile(path.join(OUT, `${j.name}.mp3`), audio);
    console.log(`${j.name}.mp3  ${end.toFixed(1)}s  (scene ${j.scene})`);
  }
}
await writeFile(
  timingsFile,
  `// Written by scripts/elevenlabs-tts.mjs: when each documentary line actually\n// starts in the generated narration (seconds).\nexport default ${JSON.stringify(timings, null, 2)};\n`
);
console.log('Done.');
