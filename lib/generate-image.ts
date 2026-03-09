/**
 * Generates an AI image URL via Pollinations based on product title and niche.
 * Used as a fallback when scraping fails to extract a real product image.
 */
export function generateNicheImage(title: string, niche?: string): string {
  const nicheLabel = niche || "digital product";
  const prompt = [
    "professional product showcase",
    "modern sleek design",
    nicheLabel,
    title,
    "premium quality",
    "photorealistic",
    "vibrant colors",
    "clean composition",
    "no text",
    "no watermark",
    "no words",
    "no letters",
  ].join(", ");

  const seed = title
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=800&seed=${seed}&nologo=true`;
}

/**
 * Returns true if the URL is a placeholder (placehold.co) or empty/null.
 */
export function isPlaceholderImage(url: string | null | undefined): boolean {
  if (!url) return true;
  return url.includes("placehold.co") || url.includes("placehold.it") || url.length < 10;
}
