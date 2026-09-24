import { Plate } from "./Plate";

function embed(url: string): { kind: "iframe" | "file"; src: string } | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${id}` } : null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).pop();
      if (!id || id === "embed") return null;
      const videoId = parsed.pathname.startsWith("/embed/") ? parsed.pathname.split("/")[2] : id;
      return { kind: "iframe", src: `https://www.youtube-nocookie.com/embed/${videoId}` };
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id && /^\d+$/.test(id) ? { kind: "iframe", src: `https://player.vimeo.com/video/${id}` } : null;
    }
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(parsed.pathname)) return { kind: "file", src: url };
    return null;
  } catch {
    return null;
  }
}

export function VideoSlot({
  url,
  title,
  empty,
  caption,
}: {
  url?: string;
  title: string;
  empty: string;
  caption?: string;
}) {
  const framed = url ? embed(url) : null;
  if (!framed) {
    return (
      <div>
        <Plate src="/media/fog-path.svg" alt="" kicker={empty} caption={caption ?? title} empty={empty} wide />
        {url ? (
          <p className="quiet">
            <a className="file-link" href={url} rel="noreferrer">
              {url}
            </a>
          </p>
        ) : null}
      </div>
    );
  }
  return (
    <figure className="plate plate-wide">
      <div className="plate-stage">
        {framed.kind === "file" ? (
          <video src={framed.src} controls playsInline poster="/media/fog-path.svg" />
        ) : (
          <iframe src={framed.src} title={title} allow="fullscreen; picture-in-picture" allowFullScreen />
        )}
      </div>
      {caption ? (
        <figcaption>
          <span className="quiet">{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
