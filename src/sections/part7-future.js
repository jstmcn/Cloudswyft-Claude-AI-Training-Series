// Part 7 — The Future of Work (4:00)
// 2027 outlook from Canva slide 13 (Releasebot, TechCrunch, CASRAI, Nov 2026).
export default {
  id: 7,
  title: 'The Future of Work',
  scenes: [
    {
      id: '7.1',
      layout: 'columns',
      title: 'You + Claude',
      columns: [
        {
          icon: 'bot',
          heading: 'Claude',
          items: [
            { icon: 'pen', label: 'Drafts' },
            { icon: 'layers', label: 'Organizes' },
            { icon: 'chart', label: 'Analyzes' },
          ],
        },
        {
          icon: 'user',
          heading: 'You',
          accent: true,
          items: [
            { icon: 'scale', label: 'Judge' },
            { icon: 'eye', label: 'Verify' },
            { icon: 'gavel', label: 'Decide' },
          ],
        },
      ],
      duration: 30,
    },
    {
      id: '7.2',
      layout: 'tiles',
      variant: 'big',
      title: 'Use it responsibly',
      tiles: [
        { icon: 'lock', label: 'Privacy', detail: 'Use sample or non-sensitive data.' },
        { icon: 'check', label: 'Accuracy', detail: 'Check facts against the original sources.' },
        { icon: 'eye', label: 'Transparency', detail: 'Say when AI helped create the work.' },
        { icon: 'building', label: 'Policy', detail: "Follow your company's rules for AI tools and data." },
      ],
      duration: 30,
    },
    {
      id: '7.3',
      layout: 'columns',
      title: 'Looking to 2027',
      columns: [
        { heading: 'Confirmed', icon: 'check', items: [{ icon: 'video', label: 'Claude Meetings beta' }, { icon: 'table', label: 'Sheets & Whiteboards beta' }] },
        { heading: 'Likely', icon: 'trending', items: [{ icon: 'workflow', label: 'More capable agents' }, { icon: 'plug', label: 'Deeper integrations' }] },
        { heading: 'Speculative', icon: 'telescope', muted: true, items: [{ icon: 'image', label: 'Broader multimodal' }, { icon: 'shield', label: 'New safety standards' }] },
      ],
      footer: 'Anthropic has not published a 2027 roadmap. Sources: Releasebot, TechCrunch, CASRAI (Nov 2026)',
      duration: 30,
    },
    { id: '7.4', layout: 'documentary', docId: 5, duration: 40 },
    { id: '7.5', layout: 'game', gameId: 7, duration: 60 },
    {
      id: '7.6',
      layout: 'closing',
      title: 'Not just a chatbot',
      pillars: [
        { icon: 'search', label: 'Research' },
        { icon: 'chart', label: 'Analysis' },
        { icon: 'code', label: 'Development' },
        { icon: 'sparkles', label: 'Creation' },
      ],
      question: 'One task you’ll try tomorrow?',
      thanks: 'Thank you · Questions?',
      duration: 50,
    },
  ],
};
