// Part 4 — Real-World Workflows (4:00)
export default {
  id: 4,
  title: 'Real-World Workflows',
  scenes: [
    {
      id: '4.1',
      layout: 'beforeafter',
      title: 'Same task, two ways',
      hint: 'Drag the divider',
      before: {
        label: 'Manual',
        items: [
          { icon: 'tabs', label: 'Ten browser tabs' },
          { icon: 'copy', label: 'Copy and paste' },
          { icon: 'keyboard', label: 'Format by hand' },
          { icon: 'search', label: 'Check sources' },
        ],
      },
      after: {
        label: 'With Claude',
        items: [
          { icon: 'chat', label: 'One clear prompt' },
          { icon: 'upload', label: 'Upload the file' },
          { icon: 'table', label: 'Get the .xlsx' },
          { icon: 'userCheck', label: 'You check sources' },
        ],
      },
      duration: 80,
    },
    {
      id: '4.2',
      layout: 'flow',
      variant: 'arrows',
      title: 'Prompt → Result',
      build: true,
      steps: [
        { icon: 'chat', label: 'Prompt' },
        { icon: 'sparkles', label: 'Claude' },
        { icon: 'file', label: 'Output' },
        { icon: 'eye', label: 'Your review', accent: true },
        { icon: 'check', label: 'Final' },
      ],
      duration: 40,
    },
    {
      id: '4.3',
      layout: 'statement',
      title: 'You verify. Always.',
      icon: 'userCheck',
      duration: 20,
    },
    { id: '4.4', layout: 'documentary', docId: 3, duration: 40 },
    { id: '4.5', layout: 'game', gameId: 4, duration: 60 },
    {
      id: '4.x',
      layout: 'statement',
      optional: true,
      title: 'Live in Claude',
      subtitle: 'Optional · switch to the Claude app',
      icon: 'monitor',
      note: 'Demo prompts are in Reference R6. Adds 3–5 minutes.',
      duration: 0,
    },
  ],
};
