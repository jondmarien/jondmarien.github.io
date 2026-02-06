// ============================================================================
// POINTILLISM CANVAS - Progressive dot-by-dot image reveal
// ============================================================================
// Renders semi-transparent dots that accumulate over time to reveal an image.
// Uses Canvas 2D which naturally preserves drawn content across frames.
// Only runs on the homepage (index page).

const IMAGE_PATH = "/static/infinity.webp"

// Configuration — tune these for visual quality
// Target look: pic 2 style — visible individual dots, high opacity, vibrant
const CONFIG = {
  dotRadiusMin: 2.0,       // Minimum dot radius in CSS pixels
  dotRadiusMax: 5.0,       // Maximum dot radius (dark areas get larger dots)
  dotsPerFrame: 15,        // Dots placed per animation frame (slow reveal)
  totalDots: 80000,        // Total dots before "complete"
  dotOpacity: 0.5,         // Per-dot alpha — p5.js style (128/255 ≈ 0.5)
  restartDelayMs: 6000,    // Pause before clearing and restarting
  brightnessBoost: 1.2,    // Slight boost to counteract dark bg
}

// ============================================================================
// IMAGE SAMPLING
// ============================================================================

interface DotData {
  x: number
  y: number
  r: number
  g: number
  b: number
  radius: number
}

function sampleImageToDots(
  img: HTMLImageElement,
  sampleWidth: number,
  sampleHeight: number,
): DotData[] {
  const offscreen = document.createElement("canvas")
  offscreen.width = sampleWidth
  offscreen.height = sampleHeight
  const offCtx = offscreen.getContext("2d")
  if (!offCtx) return []

  // Draw image scaled to cover canvas
  const imgAspect = img.naturalWidth / img.naturalHeight
  const canvasAspect = sampleWidth / sampleHeight
  let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number

  if (imgAspect > canvasAspect) {
    drawHeight = sampleHeight
    drawWidth = sampleHeight * imgAspect
    offsetX = (sampleWidth - drawWidth) / 2
    offsetY = 0
  } else {
    drawWidth = sampleWidth
    drawHeight = sampleWidth / imgAspect
    offsetX = 0
    offsetY = (sampleHeight - drawHeight) / 2
  }

  offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  const imageData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight)
  const pixels = imageData.data
  const boost = CONFIG.brightnessBoost

  const result: DotData[] = []
  for (let i = 0; i < CONFIG.totalDots; i++) {
    const x = Math.random() * sampleWidth
    const y = Math.random() * sampleHeight
    const px = Math.floor(x)
    const py = Math.floor(y)
    const idx = (py * sampleWidth + px) * 4

    // Boost brightness so dots aren't too dark on black background
    const r = Math.min(255, pixels[idx] * boost)
    const g = Math.min(255, pixels[idx + 1] * boost)
    const b = Math.min(255, pixels[idx + 2] * boost)

    const brightness = (r + g + b) / 3
    const sizeFactor = 1 - brightness / 255
    const radius =
      CONFIG.dotRadiusMin + sizeFactor * (CONFIG.dotRadiusMax - CONFIG.dotRadiusMin)

    result.push({ x, y, r, g, b, radius })
  }

  return result
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// ============================================================================
// CANVAS 2D RENDERER
// ============================================================================
// Canvas 2D naturally preserves drawn content across frames — perfect for
// accumulating semi-transparent dots that build up to reveal the image.

function initPointillism() {
  const container = document.getElementById("pointillism-container")
  const canvas = document.getElementById("pointillism-canvas") as HTMLCanvasElement | null
  if (!container || !canvas) return

  // Only run on homepage
  const path = window.location.pathname
  if (path !== "/" && path !== "/index.html") {
    container.style.display = "none"
    return
  }
  container.style.display = ""

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Load source image
  const img = new Image()
  img.crossOrigin = "anonymous"
  img.src = IMAGE_PATH

  let animationId: number | null = null
  let restartTimer: number | null = null
  let dotIndex = 0
  let dots: DotData[] = []
  let isComplete = false
  let displayWidth = 0
  let displayHeight = 0

  function setupCanvas() {
    const rect = container!.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    displayWidth = Math.floor(rect.width)
    displayHeight = Math.floor(rect.height)
    canvas!.width = displayWidth * dpr
    canvas!.height = displayHeight * dpr
    canvas!.style.width = `${displayWidth}px`
    canvas!.style.height = `${displayHeight}px`
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function drawDot(dot: DotData) {
    const dx = dot.x
    const dy = dot.y
    const dr = dot.radius

    ctx!.beginPath()
    ctx!.arc(dx, dy, dr, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(${Math.round(dot.r)}, ${Math.round(dot.g)}, ${Math.round(dot.b)}, ${CONFIG.dotOpacity})`
    ctx!.fill()
  }

  function animate() {
    if (isComplete) return

    const end = Math.min(dotIndex + CONFIG.dotsPerFrame, dots.length)
    for (let i = dotIndex; i < end; i++) {
      drawDot(dots[i])
    }
    dotIndex = end

    if (dotIndex >= dots.length) {
      isComplete = true
      restartTimer = window.setTimeout(restart, CONFIG.restartDelayMs)
      return
    }

    animationId = requestAnimationFrame(animate)
  }

  function restart() {
    // Clear canvas
    ctx!.save()
    ctx!.setTransform(1, 0, 0, 1, 0, 0)
    ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
    ctx!.restore()

    dots = shuffleArray(dots)
    dotIndex = 0
    isComplete = false
    animationId = requestAnimationFrame(animate)
  }

  function start() {
    setupCanvas()
    if (displayWidth === 0 || displayHeight === 0) return

    dots = sampleImageToDots(img, displayWidth, displayHeight)
    dots = shuffleArray(dots)
    dotIndex = 0
    isComplete = false
    animationId = requestAnimationFrame(animate)
  }

  function stopAll() {
    if (animationId) cancelAnimationFrame(animationId)
    if (restartTimer) clearTimeout(restartTimer)
    animationId = null
    restartTimer = null
  }

  img.onload = () => start()

  // Handle resize with debounce
  let resizeTimeout: number | null = null
  const handleResize = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(() => {
      if (!img.complete || img.naturalWidth === 0) return
      stopAll()
      start()
    }, 400)
  }

  window.addEventListener("resize", handleResize)

  // Cleanup on SPA navigation
  window.addCleanup?.(() => {
    stopAll()
    if (resizeTimeout) clearTimeout(resizeTimeout)
    window.removeEventListener("resize", handleResize)
  })
}

document.addEventListener("nav", () => {
  initPointillism()
})
