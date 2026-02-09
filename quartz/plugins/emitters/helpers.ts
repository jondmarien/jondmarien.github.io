import path from "path"
import fs from "fs"
import { BuildCtx } from "../../util/ctx"
import { FilePath, FullSlug, joinSegments } from "../../util/path"
import { Readable } from "stream"

// Use Bun.write() when available for optimized I/O (fewer syscalls, faster writes).
declare const Bun: { write?: (path: string, data: string | Buffer | Readable) => Promise<number> } | undefined
const hasBunWrite = typeof Bun !== "undefined" && typeof Bun.write === "function"

type WriteOptions = {
  ctx: BuildCtx
  slug: FullSlug
  ext: `.${string}` | ""
  content: string | Buffer | Readable
}

export const write = async ({ ctx, slug, ext, content }: WriteOptions): Promise<FilePath> => {
  const pathToPage = joinSegments(ctx.argv.output, slug + ext) as FilePath
  const dir = path.dirname(pathToPage)
  await fs.promises.mkdir(dir, { recursive: true })
  if (hasBunWrite) {
    await Bun!.write!(pathToPage, content)
  } else {
    await fs.promises.writeFile(pathToPage, content)
  }
  return pathToPage
}
