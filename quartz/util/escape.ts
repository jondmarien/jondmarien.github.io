// Use Bun's SIMD-accelerated escapeHTML when available (Bun >=1.0.2),
// otherwise fall back to a manual implementation for Node.js compatibility.
declare const Bun: { escapeHTML?: (input: string) => string } | undefined

const _fallbackEscape = (unsafe: string) =>
  unsafe
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")

export const escapeHTML: (unsafe: string) => string =
  typeof Bun !== "undefined" && typeof Bun.escapeHTML === "function"
    ? (unsafe) => Bun.escapeHTML!(unsafe)
    : _fallbackEscape

export const unescapeHTML = (html: string) => {
  return html
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&#x27;", "'")
}
