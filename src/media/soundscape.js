// Background music and interaction sounds, generated live with the Web Audio API.
// Nothing is downloaded or licensed: the music is an original upbeat loop
// synthesized in the browser, and the click sounds are short synthesized tones.
//
// - Music ducks whenever something else is speaking (narration, a documentary voice
//   track, an MP4, or an embedded game): it gets quieter AND softer in tone, so the
//   beat stays in the background instead of competing with the voice.
// - Follows the dock's mute and volume, plus its own Music and Sounds toggles.

const PREFS_KEY = 'cip-sound-prefs';

function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY)) || {};
  } catch {
    return {};
  }
}
function savePrefs(p) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(p));
  } catch {
    /* storage blocked */
  }
}

// ---------------------------------------------------------------------------
// Song settings (edit these to change the feel)
// ---------------------------------------------------------------------------
const BPM = 112; // bouncy, mid-tempo pop
const STEP = 60 / BPM / 4; // one 16th note
const MUSIC_LEVEL = 0.3; // normal music level
const DUCK_LEVEL = 0.06; // level under a voice
const OPEN_TONE = 12000; // brightness when nobody is speaking (Hz)
const DUCK_TONE = 1400; // brightness under a voice (Hz): muffled, out of the way
const SFX_LEVEL = 0.32;
// Under the motion-graphics documentary videos the music is their soundtrack, so it
// stays as a soft bed instead of ducking almost to silence. Used when the only thing
// ducking the music is a playing video.
const VIDEO_BED_LEVEL = 0.12;
const VIDEO_BED_TONE = 5000; // a little softened, still bright enough to feel upbeat

const midi = (n) => 440 * 2 ** ((n - 69) / 12);

// I–V–vi–IV in C major, one bar each: C, G, Am, F
const BARS = [
  { bass: 36, arp: [72, 76, 79, 84], pad: [60, 64, 67] }, // C
  { bass: 43, arp: [71, 74, 79, 83], pad: [59, 62, 67] }, // G
  { bass: 45, arp: [72, 76, 81, 84], pad: [60, 64, 69] }, // Am
  { bass: 41, arp: [72, 77, 81, 84], pad: [60, 65, 69] }, // F
];
// Arpeggio note order on 8th notes (index into bar.arp), plus two 16th pickups.
const ARP = { 0: 0, 2: 1, 4: 2, 6: 3, 8: 2, 10: 1, 12: 0, 14: 1, 15: 2 };
// Bassline: step -> semitones above the root
const BASS = { 0: 0, 3: 0, 6: 12, 8: 0, 10: 7, 14: 12 };
// Hook melody (plays in bars 5–8 of every 8-bar section): [step, midi, lengthSteps]
const HOOK = [
  [[0, 79, 2], [2, 76, 2], [4, 79, 2], [6, 81, 4], [12, 79, 3]],
  [[0, 79, 2], [2, 74, 2], [4, 76, 4], [10, 74, 2], [12, 71, 4]],
  [[0, 76, 2], [2, 79, 2], [4, 81, 2], [6, 84, 4], [12, 81, 3]],
  [[0, 81, 2], [2, 79, 2], [4, 77, 2], [6, 76, 6], [14, 74, 2]],
];

class Soundscape {
  constructor() {
    const p = loadPrefs();
    this.musicOn = p.musicOn ?? true;
    this.sfxOn = p.sfxOn ?? true;
    this.ctx = null;
    this.duckReasons = new Set();
    this.listeners = new Set();
    this.step = 0;
    this.nextStepTime = 0;
    this.timer = null;
    this.volume = 0.9;
    this.muted = false;
  }

  // ---------- state for the UI ----------
  subscribe = (fn) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };
  getState = () => this.snapshot || (this.snapshot = this.makeSnapshot());
  makeSnapshot() {
    return { musicOn: this.musicOn, sfxOn: this.sfxOn, ducked: this.duckReasons.size > 0, running: !!this.ctx };
  }
  emit() {
    this.snapshot = this.makeSnapshot();
    this.listeners.forEach((fn) => fn());
  }

  // ---------- lifecycle (call from a click: browsers require a gesture) ----------
  start() {
    if (this.ctx) {
      this.ctx.resume?.();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return; // very old browser: presentation still works, just silent
    const ctx = new AC();
    this.ctx = ctx;

    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : this.volume;
    this.master.connect(ctx.destination);

    // Music: instruments → mix → tone (lowpass) → compressor → music gain → master
    this.musicGain = ctx.createGain();
    this.musicGain.gain.value = 0;
    this.musicGain.connect(this.master);

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 3;
    comp.attack.value = 0.01;
    comp.release.value = 0.2;
    comp.connect(this.musicGain);

    this.tone = ctx.createBiquadFilter();
    this.tone.type = 'lowpass';
    this.tone.frequency.value = OPEN_TONE;
    this.tone.Q.value = 0.5;
    this.tone.connect(comp);

    this.mix = ctx.createGain();
    this.mix.gain.value = 0.5; // headroom so the instruments never clip before the compressor
    this.mix.connect(this.tone);

    // A light echo for the plucks and melody
    this.echo = ctx.createDelay(1);
    this.echo.delayTime.value = STEP * 3; // dotted-8th echo
    const fb = ctx.createGain();
    fb.gain.value = 0.3;
    const wet = ctx.createGain();
    wet.gain.value = 0.25;
    this.echo.connect(fb);
    fb.connect(this.echo);
    this.echo.connect(wet);
    wet.connect(this.mix);

    // White noise for drums
    const len = ctx.sampleRate;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    // Sound-effects bus
    this.sfxGain = ctx.createGain();
    this.sfxGain.gain.value = SFX_LEVEL;
    this.sfxGain.connect(this.master);

    this.nextStepTime = ctx.currentTime + 0.1;
    this.timer = setInterval(() => this.schedule(), 25);
    this.applyMusicLevel(1.5);
    this.emit();
  }

  schedule() {
    const ctx = this.ctx;
    if (!ctx) return;
    if (!this.musicOn) {
      this.nextStepTime = ctx.currentTime + 0.05;
      return;
    }
    while (this.nextStepTime < ctx.currentTime + 0.15) {
      this.playStep(this.step, this.nextStepTime);
      this.step += 1;
      this.nextStepTime += STEP;
    }
  }

  // ---------- instruments ----------
  env(t, attack, peak, decay, dest) {
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
    g.connect(dest);
    return g;
  }

  osc(type, freq, t, dur, dest, detune = 0) {
    const o = this.ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.detune.value = detune;
    o.connect(dest);
    o.start(t);
    o.stop(t + dur + 0.05);
    return o;
  }

  kick(t) {
    const g = this.env(t, 0.002, 0.9, 0.28, this.mix);
    const o = this.osc('sine', 150, t, 0.3, g);
    o.frequency.exponentialRampToValueAtTime(48, t + 0.18);
  }

  snare(t, vol = 0.35) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1900;
    bp.Q.value = 0.8;
    const g = this.env(t, 0.002, vol, 0.16, this.mix);
    src.connect(bp);
    bp.connect(g);
    src.start(t);
    src.stop(t + 0.2);
    // a little body
    const body = this.env(t, 0.002, vol * 0.5, 0.08, this.mix);
    this.osc('triangle', 220, t, 0.1, body);
  }

  hat(t, vol = 0.1, open = false) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const hp = this.ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 7000;
    const g = this.env(t, 0.001, vol, open ? 0.12 : 0.035, this.mix);
    src.connect(hp);
    hp.connect(g);
    src.start(t, Math.random() * 0.5);
    src.stop(t + 0.15);
  }

  bass(t, note) {
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(900, t);
    lp.frequency.exponentialRampToValueAtTime(220, t + 0.2);
    const g = this.env(t, 0.005, 0.42, 0.22, this.mix);
    lp.connect(g);
    this.osc('sawtooth', midi(note), t, 0.25, lp);
    this.osc('sine', midi(note - 12), t, 0.25, g);
  }

  pluck(t, note, vol = 0.14) {
    // square wave softened by a lowpass, sent dry and into the echo
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(4200, t);
    lp.frequency.exponentialRampToValueAtTime(1200, t + 0.2);
    lp.connect(this.env(t, 0.003, vol, 0.22, this.mix));
    lp.connect(this.env(t, 0.003, vol * 0.6, 0.22, this.echo));
    this.osc('square', midi(note), t, 0.25, lp);
  }

  bell(t, note, lenSteps) {
    const dur = lenSteps * STEP;
    const g = this.env(t, 0.01, 0.16, dur + 0.25, this.mix);
    const e = this.env(t, 0.01, 0.07, dur + 0.25, this.echo);
    for (const dest of [g, e]) {
      this.osc('triangle', midi(note), t, dur + 0.3, dest, 4);
      this.osc('sine', midi(note + 12), t, dur + 0.3, dest, -3);
    }
  }

  pad(t, notes) {
    const dur = 16 * STEP;
    notes.forEach((n) => {
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.035, t + 0.3);
      g.gain.setValueAtTime(0.035, t + dur - 0.2);
      g.gain.linearRampToValueAtTime(0, t + dur + 0.1);
      g.connect(this.mix);
      this.osc('sawtooth', midi(n), t, dur + 0.15, g, -7);
      this.osc('sawtooth', midi(n), t, dur + 0.15, g, 7);
    });
  }

  playStep(stepNo, t) {
    const s = stepNo % 16;
    const barNo = Math.floor(stepNo / 16);
    const bar = BARS[barNo % 4];
    const section = barNo % 8; // 8-bar sections: 0–3 groove, 4–7 groove + hook
    const intro = barNo < 2; // first two bars: lighter, so the music eases in

    if (s === 0) this.pad(t, bar.pad);

    // Drums
    if (!intro) {
      if (s === 0 || s === 8 || (s === 10 && barNo % 2 === 1)) this.kick(t);
      if (s === 4 || s === 12) this.snare(t);
      if (section === 7 && s >= 13) this.snare(t, 0.18); // little fill into the next section
    }
    if (s % 2 === 0) this.hat(t, s % 4 === 2 ? 0.12 : 0.06, s === 14);

    // Bass
    if (!intro && BASS[s] !== undefined) this.bass(t, bar.bass + BASS[s]);

    // Arpeggio
    if (ARP[s] !== undefined) this.pluck(t, bar.arp[ARP[s]], s % 4 === 0 ? 0.13 : 0.1);

    // Hook melody in the second half of each 8-bar section
    if (section >= 4 && !intro) {
      for (const [step, note, lenSteps] of HOOK[section - 4]) if (step === s) this.bell(t, note, lenSteps);
    }
  }

  // ---------- music level, ducking, toggles ----------
  applyMusicLevel(rampSecs = 0.35) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const ducked = this.duckReasons.size > 0;
    const videoBed = ducked && this.duckReasons.size === 1 && this.duckReasons.has('video');
    const level = videoBed ? VIDEO_BED_LEVEL : ducked ? DUCK_LEVEL : MUSIC_LEVEL;
    const target = !this.musicOn ? 0 : level;
    const g = this.musicGain.gain;
    g.cancelScheduledValues(now);
    g.setTargetAtTime(target, now, rampSecs / 3);
    const f = this.tone.frequency;
    f.cancelScheduledValues(now);
    f.setTargetAtTime(videoBed ? VIDEO_BED_TONE : ducked ? DUCK_TONE : OPEN_TONE, now, rampSecs / 3);
  }

  /** duck('narration', true) while a voice plays; several reasons can overlap. */
  duck(reason, on) {
    const had = this.duckReasons.has(reason);
    if (on === had) return;
    if (on) this.duckReasons.add(reason);
    else this.duckReasons.delete(reason);
    this.applyMusicLevel(on ? 0.3 : 1.2);
    this.emit();
  }

  setMusicOn(on) {
    this.musicOn = on;
    savePrefs({ musicOn: this.musicOn, sfxOn: this.sfxOn });
    this.applyMusicLevel(on ? 1 : 0.4);
    this.emit();
  }

  setSfxOn(on) {
    this.sfxOn = on;
    savePrefs({ musicOn: this.musicOn, sfxOn: this.sfxOn });
    this.emit();
  }

  /** Follows the dock's mute + volume (shared with narration). */
  setOutput({ muted, volume }) {
    this.muted = muted;
    this.volume = volume;
    if (this.ctx) this.master.gain.setTargetAtTime(muted ? 0 : volume, this.ctx.currentTime, 0.05);
  }

  // ---------- interaction sounds ----------
  /** kinds: tap, select, count, reveal, launch, off */
  sfx(kind = 'tap') {
    if (!this.ctx || !this.sfxOn || this.muted) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + 0.005;
    const tone = (freq, start, dur, { type = 'sine', vol = 0.5, to = null } = {}) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, start);
      if (to) o.frequency.exponentialRampToValueAtTime(to, start + dur);
      g.gain.setValueAtTime(0, start);
      g.gain.linearRampToValueAtTime(vol, start + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
      o.connect(g);
      g.connect(this.sfxGain);
      o.start(start);
      o.stop(start + dur + 0.02);
    };
    switch (kind) {
      case 'select': // tile, tab, toggle: two soft rising notes
        tone(660, t, 0.09, { vol: 0.35 });
        tone(990, t + 0.06, 0.14, { vol: 0.3 });
        break;
      case 'count': // audience vote: short pluck
        tone(523.25, t, 0.12, { type: 'triangle', vol: 0.45, to: 784 });
        break;
      case 'reveal': // hotspot / detail: gentle chime
        tone(1046.5, t, 0.45, { vol: 0.22 });
        tone(1568, t + 0.04, 0.5, { vol: 0.14 });
        break;
      case 'launch': // game launch / start: quick arpeggio
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.06, 0.22, { vol: 0.28 }));
        break;
      case 'off': // closing / turning something off: falling note
        tone(784, t, 0.14, { vol: 0.3, to: 523 });
        break;
      default: // tap: small, quiet click
        tone(880, t, 0.06, { vol: 0.25, to: 620 });
    }
  }
}

export const soundscape = new Soundscape();

// Development-only hook for automated checks (not included in the production build).
if (import.meta.env?.DEV) window.__soundscape = soundscape;

/** Picks a sound for a clicked element (used by the presentation's click listener). */
export function soundFor(el) {
  if (el.closest('.opt')) return 'count';
  if (el.closest('.spot, .tile, .detail .mini-btn, .backup .mini-btn')) return 'reveal';
  if (el.closest('.game-actions .btn.primary, .start .btn, .doc-big-play')) return 'launch';
  if (el.closest('.tab, .lab-toggle, .pill, .menu-item, .ba-layer')) return 'select';
  if (el.closest('[aria-pressed="true"]')) return 'off'; // toggle being switched off
  return 'tap';
}
