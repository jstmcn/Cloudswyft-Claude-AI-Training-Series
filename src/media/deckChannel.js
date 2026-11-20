// Links the presentation window and the presenter-notes window (same browser).
// Messages: { type: 'scene', id, step } from the deck; { type: 'cmd', cmd, id? } and
// { type: 'hello' } from the notes window.
const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('cip-deck') : null;

export function post(msg) {
  try {
    channel?.postMessage(msg);
  } catch {
    /* ignore */
  }
}

export function listen(fn) {
  if (!channel) return () => {};
  const handler = (e) => fn(e.data);
  channel.addEventListener('message', handler);
  return () => channel.removeEventListener('message', handler);
}

export const channelSupported = !!channel;
