import { defineArrayMember, defineField, defineType } from "sanity";

const slug = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) => rule.required(),
});

const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt",
        type: "string",
        description: "What a visitor who cannot see the plate should be told.",
      }),
    ],
  });

export const paper = defineType({
  name: "paper",
  title: "Paper",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    slug,
    defineField({ name: "years", title: "Years", type: "string", description: "e.g. 2024–2026" }),
    defineField({ name: "venue", title: "Venue / status line", type: "string" }),
    defineField({ name: "abstract", title: "Abstract", type: "text", rows: 8 }),
    defineField({
      name: "explainer",
      title: "Explainer",
      type: "text",
      rows: 6,
      description: "Plain-language account of the work.",
    }),
    imageWithAlt("hero", "Hero plate / screenshot"),
    defineField({
      name: "figures",
      title: "Further plates",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube, Vimeo, or a direct .mp4 / .webm link.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "years", media: "hero" } },
});

export const labNote = defineType({
  name: "labNote",
  title: "Lab note",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    slug,
    defineField({ name: "date", title: "Date", type: "string" }),
    defineField({ name: "premise", title: "Premise", type: "text", rows: 4 }),
    defineField({
      name: "failed",
      title: "Why it failed",
      type: "text",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({ name: "lesson", title: "What remained", type: "text", rows: 4 }),
    imageWithAlt("figure", "Plate"),
    defineField({ name: "videoUrl", title: "Video URL", type: "url" }),
  ],
  preview: { select: { title: "title", subtitle: "date", media: "figure" } },
});

export const readingPiece = defineType({
  name: "readingPiece",
  title: "Reading room",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    slug,
    defineField({ name: "authors", title: "Authors", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "why", title: "Why it stays on the table", type: "text", rows: 4 }),
    defineField({ name: "explainer", title: "Explainer", type: "text", rows: 6 }),
    defineField({ name: "link", title: "Paper link", type: "url" }),
    imageWithAlt("infographic", "Infographic"),
    defineField({ name: "slidesUrl", title: "Slides URL", type: "url", description: "PPT, PDF, or Google Slides." }),
    defineField({ name: "audioUrl", title: "Audio URL", type: "url", description: "mp3 or a hosted recording." }),
  ],
  preview: { select: { title: "title", subtitle: "authors", media: "infographic" } },
});

export const runwayMedia = defineType({
  name: "runwayMedia",
  title: "Runway",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    slug,
    defineField({ name: "house", title: "House / client", type: "string" }),
    defineField({ name: "season", title: "Season", type: "string" }),
    defineField({ name: "date", title: "Date", type: "string" }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: { list: ["campaign", "runway", "still", "film"] },
    }),
    defineField({ name: "credit", title: "Credit", type: "text", rows: 3 }),
    defineField({ name: "note", title: "Note", type: "text", rows: 3 }),
    defineField({
      name: "stills",
      title: "Stills",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({ name: "videoUrl", title: "Film URL", type: "url" }),
  ],
  preview: { select: { title: "title", subtitle: "house" } },
});

export const lensPhoto = defineType({
  name: "lensPhoto",
  title: "Lens",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    slug,
    defineField({ name: "series", title: "Series", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "place", title: "Place", type: "string" }),
    defineField({ name: "caption", title: "Caption", type: "text", rows: 3 }),
    imageWithAlt("image", "Photograph"),
  ],
  preview: { select: { title: "title", subtitle: "series", media: "image" } },
});

export const videoPiece = defineType({
  name: "videoPiece",
  title: "Video",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    slug,
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (r) => r.required(),
      description: "YouTube, Vimeo, or a direct media file.",
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: { list: ["paper", "runway", "lens", "note"] },
    }),
    defineField({ name: "caption", title: "Caption", type: "text", rows: 3 }),
    imageWithAlt("poster", "Poster still"),
  ],
  preview: { select: { title: "title", subtitle: "kind", media: "poster" } },
});

export const schemaTypes = [paper, labNote, readingPiece, runwayMedia, lensPhoto, videoPiece];
