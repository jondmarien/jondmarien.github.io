import { Renderer, Program, Mesh, Triangle, Color } from "ogl"

// ============================================================================
// BOOT SEQUENCE CONFIGURATION
// ============================================================================

interface BootLine {
  text: string
  delay: number
  type: "header" | "info" | "hardware" | "status" | "prompt" | "empty"
}

const BOOT_SEQUENCE: BootLine[] = [
  { text: "CHRONO.TECH BIOS v4.2.0", delay: 0, type: "header" },
  { text: "Copyright (C) 2024-2026 Jon Marien", delay: 200, type: "info" },
  { text: "", delay: 300, type: "empty" },
  { text: "Initializing quantum core...", delay: 500, type: "status" },
  { text: "Detecting neural interface...", delay: 800, type: "status" },
  { text: "CPU: Quantum Core @ 4.2 GHz ... OK", delay: 1000, type: "hardware" },
  { text: "RAM: 32768 MB Neural Buffer ... OK", delay: 1200, type: "hardware" },
  { text: "DISK: 2 TB Holographic Array ... OK", delay: 1400, type: "hardware" },
  { text: "GPU: CyberGraphics 9000 ... OK", delay: 1600, type: "hardware" },
  { text: "", delay: 1800, type: "empty" },
  { text: "Loading CHRONO.OS...", delay: 2000, type: "status" },
  { text: "Establishing secure uplink...", delay: 2300, type: "status" },
  { text: "", delay: 2600, type: "empty" },
  { text: "Press any key to continue...", delay: 2800, type: "prompt" },
]

const STORAGE_KEY = "chrono-boot-seen"

// ============================================================================
// FAULTY TERMINAL SHADER
// ============================================================================

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = `
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;
uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uCurvature;
uniform vec3  uTint;
uniform float uPageLoadProgress;
uniform float uBrightness;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2; 
}

mat2 rotate(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p) {
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;
  
  mat2 modify0 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify1 = rotate(time * 0.02);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;
  
  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);
  
  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.1 * time);
  mat2 rot1 = rotate(0.1);
  
  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float digit(vec2 p) {
  vec2 grid = uGridMul * 15.0;
  vec2 s = floor(p * grid) / grid;
  p = p * grid;
  vec2 q, r;
  float intensity = pattern(s * 0.1, q, r) * 1.3 - 0.03;
  
  // Page load animation
  float cellRandom = fract(sin(dot(s, vec2(12.9898, 78.233))) * 43758.5453);
  float cellDelay = cellRandom * 0.8;
  float cellProgress = clamp((uPageLoadProgress - cellDelay) / 0.2, 0.0, 1.0);
  float fadeAlpha = smoothstep(0.0, 1.0, cellProgress);
  intensity *= fadeAlpha;
  
  p = fract(p);
  p *= uDigitSize;
  
  float px5 = p.x * 5.0;
  float py5 = (1.0 - p.y) * 5.0;
  float x = fract(px5);
  float y = fract(py5);
  
  float i = floor(py5) - 2.0;
  float j = floor(px5) - 2.0;
  float n = i * i + j * j;
  float f = n * 0.0625;
  
  float isOn = step(0.1, intensity - f);
  float brightness = isOn * (0.2 + y * 0.8) * (0.75 + x * 0.25);
  
  return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c) {
  return step(c, sin(iTime + a * cos(iTime * b))) * uFlickerAmount;
}

float displace(vec2 look) {
  float y = look.y - mod(iTime * 0.25, 1.0);
  float window = 1.0 / (1.0 + 50.0 * y * y);
  return sin(look.y * 20.0 + iTime) * 0.0125 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(iTime * 60.0)) * window;
}

vec3 getColor(vec2 p) {
  float bar = step(mod(p.y + time * 20.0, 1.0), 0.2) * 0.4 + 1.0;
  bar *= uScanlineIntensity;
  
  float displacement = displace(p);
  p.x += displacement;

  if (uGlitchAmount != 1.0) {
    float extra = displacement * (uGlitchAmount - 1.0);
    p.x += extra;
  }

  float middle = digit(p);
  
  const float off = 0.002;
  float sum = digit(p + vec2(-off, -off)) + digit(p + vec2(0.0, -off)) + digit(p + vec2(off, -off)) +
              digit(p + vec2(-off, 0.0)) + digit(p + vec2(0.0, 0.0)) + digit(p + vec2(off, 0.0)) +
              digit(p + vec2(-off, off)) + digit(p + vec2(0.0, off)) + digit(p + vec2(off, off));
  
  vec3 baseColor = vec3(0.9) * middle + sum * 0.1 * vec3(1.0) * bar;
  return baseColor;
}

vec2 barrel(vec2 uv) {
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
  time = iTime * 0.333333;
  vec2 uv = vUv;

  if (uCurvature != 0.0) {
    uv = barrel(uv);
  }
  
  vec2 p = uv * uScale;
  vec3 col = getColor(p);
  
  col *= uTint;
  col *= uBrightness;

  gl_FragColor = vec4(col, 1.0);
}
`

// ============================================================================
// FAULTY TERMINAL RENDERER CLASS
// ============================================================================

class FaultyTerminalRenderer {
  private renderer: Renderer
  private program: Program
  private mesh: Mesh
  private container: HTMLElement
  private animationId: number = 0
  private startTime: number = 0
  private loadAnimationStart: number = 0

  constructor(container: HTMLElement, tintColor: string) {
    this.container = container
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    this.renderer = new Renderer({ dpr })
    const gl = this.renderer.gl
    gl.clearColor(0, 0, 0, 1)

    const geometry = new Triangle(gl)

    const tintRgb = this.hexToRgb(tintColor)

    this.program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Color(gl.canvas.width, gl.canvas.height, 1) },
        uScale: { value: 1.5 },
        uGridMul: { value: new Float32Array([2, 1]) },
        uDigitSize: { value: 1.2 },
        uScanlineIntensity: { value: 0.5 },
        uGlitchAmount: { value: 1 },
        uFlickerAmount: { value: 1 },
        uNoiseAmp: { value: 1 },
        uCurvature: { value: 0.02 },
        uTint: { value: new Color(tintRgb[0], tintRgb[1], tintRgb[2]) },
        uPageLoadProgress: { value: 0 },
        uBrightness: { value: 0.6 },
      },
    })

    this.mesh = new Mesh(gl, { geometry, program: this.program })

    this.resize()
    container.appendChild(gl.canvas)

    window.addEventListener("resize", this.resize.bind(this))
  }

  private hexToRgb(hex: string): [number, number, number] {
    let h = hex.replace("#", "").trim()
    if (h.length === 3) {
      h = h
        .split("")
        .map((c) => c + c)
        .join("")
    }
    const num = parseInt(h, 16)
    return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255]
  }

  private resize() {
    const width = this.container.offsetWidth
    const height = this.container.offsetHeight
    this.renderer.setSize(width, height)
    this.program.uniforms.iResolution.value = new Color(
      this.renderer.gl.canvas.width,
      this.renderer.gl.canvas.height,
      1,
    )
  }

  start() {
    this.startTime = performance.now()
    this.loadAnimationStart = this.startTime
    this.animate()
  }

  private animate = () => {
    const now = performance.now()
    const elapsed = (now - this.startTime) * 0.001 * 0.5 // timeScale = 0.5

    this.program.uniforms.iTime.value = elapsed

    // Page load animation (2 seconds)
    const animationDuration = 2000
    const animationElapsed = now - this.loadAnimationStart
    const progress = Math.min(animationElapsed / animationDuration, 1)
    this.program.uniforms.uPageLoadProgress.value = progress

    this.renderer.render({ scene: this.mesh })
    this.animationId = requestAnimationFrame(this.animate)
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener("resize", this.resize.bind(this))
    const canvas = this.renderer.gl.canvas
    if (canvas.parentElement) {
      canvas.parentElement.removeChild(canvas)
    }
    // Clean up WebGL context
    this.renderer.gl.getExtension("WEBGL_lose_context")?.loseContext()
  }
}

// ============================================================================
// BOOT SCREEN CONTROLLER
// ============================================================================

document.addEventListener("nav", () => {
  // Only run on initial page load, not SPA navigation
  if (window.location.pathname !== "/" && !document.referrer.includes(window.location.origin)) {
    return
  }

  const bootScreen = document.getElementById("boot-screen")
  if (!bootScreen) return

  // Move boot screen to be direct child of body to fix position:fixed offset
  // caused by parent containers with transform properties
  if (bootScreen.parentElement !== document.body) {
    document.body.appendChild(bootScreen)
  }

  // Check if already seen
  if (localStorage.getItem(STORAGE_KEY)) {
    bootScreen.classList.add("hidden")
    return
  }

  const bgContainer = document.getElementById("boot-terminal-bg")
  const linesContainer = document.getElementById("boot-lines")
  const cursor = document.getElementById("boot-cursor")

  if (!bgContainer || !linesContainer || !cursor) {
    bootScreen.classList.add("hidden")
    return
  }

  // Get theme color for tint
  const themeMain =
    getComputedStyle(document.documentElement).getPropertyValue("--theme-main").trim() || "#d580ff"

  // Initialize WebGL background
  let terminal: FaultyTerminalRenderer | null = null
  try {
    terminal = new FaultyTerminalRenderer(bgContainer, themeMain)
    terminal.start()
  } catch (e) {
    console.warn("WebGL not available for boot screen:", e)
  }

  // Track cleanup
  const timers: number[] = []
  let waitingForInput = false

  // Display boot lines progressively
  BOOT_SEQUENCE.forEach((line) => {
    const timer = window.setTimeout(() => {
      const lineEl = document.createElement("div")
      lineEl.className = `boot-line ${line.type}`

      if (line.type === "empty") {
        lineEl.innerHTML = "&nbsp;"
      } else if (line.type === "hardware") {
        // Highlight "OK" in hardware lines
        lineEl.innerHTML = line.text.replace("OK", '<span class="ok">OK</span>')
      } else {
        lineEl.textContent = line.text
      }

      linesContainer.appendChild(lineEl)

      // Scroll to bottom if needed
      linesContainer.scrollTop = linesContainer.scrollHeight
    }, line.delay)
    timers.push(timer)
  })

  // Enable input after last line
  const lastDelay = BOOT_SEQUENCE[BOOT_SEQUENCE.length - 1].delay
  const enableInputTimer = window.setTimeout(() => {
    waitingForInput = true
  }, lastDelay + 200)
  timers.push(enableInputTimer)

  // Complete boot and hide screen
  const completeBoot = () => {
    if (!waitingForInput) return

    // Mark as seen
    localStorage.setItem(STORAGE_KEY, "true")

    // Fade out
    bootScreen.classList.add("fade-out")

    // Cleanup after animation
    setTimeout(() => {
      bootScreen.classList.add("hidden")
      terminal?.stop()
    }, 600)

    // Remove listeners
    document.removeEventListener("keydown", handleInput)
    document.removeEventListener("click", handleInput)
    document.removeEventListener("touchstart", handleInput)
  }

  const handleInput = (e: Event) => {
    e.preventDefault()
    completeBoot()
  }

  // Listen for any input to continue
  document.addEventListener("keydown", handleInput)
  document.addEventListener("click", handleInput)
  document.addEventListener("touchstart", handleInput)

  // Cleanup on SPA navigation
  window.addCleanup?.(() => {
    timers.forEach((t) => clearTimeout(t))
    terminal?.stop()
    document.removeEventListener("keydown", handleInput)
    document.removeEventListener("click", handleInput)
    document.removeEventListener("touchstart", handleInput)
  })
})
