// Part 1 — The AI Revolution (3:00)
// On-screen text follows the approved Phase 3 storyboard: short headlines, 1–3 word labels.
export default {
  id: 1,
  title: 'The AI Revolution',
  scenes: [
    {
      id: '1.1',
      layout: 'title',
      kicker: 'An Anthropic Claude product briefing',
      title: 'Claude AI: Beyond Conversational AI',
      subtitle: 'Justine Mico San Jose · Kyla Samantha Manzanero',
      meta: 'CloudSwyft Training Session · November 2026',
      duration: 20,
    },
    {
      id: '1.2',
      layout: 'question',
      title: 'What eats most of your day?',
      highlight: 'most',
      hint: 'Answer in the Teams chat',
      options: [
        { icon: 'mail', label: 'Email' },
        { icon: 'file', label: 'Reports' },
        { icon: 'calendar', label: 'Meetings' },
        { icon: 'keyboard', label: 'Data entry' },
      ],
      duration: 30,
    },
    { id: '1.3', layout: 'documentary', docId: 1, duration: 40 },
    {
      id: '1.4',
      layout: 'flow',
      variant: 'arrows',
      title: 'From answers to finished work',
      build: true,
      steps: [
        { icon: 'search', label: 'Search engine', sub: 'Links' },
        { icon: 'chat', label: 'Chat AI', sub: 'Answers' },
        { icon: 'sparkles', label: 'Claude', sub: 'Finished work', accent: true },
      ],
      duration: 30,
    },
    { id: '1.5', layout: 'game', gameId: 1, duration: 60 },
  ],
};
