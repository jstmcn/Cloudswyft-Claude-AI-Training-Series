// Five 40-second documentary scenes. Each plays a motion-graphics MP4 (`video`, made with
// HyperFrames in motion/docN, voice baked in, captions from public/captions). The beats
// below are the animated HTML fallback, used when `video` is null.
// Each beat starts at `t` seconds. `text` is the on-screen line; `caption` is the
// narration for that beat, shown as captions and recorded as docN.mp3.
// Beat start times are estimates; adjust `t` after recording so captions match the voice.
// To swap in a real MP4 later, set `video` (and `captions` for a .vtt file).
// When narration is generated, doc-timings.js replaces the estimated `t` values below
// with the real start time of each spoken line.
import TIMINGS from './doc-timings.js';

const BASE_DOCUMENTARIES = {
  1: {
    title: 'The Future of Work',
    audio: 'doc1.mp3',
    duration: 40,
    // Motion-graphics version (HyperFrames project in motion/doc1). Set to null to
    // fall back to the animated HTML scene below.
    video: 'doc1.mp4',
    captions: 'doc1.vtt',
    beats: [
      { t: 0, icons: ['bell', 'mail', 'messages', 'file'], text: 'Too much to read.', caption: 'Every day, the messages, files and notifications keep coming.' },
      { t: 12, icons: ['search', 'chat', 'sparkles'], text: 'Search. Chat. Assistant.', caption: 'We went from search engines that list links, to chat that gives answers, to assistants that help finish the work.' },
      { t: 24, icons: ['fileCheck', 'table', 'slides'], text: 'From noise to finished work.', caption: 'Information becomes results: a report, a spreadsheet, a deck.' },
      { t: 34, icons: ['sparkles'], text: 'The AI Revolution', title: true, caption: 'This is the AI revolution. And it is a work revolution.' },
    ],
  },
  2: {
    title: 'A Day With Claude',
    audio: 'doc2.mp3',
    duration: 40,
    video: 'doc2.mp4', // motion graphic (motion/doc2); null = animated HTML fallback
    captions: 'doc2.vtt',
    beats: [
      { t: 0, icons: ['search'], time: '9:00', text: 'Research brief', caption: 'Nine a.m. A research brief, with every source cited.' },
      { t: 10, icons: ['fileSearch'], time: '11:00', text: 'Policy summary', caption: 'Eleven. A forty-page policy, summarized for new hires.' },
      { t: 20, icons: ['code'], time: '14:00', text: 'Bug fixed', caption: 'Two p.m. A failing login function, found and fixed.' },
      { t: 30, icons: ['chart', 'userCheck'], time: '16:00', text: 'Chart, checked', caption: 'Four. An enrollment chart, built by Claude, checked by a person before it goes out.' },
    ],
  },
  3: {
    title: 'Productivity Transformation',
    audio: 'doc3.mp3',
    duration: 40,
    video: 'doc3.mp4', // motion graphic (motion/doc3); null = animated HTML fallback
    captions: 'doc3.vtt',
    beats: [
      { t: 0, icons: ['user', 'sparkles'], text: 'Same task. Two ways.', caption: 'Same task. Two ways.' },
      { t: 12, icons: ['list', 'sparkles'], text: 'Manual steps vs. Claude', caption: 'One way means open tabs, copying and formatting by hand. The other starts with one clear prompt.' },
      { t: 26, icons: ['userCheck'], text: 'Both meet at review', caption: 'Both paths end in the same place: a person reviewing the result.' },
      { t: 36, icons: ['shield'], text: 'You stay in the loop.', title: true, caption: 'You stay in the loop.' },
    ],
  },
  4: {
    title: 'From Idea to Working Project',
    audio: 'doc4.mp3',
    duration: 40,
    video: 'doc4.mp4', // motion graphic (motion/doc4); null = animated HTML fallback
    captions: 'doc4.vtt',
    beats: [
      { t: 0, icons: ['lightbulb'], text: 'An idea', caption: 'It starts with an idea: a landing page for a webinar.' },
      { t: 8, icons: ['folder'], text: 'A Project gathers files', caption: 'A Project gathers the brief, the brand files and the instructions.' },
      { t: 18, icons: ['layout'], text: 'An Artifact prototype', caption: 'An Artifact turns it into a prototype you can see, and revise just by asking.' },
      { t: 30, icons: ['code', 'rocket'], text: 'Claude Code ships it', caption: 'Claude Code turns the prototype into real project files, ready to share.' },
    ],
  },
  5: {
    title: 'The Future Is Collaborative',
    audio: 'doc5.mp3',
    duration: 40,
    video: 'doc5.mp4', // motion graphic (motion/doc5); null = animated HTML fallback
    captions: 'doc5.vtt',
    beats: [
      { t: 0, icons: ['user', 'bot'], text: 'You and Claude', caption: "The future of work isn't you or Claude. It's you and Claude." },
      { t: 12, icons: ['pen', 'eye', 'gavel'], text: 'Draft → review → decide', caption: 'Claude drafts. You review. You decide.' },
      { t: 24, icons: ['telescope'], text: "What's coming next", caption: 'New tools are on the way, from meetings to whiteboards to more capable agents.' },
      { t: 34, icons: ['hand'], text: 'What will you hand off?', title: true, caption: 'So, what will you hand off first?' },
    ],
  },
};

export const DOCUMENTARIES = Object.fromEntries(
  Object.entries(BASE_DOCUMENTARIES).map(([id, doc]) => {
    const tm = TIMINGS[id];
    if (!tm || tm.starts.length !== doc.beats.length) return [id, doc];
    return [
      id,
      {
        ...doc,
        beats: doc.beats.map((b, i) => ({ ...b, t: tm.starts[i] })),
        // keep the planned 40 s unless the voice runs longer
        duration: Math.max(doc.duration, Math.ceil(tm.length + 2)),
      },
    ];
  })
);
