import Rich from '../components/Rich.jsx';

export default function TitleScene({ scene }) {
  const [lead, rest] = scene.title.split(': ');
  return (
    <div className="scene-pad title-scene">
      <div className="title-rings" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <span className="eyebrow rise" style={{ '--i': 0 }}>
        {scene.kicker}
      </span>
      <h1 className="h-hero rise" style={{ '--i': 1 }}>
        <Rich text={`${lead}:`} />
        <br />
        {/* keep the last two words together so a single word never sits alone */}
        {rest.replace(/ (\S+)$/, ' $1')}
      </h1>
      <div className="title-meta rise" style={{ '--i': 3 }}>
        <b>{scene.subtitle}</b>
        <span>{scene.meta}</span>
      </div>
    </div>
  );
}
