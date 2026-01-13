import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"

/**
 * Interactive Terminal (Inline Script)
 *
 * This script powers the "fake" terminal on the site.
 * Use cases:
 * - Theme switching (`theme set matrix`)
 * - Navigation (`cd`, `cat`)
 * - Easter eggs
 *
 * It runs in the browser context.
 */

async function mountTerminal() {
  const container = document.getElementById("terminal-container")
  if (!container) return

  // Prevent double-mounting during hydration/navigation
  if (container.dataset.mounted === "true") return
  container.dataset.mounted = "true"
  container.innerHTML = "" // Clear the "Initializing..." placeholder

  // =======================================================================
  //  THEME SYNCHRONIZATION
  // =======================================================================
  //  Reads CSS variables from document root and updates xterm.js colors
  //  so the terminal matches the site theme (Matrix, Red, etc.)

  function getCssVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  }

  function syncTheme(term: any) {
    // Fetch current theme colors
    const mainColor = getCssVar("--theme-main") || "#00ff41"
    const bgColor = getCssVar("--theme-bg") || "#050505"
    const dimColor = getCssVar("--theme-dim") || "#008f11"

    // Map CSS vars to xterm ANSI 16-color palette
    term.options.theme = {
      background: bgColor,
      foreground: mainColor,
      cursor: mainColor,
      cursorAccent: bgColor,
      selectionBackground: dimColor,
      black: getCssVar("--term-black") || "#050505",
      red: getCssVar("--term-red") || "#ff0000",
      green: getCssVar("--term-green") || "#00ff41",
      yellow: getCssVar("--term-yellow") || "#ffff00",
      // ... (Using CSS vars allows full theme control via custom.scss)
      blue: getCssVar("--term-blue") || "#0000ff",
      magenta: getCssVar("--term-magenta") || "#ff00ff",
      cyan: getCssVar("--term-cyan") || "#00ffff",
      white: getCssVar("--term-white") || "#ffffff",

      // Bright variants map to same logic or dimmed versions
      brightBlack: dimColor,
      brightRed: getCssVar("--term-red"),
      brightGreen: getCssVar("--term-green"),
      brightYellow: getCssVar("--term-yellow"),
      brightBlue: getCssVar("--term-blue"),
      brightMagenta: getCssVar("--term-magenta"),
      brightCyan: getCssVar("--term-cyan"),
      brightWhite: getCssVar("--term-white"),
    }
  }

  // =======================================================================
  //  XTERM SETUP
  // =======================================================================
  const term = new Terminal({
    cursorBlink: true,
    fontFamily: '"Fira Code", monospace',
    fontSize: 14,
    convertEol: true,
    allowTransparency: true,
  })

  // Initial Theme Sync
  syncTheme(term)

  // Load Saved CRT Opacity
  const savedCrtOpacity = localStorage.getItem("crt-opacity") || "1"
  document.documentElement.style.setProperty("--crt-opacity", savedCrtOpacity)

  // Listen for theme changes from other components (EffectsSelector/ThemeSelector)
  window.addEventListener("themeChanged", (() => {
    setTimeout(() => syncTheme(term), 50) // Delay to let CSS repaint
  }) as EventListener)

  // Responsive Resizing
  const fitAddon = new FitAddon()
  term.loadAddon(fitAddon)
  term.open(container)
  fitAddon.fit()

  // =======================================================================
  //  VIRTUAL FILE SYSTEM
  // =======================================================================
  //  A simple Key-Value store to mock a file system.
  //  Keys = Paths, Values = Content (String) or Directory Listing (Array)
  const fileSystem: Record<string, string[] | string> = {
    "~": [
      "CTFs",
      "HackTheBox",
      "ISSessions",
      "TryHackMe",
      "Hackathons",
      "contact.md",
      "secrets.txt",
    ],

    // Mocks for Quartz folders - These are mainly for show,
    // as `cd` logic handles navigation mostly.
    "~/CTFs": ["HackfinityBattle", "Holmes2025", "MetaCTF", "UofTCTF"],
    // ...
    "~/contact.md": "Email: jon@chron0.tech\r\nDiscord: chronoblaze",
    "~/secrets.txt": "\x1b[31mACCESS DENIED: LEVEL 5 CLEARANCE REQUIRED\x1b[0m",
  }

  let currentPath = "~"

  // Welcome Message
  term.writeln("\x1b[1;32mCONNECTED TO CHRON0.TECH [TERMINAL v1.0.5]\x1b[0m")
  term.writeln("--------------------------------------------")
  term.writeln("Type 'help' to see available commands.")

  // Render Prompt: user@machine:path$
  const prompt = () => {
    let displayPath = currentPath

    // Simplistic home dir replacement
    if (!displayPath.startsWith("~")) {
      displayPath = displayPath.replace("/home/chron0", "~")
    }
    term.write(`\r\n\x1b[1;32msysadmin@chron0:${displayPath}\x1b[0m$ `)
  }

  prompt()

  let currentLine = ""

  let commandHistory: string[] = []
  let historyIndex = -1

  term.onKey(({ key, domEvent }) => {
    const printable =
      !domEvent.altKey &&
      !domEvent.ctrlKey &&
      !domEvent.metaKey &&
      !domEvent.code.startsWith("Arrow")

    if (domEvent.key === "Enter") {
      term.write("\r\n")

      const line = currentLine.trim()
      if (line) {
        commandHistory.push(line)
        historyIndex = commandHistory.length
      }

      const args = line.split(/\s+/)
      const cmd = args[0]

      switch (cmd) {
        case "":
          break
        // =======================================================================
        //  COMMAND HANDLING
        // =======================================================================
        case "help":
          term.writeln("Available commands:")
          term.writeln("  help              Show this help message")
          term.writeln("  ls                List directory contents")
          term.writeln("  cd <path>         Change directory")
          term.writeln("  cat <file>        Display file contents")
          term.writeln("  clear             Clear the terminal screen")
          term.writeln("  theme set <name>  Switch theme (matrix, red, cyan, etc.)")
          term.writeln("  crt set <val>     Set CRT effect intensity (0.0 - 1.0)")
          term.writeln("  whoami            Display current user")
          term.writeln("  date              Display system date")
          break

        case "crt":
          if (args[1] === "set" && args[2]) {
            const val = parseFloat(args[2])
            if (!isNaN(val) && val >= 0 && val <= 1) {
              document.documentElement.style.setProperty("--crt-opacity", val.toString())
              localStorage.setItem("crt-opacity", val.toString())
              term.writeln(`\x1b[32m[SUCCESS]\x1b[0m CRT intensity set to ${val}`)
            } else {
              term.writeln(`\x1b[31m[ERROR]\x1b[0m Invalid value. Use a float between 0.0 and 1.0`)
            }
          } else {
            term.writeln("Usage: crt set <0.0-1.0>")
          }
          break

        case "clear":
          term.clear()
          break
        case "whoami":
          term.writeln("sysadmin@chron0.tech")
          break
        case "pwd":
          term.writeln(currentPath.replace("~", "/home/chron0"))
          break
        case "cd":
          const navArg = args[1]
          if (!navArg || navArg === "~") {
            currentPath = "~"
          } else if (navArg === "..") {
            if (currentPath !== "~") {
              currentPath = currentPath.substring(0, currentPath.lastIndexOf("/"))
              if (currentPath === "") currentPath = "~"
            }
          } else {
            const targetDir = navArg.endsWith("/") ? navArg.slice(0, -1) : navArg
            const newPath = currentPath === "~" ? `~/${targetDir}` : `${currentPath}/${targetDir}`

            if (fileSystem[newPath] && Array.isArray(fileSystem[newPath])) {
              currentPath = newPath
            } else {
              term.writeln(`cd: no such file or directory: ${navArg}`)
            }
          }
          break
        case "ls":
          let lsTarget = currentPath
          const lsArg = args[1]
          if (lsArg) {
            const cleanArg = lsArg.endsWith("/") ? lsArg.slice(0, -1) : lsArg
            lsTarget = currentPath === "~" ? `~/${cleanArg}` : `${currentPath}/${cleanArg}`
          }

          const content = fileSystem[lsTarget]
          if (Array.isArray(content)) {
            const formatted = content
              .map((item) => {
                const fullPath = lsTarget === "~" ? `~/${item}` : `${lsTarget}/${item}`
                return Array.isArray(fileSystem[fullPath]) ? item + "/" : item
              })
              .join("  ")
            term.writeln(formatted)
          } else if (typeof content === "string") {
            term.writeln(lsArg || "")
          } else {
            term.writeln(`ls: cannot access '${lsArg}': No such file or directory`)
          }
          break
        case "cat":
          const catArg = args[1]
          if (!catArg) {
            term.writeln("Usage: cat <filename>")
          } else {
            const targetFile = currentPath === "~" ? `~/${catArg}` : `${currentPath}/${catArg}`
            const fileContent = fileSystem[targetFile]
            if (typeof fileContent === "string") {
              term.writeln(fileContent)
            } else if (Array.isArray(fileContent)) {
              term.writeln(`cat: ${catArg}: Is a directory`)
            } else {
              term.writeln(`cat: ${catArg}: No such file or directory`)
            }
          }
          break
        case "theme":
          const subCmd = args[1]
          const themeNameArg = args[2]

          if (subCmd !== "set" || !themeNameArg) {
            term.writeln("Usage: theme set <name>")
            term.writeln(
              "Available themes: matrix, amber, cyan, red, white, purple, ocean, cherry, rainy",
            )
          } else {
            const tName = themeNameArg.toLowerCase()
            const validThemes = [
              "matrix",
              "amber",
              "cyan",
              "red",
              "white",
              "purple",
              "ocean",
              "cherry",
              "rainy",
            ]

            if (validThemes.includes(tName)) {
              document.documentElement.setAttribute("data-theme-id", tName)
              localStorage.setItem("theme-id", tName)
              window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme: tName } }))
              term.writeln(`Theme set to: ${tName}`)
            } else {
              term.writeln(`Invalid theme: ${tName}`)
              term.writeln(
                "Available themes: matrix, amber, cyan, red, white, purple, ocean, cherry, rainy",
              )
            }
          }
          break
        default:
          term.writeln(`Command not found: ${cmd}`)
      }
      currentLine = ""
      prompt()
    } else if (domEvent.key === "Backspace") {
      if (currentLine.length > 0) {
        currentLine = currentLine.slice(0, -1)
        term.write("\b \b")
      }
    } else if (domEvent.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--
        // Clear current line
        while (currentLine.length > 0) {
          term.write("\b \b")
          currentLine = currentLine.slice(0, -1)
        }
        // Write history command
        const historyCmd = commandHistory[historyIndex]
        term.write(historyCmd)
        currentLine = historyCmd
      }
    } else if (domEvent.key === "ArrowDown") {
      if (historyIndex < commandHistory.length - 1) {
        // Changed condition to allow going one past the last command
        historyIndex++
        // Clear current line
        while (currentLine.length > 0) {
          term.write("\b \b")
          currentLine = currentLine.slice(0, -1)
        }

        if (historyIndex < commandHistory.length) {
          const historyCmd = commandHistory[historyIndex]
          term.write(historyCmd)
          currentLine = historyCmd
        } else {
          // If we go past the last command, clear the line
          currentLine = ""
        }
      } else if (historyIndex === commandHistory.length - 1 && commandHistory.length > 0) {
        // If we are at the last command and press down, clear the line
        historyIndex++ // Move index to indicate empty line
        while (currentLine.length > 0) {
          term.write("\b \b")
          currentLine = currentLine.slice(0, -1)
        }
        currentLine = ""
      }
    } else if (domEvent.key === "c" && domEvent.ctrlKey) {
      term.write("^C")
      currentLine = ""
      prompt()
    } else if (printable) {
      currentLine += key
      term.write(key)
    }
  })
}

// Initial Theme Logic - Moved from ThemeSelector
function initTheme() {
  const html = document.documentElement
  const storedTheme = localStorage.getItem("theme-id") || "matrix"
  html.setAttribute("data-theme-id", storedTheme)
}
// Run immediately
initTheme()
// Hook into Quartz navigation
document.addEventListener("nav", initTheme)

// Quartz lifecycle hooks
document.addEventListener("nav", mountTerminal)
if (document.readyState === "complete" || document.readyState === "interactive") {
  mountTerminal()
} else {
  document.addEventListener("DOMContentLoaded", mountTerminal)
}
