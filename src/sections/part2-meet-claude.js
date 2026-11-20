// Part 2 — Meet Claude (3:00)
export default {
  id: 2,
  title: 'Meet Claude',
  scenes: [
    {
      id: '2.1',
      layout: 'flow',
      variant: 'timeline',
      kicker: 'Built by Anthropic',
      title: 'Meet Claude',
      build: true,
      steps: [
        { label: '2021', sub: 'Anthropic founded' },
        { label: 'Mar 2023', sub: 'Claude launches' },
        { label: 'Jul 2023', sub: 'Claude 2 goes public' },
        { label: 'Nov 2026', sub: 'Claude Fable 5.2', accent: true },
      ],
      footer: 'Sources: Wikipedia – Anthropic; Releasebot – Claude updates (Nov 2026)',
      duration: 40,
    },
    {
      id: '2.2',
      layout: 'tiles',
      variant: 'big',
      title: 'Helpful. Honest. Harmless.',
      tiles: [
        { icon: 'heart', label: 'Helpful', detail: 'Built to do real knowledge work well.' },
        { icon: 'badge', label: 'Honest', detail: 'Trained to say what it knows and what it does not.' },
        { icon: 'shield', label: 'Harmless', detail: 'Trained to avoid harmful output.' },
      ],
      footer: 'Constitutional AI: trained to follow a written set of principles (Bai et al., 2022)',
      duration: 25,
    },
    { id: '2.3', layout: 'apptour', title: 'Your Claude workspace', duration: 35 },
    {
      id: '2.4',
      layout: 'tiles',
      variant: 'big',
      title: 'Always double-check',
      tiles: [
        { icon: 'check', label: 'Check facts', detail: 'Claude can make mistakes. Verify important answers.' },
        { icon: 'paperclip', label: 'Add context', detail: 'Missing context causes weak answers. Attach your sources.' },
        { icon: 'lock', label: 'Protect privacy', detail: 'Keep sensitive data out. Use sample data for practice.' },
      ],
      duration: 20,
    },
    { id: '2.5', layout: 'game', gameId: 2, duration: 60 },
  ],
};
