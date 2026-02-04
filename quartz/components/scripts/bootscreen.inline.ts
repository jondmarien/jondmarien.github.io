import { Renderer, Program, Mesh, Triangle, Color } from "ogl"
import { BOOT_SEQUENCE, STORAGE_KEY, MAX_VISIBLE_LINES, type BootLine } from "./bootsequence.data"

// Final BIOS summary screen (shown after boot sequence completes)
const FINAL_SCREEN: BootLine[] = [
  { text: "CHRONO.TECH BIOS v4.2.0", delay: 0, type: "header" },
  { text: "Copyright (C) 2024-2026 Jon Marien", delay: 60, type: "info" },
  { text: "", delay: 100, type: "empty" },
  { text: "Initializing quantum core...", delay: 140, type: "status" },
  { text: "Detecting neural interface...", delay: 180, type: "status" },
  { text: "CPU: Quantum Core @ 4.2 GHz ... OK", delay: 220, type: "hardware" },
  { text: "RAM: 32768 MB Neural Buffer ... OK", delay: 260, type: "hardware" },
  { text: "DISK: 2 TB Holographic Array ... OK", delay: 300, type: "hardware" },
  { text: "GPU: CyberGraphics 9000 ... OK", delay: 340, type: "hardware" },
  { text: "", delay: 380, type: "empty" },
  { text: "Loading CHRONO.OS ...", delay: 420, type: "status" },
  { text: "Establishing secure uplink...", delay: 460, type: "status" },
  { text: "", delay: 500, type: "empty" },
  { text: "Press any key to continue...", delay: 540, type: "prompt" },
]

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

// Helper to create a boot line element
function createLineElement(line: BootLine): HTMLDivElement {
  const lineEl = document.createElement("div")
  lineEl.className = `boot-line ${line.type}`

  if (line.type === "empty") {
    lineEl.innerHTML = "&nbsp;"
  } else if (line.type === "hardware") {
    // Highlight "[  OK  ]" or "OK" in hardware lines
    let html = line.text
    if (html.includes("[  OK  ]")) {
      html = html.replace("[  OK  ]", '<span class="ok">[  OK  ]</span>')
    } else if (html.includes("OK")) {
      html = html.replace("OK", '<span class="ok">OK</span>')
    }
    lineEl.innerHTML = html
  } else {
    lineEl.textContent = line.text
  }

  return lineEl
}

// Main boot screen runner - can be called on page load or via reboot command
function runBootScreen(skipStorageCheck = false) {
  const bootScreen = document.getElementById("boot-screen")
  if (!bootScreen) return

  // Move boot screen to be direct child of body to fix position:fixed offset
  if (bootScreen.parentElement !== document.body) {
    document.body.appendChild(bootScreen)
  }

  // Check if already seen (unless bypassed by reboot command)
  if (!skipStorageCheck && localStorage.getItem(STORAGE_KEY)) {
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

  // Reset state for reboot
  bootScreen.classList.remove("hidden", "fade-out")
  linesContainer.innerHTML = ""

  // Get theme color for tint (uses user's current theme)
  const themeMain =
    getComputedStyle(document.documentElement).getPropertyValue("--theme-main").trim() || "#00ff00"

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
  let lineCount = 0

  // Display boot lines progressively with screen clearing
  BOOT_SEQUENCE.forEach((line) => {
    const timer = window.setTimeout(() => {
      // Clear screen when we exceed max visible lines (like a real terminal)
      if (lineCount >= MAX_VISIBLE_LINES) {
        linesContainer.innerHTML = ""
        lineCount = 0
      }

      const lineEl = createLineElement(line)
      linesContainer.appendChild(lineEl)
      lineCount++
    }, line.delay)
    timers.push(timer)
  })

  // After boot sequence, clear and show final BIOS summary screen
  const lastBootDelay = BOOT_SEQUENCE[BOOT_SEQUENCE.length - 1].delay
  const clearScreenTimer = window.setTimeout(() => {
    linesContainer.innerHTML = ""
    lineCount = 0
  }, lastBootDelay + 300)
  timers.push(clearScreenTimer)

  // Display final BIOS screen
  FINAL_SCREEN.forEach((line) => {
    const timer = window.setTimeout(() => {
      const lineEl = createLineElement(line)
      linesContainer.appendChild(lineEl)
    }, lastBootDelay + 400 + line.delay)
    timers.push(timer)
  })

  // Track if boot has already been skipped/completed
  let bootCompleted = false

  // Complete boot and hide screen (can be called at any time to skip)
  const completeBoot = () => {
    if (bootCompleted) return
    bootCompleted = true

    // Clear all pending timers (stops the animation)
    timers.forEach((t) => clearTimeout(t))

    // Mark as seen
    localStorage.setItem(STORAGE_KEY, "true")

    // Fade out (same animation whether skipping early or at end)
    bootScreen.classList.add("fade-out")

    // Cleanup after animation
    setTimeout(() => {
      bootScreen.classList.add("hidden")
      terminal?.stop()
      
      // Reset the interactive terminal (clear screen and history)
      if (skipStorageCheck) {
        // Only reset terminal on manual reboot, not initial page load
        window.dispatchEvent(new CustomEvent("resetTerminal"))
      }
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
}

// Run on initial page load (only on homepage)
document.addEventListener("nav", () => {
  if (window.location.pathname !== "/" && !document.referrer.includes(window.location.origin)) {
    return
  }
  runBootScreen(false)
})

// Listen for reboot command from terminal
window.addEventListener("triggerBootScreen", () => {
  runBootScreen(true) // Skip storage check for manual reboot
})
