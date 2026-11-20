# Handoff: Claude AI interactive presentation (CloudSwyft)

Paste this into a new chat, or say: "Read docs/HANDOFF.md in
Documents\claude-presentation\claude-interactive-presentation and continue."

## What it is
30-minute interactive HTML presentation "Claude AI: Beyond Conversational AI" for a
CloudSwyft Claude AI Training Series session on Microsoft Teams. 7 parts, 5 animated
documentaries, 7 Educaplay games, reference appendix R1–R7.

- Blueprint: Google Doc 1LeqdZoTuwGT30A8KE-5tXP_O0mlyDiHNJQSpaXH_Slo (read via /mobilebasic after Google sign-in)
- Content source: Canva deck DAHbJvdxPwM / PDF "Claude AI CloudSwyft.pptx.pdf" in Downloads
- Project: `C:\Users\Kyla Manzanero\OneDrive\Documents\claude-presentation\claude-interactive-presentation`
- Stack: Vite + React, no backend. Node.js LTS v26 installed (PowerShell: refresh PATH from Machine+User env each call).
- Run: `npm run dev` (http://localhost:5173) · `npm run build` · `npm run preview` (http://localhost:4173)
- Checks: `npm run check:timing` (must be 30:00) · `npm run export:scripts` (regenerates docs + captions)

## Approved decisions (don't revisit)
- CloudSwyft light branding: white/ice backgrounds, navy for text only, sky #1AA6EC, blue #0E7BB5, Claude coral #D97757 only for the word "Claude"; Poppins Bold + Open Sans.
- Not text-heavy: 1 idea per scene, headline ≤ 8 words, ≤ 4 items of 1–3 words; detail goes in narration, click-reveals, appendix.
- Untimed Reference appendix R1–R7 holds the dense Canva content.
- Documentaries are animated HTML scenes (MP4 swappable later).
- Phased, approval-gated work: ask before major changes.

## Status
| Area | State |
|---|---|
| All scenes, navigation, presenter dock, keyboard (→ ← S P R M C T F N B), section menu, timer, notes popup (N) | Done, tested |
| Narration | Done: 28 ElevenLabs MP3s (23 scenes + 5 docs), voice "Teacher Rachel (Kyla)" id `HSDKNpbnyYlTuNnu4May`. Key in `.env.local` (git-ignored). Regenerate: `node scripts/elevenlabs-tts.mjs --voice HSDKNpbnyYlTuNnu4May [--only p1-s2]` |
| Documentary captions | Synced to real audio via `src/data/doc-timings.js` |
| Documentaries as motion graphics | Style "Words That Move" (motion/STORYLINES.md B, spec in motion/SPEC.md). HyperFrames projects motion/doc1–doc5 → public/videos/docN.mp4, wired in documentaries.js (`video: null` = HTML fallback). CLI: `node .claude/skills/hyperframes/scripts/plugin-cli.mjs <cmd>` from a motion/docN folder; FFmpeg installed via winget; HeyGen signed in (Free). No in-video music (heygen CLI has no Windows build); the presentation's music plays under videos at `VIDEO_BED_LEVEL` |
| Background music + click sounds | Done in `src/media/soundscape.js` (Web Audio, no files). Upbeat 112 BPM loop; ducks quieter + muffled under any voice. Levels measured; **not yet listened to by the user** |
| Educaplay games 1–7 | Published and linked in `src/data/games.js` (ids 31590590, 31590610, 31590625, 31590640, 31590653, 31591651, 31595965). Game 7 is Froggy Jumps |
| Automated QA (43 scenes: off-slide, clipped, <22px text, accessible names, 4:3) | Passed (docs/qa-report.md) |

## Remaining work
1. ~~Game 7~~ done 2026-11-19. ~~README + qa-report music update~~ done.
2. User listens to music/click sounds; tune `MUSIC_LEVEL`, `DUCK_LEVEL`, `SFX_LEVEL`, `BPM` if needed.
3. Update README + qa-report for the upbeat music (levels: no clipping, mix peak 0.58; master open RMS ~0.015, ducked ~0.004).
4. Manual checks in docs/manual-test-checklist.md (Edge, real fullscreen, notes popup, phones/QR, Teams share with sound, timed rehearsal).
5. Phase 8 final delivery: zip the project (exclude node_modules, dist, .env.local), final summary.

## Gotchas
- PowerShell 5.1 `Set-Content -Encoding utf8` adds a BOM that breaks Vite reading package.json; write with `UTF8Encoding($false)`.
- Never put placeholder links in games.js (only https://…educaplay.com is accepted).
- The ElevenLabs keys page is Developers → API Keys; the full key is shown only at creation.
