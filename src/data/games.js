// Educaplay activities: content to build on educaplay.com, plus the published links.
//
// STATUS: all 7 games are published on Educaplay and linked below.
// To replace a game, paste its new public link into `url`.
// Only educaplay.com links are accepted; anything else is ignored and flagged on the slide.
//   url:      public activity link (Launch button, Copy link, QR code)
//   embedUrl: optional embed link from Educaplay's Share > Embed (adds "Play here")
//
// Each game is sized for ~60 seconds including joining: use the first 3 questions
// if time is short. Answers use only facts presented in the session.
// `answer` is the index of the correct option. `backup` is a single spoken question
// for when Educaplay or the internet fails.

export const GAMES = {
  1: {
    title: 'AI Myth or Fact',
    type: 'Quiz (true / false)',
    instructions: ['Open the link in the Teams chat', 'Myth or fact?', 'About 60 seconds'],
    cue: 'Post the link in chat. Wait about 10 seconds for people to join, then start.',
    url: 'https://www.educaplay.com/learning-resources/31590590-ai_myth_or_fact.html',
    embedUrl: 'https://www.educaplay.com/game/31590590-ai_myth_or_fact.html',
    questions: [
      { q: 'A search engine and an AI assistant do the same job.', options: ['Myth', 'Fact'], answer: 0, why: 'Search gives links; an assistant like Claude helps you finish the work.' },
      { q: 'You should still check AI answers before you use them.', options: ['Myth', 'Fact'], answer: 1, why: 'Claude can make mistakes. Verify important facts.' },
      { q: 'Claude can only chat. It cannot create files.', options: ['Myth', 'Fact'], answer: 0, why: 'Claude can produce editable DOCX, XLSX and PDF files.' },
      { q: 'AI can help with repetitive work like summarizing and formatting.', options: ['Myth', 'Fact'], answer: 1, why: 'Summaries, tables and drafts are everyday Claude tasks.' },
    ],
    backup: { q: 'Myth or fact: you should still check AI answers before using them?', a: 'Fact. Claude can make mistakes, so verify important facts.' },
  },
  2: {
    title: 'Claude Quick Quiz',
    type: 'Quiz (multiple choice)',
    instructions: ['Open the link in the Teams chat', 'Pick the right answer', 'About 60 seconds'],
    cue: 'Post the link in chat. Read the first question aloud to get people started.',
    url: 'https://www.educaplay.com/learning-resources/31590610-claude_quick_quiz.html',
    embedUrl: 'https://www.educaplay.com/game/31590610-claude_quick_quiz.html',
    questions: [
      { q: 'Which company builds Claude?', options: ['Anthropic', 'OpenAI', 'Google', 'Microsoft'], answer: 0, why: 'Anthropic, an AI safety company founded in 2021.' },
      { q: 'When was Claude first released?', options: ['2021', 'March 2023', 'July 2023', 'November 2026'], answer: 1, why: 'March 2023. (2021 is when Anthropic was founded.)' },
      { q: 'Claude is trained to follow a written set of principles. What is this method called?', options: ['Constitutional AI', 'Prompt engineering', 'Deep search', 'Open training'], answer: 0, why: 'Constitutional AI (Bai et al., 2022).' },
      { q: 'What should you keep out of your prompts?', options: ['Sensitive data', 'Context', 'Sources', 'Examples'], answer: 0, why: 'Use sample or non-sensitive data.' },
    ],
    backup: { q: 'Which company builds Claude?', a: 'Anthropic, an AI safety company founded in 2021.' },
  },
  3: {
    title: 'Match the Capability',
    type: 'Matching Pairs',
    instructions: ['Open the link in the Teams chat', 'Match each task to a capability', 'About 60 seconds'],
    cue: 'Post the link in chat. Remind people the tiles from 3.1 are the answers.',
    url: 'https://www.educaplay.com/learning-resources/31590625-match_the_capability.html',
    embedUrl: 'https://www.educaplay.com/game/31590625-match_the_capability.html',
    pairs: [
      ['Summarize a 40-page policy', 'Document analysis'],
      ['Fix a failing login function', 'Coding'],
      ['Chart enrollments by month', 'Charts'],
      ['Get current facts with citations', 'Web search'],
      ['Build a quiz or calculator', 'Artifacts'],
    ],
    backup: { q: 'Which capability would you use to summarize a 40-page policy?', a: 'Document analysis: attach the PDF or DOCX.' },
  },
  4: {
    title: 'Solve the Workplace Challenge',
    type: 'Quiz (scenarios)',
    instructions: ['Open the link in the Teams chat', 'Choose the best workflow', 'About 60 seconds'],
    cue: 'Post the link in chat. Ask one person to share their answer afterwards.',
    url: 'https://www.educaplay.com/learning-resources/31590640-solve_the_workplace_challenge.html',
    embedUrl: 'https://www.educaplay.com/game/31590640-solve_the_workplace_challenge.html',
    questions: [
      { q: 'You need a summary table from a messy spreadsheet. Best first step?', options: ['Upload the file and describe the table you want', 'Retype the data into the chat', 'Ask Claude to guess the numbers', 'Copy each cell by hand'], answer: 0, why: 'Upload the file and give a clear prompt.' },
      { q: 'Claude gave you a draft report. What next?', options: ['Review it and ask for changes in the same chat', 'Send it right away', 'Start a new chat', 'Delete it and retype'], answer: 0, why: 'Review, then revise in the same chat.' },
      { q: "Claude's research table lists sources. Before you share it, you should…", options: ['Check the sources', 'Remove the sources', 'Trust it as is', 'Add more rows'], answer: 0, why: 'Verify against the original sources.' },
      { q: 'Which step of the workflow is always your job?', options: ['Review', 'Formatting', 'Drafting', 'Searching'], answer: 0, why: 'You verify. Always.' },
    ],
    backup: { q: "Claude drafted your report. What's the next step?", a: 'Review it and ask for changes in the same chat before you call it final.' },
  },
  5: {
    title: 'Guess the Claude Tool',
    type: 'Quiz (multiple choice)',
    instructions: ['Open the link in the Teams chat', 'Name the feature for each task', 'About 60 seconds'],
    cue: 'Post the link in chat. The 5.1 tabs are the hints.',
    url: 'https://www.educaplay.com/learning-resources/31590653-guess_the_claude_tool.html',
    embedUrl: 'https://www.educaplay.com/game/31590653-guess_the_claude_tool.html',
    questions: [
      { q: "Keep a course's files and instructions together across chats.", options: ['Projects', 'Artifacts', 'Research', 'Claude Code'], answer: 0, why: 'Projects group chats, files and instructions.' },
      { q: 'Build an interactive checklist beside the chat.', options: ['Research', 'Artifacts', 'Projects', 'Connectors'], answer: 1, why: 'Artifacts appear beside the chat and can be interactive.' },
      { q: 'Find current facts from many sources, with citations.', options: ['Claude Code', 'Projects', 'Research', 'Artifacts'], answer: 2, why: 'Research searches many sources and cites them.' },
      { q: 'Debug and edit a whole software project from the terminal.', options: ['Artifacts', 'Claude Code', 'Connectors', 'Research'], answer: 1, why: 'Claude Code works in the terminal, IDE or web.' },
    ],
    backup: { q: "Which feature keeps a course's files and instructions together across chats?", a: 'Projects.' },
  },
  6: {
    title: 'Prompt Master Challenge',
    type: 'Quiz (multiple choice)',
    instructions: ['Open the link in the Teams chat', 'Pick the stronger prompt', 'About 60 seconds'],
    cue: 'Post the link in chat. Point back to the Task + Context + Requirements + Output formula.',
    url: 'https://www.educaplay.com/learning-resources/31591651-prompt_master_challenge.html',
    embedUrl: 'https://www.educaplay.com/game/31591651-prompt_master_challenge.html',
    questions: [
      { q: 'Which prompt is stronger?', options: ['Write a newsletter.', 'Write a 150-word newsletter intro for university IT staff. Friendly tone. Headline plus two paragraphs.'], answer: 1, why: 'It has a task, context, requirements and an output format.' },
      { q: 'The four parts of a strong prompt are…', options: ['Task, Context, Requirements, Output', 'Topic, Length, Style, Font', 'Question, Answer, Source, Date', 'Goal, Tone, Format, Deadline'], answer: 0, why: 'Task + Context + Requirements + Output.' },
      { q: '"…for a monthly report to the academic director." Which part is this?', options: ['Task', 'Context', 'Requirements', 'Output'], answer: 1, why: 'It says who the work is for: context.' },
      { q: "The output isn't quite right. What should you do?", options: ['Ask for a targeted change in the same chat', 'Start over in a new chat', 'Copy it into another tool', 'Accept it anyway'], answer: 0, why: "Revise, don't restart." },
    ],
    backup: { q: 'Name the four parts of a strong prompt.', a: 'Task, Context, Requirements, Output.' },
  },
  7: {
    title: 'Ultimate Claude Challenge',
    type: 'Froggy Jumps (live multiplayer)',
    instructions: ['Open the link in the Teams chat', 'Questions from all 7 parts', 'About 60 seconds'],
    cue: 'Post the link in chat. Announce the top scorer before the closing slide.',
    url: 'https://www.educaplay.com/learning-resources/31595965-ultimate_claude_challenge.html',
    embedUrl: 'https://www.educaplay.com/game/31595965-ultimate_claude_challenge.html',
    questions: [
      { q: 'Who builds Claude?', options: ['Anthropic', 'OpenAI', 'Google'], answer: 0, why: 'Anthropic.' },
      { q: 'Which feature groups chats and files with shared instructions?', options: ['Artifacts', 'Projects', 'Research'], answer: 1, why: 'Projects.' },
      { q: 'In Task + Context + Requirements + Output, what is Output?', options: ['What you get back', 'Who it is for', 'The rules to follow'], answer: 0, why: 'Output is exactly what you want back.' },
      { q: 'In the human–AI partnership, who decides?', options: ['Claude', 'You', 'Nobody'], answer: 1, why: 'Claude drafts, organizes and analyzes; you judge, verify and decide.' },
      { q: 'Which is a responsible-use habit?', options: ['Paste in customer passwords', 'Use sample or non-sensitive data', 'Skip checking sources'], answer: 1, why: 'Protect privacy: use sample or non-sensitive data.' },
    ],
    backup: { q: 'In the human–AI partnership, who makes the final decision?', a: 'You. Claude drafts, organizes and analyzes; you judge, verify and decide.' },
  },
};

/** Only real Educaplay links are used for Launch, Copy and QR. */
export function isEducaplayUrl(url) {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' && (u.hostname === 'educaplay.com' || u.hostname.endsWith('.educaplay.com'));
  } catch {
    return false;
  }
}
