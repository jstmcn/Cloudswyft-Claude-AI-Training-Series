// Part 6 — Effective Prompting (4:00)
export default {
  id: 6,
  title: 'Effective Prompting',
  scenes: [
    {
      id: '6.1',
      layout: 'flow',
      variant: 'formula',
      title: 'Task + Context + Requirements + Output',
      build: true,
      steps: [
        { icon: 'target', label: 'Task', sub: 'What to do' },
        { icon: 'info', label: 'Context', sub: 'Who it is for' },
        { icon: 'list', label: 'Requirements', sub: 'Rules to follow' },
        { icon: 'file', label: 'Output', sub: 'What you get back', accent: true },
      ],
      duration: 40,
    },
    { id: '6.2', layout: 'promptlab', title: 'Prompt lab', duration: 110 },
    {
      id: '6.3',
      layout: 'tiles',
      variant: 'chips',
      title: "Revise, don't restart",
      tiles: [
        { icon: 'quote', label: '“Shorten slide 3”' },
        { icon: 'quote', label: '“Use our blue palette”' },
        { icon: 'quote', label: '“Add a cost column”' },
        { icon: 'quote', label: '“Make it more formal”' },
      ],
      duration: 30,
    },
    { id: '6.4', layout: 'game', gameId: 6, duration: 60 },
  ],
};
