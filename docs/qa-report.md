# QA report

## Documentaries as motion graphics (Nov 20, 2026)

The five documentaries were rebuilt as motion-graphics videos with HyperFrames
("Words That Move": kinetic type on flat CloudSwyft colour fields, `motion/SPEC.md`).
Each reuses its ElevenLabs voice clip, keeps its caption file, and runs 34–35 s inside
the 40 s slot (the title card holds). Music: HeyGen's catalog needs the `heygen` CLI,
which has no Windows build, so the presentation's own music plays under each video as
a soft bed (`VIDEO_BED_LEVEL` 0.12) instead of ducking to near silence.

| Check | How | Result |
|---|---|---|
| HyperFrames check (lint, runtime, layout, motion, contrast, craft, audio) | `check --json` per project | 0 errors on all five. Remaining warnings: docs 2–5 are single-file compositions (lint suggests sub-compositions) and repeated reel tweens; frames confirmed correct by snapshot |
| Every shot looks right | Snapshots at each spoken beat, read by eye | Fixed: overlaps (badge on MESSAGES, DECK vs chart, RESULTS under later shots, 1 SUMMARY gap, folder vs PROJECT), a 4 s dead stretch in doc 3 |
| Contrast | Contrast audit | Accent words on white use blue #0E7BB5 (sky on white was 2.6:1) |
| Doc 1 render | ffprobe + `audio --json` + decoded frames | 35.0 s, 1920×1080, 30 fps, H.264 + AAC, −16.7 LUFS, true peak −3.4 dB, no clipping |
| Docs 2–5 renders | Same checks | 34.0 s each, 1920×1080 H.264 + AAC; −16.4 / −15.5 / −16.1 / −15.2 LUFS; true peak −1.0 to −1.4 dB; no clipping; frames match the snapshots |
| On their slides (1.3, 3.4, 4.4, 5.4, 7.4) | Dev server, P key, read the `<video>` state | Each plays its own file, 4 caption cues showing, no console errors |

Not checked by ear: the mix of each video's voice and effects with the music bed over Teams.

## Background music and click sounds (Nov 19, 2026)

Generated with the Web Audio API (`src/media/soundscape.js`); no audio files or licences.
Measured in the dev server with an analyser on the music and sound-effect buses.

### Upbeat music (replaces the first ambient loop)

The music was changed from a slow ambient loop to an upbeat pop loop: 112 BPM, C–G–Am–F,
arpeggio, bassline and a hook melody. Under a voice it now gets quieter **and** muffled
(low-pass 12000 Hz → 1400 Hz). Levels: `MUSIC_LEVEL` 0.3, `DUCK_LEVEL` 0.06, `SFX_LEVEL` 0.32.

| Check | Result |
|---|---|
| No clipping | Mix peak 0.58 (below 1.0) |
| Level with nobody speaking | Master RMS ≈ 0.015 |
| Level under a voice | Master RMS ≈ 0.004, muffled |

The table below is from the first (ambient) version; the ducking, toggle and mute paths
did not change.

| Check | Result |
|---|---|
| Music starts after the Start click | AudioContext running; music signal present (RMS ≈ 0.025) |
| Ducks under narration | Music gain 0.16 → 0.035 while voice plays (signal ≈ 0.006); back to 0.16 when voice pauses |
| Click sound on an interactive tile | Sound-effect bus peaked at RMS ≈ 0.038 |
| Click sounds toggle off | No sound-effect signal on the next click |
| B key | Music gain to 0, then back on |
| M key | Master output 0 when muted, 0.9 when unmuted (music and clicks follow mute) |
| Console | No errors |

Not checked by ear: how the upbeat music and click sounds actually sound, and their balance
with the voice over Teams. Listen once and adjust `MUSIC_LEVEL`, `DUCK_LEVEL`, `DUCK_TONE`,
`SFX_LEVEL` or `BPM` if needed.

## Narration — ElevenLabs AI voiceover (Nov 19, 2026)

Generated with `scripts/elevenlabs-tts.mjs`, voice **Teacher Rachel (Kyla)** from the
user's ElevenLabs account, model `eleven_multilingual_v2`, MP3 44.1 kHz 128 kbps.
28 files: 23 scene clips + 5 documentaries (about 7,300 characters, plus ~400 for two
voice samples). Earlier notes said "31 files"; the correct count is 28.

| Check | How | Result |
|---|---|---|
| Every clip fits its scene | Lengths reported by ElevenLabs vs. planned durations | All fit (longest: 5.1 at 53.6 s of 2:00) |
| All 23 narrated scenes play | Visited each scene in the dev server | Dock shows "Voice playing" on all 23 |
| Documentary sync | Played 1.3 for 8 s | Second line on screen and in captions at 0:08, matching the voice (line starts at 6.4 s) |
| Caption files | `npm run export:scripts` | `doc1-5.vtt` rebuilt from the real timings |

Not checked: listening through every clip for mispronunciations. "CloudSwyft" is sent as
"CloudSwift" so it's pronounced correctly; please listen to the full set once.

## Phase 7 — Testing (Nov 19, 2026)

Tested the **production build** (`npm run build` + `npm run preview`) in the Claude
desktop app's built-in browser (Chromium).

### Passed (actually executed)

| Check | How | Result |
|---|---|---|
| Production build loads | Opened http://localhost:4173 | Loads; stage renders at 1920×1080 |
| All 43 scenes: nothing off the slide | Script walked every scene at 1920×1080 and measured every element | No elements outside the 16:9 stage |
| Text size ≥ 22px on slides | Same script, computed font sizes | All slide text ≥ 22px (after fix below) |
| No clipped text | Same script, scroll vs. visible width | None (screen-reader-only labels excluded) |
| Footnotes clear of progress bar | Same script, rectangle overlap | Clear (after fix below) |
| Every control has an accessible name | Same script: buttons, links, inputs, sliders, tabs | All named, including the presenter dock |
| 4:3 window (1024×768) | Resized, opened 3.1 | Slide letterboxed, nothing cropped, no scrollbars |
| Reduced-motion rule present | Searched built CSS | `prefers-reduced-motion` rule included |
| Console | After full walk | No errors |

### Fixed during testing

- Footnotes sat 10px inside the progress bar's click area on every scene with a footnote; moved up.
- Documentary "Voice pending · silent preview" label was 20px; raised to 22px.

### Not tested here (needs a person, a real window or a Teams call)

See [manual-test-checklist.md](manual-test-checklist.md): Edge, real fullscreen,
the notes popup (N), reduced motion with the OS setting on, phone QR scans, Teams
screen share with sound, and a timed full rehearsal.

## Phase 6 — Educaplay integration (Nov 19, 2026)

**Status: all 7 games published and linked.** Built on the user's Educaplay account
(Basic plan) through the browser. Educaplay's Basic plan allows one new game per hour
after the first few, so games 6 and 7 were created later the same day.

| Game | Educaplay type | Content checked against games.js | Public page | Embed |
|---|---|---|---|---|
| 1 · AI Myth or Fact | Quiz | Yes: 4 questions, answers, explanations | 200 OK, signed out | 200 OK; plays in "Play here" |
| 2 · Claude Quick Quiz | Quiz | Yes | 200 OK, signed out | 200 OK |
| 3 · Match the Capability | Matching Pairs | Yes: 5 pairs | 200 OK, signed out | 200 OK |
| 4 · Solve the Workplace Challenge | Quiz | Yes | 200 OK, signed out | 200 OK |
| 5 · Guess the Claude Tool | Quiz | Yes | 200 OK, signed out | 200 OK |
| 6 · Prompt Master Challenge | Quiz | Yes: entered by hand (Ray's 5-conversation limit reached); Q1 has 2 answers | 200 OK, signed out | 200 OK; slide 6.4 shows Launch, QR, Play here |
| 7 · Ultimate Claude Challenge | Froggy Jumps (id 31595965) | Yes: entered by hand, 5 questions × 3 answers, correct answer and explanation on each | 200 OK, signed out | 200 OK; slide 7.5 shows Launch, Copy link, QR, Play here; embed opens to the Start screen |

Settings used on each: English, public, "Show the correct answer after a mistake" on,
per-question time limit off (the presenter keeps the 60 seconds). Game 7 also has
lives off (so nobody is knocked out early) and random question order on. Answer order
inside Educaplay may differ from games.js; the correct answers match.

In the presentation, every game slide (1.5–7.5) shows Launch, Copy link, QR code and
Play here. The free plan shows an ad banner inside embedded games. Game 7 was not
played through as a participant.

Content was entered with Educaplay's built-in assistant (Ray) from the approved text,
then every question, answer and explanation was read back from the editor and compared
before publishing. Ray added some Spanish labels (tags); these were removed or replaced.

### Passed (actually executed)

| Check | How it was tested | Result |
|---|---|---|
| Link validator | Node check of 7 sample links | Accepts only `https://…educaplay.com`; rejects `http://`, look-alike domains, other sites, empty |
| Non-Educaplay link on a slide | Temporary `https://example.com/…` on Game 2 | Ignored: Launch/Copy/QR stay off, warning shown (test link removed) |
| Backup question | Game 2 slide: "No internet? Backup question" → "Show answer" | Question then answer shown |
| Answer indexes | `npm run export:scripts` | Every answer points at a real option |
| Game content doc | Same command | `docs/game-content.md` written with all 7 games |
| Build / console | `npm run build`; browser console | No errors |

### Not tested yet

- Scanning the real QR codes with a phone, and live multiplayer with several players.
- Joining a game as a participant on a phone and a laptop.
- Answer key in the notes window (code path added; not opened in this pass).

## Phase 5 — Content and media integration (Nov 19, 2026)

Tested in the built-in browser (Chromium) at 1280×720 against the dev server.

### Passed (actually executed)

| Check | How it was tested | Result |
|---|---|---|
| Script length | `npm run export:scripts` | All 26 narrated scenes and 5 documentaries fit their planned time at 140 wpm |
| Generated docs | Same command | `docs/narration-scripts.md`, `docs/timing-plan.md`, `public/captions/doc1-5.vtt` written |
| Timing | `npm run check:timing` | 30:00 |
| Build | `npm run build` | No errors |
| Reference slides R1–R7 | Opened each (R1–R4, R6, R7 by screenshot) | Render with deck content and source lines |
| Presenter notes window | Opened `?notes` in a second tab, moved main deck | Notes followed the scene (script, cues, next scene) |
| Notes → deck control | Clicked Next in the notes window | Main deck moved 4.1 → 4.2 |
| Documentary captions | Played 3.4 (silent preview) | Caption text from the script shown |
| Console | After the run | No errors |

### Fixed during testing

- Reference slides R2/R4/R6/R7 laid out wrongly (a container class clashed with an inner class name).
- Long reference footnotes overlapped the "Reference · not timed" label.

### Not tested yet

- R5 by screenshot (same table layout as R1/R3, which were checked).
- The `N` key popup itself: the built-in browser opened the notes page in a tab instead; check the popup in Chrome/Edge (allow popups).
- Copy-prompt buttons on R6.
- Everything still listed under Phase 4 "Not tested yet".

## Phase 4 — Core development (Nov 19, 2026)

Tested in the Claude desktop app's built-in browser (Chromium) at 1280×720,
against the Vite dev server. Not yet tested in a real Teams screen share.

### Passed (actually executed)

| Check | How it was tested | Result |
|---|---|---|
| Production build | `npm run build` | Builds with no errors |
| 30-minute timing | `npm run check:timing` | All 7 parts match targets; total 30:00 |
| Start screen | Clicked "Start in window" | Opens scene 1.1, audio unlocked |
| Next / previous | → key, dock buttons, game Continue button | Moves scenes; build steps reveal one at a time (2.1, 6.1) |
| Deep links | Loading `#3.2`, `#5.2`, etc. | Opens that scene |
| Section menu | S key | Opens, lists all parts + Reference, current scene highlighted |
| Presenter timer | T key | Session clock, scene clock and plan delta update |
| Narration autoplay | Temporary 2 s test tone as `p2-s2.mp3` | Plays on scene entry |
| Pause / resume | P key | Status "Voice paused" → "Voice playing" |
| Mute | M key | Toggles; dock button reflects state |
| Narration end | Waited for test tone | Status "Voice finished" |
| Auto-advance | Enabled in dock, test tone on 2.1 | Moved to 2.2 after narration ended |
| Missing audio | Every scene without a file | Shows "Voice pending · p1-s1.mp3", no errors |
| Narration stops on games | Moved 2.2 (playing) → 2.5 | Status "Game: narration off" |
| Documentary, no audio | 1.3, P key, seek on track | Silent preview runs, beats change, seek works |
| Documentary, with audio | Temporary test tone as `doc1.mp3` | Audio clock drives it; "Finished" flag at end |
| Game, pending | 1.5 with `url: null` | Launch/Copy disabled, "Pending publication" shown |
| Game, with URL | Temporary `https://example.com/qa-test-only` | QR rendered, Copy link worked, link field shown (test URL removed afterwards) |
| Interactive scenes | 1.2 votes, 2.3 hotspots, 3.1 tiles, 3.2 tabs, 4.1 drag divider, 6.2 toggles | All respond |
| Console | Read browser console after the run | No errors |

All temporary test files and the test URL were removed after testing.

### Fixed during testing

- Highlighted tile was unreadable while hovered (hover style overrode the selected style).
- Hub diagram (5.2) icons rendered oversized (a CSS rule hit every icon, not just the diagram lines).
- Code demo (3.2) turned `=>` into an arrow glyph and overflowed; ligatures off, smaller size.
- "Illustrative example" label collided with the progress bar and with the prompt lab's scenario buttons.
- App tour (2.3) hotspot numbers covered the labels; positions re-measured.
- Title slide left "AI" alone on its own line.

### Not tested yet

- Real Microsoft Teams screen share (audio sharing, compression of small text).
- Fullscreen (F): the built-in browser pane can't enter fullscreen; needs a check in Chrome/Edge.
- Edge, Firefox, Safari.
- Reduced-motion setting.
- A full 30-minute rehearsal with real narration.
- Real narration files, documentary narration and captions (Phase 5).
- Real Educaplay links and embeds (Phase 6).
