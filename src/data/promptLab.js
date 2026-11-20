// Prompt lab scenarios (scene 6.2). Results are prepared examples, not live AI output.
export const PROMPT_PARTS = [
  { key: 'task', label: 'Task', icon: 'target' },
  { key: 'context', label: 'Context', icon: 'info' },
  { key: 'requirements', label: 'Requirements', icon: 'list' },
  { key: 'output', label: 'Output', icon: 'file' },
];

export const SCENARIOS = [
  {
    id: 'newsletter',
    label: 'Newsletter',
    weak: 'Write a newsletter.',
    parts: {
      task: 'Write a 150-word newsletter intro',
      context: 'for university IT staff, announcing our new browser-based virtual labs.',
      requirements: 'Friendly but professional. One key benefit. No jargon.',
      output: 'Give me a headline and two short paragraphs.',
    },
    results: {
      weak: 'Welcome to our newsletter! There is a lot happening this month. Read on for updates, tips and news from across the team.',
      partial: 'Our new virtual labs are here! Students can now do lab work from a browser. Read on to learn more about what this means for you.',
      strong:
        'Labs that open in a browser tab\n\nStarting this term, students can launch full lab environments from their browser, with no installs and no room bookings.\n\nFor IT staff, that means fewer machines to set up and fewer support tickets. Here is how to set up your first course.',
    },
  },
  {
    id: 'data',
    label: 'Data summary',
    weak: 'Summarize this spreadsheet.',
    parts: {
      task: 'Summarize enrollments_2026.xlsx',
      context: 'for a monthly report to the academic director.',
      requirements: 'Flag missing values and any month that dropped by more than 10%.',
      output: 'Return a 3-row table plus one sentence of findings.',
    },
    results: {
      weak: 'The spreadsheet contains enrollment data with several columns and rows. It covers multiple months and categories.',
      partial: 'Enrollments by month are listed below. Some cells appear to be empty.',
      strong:
        'Month · Enrollments · Change\nMonth A · value · —\nMonth B · value · −12% ⚑\n\nFinding: one month dropped by more than 10%, and 4 rows are missing a category.',
    },
  },
  {
    id: 'deck',
    label: 'Onboarding deck',
    weak: 'Make slides about onboarding.',
    parts: {
      task: 'Outline a 6-slide onboarding deck',
      context: 'for new virtual-lab users at a partner university.',
      requirements: 'One idea per slide. Plain language. End with a support contact slide.',
      output: 'List slide titles with one line of speaker notes each.',
    },
    results: {
      weak: 'Slide 1: Introduction\nSlide 2: Overview\nSlide 3: Details\nSlide 4: More details\nSlide 5: Summary',
      partial: 'Slide 1: Welcome to virtual labs\nSlide 2: Logging in\nSlide 3: Starting a lab\nSlide 4: Saving work',
      strong:
        '1 Welcome: what virtual labs are\n2 Log in: one link, your school account\n3 Start a lab: pick a course, click Launch\n4 Save your work: it stays between sessions\n5 Get help: in-lab help button\n6 Support: who to contact and how',
    },
  },
];
