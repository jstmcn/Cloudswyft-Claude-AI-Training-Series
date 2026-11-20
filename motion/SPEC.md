# SPEC: Words That Move (documentaries 1–5)

GOAL:    the room leans in: each documentary hits like a 35-second trailer, and the viewer
         leaves with its one line (doc 1: "the AI revolution is a work revolution").
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps, MP4 (H.264 + AAC), one project per film in motion/docN.
TIME:    ~34–36 s each = ~1020–1080 frames. Voice (existing ElevenLabs docN.mp3, ~24 s) is the clock:
         every word lands on the frame its word is spoken (line starts from doc-timings.js,
         words inside a line placed by measured pauses + character share). After the voice:
         payoff hold + end card, ~10 s. The slide's 40 s slot holds the last frame.

LOOK:    medium = poster type on flat colour fields, cut like a title sequence.
         Fields (full-bleed, flat, no gradients): white #FFFFFF, ice #EAF6FD, sky #1AA6EC, blue #0E7BB5.
         Ink: navy #0B1E46 on white / ice / sky; white on blue only. Navy is never a field.
         Accent: coral #D97757 only on the word "Claude"; blue #0E7BB5 as ink on one hero word per shot
         on white (sky on white is only 2.6:1, too faint over a Teams share).
         Display: Poppins 700, hero words 180–340 px (fill 60–90% of the width), tracking -3%,
         line-height 0.9, upper case for hero words. Quiet lines: Poppins 600 44–56 px.
         Body/labels: Open Sans 600 32 px. Nothing readable under 28 px.
         Objects drawn as thick-line flat icons (navy stroke 14 px, round caps) at 30–45% of frame
         height, only when a word becomes the thing it names.
         Light and depth: none. No shadows, grain 0, vignette 0.
         Caption band: y 880–1080 kept clear of type (the slide player draws captions there).

OBJECTS: a notification badge (sky circle, white number), a search bar (rounded rect + magnifier),
         a chat bubble (rounded rect + tail), a page with ruled lines, a spreadsheet grid,
         a slide frame with a bar chart, a check mark, a clock face (doc 2), a person-check (doc 2/3),
         the CloudSwyft logo (real file, end card only).

MOTION:  arrive: expo.out 0.35–0.5 s; hard hits: tl.set (0 ms) on the spoken word;
         word swap: slot-machine roll 0.1 s per option, power3.out on the last;
         colour flood: field wipes across in 0.4 s power2.inOut (direction alternates);
         exits: 0.18 s blur 0 → 10 px + opacity → 0, or cut on the next hit.
         Pops (badges, check marks): elastic.out(1, 0.55) on scale only, 0.45 s.
         Stagger: letters 1 frame, words 0.07 s. Landed words are dead still.
         Something new every 1–3 s while the voice runs; the end card holds ≥ 3 s.

SHOTS (doc 1 · The Future of Work):
  S1  0.0–6.4   OVERLOAD (white). MESSAGES, FILES, NOTIFICATIONS slam in on their words,
                each followed by badge pops (1, 3, 12, 48, 99+) that multiply until words
                tile the frame at 4.4 s; 5.9 s everything snaps to one sky badge → it is the next field.
  S2  6.4–14.8  EVOLUTION (ice → sky → blue). One slot word in a drawn container:
                SEARCH in a search bar with 3 link lines (7.3) → rolls to CHAT in a bubble (9.6)
                → rolls to ASSISTANT (11.2) on blue, then "finishes the work" ✓ (12.2).
  S3  14.8–21.0 RESULTS (white, then hard cuts). INFORMATION (14.9) shatters into letters that
                re-form as RESULTS (16.0); then one object per hit, full frame:
                REPORT page (16.7) · SPREADSHEET grid (17.6) · DECK slide (18.4), fields alternate.
  S4  21.0–24.7 THE LINE (white). AI REVOLUTION lands (21.9); "AI" rolls to WORK (23.6) in sky.
  S5  24.7–35.0 END (sky flood 25.2). Title "The Future of Work", quiet line
                "Part 1 · The AI Revolution", CloudSwyft logo carried in (26.0), hold to 35.

SOUND:   the voice at 1.0; one pop per badge/check landing (3–6 dB over the bed), one whoosh per
         colour flood (rotate 2 takes). No music inside the MP4: the HeyGen catalog needs the
         heygen CLI, which has no Windows build. The presentation's own upbeat music plays under
         every video as a soft bed (soundscape.js VIDEO_BED_LEVEL 0.12, tone 5000 Hz).
         Nothing clips; mix −16 to −14 LUFS.

BANNED:  dark or navy grounds; glow, particles, gradients, glass; everything centred and fading up;
         three cards in a row; text moving while read; logo docked in a corner; bullet lists;
         the voice's sentence printed word for word; coral on anything but "Claude";
         breathing/floating loops on landed type.

QA:      frame 0 is a full white poster with a word on it (never blank);
         2.0 s words + badges, 4.6 s frame tiled, 8.0 s SEARCH bar, 10.2 s CHAT bubble,
         12.5 s ASSISTANT + ✓ on blue, 15.5 s letters mid-reform, 17.0 / 17.9 / 18.7 s each object
         full frame, 24.0 s WORK REVOLUTION, 30 s end card; nothing in y 880–1080 except the logo line
         on the end card; check --json has 0 errors; ffprobe duration = root data-duration.
