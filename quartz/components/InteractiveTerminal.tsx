import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/InteractiveTerminal.inline"
import style from "./styles/TerminalGreeting.scss"

const InteractiveTerminal: QuartzComponent = () => {
  return (
    <div id="terminal-container" style="margin-top: 2rem; margin-bottom: 2rem;">
      <div class="terminal-header">
        <span class="terminal-title">chron0.tech@root:~</span>
        <button class="terminal-toggle" aria-label="Toggle Terminal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-down"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      <div class="terminal-body" style="min-height: 200px;">
        <div
          class="terminal-greeting terminal-placeholder"
          style="background: #050505; border: 1px solid #00ff41; padding: 1rem; color: #00ff41; font-family: 'Fira Code', monospace; display: flex; align-items: center; gap: 10px;"
        >
          <span class="prefix">sysadmin@chron0.tech:~$</span>
          <span class="message"> initializing link...</span>
          <span class="cursor">█</span>
        </div>
      </div>
    </div>
  )
}

InteractiveTerminal.afterDOMLoaded = script
InteractiveTerminal.css = style

export default (() => InteractiveTerminal) satisfies QuartzComponentConstructor
