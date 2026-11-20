// Headline text helper: colors the word "Claude" coral (brand rule) and an
// optional extra word sky blue.
export default function Rich({ text, highlight }) {
  const pattern = highlight ? new RegExp(`(Claude|\\b${highlight}\\b)`) : /(Claude)/;
  return text.split(pattern).map((part, i) => {
    if (part === 'Claude') return <span key={i} className="claude">{part}</span>;
    if (highlight && part === highlight) return <span key={i} className="hl">{part}</span>;
    return part;
  });
}
