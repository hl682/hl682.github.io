type Props = {
  src: string;
  alt?: string;
  kicker?: string;
  caption?: string;
  wide?: boolean;
  empty?: string;
};

export function Plate({ src, alt = "", kicker, caption, wide, empty }: Props) {
  return (
    <figure className={wide ? "plate plate-wide" : "plate"}>
      <div className="plate-stage">
        <img src={src} alt={alt} />
        {empty ? <span className="ledger slot-label">{empty}</span> : null}
      </div>
      {kicker || caption ? (
        <figcaption>
          {kicker ? <span className="ledger">{kicker}</span> : null}
          {caption ? <span className="quiet">{caption}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
