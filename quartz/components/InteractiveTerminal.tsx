import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/InteractiveTerminal.inline"

const InteractiveTerminal: QuartzComponent = () => {
  return (
    <div id="terminal-container" style="margin-top: 2rem; margin-bottom: 2rem;">
      <div
        className="terminal-placeholder"
        style="background: #050505; border: 1px solid #00ff41; padding: 1rem; color: #00ff41; font-family: 'Fira Code', monospace; display: flex; align-items: center; gap: 10px;"
      >
        <span style="animation: blink 1s infinite;">&gt;</span> INITIALIZING SHELL...
      </div>
    </div>
  )
}

InteractiveTerminal.afterDOMLoaded = script

export default (() => InteractiveTerminal) satisfies QuartzComponentConstructor
