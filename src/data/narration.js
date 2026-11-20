// Narration scripts, one per narrated scene. Presenters record these as MP3s
// (file names in docs/narration-scripts.md). The same text appears in the
// presenter notes panel (N key), so a presenter can read it live if a file is missing.
//
// Facts come from the Canva deck and its listed sources. Word budgets assume
// ~140 spoken words per minute; `npm run export:scripts` checks every script fits.
// Text in [square brackets] is a stage direction, not spoken.

export const NARRATION = {
  // ---------- Part 1 — The AI Revolution ----------
  '1.1':
    "Welcome to the CloudSwyft Claude AI Training Series. In the next thirty minutes, we'll look at what Claude is, what it can do, and how it can help with your everyday work. Keep the Teams chat open. You'll need it.",
  '1.2':
    "Let's start with you. What eats most of your day? Email, reports, meetings, or data entry? Type your answer in the Teams chat now. [Click a tile for each answer in chat.] Keep your answer in mind as we go.",
  '1.4':
    "For years, finding information meant a search engine. It gives you links, and you do the reading. Then chat assistants arrived, and gave you answers instead. Claude goes one step further. It helps you finish the work itself: a researched brief, an analyzed spreadsheet, a draft you can edit and share.",

  // ---------- Part 2 — Meet Claude ----------
  '2.1':
    "So, what is Claude? Claude is built by Anthropic, an AI safety company founded in 2021 by former OpenAI researchers, including Dario and Daniela Amodei. The first Claude was released in March 2023, and Claude 2 opened to the public that July. The latest model, Claude Fable 5.2, arrived on November 9, 2026. You can use Claude on the web, on desktop and mobile, or through the API.",
  '2.2':
    "Anthropic's goal is AI that is helpful, honest and harmless. To get there, Claude is trained with a method called Constitutional AI: the model learns to follow a written set of principles.",
  '2.3':
    "Here's a simple map of the Claude workspace. On the left, the sidebar holds your chat history, the New chat button and Projects. In the middle is the chat box. The plus button attaches files, and the model selector lets you pick a model. What you see depends on your plan.",
  '2.4':
    'One rule before we go further: always double-check. Claude can make mistakes, so verify important facts. Give it context and sources for better answers. And keep sensitive data out of your prompts.',

  // ---------- Part 3 — What Claude Can Do ----------
  '3.1':
    "Here's the big picture: fourteen things Claude can do, from research and writing to coding, spreadsheets, charts and presentations. Features marked with a star depend on your plan. Let's open a few to see how you reach them, and what a real task looks like. [Click three or four tiles.]",
  '3.2':
    "Let's see Claude in action. Each tab shows a prompt and the kind of answer you'd get back. These are prepared examples, not live output. Notice how specific each prompt is. We'll come back to that in Part 6. [Click through Write, Research, Analyze and Code.]",
  '3.3':
    'Where does this apply? At work: proposals, QA reports, client analytics and internal tools. In learning: study guides, code tutoring, research summaries and lab guides. Same assistant, two very different days.',

  // ---------- Part 4 — Real-World Workflows ----------
  '4.1':
    "Here's one task done two ways: gathering data into a spreadsheet. The manual way means ten browser tabs, copying and pasting, and formatting by hand. With Claude, you describe what you need in one clear prompt, upload your file, and get back an organized spreadsheet. [Drag the divider.] One thing doesn't change: you still check the sources. Claude helps you organize and analyze. It doesn't guarantee accuracy.",
  '4.2':
    "Most work with Claude follows the same loop. You write a prompt. Claude produces an output: a report, a deck, a dashboard. Then comes the most important step: your review. Check it, ask for changes in the same chat, and only then call it final.",
  '4.3': "So here's the rule to remember: you verify, always. Claude does the heavy lifting. You stay responsible for what goes out.",

  // ---------- Part 5 — Advanced Features ----------
  '5.1':
    "Now let's go beyond ordinary chat. First, Projects. A Project groups related chats and files, with instructions that carry across every chat. It's ideal for a course, a client or a long assignment. [Click Artifacts.] Artifacts are interactive content that appears beside the chat: diagrams, charts, prototypes. You edit them just by asking. [Click Research.] Research searches many sources, organizes what it finds, and cites references. [Click Claude Code.] Claude Code reads and writes code across whole projects, from the terminal, an IDE or the web. [Click Docs and Slides.] And Docs and Slides give you documents, decks and designs you can edit in place and export. Research and Claude Code need a paid plan. Docs and Slides are listed for Team and Enterprise.",
  '5.2':
    'Claude also connects to tools you already use. With connectors, it can find a file in Google Drive, work with Gmail, Slack or Microsoft 365, and act in the Chrome browser. Instead of copying information in, you let Claude reach it directly, with your permission. Which connectors you get depends on your plan and platform.',
  '5.3':
    "Which plan includes what? The Free plan includes up to five Projects. Pro adds Research and Claude Code. Team adds Docs and Slides, plus admin controls and single sign-on. Prices can change, so always check claude.com slash pricing.",

  // ---------- Part 6 — Effective Prompting ----------
  '6.1':
    "Now the skill that makes everything else work: prompting. A strong prompt has four parts. The task: what you want done. The context: who it's for. The requirements: the rules to follow, like tone or length. And the output: exactly what you want back.",
  '6.2':
    "Let's try it. Here's a weak prompt: write a newsletter. Watch the answer as we add each part. [Turn on Task, Context, Requirements, then Output.] Same request, a much better result. [Switch to Data summary or Onboarding deck if time allows.]",
  '6.3':
    "One more habit: revise, don't restart. When the output isn't quite right, ask for a targeted change in the same chat. Shorten slide three. Use our blue palette. Add a cost column. Claude keeps the context and updates what it already made.",

  // ---------- Part 7 — The Future of Work ----------
  '7.1':
    "So what does the future of work look like? It's a partnership. Claude drafts, organizes and analyzes. You judge, verify and decide. The value comes from each side doing what it does best.",
  '7.2':
    "Working with AI also means using it responsibly. Protect privacy: use sample or non-sensitive data. Check accuracy against the original sources. Be open when AI helped create your work. And follow your company's rules for AI tools and data.",
  '7.3':
    "What comes next? Some things are confirmed: Anthropic has announced Claude Meetings in beta, and Sheets and Whiteboards in beta. Some are likely, based on current trends: more capable agents and deeper integrations. The rest is speculation. Anthropic hasn't published a roadmap for 2027, so treat predictions with care.",
  '7.6':
    "To wrap up: Claude is not just a chatbot. It helps you research, analyze, develop and create. The value of AI is not just in generating answers, but in helping people turn information into meaningful results. Before you go, tell us in the chat: what's one task you'll try with Claude tomorrow? Thank you. We're happy to take your questions.",
};

/** Spoken words only (stage directions in [brackets] removed). */
export function spokenText(text) {
  return text.replace(/\[[^\]]*\]/g, '').replace(/\s+/g, ' ').trim();
}

export const WORDS_PER_MINUTE = 140;
