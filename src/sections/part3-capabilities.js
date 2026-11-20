// Part 3 — What Claude Can Do (5:00)
// Capability details come from Canva slide 3 (source: claude.com/pricing, accessed Nov 17, 2026).
export default {
  id: 3,
  title: 'What Claude Can Do',
  scenes: [
    {
      id: '3.1',
      layout: 'tiles',
      variant: 'grid',
      columns: 7,
      title: 'What can Claude do?',
      hint: 'Click a tile for an example',
      tiles: [
        { icon: 'search', label: 'Research', access: 'Chat or Research mode*', example: 'Brief on LMS market trends' },
        { icon: 'pen', label: 'Writing', access: 'Chat prompt + styles', example: 'Draft a client newsletter' },
        { icon: 'code', label: 'Coding', access: 'Chat or Claude Code*', example: 'Fix a failing login function' },
        { icon: 'fileSearch', label: 'Documents', access: 'Attach PDF / DOCX', example: 'Summarize a 40-page policy' },
        { icon: 'table', label: 'Spreadsheets', access: 'Upload .xlsx; Claude for Excel*', example: 'Flag missing values in a roster' },
        { icon: 'chart', label: 'Charts', access: 'Code execution, Artifacts', example: 'Chart enrollments by month' },
        { icon: 'slides', label: 'Presentations', access: 'Claude Slides* or .pptx file', example: 'Outline a training deck' },
        { icon: 'image', label: 'Images', access: 'Attach image / screenshot', example: 'Explain an error screenshot' },
        { icon: 'layout', label: 'Artifacts', access: 'Generated beside the chat', example: 'Build a quiz or calculator' },
        { icon: 'folder', label: 'Projects', access: 'Sidebar → Projects', example: 'Keep course files + instructions' },
        { icon: 'globe', label: 'Web search', access: 'Web search tool', example: 'Get current facts with citations' },
        { icon: 'plug', label: 'Connectors', access: 'Connectors (Drive, Slack…)', example: 'Find a file in Google Drive' },
        { icon: 'filePlus', label: 'File creation', access: 'Ask for DOCX, XLSX, PDF', example: 'Produce an editable report' },
        { icon: 'workflow', label: 'Automation', access: 'Cowork, Chrome, schedules*', example: 'Multi-step data clean-up' },
      ],
      footer: '* Paid-plan feature or varies by plan. Source: claude.com/pricing (accessed Nov 17, 2026)',
      duration: 75,
    },
    {
      id: '3.2',
      layout: 'tabs',
      variant: 'demo',
      title: 'See it in action',
      tabs: [
        {
          icon: 'pen',
          label: 'Write',
          prompt: 'Draft a 3-sentence newsletter intro announcing our new browser-based virtual labs.',
          result:
            'Our virtual labs now open in a browser tab, with no installs and no lab bookings. Students can start hands-on work from any laptop, at any time. Here is how to add a lab to your course this term.',
        },
        {
          icon: 'search',
          label: 'Research',
          prompt: 'Find the top 3 trends in university virtual labs for 2026. Put them in a table with a source for each.',
          result: 'Trend · One-line summary · Source [1]\nTrend · One-line summary · Source [2]\nTrend · One-line summary · Source [3]',
          note: 'Shows the answer format only. Run this live to get real, cited trends.',
        },
        {
          icon: 'fileSearch',
          label: 'Analyze',
          attachment: 'policy.pdf',
          prompt: 'Summarize this 40-page policy for new hires in 5 bullet points.',
          result: '• Who the policy covers\n• What to do in week one\n• Systems you need access to\n• Who to ask for help\n• Deadlines to remember',
        },
        {
          icon: 'code',
          label: 'Code',
          prompt: 'This login fails when the email has capital letters. Fix it.',
          code: [
            ['', 'function login(email, password) {'],
            ['-', '  const user = users.find(u => u.email === email);'],
            ['+', '  const user = users.find(u => u.email === email.toLowerCase());'],
            ['', '  return user && checkPassword(user, password);'],
            ['', '}'],
          ],
        },
      ],
      duration: 95,
    },
    {
      id: '3.3',
      layout: 'columns',
      title: 'Work and learning',
      columns: [
        {
          icon: 'briefcase',
          heading: 'Work',
          items: [
            { icon: 'file', label: 'Proposals' },
            { icon: 'check', label: 'QA reports' },
            { icon: 'chart', label: 'Client analytics' },
            { icon: 'code', label: 'Internal tools' },
          ],
        },
        {
          icon: 'cap',
          heading: 'Learning',
          items: [
            { icon: 'book', label: 'Study guides' },
            { icon: 'code', label: 'Code tutoring' },
            { icon: 'search', label: 'Research summaries' },
            { icon: 'flask', label: 'Lab guides' },
          ],
        },
      ],
      duration: 30,
    },
    { id: '3.4', layout: 'documentary', docId: 2, duration: 40 },
    { id: '3.5', layout: 'game', gameId: 3, duration: 60 },
  ],
};
