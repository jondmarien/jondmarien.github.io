import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/bootscreen.inline"
import style from "./styles/bootscreen.scss"

const BootScreen: QuartzComponent = () => {
  return (
    <div id="boot-screen" class="boot-screen">
      {/* WebGL shader background */}
      <div id="boot-terminal-bg"></div>

      {/* Vignette overlay for readability */}
      <div id="boot-vignette"></div>

      {/* Boot text content */}
      <div id="boot-content">
        <div id="boot-lines"></div>
        <span id="boot-cursor">█</span>
      </div>

      {/* Skip hint */}
      <div class="boot-skip-hint">Press any key or click to skip</div>
    </div>
  )
}

BootScreen.afterDOMLoaded = script
BootScreen.css = style

export default (() => BootScreen) satisfies QuartzComponentConstructor
