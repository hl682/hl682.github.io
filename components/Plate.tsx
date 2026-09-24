type Props = {
  src: string;
  alt?: string;
  kicker?: string;
  caption?: string;
  wide?: boolean;
  contain?: boolean;
  empty?: string;
};

export function Plate({ src, alt = "", kicker, caption, wide, contain, empty }: Props) {
  const figureClass = ["plate", wide ? "plate-wide" : "", contain ? "plate-contain" : ""].filter(Boolean).join(" ");
  return (
    <figure className={figureClass}>
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
