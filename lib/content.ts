import { cache } from "react";
import { client, plateUrl, sanityConfigured } from "./sanity";
import { seedLens, seedModelCard, seedNotes, seedPapers, seedReading, seedRunway, seedVideos } from "./seed";
import type { Bundle, LabNote, LensPhoto, ModelCard, Paper, ReadingPiece, RunwayItem, VideoPiece } from "./types";

const fallbackPlates = ["/media/cloister.svg", "/media/quad.svg", "/media/drape.svg", "/media/fog-path.svg", "/media/diagram.svg"];

function plateAt(index: number) {
  return fallbackPlates[index % fallbackPlates.length];
}

async function fetchOrSeed<T>(query: string, map: (rows: unknown[]) => T[], seed: T[]): Promise<Bundle<T>> {
  if (!sanityConfigured || !client) return { items: seed, fromSeed: true };
  try {
    const rows = await client.fetch<unknown[]>(query);
    if (!Array.isArray(rows) || rows.length === 0) return { items: seed, fromSeed: true };
    const items = map(rows).filter(Boolean);
    if (!items.length) return { items: seed, fromSeed: true };
    return { items, fromSeed: false };
  } catch {
    return { items: seed, fromSeed: true };
  }
}

export const getPapers = cache(async (): Promise<Bundle<Paper>> => {
  return fetchOrSeed(
    `*[_type == "paper"] | order(years desc) {
      title, years, venue, abstract, explainer, videoUrl, publicationUrl,
      "slug": slug.current,
      "pdfUrl": pdf.asset->url,
      hero, figures
    }`,
    (rows) =>
      rows.map((row, index) => {
        const paper = row as {
          slug?: string;
          title?: string;
          years?: string;
          venue?: string;
          abstract?: string;
          explainer?: string;
          videoUrl?: string;
          pdfUrl?: string;
          publicationUrl?: string;
          hero?: { asset?: { _ref?: string } };
          figures?: { asset?: { _ref?: string } }[];
        };
        if (!paper.slug || !paper.title) return null as unknown as Paper;
        const figures = (paper.figures ?? [])
          .map((figure) => plateUrl(figure, ""))
          .filter((url) => url.length > 0);
        return {
          slug: paper.slug,
          title: paper.title,
          years: paper.years ?? "",
          venue: paper.venue ?? "",
          abstract: paper.abstract ?? "",
          explainer: paper.explainer ?? "",
          hero: plateUrl(paper.hero, plateAt(index)),
          figures,
          videoUrl: paper.videoUrl || undefined,
          pdfUrl: paper.pdfUrl || undefined,
          publicationUrl: paper.publicationUrl || undefined,
        };
      }),
    seedPapers,
  );
});

export const getNotes = cache(async (): Promise<Bundle<LabNote>> => {
  return fetchOrSeed(
    `*[_type == "labNote"] | order(_createdAt desc) {
      title, date, premise, failed, lesson, videoUrl, figure,
      "slug": slug.current
    }`,
    (rows) =>
      rows.map((row, index) => {
        const note = row as {
          slug?: string;
          title?: string;
          date?: string;
          premise?: string;
          failed?: string;
          lesson?: string;
          videoUrl?: string;
          figure?: { asset?: { _ref?: string } };
        };
        if (!note.slug || !note.title) return null as unknown as LabNote;
        return {
          slug: note.slug,
          title: note.title,
          date: note.date ?? "",
          premise: note.premise ?? "",
          failed: note.failed ?? "",
          lesson: note.lesson ?? "",
          figure: plateUrl(note.figure, plateAt(index + 1)),
          videoUrl: note.videoUrl || undefined,
        };
      }),
    seedNotes,
  );
});

export const getReading = cache(async (): Promise<Bundle<ReadingPiece>> => {
  return fetchOrSeed(
    `*[_type == "readingPiece"] | order(year desc) {
      title, authors, year, why, explainer, link, slidesUrl, audioUrl, infographic,
      "slug": slug.current
    }`,
    (rows) =>
      rows.map((row, index) => {
        const piece = row as {
          slug?: string;
          title?: string;
          authors?: string;
          year?: string;
          why?: string;
          explainer?: string;
          link?: string;
          slidesUrl?: string;
          audioUrl?: string;
          infographic?: { asset?: { _ref?: string } };
        };
        if (!piece.slug || !piece.title) return null as unknown as ReadingPiece;
        return {
          slug: piece.slug,
          title: piece.title,
          authors: piece.authors ?? "",
          year: piece.year ?? "",
          why: piece.why ?? "",
          explainer: piece.explainer ?? "",
          link: piece.link || undefined,
          slidesUrl: piece.slidesUrl || undefined,
          audioUrl: piece.audioUrl || undefined,
          infographic: plateUrl(piece.infographic, plateAt(index + 2)),
        };
      }),
    seedReading,
  );
});

export const getRunway = cache(async (): Promise<Bundle<RunwayItem>> => {
  return fetchOrSeed(
    `*[_type == "runwayMedia"] | order(date desc) {
      title, house, season, date, kind, credit, note, videoUrl, stills,
      "slug": slug.current
    }`,
    (rows) =>
      rows.map((row, index) => {
        const item = row as {
          slug?: string;
          title?: string;
          house?: string;
          season?: string;
          date?: string;
          kind?: string;
          credit?: string;
          note?: string;
          videoUrl?: string;
          stills?: { asset?: { _ref?: string } }[];
        };
        if (!item.slug || !item.title) return null as unknown as RunwayItem;
        const stills = (item.stills ?? []).map((still) => plateUrl(still, "")).filter(Boolean);
        return {
          slug: item.slug,
          title: item.title,
          house: item.house ?? "",
          season: item.season ?? "",
          date: item.date ?? "",
          kind: item.kind ?? "still",
          credit: item.credit ?? "",
          note: item.note ?? "",
          stills: stills.length ? stills : [plateAt(index)],
          videoUrl: item.videoUrl || undefined,
        };
      }),
    seedRunway,
  );
});

export const getLens = cache(async (): Promise<Bundle<LensPhoto>> => {
  return fetchOrSeed(
    `*[_type == "lensPhoto"] | order(year desc) {
      title, series, year, place, caption, image,
      "slug": slug.current
    }`,
    (rows) =>
      rows.map((row, index) => {
        const photo = row as {
          slug?: string;
          title?: string;
          series?: string;
          year?: string;
          place?: string;
          caption?: string;
          image?: { asset?: { _ref?: string } };
        };
        if (!photo.slug || !photo.title) return null as unknown as LensPhoto;
        return {
          slug: photo.slug,
          title: photo.title,
          series: photo.series ?? "",
          year: photo.year ?? "",
          place: photo.place ?? "",
          caption: photo.caption ?? "",
          image: plateUrl(photo.image, plateAt(index)),
        };
      }),
    seedLens,
  );
});

export const getVideos = cache(async (): Promise<Bundle<VideoPiece>> => {
  return fetchOrSeed(
    `*[_type == "videoPiece"] | order(_createdAt desc) {
      title, url, kind, caption, poster,
      "slug": slug.current
    }`,
    (rows) =>
      rows.flatMap((row) => {
        const video = row as {
          slug?: string;
          title?: string;
          url?: string;
          kind?: string;
          caption?: string;
          poster?: { asset?: { _ref?: string } };
        };
        if (!video.slug || !video.title || !video.url) return [];
        return [
          {
            slug: video.slug,
            title: video.title,
            url: video.url,
            kind: video.kind ?? "runway",
            caption: video.caption ?? "",
            poster: plateUrl(video.poster, "/media/fog-path.svg"),
          },
        ];
      }),
    seedVideos.filter((video) => video.url.length > 0),
  );
});

export const getModelCard = cache(async (): Promise<{ item: ModelCard; fromSeed: boolean }> => {
  if (!sanityConfigured || !client) return { item: seedModelCard, fromSeed: true };
  try {
    const row = await client.fetch<{
      name?: string;
      agency?: string;
      email?: string;
      city?: string;
      note?: string;
      measurements?: { label?: string; value?: string }[];
      stills?: { asset?: { _ref?: string } }[];
    } | null>(`*[_type == "modelCard"] | order(_updatedAt desc)[0]{
      name, agency, email, city, note, measurements, stills
    }`);
    if (!row) return { item: seedModelCard, fromSeed: true };
    const stills = (row.stills ?? []).map((still) => plateUrl(still, "")).filter(Boolean);
    const measurements = (row.measurements ?? [])
      .filter((entry) => entry.label)
      .map((entry) => ({ label: entry.label ?? "", value: entry.value ?? "" }));
    return {
      item: {
        name: row.name || seedModelCard.name,
        agency: row.agency || seedModelCard.agency,
        email: row.email || seedModelCard.email,
        city: row.city || seedModelCard.city,
        note: row.note || seedModelCard.note,
        measurements: measurements.length ? measurements : seedModelCard.measurements,
        stills: stills.length ? stills : seedModelCard.stills,
      },
      fromSeed: false,
    };
  } catch {
    return { item: seedModelCard, fromSeed: true };
  }
});

export async function getPaper(slug: string) {
  const bundle = await getPapers();
  return { item: bundle.items.find((paper) => paper.slug === slug) ?? null, fromSeed: bundle.fromSeed };
}

export async function getNote(slug: string) {
  const bundle = await getNotes();
  return { item: bundle.items.find((note) => note.slug === slug) ?? null, fromSeed: bundle.fromSeed };
}

export async function getReadingPiece(slug: string) {
  const bundle = await getReading();
  return { item: bundle.items.find((piece) => piece.slug === slug) ?? null, fromSeed: bundle.fromSeed };
}
