import { QuartzComponent, QuartzComponentConstructor } from "./types"
// @ts-ignore
import script from "./scripts/pointillism.inline"
import style from "./styles/pointillism.scss"

const PointillismCanvas: QuartzComponent = () => {
  return (
    <div id="pointillism-container" class="pointillism-container">
      <canvas id="pointillism-canvas"></canvas>
    </div>
  )
}

PointillismCanvas.afterDOMLoaded = script
PointillismCanvas.css = style

export default (() => PointillismCanvas) satisfies QuartzComponentConstructor
