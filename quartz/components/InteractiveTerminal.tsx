import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/InteractiveTerminal.inline"
import style from "./styles/TerminalGreeting.scss"

const InteractiveTerminal: QuartzComponent = () => {
  return (
    <div id="terminal-container" style="margin-top: 2rem; margin-bottom: 2rem; min-height: 200px;">
      <div
        class="terminal-greeting terminal-placeholder"
        style="background: #050505; border: 1px solid #00ff41; padding: 1rem; color: #00ff41; font-family: 'Fira Code', monospace; display: flex; align-items: center; gap: 10px;"
      >
        <span class="prefix">sysadmin@chron0.tech:~$</span>
        <span class="message"> initializing link...</span>
        <span class="cursor">█</span>
      </div>
    </div>
  )
}

InteractiveTerminal.afterDOMLoaded = script
InteractiveTerminal.css = style

export default (() => InteractiveTerminal) satisfies QuartzComponentConstructor
