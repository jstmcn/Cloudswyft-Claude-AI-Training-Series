// Builds the flat scene list the presentation runs on.
// To change content, edit the files in src/sections/ — not this file.
import part1 from '../sections/part1-ai-revolution.js';
import part2 from '../sections/part2-meet-claude.js';
import part3 from '../sections/part3-capabilities.js';
import part4 from '../sections/part4-workflows.js';
import part5 from '../sections/part5-advanced.js';
import part6 from '../sections/part6-prompting.js';
import part7 from '../sections/part7-future.js';
import appendix from '../sections/appendix.js';
import { DOCUMENTARIES } from './documentaries.js';

export const MAIN_PARTS = [part1, part2, part3, part4, part5, part6, part7];
export const PARTS = [...MAIN_PARTS, appendix];

const BASE = import.meta.env.BASE_URL;

// Layouts that carry their own audio or none at all.
const NO_NARRATION = new Set(['game', 'reference']);
// Interactive layouts never auto-advance; the presenter moves on.
const NO_AUTO = new Set(['question', 'tiles', 'tabs', 'beforeafter', 'apptour', 'promptlab', 'game', 'documentary', 'closing', 'reference']);

export const SCENES = PARTS.flatMap((part, partIndex) =>
  part.scenes.map((scene, i) => {
    let audioSrc = null;
    if (scene.layout === 'documentary') {
      audioSrc = `${BASE}audio/narration/${DOCUMENTARIES[scene.docId].audio}`;
    } else if (!NO_NARRATION.has(scene.layout) && scene.narration !== false) {
      // e.g. 1.2 -> audio/narration/p1-s2.mp3
      audioSrc = `${BASE}audio/narration/p${part.id}-s${i + 1}.mp3`;
    }
    const buildCount = scene.build ? (scene.steps || scene.tiles || []).length : 1;
    return {
      ...scene,
      partId: part.id,
      partIndex,
      partTitle: part.title,
      indexInPart: i,
      appendix: !!part.appendix,
      audioSrc,
      audioFile: audioSrc ? audioSrc.slice(BASE.length) : null,
      buildCount,
      autoAdvance: scene.autoAdvance ?? !NO_AUTO.has(scene.layout),
      duration: scene.duration ?? 0,
    };
  })
);

export const MAIN_SCENES = SCENES.filter((s) => !s.appendix);
export const LAST_MAIN_INDEX = MAIN_SCENES.length - 1;
