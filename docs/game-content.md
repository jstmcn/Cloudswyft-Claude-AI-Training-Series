# Educaplay game content

Generated from `src/data/games.js` by `npm run export:scripts`. Edit that file, not this one.

## How to publish each game

1. Sign in at https://www.educaplay.com and choose **Create activity**, then the type listed below.
2. Enter the title, then the questions and answers exactly as below (correct answers are **bold**).
3. Set a short time limit so the game fits about 60 seconds, including joining. Use the first 3 questions if time is short.
4. Publish it as **public** (or "anyone with the link").
5. Copy the activity's public link into `url` for that game in `src/data/games.js`.
   Optional: from Share → Embed, copy the embed link into `embedUrl` to enable **Play here**.
6. Open the game slide: the QR code and Launch / Copy link buttons switch on automatically.
7. Test the link on a phone and a laptop as a participant, then tick it off in the status table.

Only `https://…educaplay.com` links are accepted; any other link is ignored and flagged on the slide.
Game 7 uses **Froggy Jumps**, which Educaplay lists as supporting live multiplayer sessions.

## Status

| Game | Slide | Type | Link |
|---|---|---|---|
| 1 · AI Myth or Fact | 1.5 | Quiz (true / false) | https://www.educaplay.com/learning-resources/31590590-ai_myth_or_fact.html |
| 2 · Claude Quick Quiz | 2.5 | Quiz (multiple choice) | https://www.educaplay.com/learning-resources/31590610-claude_quick_quiz.html |
| 3 · Match the Capability | 3.5 | Matching Pairs | https://www.educaplay.com/learning-resources/31590625-match_the_capability.html |
| 4 · Solve the Workplace Challenge | 4.5 | Quiz (scenarios) | https://www.educaplay.com/learning-resources/31590640-solve_the_workplace_challenge.html |
| 5 · Guess the Claude Tool | 5.5 | Quiz (multiple choice) | https://www.educaplay.com/learning-resources/31590653-guess_the_claude_tool.html |
| 6 · Prompt Master Challenge | 6.4 | Quiz (multiple choice) | https://www.educaplay.com/learning-resources/31591651-prompt_master_challenge.html |
| 7 · Ultimate Claude Challenge | 7.5 | Froggy Jumps (live multiplayer) | https://www.educaplay.com/learning-resources/31595965-ultimate_claude_challenge.html |

## Game 1 · AI Myth or Fact

**Slide:** 1.5 · **Type:** Quiz (true / false)

1. A search engine and an AI assistant do the same job.
   - **Myth**
   - Fact
   - *Why:* Search gives links; an assistant like Claude helps you finish the work.
2. You should still check AI answers before you use them.
   - Myth
   - **Fact**
   - *Why:* Claude can make mistakes. Verify important facts.
3. Claude can only chat. It cannot create files.
   - **Myth**
   - Fact
   - *Why:* Claude can produce editable DOCX, XLSX and PDF files.
4. AI can help with repetitive work like summarizing and formatting.
   - Myth
   - **Fact**
   - *Why:* Summaries, tables and drafts are everyday Claude tasks.

**Backup question (spoken, if Educaplay or the internet fails):** Myth or fact: you should still check AI answers before using them?
**Answer:** Fact. Claude can make mistakes, so verify important facts.

**Presenter cue:** Post the link in chat. Wait about 10 seconds for people to join, then start.

## Game 2 · Claude Quick Quiz

**Slide:** 2.5 · **Type:** Quiz (multiple choice)

1. Which company builds Claude?
   - **Anthropic**
   - OpenAI
   - Google
   - Microsoft
   - *Why:* Anthropic, an AI safety company founded in 2021.
2. When was Claude first released?
   - 2021
   - **March 2023**
   - July 2023
   - November 2026
   - *Why:* March 2023. (2021 is when Anthropic was founded.)
3. Claude is trained to follow a written set of principles. What is this method called?
   - **Constitutional AI**
   - Prompt engineering
   - Deep search
   - Open training
   - *Why:* Constitutional AI (Bai et al., 2022).
4. What should you keep out of your prompts?
   - **Sensitive data**
   - Context
   - Sources
   - Examples
   - *Why:* Use sample or non-sensitive data.

**Backup question (spoken, if Educaplay or the internet fails):** Which company builds Claude?
**Answer:** Anthropic, an AI safety company founded in 2021.

**Presenter cue:** Post the link in chat. Read the first question aloud to get people started.

## Game 3 · Match the Capability

**Slide:** 3.5 · **Type:** Matching Pairs

| Task | Capability |
|---|---|
| Summarize a 40-page policy | Document analysis |
| Fix a failing login function | Coding |
| Chart enrollments by month | Charts |
| Get current facts with citations | Web search |
| Build a quiz or calculator | Artifacts |

**Backup question (spoken, if Educaplay or the internet fails):** Which capability would you use to summarize a 40-page policy?
**Answer:** Document analysis: attach the PDF or DOCX.

**Presenter cue:** Post the link in chat. Remind people the tiles from 3.1 are the answers.

## Game 4 · Solve the Workplace Challenge

**Slide:** 4.5 · **Type:** Quiz (scenarios)

1. You need a summary table from a messy spreadsheet. Best first step?
   - **Upload the file and describe the table you want**
   - Retype the data into the chat
   - Ask Claude to guess the numbers
   - Copy each cell by hand
   - *Why:* Upload the file and give a clear prompt.
2. Claude gave you a draft report. What next?
   - **Review it and ask for changes in the same chat**
   - Send it right away
   - Start a new chat
   - Delete it and retype
   - *Why:* Review, then revise in the same chat.
3. Claude's research table lists sources. Before you share it, you should…
   - **Check the sources**
   - Remove the sources
   - Trust it as is
   - Add more rows
   - *Why:* Verify against the original sources.
4. Which step of the workflow is always your job?
   - **Review**
   - Formatting
   - Drafting
   - Searching
   - *Why:* You verify. Always.

**Backup question (spoken, if Educaplay or the internet fails):** Claude drafted your report. What's the next step?
**Answer:** Review it and ask for changes in the same chat before you call it final.

**Presenter cue:** Post the link in chat. Ask one person to share their answer afterwards.

## Game 5 · Guess the Claude Tool

**Slide:** 5.5 · **Type:** Quiz (multiple choice)

1. Keep a course's files and instructions together across chats.
   - **Projects**
   - Artifacts
   - Research
   - Claude Code
   - *Why:* Projects group chats, files and instructions.
2. Build an interactive checklist beside the chat.
   - Research
   - **Artifacts**
   - Projects
   - Connectors
   - *Why:* Artifacts appear beside the chat and can be interactive.
3. Find current facts from many sources, with citations.
   - Claude Code
   - Projects
   - **Research**
   - Artifacts
   - *Why:* Research searches many sources and cites them.
4. Debug and edit a whole software project from the terminal.
   - Artifacts
   - **Claude Code**
   - Connectors
   - Research
   - *Why:* Claude Code works in the terminal, IDE or web.

**Backup question (spoken, if Educaplay or the internet fails):** Which feature keeps a course's files and instructions together across chats?
**Answer:** Projects.

**Presenter cue:** Post the link in chat. The 5.1 tabs are the hints.

## Game 6 · Prompt Master Challenge

**Slide:** 6.4 · **Type:** Quiz (multiple choice)

1. Which prompt is stronger?
   - Write a newsletter.
   - **Write a 150-word newsletter intro for university IT staff. Friendly tone. Headline plus two paragraphs.**
   - *Why:* It has a task, context, requirements and an output format.
2. The four parts of a strong prompt are…
   - **Task, Context, Requirements, Output**
   - Topic, Length, Style, Font
   - Question, Answer, Source, Date
   - Goal, Tone, Format, Deadline
   - *Why:* Task + Context + Requirements + Output.
3. "…for a monthly report to the academic director." Which part is this?
   - Task
   - **Context**
   - Requirements
   - Output
   - *Why:* It says who the work is for: context.
4. The output isn't quite right. What should you do?
   - **Ask for a targeted change in the same chat**
   - Start over in a new chat
   - Copy it into another tool
   - Accept it anyway
   - *Why:* Revise, don't restart.

**Backup question (spoken, if Educaplay or the internet fails):** Name the four parts of a strong prompt.
**Answer:** Task, Context, Requirements, Output.

**Presenter cue:** Post the link in chat. Point back to the Task + Context + Requirements + Output formula.

## Game 7 · Ultimate Claude Challenge

**Slide:** 7.5 · **Type:** Froggy Jumps (live multiplayer)

1. Who builds Claude?
   - **Anthropic**
   - OpenAI
   - Google
   - *Why:* Anthropic.
2. Which feature groups chats and files with shared instructions?
   - Artifacts
   - **Projects**
   - Research
   - *Why:* Projects.
3. In Task + Context + Requirements + Output, what is Output?
   - **What you get back**
   - Who it is for
   - The rules to follow
   - *Why:* Output is exactly what you want back.
4. In the human–AI partnership, who decides?
   - Claude
   - **You**
   - Nobody
   - *Why:* Claude drafts, organizes and analyzes; you judge, verify and decide.
5. Which is a responsible-use habit?
   - Paste in customer passwords
   - **Use sample or non-sensitive data**
   - Skip checking sources
   - *Why:* Protect privacy: use sample or non-sensitive data.

**Backup question (spoken, if Educaplay or the internet fails):** In the human–AI partnership, who makes the final decision?
**Answer:** You. Claude drafts, organizes and analyzes; you judge, verify and decide.

**Presenter cue:** Post the link in chat. Announce the top scorer before the closing slide.
