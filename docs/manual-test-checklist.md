# Manual test checklist

These checks need a person, a real browser window or a Teams call, so they weren't
automated. Do them at least a day before the session, on the computer that will present.
Tick each box and note anything odd.

Setup: `npm run build`, then `npm run preview`, and open http://localhost:4173
(or the hosted link). Use **Chrome**, then repeat the first section in **Edge**.

## 1. Browser (Chrome, then Edge)

- [ ] Start screen appears; **Start in fullscreen** fills the screen.
- [ ] **F** leaves and re-enters fullscreen.
- [ ] **→ / ←** move through Part 1; the progress line fills.
- [ ] **N** opens the presenter-notes popup. If the browser blocks it, allow popups for the site and press N again.
- [ ] In the popup, **Next** moves the main window.
- [ ] **S** opens the section menu; clicking R3 opens the pricing slide.
- [ ] **T** shows the timer; it counts up.
- [ ] Slide 1.3: press **P**. The documentary plays (silent preview until narration is recorded) with captions; **C** hides them.
- [ ] Slide 1.5: **Copy link** says "Link copied"; paste it into a chat to confirm.
- [ ] Slide 1.5: **Launch game** opens AI Myth or Fact in a new tab.
- [ ] Slide 1.5: **Play here** shows the game inside the slide; **Close game** returns.

## 2. Phones (games)

- [ ] Scan each game QR code (slides 1.5–5.5, plus 6.4 and 7.5 once published) with a phone camera; the right game opens.
- [ ] Play one game to the end on a phone, signed out of Educaplay.

## 3. Reduced motion (optional)

- [ ] Windows: Settings → Accessibility → Visual effects → **Animation effects off**.
- [ ] Reload the presentation: slides change with a plain fade; nothing slides or pops in.
- [ ] Turn animation effects back on afterwards.

## 4. Microsoft Teams (with a second person)

- [ ] Start a Teams call with a colleague on another computer.
- [ ] **Share → Window**, choose the presentation window, turn on **Include sound**.
- [ ] Colleague confirms: slide text is sharp enough to read, including the small source lines (e.g. slide 3.1 footnote).
- [ ] Colleague confirms they hear narration (once recorded) and documentary audio, with no echo.
- [ ] The notes popup is **not** visible to the colleague.
- [ ] The dock disappears after 3 seconds without mouse movement.
- [ ] Post a game link in the Teams chat; colleague joins and plays.

## 5. Full rehearsal

- [ ] Run the whole session with the timer (T) from 1.1 to 7.6.
- [ ] Note the actual time per part against [timing-plan.md](timing-plan.md).
- [ ] If over 30:00, decide what to shorten (see the presenter guide).

Record results in [qa-report.md](qa-report.md).
