import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/TerminalGreeting.scss"

// Typewriter greeting component
const TerminalGreeting: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`terminal-greeting ${displayClass ?? ""}`}>
      <span class="prefix">sysadmin@chron0.tech:~$</span>
      <span class="message"> initializing link...</span>
      <span class="cursor">█</span>
    </div>
  )
}

TerminalGreeting.css = style

export default (() => TerminalGreeting) satisfies QuartzComponentConstructor
