// Part 5 — Advanced Features (5:00)
// Feature and plan details from Canva slides 5 and 10 (claude.com/pricing, accessed Nov 17, 2026).
export default {
  id: 5,
  title: 'Advanced Features',
  scenes: [
    {
      id: '5.1',
      layout: 'tabs',
      variant: 'feature',
      title: 'Beyond chat',
      tabs: [
        { icon: 'folder', label: 'Projects', lines: ['Group chats and files', 'Instructions carry over'], when: 'A course, client or long task' },
        { icon: 'layout', label: 'Artifacts', lines: ['Interactive content beside chat', 'Edit by asking'], when: 'You need something to see or click' },
        { icon: 'search', label: 'Research', lines: ['Searches many sources', 'Cites references'], when: 'You need current, sourced facts' },
        { icon: 'code', label: 'Claude Code', lines: ['Reads and writes whole projects', 'Terminal, IDE or web'], when: 'Building or fixing software' },
        { icon: 'slides', label: 'Docs & Slides', lines: ['Documents, decks, designs', 'Export PPTX, DOCX, PDF'], when: 'The output must be shared' },
      ],
      footer: 'Research and Claude Code need a paid plan; Design, Docs and Slides are listed for Team/Enterprise. Source: claude.com/pricing, Nov 2026',
      duration: 120,
    },
    {
      id: '5.2',
      layout: 'hub',
      title: 'Works with your tools',
      center: 'Claude',
      nodes: [
        { icon: 'drive', label: 'Google Drive' },
        { icon: 'mail', label: 'Gmail' },
        { icon: 'messages', label: 'Slack' },
        { icon: 'grid', label: 'Microsoft 365' },
        { icon: 'globe', label: 'Chrome' },
      ],
      footer: 'Connectors vary by plan and platform. Source: claude.com/pricing (Nov 17, 2026)',
      duration: 50,
    },
    {
      id: '5.3',
      layout: 'matrix',
      title: "What's in each plan",
      columns: ['Free', 'Pro', 'Team'],
      rows: [
        { label: 'Projects', values: ['Up to 5', true, true] },
        { label: 'Research', values: [false, true, true] },
        { label: 'Claude Code', values: [false, true, true] },
        { label: 'Docs & Slides', values: [false, false, true] },
        { label: 'Admin & SSO', values: [false, false, true] },
      ],
      footer: 'Full prices in Reference R3. Source: claude.com/pricing (accessed Nov 17, 2026); features may change.',
      duration: 30,
    },
    { id: '5.4', layout: 'documentary', docId: 4, duration: 40 },
    { id: '5.5', layout: 'game', gameId: 5, duration: 60 },
  ],
};
