// Reference appendix — untimed backup slides for Q&A (opened from the section menu).
// These keep the Canva deck's full detail, so they are denser than the main slides.
// All figures are copied from the deck with its source notes. Verify before external use.
export default {
  id: 'R',
  title: 'Reference',
  appendix: true,
  scenes: [
    {
      id: 'R1',
      layout: 'reference',
      kind: 'table',
      title: 'Claude vs. other AI platforms',
      columns: ['Criteria', 'Claude', 'ChatGPT', 'Gemini', 'Copilot', 'Perplexity'],
      rows: [
        ['Information research', 'Strong', 'Strong', 'Strong', 'Good', 'Strong'],
        ['Writing quality', 'Strong', 'Strong', 'Good', 'Good', 'Good'],
        ['Coding', 'Strong', 'Strong', 'Strong', 'Good', 'Limited'],
        ['Document analysis', 'Strong', 'Strong', 'Strong', 'Good', 'Good'],
        ['Excel / spreadsheets', 'Strong', 'Good', 'Good', 'Strong', 'Limited'],
        ['Presentation generation', 'Strong', 'Good', 'Good', 'Strong', 'Limited'],
        ['Visual content creation', 'Good', 'Strong', 'Strong', 'Strong', 'Limited'],
        ['App integrations', 'Strong', 'Strong', 'Strong', 'Strong', 'Good'],
        ['Research citations', 'Strong', 'Good', 'Good', 'Good', 'Strong'],
        ['Context management', 'Strong', 'Strong', 'Strong', 'Good', 'Good'],
        ['Productivity features', 'Strong', 'Strong', 'Strong', 'Strong', 'Good'],
        ['Pricing & accessibility', 'Good', 'Strong', 'Strong', 'Strong', 'Strong'],
      ],
      side: [
        {
          heading: 'Why consider Claude',
          items: [
            'Long-form writing & document analysis',
            'Complex reasoning: Fable 5.2 tops the AA Intelligence Index (65)',
            'Programming via Claude Code',
            'Editable outputs: Docs, Sheets, Slides',
            'Projects + connected workflows',
          ],
        },
        {
          heading: 'Where others may be stronger',
          items: [
            'ChatGPT: largest user base, image generation',
            'Gemini: Google Workspace & Android reach',
            'Copilot: built into Microsoft 365 apps',
            'Perplexity: fast, citation-first search',
          ],
        },
      ],
      footer:
        "Ratings = presenter's assessment from official product pages and the Artificial Analysis Intelligence Index v5.0.1 (Nov 9, 2026: Fable 5.2 = 65, Gemini 4 Carbon = 60, Opus 5.5 = 59). Verify before external use.",
    },
    {
      id: 'R2',
      layout: 'reference',
      kind: 'stats',
      title: 'Where Claude stands in the market',
      stats: [
        { value: '43.8%', label: 'of U.S. businesses pay for Anthropic', source: 'Ramp AI Index · card & bill-pay data · Aug 2026 (OpenAI 39.8%)' },
        { value: '40%', label: 'of enterprise LLM API spend', source: 'Menlo Ventures · survey of 495 U.S. enterprise buyers · 2025 (OpenAI 27%, Google 21%)' },
        { value: '11.2%', label: 'of U.S. chatbot monthly active users', source: 'First Page Sage · U.S. web + mobile estimate · Oct 2026 (ChatGPT 52.3%)' },
        { value: '300K+', label: 'business customers', source: 'Anthropic amended S-1 (reported) · Nov 2, 2026; IPO filing Oct 26, 2026' },
      ],
      note: 'Why the numbers differ: visits ≠ users ≠ business spend ≠ API usage; regions and tracked sites differ.',
      footer:
        'Sources: Exploding Topics & Whizi (citing Similarweb, Ramp, Menlo Ventures), Nov 2026; First Page Sage, Nov 2, 2026; fatjoe (citing amended S-1), Nov 10, 2026. Secondary reports: verify against primary data.',
    },
    {
      id: 'R3',
      layout: 'reference',
      kind: 'table',
      title: 'Plans and pricing',
      columns: ['Plan', 'Price (USD)', 'Best for', 'Usage & models', 'Highlights / restrictions'],
      rows: [
        ['Free', '$0', 'Trying Claude', 'Limited per 5 hrs & week · Sonnet, Haiku', 'Up to 5 Projects; no Research or Claude Code'],
        ['Pro', '$20/mo · $17/mo annual', 'Everyday work', '≥5× Free per session · + Opus', 'Claude Code, Research, Chrome, M365; Fable via credits'],
        ['Max', '$100/mo', 'All-day work', '5× Pro · + Fable (≤50% of weekly)', '$100/mo API credits; priority & early access'],
        ['Ultra', '$200/mo', 'Longest tasks', '10× Pro weekly · no 5-hr limit', '$200/mo API credits; priority access'],
        ['Team', 'Std $25 ($20 annual) · Premium $125 ($100 annual) /seat/mo', 'Teams of 2–150', 'Std > Pro; Premium = 5× Std (+ Fable)', 'SSO, admin, shared Projects, Cowork, Design/Docs/Slides; no training on data by default'],
        ['Enterprise', '$20/seat/mo + usage at API rates', 'Large organizations', 'All models; admin-set spend limits', '20-seat min (self-serve), SCIM, audit logs, HIPAA-ready'],
      ],
      wide: true,
      footer:
        'Source: claude.com/pricing (accessed Nov 17, 2026). Prices exclude tax and may change. Usage multipliers are relative allowances, not fixed message counts.',
    },
    {
      id: 'R4',
      layout: 'reference',
      kind: 'cards',
      title: "Reading Claude's icons and signals",
      cards: [
        { sample: 'Claude logo', label: 'Claude logo', text: "Claude's coral spark mark: identifies the assistant and its replies." },
        { sample: 'Anthropic', label: 'Anthropic wordmark', text: 'The company behind Claude; seen on docs, pricing and legal pages.' },
        { sample: 'Sonnet 5.5 ▾', label: 'Model selector', text: 'Shows which model answers (e.g. Sonnet, Opus, Fable).' },
        { sample: 'Web search · Drive · Gmail', label: 'Tool & connector icons', text: 'Which tools or connected apps are switched on.' },
        { sample: '▣ report.xlsx', label: 'File attachment chip', text: 'A file is attached and will be read with your prompt.' },
        { sample: '…claim text [1] [2]', label: 'Search & citations', text: '"Searching the web" status, then numbered source links.' },
        { sample: 'Thinking… ■ Stop', label: 'Processing indicator', text: 'Claude is working: wait or press Stop.' },
        { sample: 'Something went wrong · Retry', label: 'Error / retry', text: 'Request failed: check connection or service status.' },
        { sample: 'Limit reached · resets 5 PM', label: 'Usage-limit notice', text: 'Allowance used; shows when it resets or how to upgrade.' },
        { sample: 'Claude can make mistakes…', label: 'Standing reminder', text: 'Double-check important answers.' },
      ],
      footer: 'Sample visuals are approximations; exact wording and icons change with app updates. Use logos only per Anthropic brand guidelines.',
    },
    {
      id: 'R5',
      layout: 'reference',
      kind: 'table',
      title: 'Fixing common issues',
      columns: ['Problem', 'Possible cause', 'Recommended solution'],
      rows: [
        ['Claude is not responding', 'Service issue or connection problem', 'Check internet and status.claude.com; refresh'],
        ['File cannot be uploaded', 'Unsupported format or size limit', 'Check supported formats; split or convert the file'],
        ['Usage limit reached', '5-hour or weekly allowance used', 'Wait for reset or review plan options'],
        ['Incorrect response', 'Missing context or inaccurate info', 'Add context, attach sources, verify facts'],
        ['Slow responses', 'Complex task or high demand', 'Simplify or split the request; retry later'],
        ['Feature unavailable', 'Plan, platform or region limit', 'Check plan features and Settings toggles'],
      ],
      footer: 'Self-help: status.claude.com · Profile menu → Settings · support.claude.com (formats, limits, official support).',
    },
    {
      id: 'R6',
      layout: 'reference',
      kind: 'prompts',
      title: 'Live demo prompts',
      prompts: [
        {
          label: 'Demo 1 · Information gathering',
          feature: 'Web search or Research',
          prompt:
            'Research the top 5 trends in browser-based virtual labs for universities in 2026. Organize them in a table with a one-line summary and a cited source for each.',
          output: 'Cited trend table',
        },
        {
          label: 'Demo 2 · Excel data organization',
          feature: 'File upload + analysis (upload sample_enrollments.xlsx)',
          prompt:
            'Identify the columns, summarize the data, list missing or inconsistent entries, and create a summary table and chart by Category.',
          output: 'Issues list, summary table, chart',
        },
        {
          label: 'Demo 3 · Content creation',
          feature: 'Docs / Artifacts',
          prompt:
            'Create a one-page onboarding guide for new virtual-lab users, then make an interactive checklist artifact from it.',
          output: 'Editable guide + checklist',
        },
      ],
      footer: 'Use sample or non-sensitive data only. Optional: adds about 3–5 minutes if run live after Part 4.',
    },
    {
      id: 'R7',
      layout: 'reference',
      kind: 'list',
      title: 'References',
      items: [
        'Anthropic – Claude pricing & plans (accessed Nov 17, 2026)',
        'Anthropic – News & announcements',
        'Bai et al. (2022) – Constitutional AI: Harmlessness from AI Feedback (arXiv:2212.08073)',
        'Wikipedia – Anthropic (company history, funding, models)',
        'Releasebot – Claude updates, November 2026',
        'TechCrunch – Anthropic launches Claude Meetings (Nov 10, 2026)',
        'CASRAI – Claude launches Whiteboards, Sheets and Data (Nov 2026)',
        'Exploding Topics – AI chatbot market share (Nov 4, 2026)',
        'Whizi – AI chatbot market share 2026 (Nov 1, 2026)',
        'First Page Sage – Top generative AI chatbots (Nov 2, 2026)',
        'fatjoe – Claude AI statistics (Nov 10, 2026)',
        'DigitalToday – ChatGPT holds 81% of AI chatbot sessions (Nov 10, 2026)',
        'ToolNavs – Fable 5.2 tops Intelligence Index (Nov 9, 2026)',
        'Artificial Analysis – LLM leaderboard',
        'Claude status page (status.claude.com)',
        'Claude Help Center (support.claude.com)',
      ],
      footer:
        'Market figures come from secondary reports citing Similarweb, Ramp, Menlo Ventures, Sensor Tower and Anthropic filings; verify against primary data before external publication.',
    },
  ],
};
