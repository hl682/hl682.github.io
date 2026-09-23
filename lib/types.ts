export type Lang = "en" | "zh";

export type Chapter = {
  id: string;
  index: string;
  label: string;
};

export type Paper = {
  slug: string;
  title: string;
  years: string;
  venue: string;
  abstract: string;
  explainer: string;
  hero: string;
  figures: string[];
  videoUrl?: string;
  measures?: { label: string; value: string }[];
};

export type LabNote = {
  slug: string;
  title: string;
  date: string;
  premise: string;
  failed: string;
  lesson: string;
  figure: string;
  videoUrl?: string;
};

export type ReadingPiece = {
  slug: string;
  title: string;
  authors: string;
  year: string;
  why: string;
  explainer: string;
  link?: string;
  infographic: string;
  slidesUrl?: string;
  audioUrl?: string;
};

export type RunwayItem = {
  slug: string;
  title: string;
  house: string;
  season: string;
  date: string;
  kind: string;
  credit: string;
  note: string;
  stills: string[];
  videoUrl?: string;
};

export type LensPhoto = {
  slug: string;
  title: string;
  series: string;
  year: string;
  place: string;
  caption: string;
  image: string;
};

export type VideoPiece = {
  slug: string;
  title: string;
  url: string;
  kind: string;
  caption: string;
  poster: string;
};

export type Bundle<T> = {
  items: T[];
  fromSeed: boolean;
};
