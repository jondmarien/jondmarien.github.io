import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"

async function mountTerminal() {
  const container = document.getElementById("terminal-container")
  if (!container) return
  if (container.dataset.mounted === "true") return
  container.dataset.mounted = "true"
  container.innerHTML = "" // Clear placeholder

  // Helper to get CSS variable value
  function getCssVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  }

  // Function to update terminal theme from CSS variables
  function syncTheme(term: any) {
    const mainColor = getCssVar("--theme-main") || "#00ff41"
    const bgColor = getCssVar("--theme-bg") || "#050505"
    const dimColor = getCssVar("--theme-dim") || "#008f11" // cursor/selection
    const termBlack = getCssVar("--term-black") || "#050505"
    const termRed = getCssVar("--term-red") || "#ff0000"
    const termGreen = getCssVar("--term-green") || "#00ff41"
    const termYellow = getCssVar("--term-yellow") || "#ffff00"
    const termBlue = getCssVar("--term-blue") || "#0000ff"
    const termMagenta = getCssVar("--term-magenta") || "#ff00ff"
    const termCyan = getCssVar("--term-cyan") || "#00ffff"
    const termWhite = getCssVar("--term-white") || "#ffffff"

    term.options.theme = {
      background: bgColor,
      foreground: mainColor,
      cursor: mainColor,
      cursorAccent: bgColor,
      selectionBackground: dimColor,
      black: termBlack,
      red: termRed,
      green: termGreen,
      yellow: termYellow,
      blue: termBlue,
      magenta: termMagenta,
      cyan: termCyan,
      white: termWhite,
      brightBlack: dimColor,
      brightRed: termRed,
      brightGreen: termGreen,
      brightYellow: termYellow,
      brightBlue: termBlue,
      brightMagenta: termMagenta,
      brightCyan: termCyan,
      brightWhite: termWhite,
    }
  }

  const term = new Terminal({
    cursorBlink: true,
    fontFamily: '"Fira Code", monospace',
    fontSize: 14,
    convertEol: true, // Treat \n as \r\n
    theme: {
      brightRed: "#ff0000",
      brightGreen: "#00ff41",
      brightYellow: "#ffff00",
      brightBlue: "#0000ff",
      brightMagenta: "#ff00ff",
      brightCyan: "#00ffff",
      brightWhite: "#ffffff",
    },
    allowTransparency: true,
  })

  // Initial Theme Sync
  syncTheme(term)

  // Listen for theme changes from ThemeSelector
  window.addEventListener("themeChanged", (() => {
    // Small delay to allow CSS variable to update in DOM
    setTimeout(() => syncTheme(term), 50)
  }) as EventListener)

  const fitAddon = new FitAddon()
  term.loadAddon(fitAddon)
  term.open(container)
  fitAddon.fit()

  // Virtual File System
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

    "~/CTFs": ["HackfinityBattle", "Holmes2025", "MetaCTF", "UofTCTF"],
    "~/CTFs/HackfinityBattle": "Redirecting to /CTFs/HackfinityBattle ...",
    "~/CTFs/Holmes2025": "Redirecting to /CTFs/Holmes2025 ...",
    "~/CTFs/MetaCTF": "Redirecting to /CTFs/MetaCTF ...",
    "~/CTFs/UofTCTF": "Redirecting to /CTFs/UofTCTF ...",

    "~/HackTheBox": ["Machines", "Challenges", "Sherlocks"],
    "~/HackTheBox/Machines": "Redirecting to /HackTheBox/Machines ...",

    "~/ISSessions": ["W25", "F24", "W24"],
    "~/ISSessions/W25": "Redirecting to /ISSessions/W25 ...",

    "~/TryHackMe": ["Rooms", "KoTH"],
    "~/Hackathons": ["BSCP", "RingZer0"],

    "~/contact.md": "Email: jon@chron0.tech\r\nDiscord: chronoblaze",
    "~/secrets.txt": "\x1b[31mACCESS DENIED: LEVEL 5 CLEARANCE REQUIRED\x1b[0m",
  }

  let currentPath = "~"

  term.writeln("\x1b[1;32mCONNECTED TO CHRON0.TECH [TERMINAL v1.0.5]\x1b[0m")
  term.writeln("--------------------------------------------")
  term.writeln("Type 'help' to see available commands.")

  const prompt = () => {
    let displayPath = currentPath
    if (displayPath.startsWith("~")) {
      // Keep ~ as is
    } else {
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
        case "help":
          term.writeln("Available commands: whoami, pwd, ls, cd, cat, clear, theme, help")
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
