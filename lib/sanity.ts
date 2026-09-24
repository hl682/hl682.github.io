import imageUrlBuilder from "@sanity/image-url";
import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2026-01-01";

export const sanityConfigured = projectId.length > 0;

export const client: SanityClient | null = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
      timeout: 8000,
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function imageUrl(source: { asset?: { _ref?: string } | null } | null | undefined, width = 1600) {
  if (!source?.asset?._ref || !builder) return "";
  try {
    return builder.image(source).width(width).auto("format").quality(75).url();
  } catch {
    return "";
  }
}

type SanityImage = { asset?: { _ref?: string } | null; alt?: string } | null;

export function plateUrl(image: SanityImage | undefined, fallback: string, width = 1600) {
  if (image?.asset?._ref) {
    const url = imageUrl(image, width);
    if (url) return url;
  }
  return fallback;
}
