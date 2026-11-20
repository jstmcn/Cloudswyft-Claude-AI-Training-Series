import { audio } from './audioManager.js';

/**
 * Routes play/pause/replay to whatever is on screen:
 * the documentary player listens for `deck:media`; other scenes use the narration track.
 */
export function mediaCommand(scene, cmd) {
  if (scene.layout === 'documentary') {
    window.dispatchEvent(new CustomEvent('deck:media', { detail: cmd }));
  } else if (cmd === 'toggle') audio.toggle();
  else if (cmd === 'replay') audio.replay();
}
