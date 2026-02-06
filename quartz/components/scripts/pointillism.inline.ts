// ============================================================================
// POINTILLISM CANVAS - Progressive dot-by-dot image reveal
// ============================================================================
// Loads a source image, samples pixel colors, and progressively draws dots
// onto a canvas to create an animated pointillism effect.
// Only runs on the homepage (index page).

const IMAGE_PATH = "/static/infinity.webp"

// Configuration
const DOT_RADIUS_MIN = 1.5
const DOT_RADIUS_MAX = 4
const DOTS_PER_FRAME = 80 // How many dots to place each animation frame
const TOTAL_DOTS = 25000 // Total dots before the image is "complete"
const FADE_IN_AFTER_COMPLETE = true // Subtle glow after completion
const RESTART_DELAY_MS = 3000 // Pause before restarting the animation

interface DotData {
  x: number
  y: number
  r: number
  g: number
  b: number
  a: number
  radius: number
}

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
  let dotIndex = 0
  let dots: DotData[] = []
  let isComplete = false

  // Resize canvas to fit container
  function resize() {
    if (!container || !canvas) return
    const rect = container.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    ctx!.scale(dpr, dpr)
  }

  // Sample pixel data from the image
  function sampleImage(img: HTMLImageElement, canvasWidth: number, canvasHeight: number): DotData[] {
    // Create offscreen canvas to read pixel data
    const offscreen = document.createElement("canvas")
    offscreen.width = canvasWidth
    offscreen.height = canvasHeight
    const offCtx = offscreen.getContext("2d")
    if (!offCtx) return []

    // Draw image scaled to fit canvas (cover)
    const imgAspect = img.naturalWidth / img.naturalHeight
    const canvasAspect = canvasWidth / canvasHeight

    let drawWidth: number, drawHeight: number, offsetX: number, offsetY: number

    if (imgAspect > canvasAspect) {
      // Image is wider - fit by height
      drawHeight = canvasHeight
      drawWidth = canvasHeight * imgAspect
      offsetX = (canvasWidth - drawWidth) / 2
      offsetY = 0
    } else {
      // Image is taller - fit by width
      drawWidth = canvasWidth
      drawHeight = canvasWidth / imgAspect
      offsetX = 0
      offsetY = (canvasHeight - drawHeight) / 2
    }

    offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    const imageData = offCtx.getImageData(0, 0, canvasWidth, canvasHeight)
    const pixels = imageData.data

    // Generate random dot positions and sample colors
    const result: DotData[] = []
    for (let i = 0; i < TOTAL_DOTS; i++) {
      const x = Math.random() * canvasWidth
      const y = Math.random() * canvasHeight
      const px = Math.floor(x)
      const py = Math.floor(y)
      const idx = (py * canvasWidth + px) * 4

      const r = pixels[idx]
      const g = pixels[idx + 1]
      const b = pixels[idx + 2]
      const a = pixels[idx + 3]

      // Vary dot size based on brightness (darker areas get slightly larger dots)
      const brightness = (r + g + b) / 3
      const sizeFactor = 1 - brightness / 255
      const radius = DOT_RADIUS_MIN + sizeFactor * (DOT_RADIUS_MAX - DOT_RADIUS_MIN)

      result.push({ x, y, r, g, b, a, radius })
    }

    return result
  }

  // Draw a single dot
  function drawDot(dot: DotData, displayWidth: number, displayHeight: number) {
    if (!ctx) return
    // Scale from sample coordinates to display coordinates
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const scaleX = (canvas!.width / dpr) / displayWidth
    const scaleY = (canvas!.height / dpr) / displayHeight
    const dx = dot.x * scaleX
    const dy = dot.y * scaleY
    const dr = dot.radius * Math.min(scaleX, scaleY)

    ctx.beginPath()
    ctx.arc(dx, dy, dr, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${dot.r}, ${dot.g}, ${dot.b}, ${dot.a / 255})`
    ctx.fill()
  }

  // Animation loop
  function animate(displayWidth: number, displayHeight: number) {
    if (isComplete) return

    const end = Math.min(dotIndex + DOTS_PER_FRAME, dots.length)
    for (let i = dotIndex; i < end; i++) {
      drawDot(dots[i], displayWidth, displayHeight)
    }
    dotIndex = end

    if (dotIndex >= dots.length) {
      isComplete = true
      // Restart after delay
      setTimeout(() => {
        restart(displayWidth, displayHeight)
      }, RESTART_DELAY_MS)
      return
    }

    animationId = requestAnimationFrame(() => animate(displayWidth, displayHeight))
  }

  // Restart the animation
  function restart(displayWidth: number, displayHeight: number) {
    if (!ctx || !canvas) return

    // Clear canvas
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.restore()

    // Re-shuffle dots for variety
    dots = shuffleArray(dots)
    dotIndex = 0
    isComplete = false
    animationId = requestAnimationFrame(() => animate(displayWidth, displayHeight))
  }

  // Fisher-Yates shuffle
  function shuffleArray<T>(arr: T[]): T[] {
    const shuffled = [...arr]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Start everything once image loads
  function start() {
    resize()

    const rect = container!.getBoundingClientRect()
    const sampleWidth = Math.floor(rect.width)
    const sampleHeight = Math.floor(rect.height)

    if (sampleWidth === 0 || sampleHeight === 0) return

    dots = sampleImage(img, sampleWidth, sampleHeight)
    dots = shuffleArray(dots)
    dotIndex = 0
    isComplete = false

    animationId = requestAnimationFrame(() => animate(sampleWidth, sampleHeight))
  }

  img.onload = () => {
    start()
  }

  // Handle resize
  const boundResize = () => {
    if (animationId) cancelAnimationFrame(animationId)
    // Re-init on resize
    if (img.complete && img.naturalWidth > 0) {
      resize()
      const rect = container!.getBoundingClientRect()
      const sampleWidth = Math.floor(rect.width)
      const sampleHeight = Math.floor(rect.height)
      if (sampleWidth === 0 || sampleHeight === 0) return

      // Clear and restart
      ctx!.save()
      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.restore()

      dots = sampleImage(img, sampleWidth, sampleHeight)
      dots = shuffleArray(dots)
      dotIndex = 0
      isComplete = false
      animationId = requestAnimationFrame(() => animate(sampleWidth, sampleHeight))
    }
  }

  let resizeTimeout: number | null = null
  const debouncedResize = () => {
    if (resizeTimeout) clearTimeout(resizeTimeout)
    resizeTimeout = window.setTimeout(boundResize, 300)
  }

  window.addEventListener("resize", debouncedResize)

  // Cleanup on SPA navigation
  window.addCleanup?.(() => {
    if (animationId) cancelAnimationFrame(animationId)
    if (resizeTimeout) clearTimeout(resizeTimeout)
    window.removeEventListener("resize", debouncedResize)
  })
}

document.addEventListener("nav", () => {
  initPointillism()
})
