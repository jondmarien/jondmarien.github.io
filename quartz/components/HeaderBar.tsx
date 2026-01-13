import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/HeaderBar.scss"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const HeaderBar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const links = opts?.links ?? []
    return (
      <header class={`header-bar ${displayClass ?? ""}`}>
        <div class="system-status">
          <span class="status-indicator">●</span> SYSTEM ONLINE
        </div>
        <nav class="header-links">
          {Object.entries(links).map(([text, link]) => (
            <a href={link} class="header-link">
              [{text}]
            </a>
          ))}
        </nav>
      </header>
    )
  }

  HeaderBar.css = style
  return HeaderBar
}) satisfies QuartzComponentConstructor
