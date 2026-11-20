// One shared audio element for the whole presentation.
// Guarantees: only one narration plays at a time, missing files never throw,
// and mute/volume survive reloads (stored per browser, best effort).

const PREFS_KEY = 'cip-audio-prefs';

function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY)) || {};
  } catch {
    return {};
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* storage blocked: preferences just won't persist */
  }
}

class AudioManager {
  constructor() {
    const prefs = loadPrefs();
    this.el = typeof Audio !== 'undefined' ? new Audio() : null;
    this.listeners = new Set();
    this.endedListeners = new Set();
    this.wantPlay = false;
    this.state = {
      src: null,
      // idle | loading | ready | playing | paused | ended | missing | blocked
      status: 'idle',
      currentTime: 0,
      duration: 0,
      muted: !!prefs.muted,
      volume: typeof prefs.volume === 'number' ? prefs.volume : 0.9,
      unlocked: false,
    };
    if (!this.el) return;

    const el = this.el;
    el.preload = 'auto';
    el.muted = this.state.muted;
    el.volume = this.state.volume;

    el.addEventListener('canplay', () => {
      if (this.state.status !== 'loading') return;
      this.set({ status: 'ready', duration: el.duration || 0 });
      if (this.wantPlay) this.play();
    });
    el.addEventListener('playing', () => this.set({ status: 'playing' }));
    el.addEventListener('pause', () => {
      if (this.state.status === 'playing') this.set({ status: 'paused' });
    });
    el.addEventListener('timeupdate', () =>
      this.set({ currentTime: el.currentTime, duration: el.duration || this.state.duration })
    );
    el.addEventListener('ended', () => {
      this.set({ status: 'ended' });
      const src = this.state.src;
      this.endedListeners.forEach((fn) => fn(src));
    });
    el.addEventListener('error', () => {
      // Ignore errors from clearing the source.
      if (!this.state.src) return;
      this.wantPlay = false;
      this.set({ status: 'missing' });
    });
  }

  set(patch) {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((fn) => fn());
  }

  subscribe = (fn) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  getState = () => this.state;

  onEnded(fn) {
    this.endedListeners.add(fn);
    return () => this.endedListeners.delete(fn);
  }

  /** Browsers only allow sound after a click; call this from the Start button. */
  unlock() {
    this.set({ unlocked: true });
  }

  load(src, { autoplay = false } = {}) {
    if (!this.el) return;
    this.el.pause();
    this.wantPlay = autoplay && this.state.unlocked;

    if (!src) {
      this.set({ src: null, status: 'idle', currentTime: 0, duration: 0 });
      this.el.removeAttribute('src');
      this.el.load();
      return;
    }

    if (src === this.state.src && this.state.status !== 'missing' && this.state.status !== 'loading') {
      this.el.currentTime = 0;
      this.set({ currentTime: 0, status: 'ready' });
      if (this.wantPlay) this.play();
      return;
    }

    this.set({ src, status: 'loading', currentTime: 0, duration: 0 });
    this.el.src = src;
    this.el.load();
  }

  play() {
    if (!this.el || !this.state.src) return;
    if (this.state.status === 'missing') return;
    this.wantPlay = true;
    if (this.state.status === 'loading') return; // canplay will start it
    const p = this.el.play();
    if (p && p.catch) {
      p.catch((err) => {
        if (err && err.name === 'NotAllowedError') this.set({ status: 'blocked' });
      });
    }
  }

  pause() {
    if (!this.el) return;
    this.wantPlay = false;
    this.el.pause();
  }

  toggle() {
    const { status } = this.state;
    if (status === 'playing') this.pause();
    else if (status === 'ended') this.replay();
    else this.play();
  }

  replay() {
    if (!this.el || !this.state.src || this.state.status === 'missing') return;
    this.el.currentTime = 0;
    this.play();
  }

  seek(seconds) {
    if (!this.el || !this.state.src) return;
    this.el.currentTime = Math.max(0, seconds);
  }

  stop() {
    this.load(null);
  }

  setMuted(muted) {
    if (this.el) this.el.muted = muted;
    this.set({ muted });
    savePrefs({ muted, volume: this.state.volume });
  }

  setVolume(volume) {
    const v = Math.min(1, Math.max(0, volume));
    if (this.el) this.el.volume = v;
    const muted = v === 0 ? true : this.state.muted && v > 0 ? false : this.state.muted;
    if (this.el) this.el.muted = muted;
    this.set({ volume: v, muted });
    savePrefs({ muted, volume: v });
  }
}

export const audio = new AudioManager();
