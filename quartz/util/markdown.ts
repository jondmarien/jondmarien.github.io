// Bun.markdown utility — provides fast markdown-to-HTML rendering using
// Bun's built-in SIMD-accelerated Markdown parser (available in Bun >=1.3.8).
// Falls back to a no-op when running under Node.js.
//
// This is intended for simple, standalone markdown rendering that does NOT
// need the full remark/rehype plugin pipeline (e.g. RSS descriptions,
// plaintext summaries, or any future feature that needs quick md→html).

declare const Bun:
  | {
      markdown?: {
        html?: (input: string, options?: BunMarkdownOptions) => string
      }
    }
  | undefined

interface BunMarkdownOptions {
  tables?: boolean
  strikethrough?: boolean
  tasklists?: boolean
  autolinks?: boolean
  wikiLinks?: boolean
  headings?: boolean | { ids?: boolean }
}

const hasBunMarkdown =
  typeof Bun !== "undefined" &&
  typeof Bun.markdown?.html === "function"

/**
 * Render a markdown string to HTML using Bun's built-in SIMD-accelerated parser.
 * Returns `null` when Bun.markdown is not available (i.e. running under Node.js).
 *
 * @example
 * ```ts
 * const html = bunMarkdownToHtml("# Hello **world**")
 * // "<h1>Hello <strong>world</strong></h1>\n"  (under Bun)
 * // null                                        (under Node.js)
 * ```
 */
export function bunMarkdownToHtml(
  input: string,
  options?: BunMarkdownOptions,
): string | null {
  if (!hasBunMarkdown) return null
  return Bun!.markdown!.html!(input, options)
}

/** Whether the Bun.markdown API is available in the current runtime. */
export const isBunMarkdownAvailable = hasBunMarkdown
