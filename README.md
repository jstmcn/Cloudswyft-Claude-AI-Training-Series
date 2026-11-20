# Claude AI: Beyond Conversational AI

Interactive HTML presentation for the CloudSwyft Claude AI Training Series:
a 30-minute session shared over Microsoft Teams, with 7 parts, 5 documentary
scenes, 7 Educaplay games and presenter controls.

**Live presentation:** https://jstmcn.github.io/Cloudswyft-Claude-AI-Training-Series/
(published by GitHub Pages; `.github/workflows/deploy-pages.yml` rebuilds it on every push to `main`).

Built with Vite + React. No backend, no API keys, works offline once built
(except the Educaplay games, which need internet).

## Status (Phase 7 of 8)

| Area | Status |
|---|---|
| Navigation, presenter dock, keyboard, section menu, timer, fullscreen | Working |
| All 36 main scenes (incl. optional 4.x), approved on-screen text | Working |
| Reference appendix R1–R7 (deck content with sources) | Working |
| Narration scripts for every scene + recording guide | Done: `docs/narration-scripts.md` |
| Narration (pause, resume, replay, mute, volume, auto-advance) | Working. **AI voiceover generated with ElevenLabs** (voice: Teacher Rachel), 23 scene clips |
| Documentaries | **Motion-graphics videos** (kinetic type, CloudSwyft colours) made with HyperFrames in `motion/doc1`–`doc5`, ElevenLabs voice built in, captions from `public/captions`. The older animated HTML versions stay as a fallback |
| Presenter notes window (N) | Working: script, cues, next scene, remote Back/Next |
| Background music + click sounds | Working. Original upbeat pop loop (112 BPM) and click tones generated in the browser (Web Audio; no files, nothing to license). Music gets quieter and muffled under narration, documentaries, videos and embedded games. Dock toggles: Music (B) and Click sounds; M mutes all |
| Educaplay game scenes (launch, copy link, QR, embed, continue, backup question) | Working. **All 7 games published and linked** |

## Documents

- [docs/presenter-guide.md](docs/presenter-guide.md): setup, keys, run of show, games, troubleshooting
- [docs/narration-scripts.md](docs/narration-scripts.md): recording guide and every script, with file names
- [docs/timing-plan.md](docs/timing-plan.md): scene-by-scene start times
- [docs/game-content.md](docs/game-content.md): all 7 games (questions, answers, backup questions) and how to publish them
- [docs/qa-report.md](docs/qa-report.md): what was tested and what wasn't
- [docs/manual-test-checklist.md](docs/manual-test-checklist.md): checks to do by hand before the session (Edge, Teams, phones)

After editing scripts or scene durations, run `npm run export:scripts` to regenerate
these documents and the documentary caption files (it also fails if a script is too long).

## Requirements

- Node.js 18 or newer (LTS recommended): https://nodejs.org
- Chrome or Edge for presenting

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173 and click **Start in fullscreen**.

## Build for hosting

```bash
npm run build
```

This creates `dist/`. Upload that folder to Netlify (drag and drop at
app.netlify.com/drop) or GitHub Pages. To check the built version locally:

```bash
npm run preview
```

## Check the timing

```bash
npm run check:timing
```

Confirms the scene durations still add up to the approved 30:00.

## Presenting on Teams

1. Open the presentation in Chrome or Edge and click **Start in fullscreen**.
2. In Teams, choose **Share > Window**, pick the browser window and turn on **Include sound**.
3. Move with the arrow keys. The dock at the bottom hides after 3 seconds without mouse movement.

| Key | Action |
|---|---|
| → / Space / PageDown | Next step or scene |
| ← / PageUp | Previous |
| S | Section menu (includes the Reference appendix) |
| P | Pause / resume narration, or play / pause a documentary |
| R | Replay narration or documentary |
| M | Mute |
| C | Captions on/off (documentaries) |
| T | Presenter timer (session clock vs. plan) |
| F | Fullscreen |
| Home / End | First / last scene |
| N | Presenter notes window (don't share it) |
| B | Background music on/off |
| Esc | Close menu or timer |

## Music and click sounds

Both are generated live in `src/media/soundscape.js`, so there are no audio files to license.

- **Music:** an upbeat pop loop at 112 BPM: C–G–Am–F chords (`BARS`), arpeggio (`ARP`),
  bassline (`BASS`) and a hook melody (`HOOK`) in the second half of every 8 bars.
  The settings at the top of the file:

  | Setting | Default | What it changes |
  |---|---|---|
  | `BPM` | 112 | Tempo |
  | `MUSIC_LEVEL` | 0.3 | Music level when nobody is speaking |
  | `DUCK_LEVEL` | 0.06 | Music level under a voice |
  | `OPEN_TONE` / `DUCK_TONE` | 12000 / 1400 Hz | Brightness normally / under a voice (lower = more muffled) |
  | `SFX_LEVEL` | 0.32 | Click-sound volume |
  | `VIDEO_BED_LEVEL` / `VIDEO_BED_TONE` | 0.12 / 5000 Hz | Music under the documentary videos (their soundtrack) |

- **Ducking:** anything that talks calls `soundscape.duck(reason, true/false)`; narration,
  documentary audio, MP4 videos and embedded games already do. Under a voice the music
  gets quieter and muffled at the same time, so the beat stays in the background.
- **Click sounds:** `soundFor()` picks the sound for each kind of button (vote tiles, capability
  tiles and hotspots, tabs and toggles, game launch, other buttons). `SFX_LEVEL` sets volume.

## Adding media and links

**Regenerating the AI voiceover (ElevenLabs):** after editing a script in
`src/data/narration.js` or `src/data/documentaries.js`:

```bash
node scripts/elevenlabs-tts.mjs --voice HSDKNpbnyYlTuNnu4May --only p1-s2
```

Leave out `--only` to regenerate everything (about 7,300 characters of ElevenLabs credit).
The script reads `ELEVENLABS_API_KEY` from `.env.local` (never commit that file) and
updates `src/data/doc-timings.js` for documentaries. Then run `npm run export:scripts`.
`--list-voices` shows the voices on the account.

**Narration (recorded instead):** save MP3 files in `public/audio/narration/`, named by scene:
`p{part}-s{scene}.mp3`. For example, scene 1.2 is `p1-s2.mp3` and scene 3.1 is
`p3-s1.mp3`. Documentaries use `doc1.mp3` to `doc5.mp3`. The dock shows the
expected file name for any scene still missing audio.

**Documentary videos:** `public/videos/doc1.mp4`–`doc5.mp4` are rendered from the
HyperFrames projects in `motion/doc1`–`doc5` (look and timing rules in `motion/SPEC.md`).
`video` and `captions` in `src/data/documentaries.js` point at them; set `video: null` to
fall back to the animated HTML scene. To change one, edit its `motion/docN` project and
re-render (each takes about 6–7 minutes on a laptop; needs FFmpeg):

```bash
cd motion/doc1
node ../../.claude/skills/hyperframes/scripts/plugin-cli.mjs check
node ../../.claude/skills/hyperframes/scripts/plugin-cli.mjs render --quality looks -o ../../public/videos/doc1.mp4
```

The HyperFrames skills live in `.claude/skills` (copied from github.com/heygen-com/hyperframes).

**Educaplay games:** paste each published link into `url` in
`src/data/games.js`. The QR code is generated from that link. Optional
`embedUrl` adds a "Play here" button. Never put a placeholder link there.

## Project structure

```
claude-interactive-presentation/
├── index.html
├── package.json
├── vite.config.js
├── scripts/check-timing.mjs     timing check (npm run check:timing)
├── public/
│   ├── images/brand/            CloudSwyft logos
│   ├── audio/narration/         narration MP3s (pending)
│   ├── videos/                  optional documentary MP4s
│   └── captions/                optional .vtt caption files
└── src/
    ├── sections/                ← edit slide content here (one file per part + appendix)
    ├── data/
    │   ├── presentation.js      builds the scene list from sections/
    │   ├── documentaries.js     documentary beats, audio, optional video
    │   ├── games.js             Educaplay titles, instructions, URLs
    │   ├── promptLab.js         prompt lab scenarios (6.2)
    │   └── timing.js            30-minute plan
    ├── components/              presentation shell, dock, menu, timer, media players
    ├── layouts/                 one component per scene layout
    ├── media/                   shared audio manager
    ├── hooks/                   audio state, fullscreen, timer
    └── styles/                  brand tokens, chrome, scene styles
```

Slide content lives in `src/sections/` as plain data, so text can be changed
without touching components. This differs from the original proposal
(`sections/*.jsx`): one set of reusable layouts serves all 7 parts, which keeps
each part's file short.

## Changes from the approved plan

- **No animation library.** The plan listed `framer-motion`; plain CSS
  animations covered everything, so it was left out (one dependency fewer).
- `lucide-react` (icons), `qrcode` (QR codes) and `@fontsource` (offline fonts)
  are the only runtime dependencies besides React.
