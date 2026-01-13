import { Terminal } from "xterm"
import { FitAddon } from "xterm-addon-fit"

async function mountTerminal() {
  const container = document.getElementById("terminal-container")
  if (!container) return
  if (container.dataset.mounted === "true") return
  container.dataset.mounted = "true"
  container.innerHTML = "" // Clear placeholder

  const term = new Terminal({
    cursorBlink: true,
    fontFamily: '"Fira Code", monospace',
    fontSize: 14,
    theme: {
      background: "#050505",
      foreground: "#00ff41",
      cursor: "#00ff41",
      selectionBackground: "rgba(0, 255, 65, 0.3)",
      black: "#050505",
      red: "#ff0000",
      green: "#00ff41",
      yellow: "#ffff00",
      blue: "#0000ff",
      magenta: "#ff00ff",
      cyan: "#00ffff",
      white: "#e0e0e0",
      brightBlack: "#808080",
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

  term.onKey(({ key, domEvent }) => {
    const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey

    if (domEvent.key === "Enter") {
      term.write("\r\n")
      const args = currentLine.trim().split(/\s+/)
      const cmd = args[0]
      const arg = args[1]

      switch (cmd) {
        case "":
          break
        case "help":
          term.writeln("Available commands: whoami, pwd, ls, cd, cat, clear, help")
          break
        case "clear":
          term.clear()
          break
        case "whoami":
          term.writeln("sysadmin@chron0.tech")
          break
        case "pwd":
          // Expand ~ to full path for display
          term.writeln(currentPath.replace("~", "/home/chron0"))
          break
        case "cd":
          if (!arg || arg === "~") {
            currentPath = "~"
          } else if (arg === "..") {
            if (currentPath !== "~") {
              currentPath = currentPath.substring(0, currentPath.lastIndexOf("/"))
              if (currentPath === "") currentPath = "~" // Should not happen if rooted at ~
            }
          } else {
            // Handle trailing slash
            const targetDir = arg.endsWith("/") ? arg.slice(0, -1) : arg
            const newPath = currentPath === "~" ? `~/${targetDir}` : `${currentPath}/${targetDir}`

            if (fileSystem[newPath] && Array.isArray(fileSystem[newPath])) {
              currentPath = newPath
            } else {
              term.writeln(`cd: no such file or directory: ${arg}`)
            }
          }
          break
        case "ls":
          // Resolve target path
          let targetPath = currentPath
          if (arg) {
            const cleanArg = arg.endsWith("/") ? arg.slice(0, -1) : arg
            targetPath = currentPath === "~" ? `~/${cleanArg}` : `${currentPath}/${cleanArg}`
          }

          const content = fileSystem[targetPath]
          if (Array.isArray(content)) {
            // Add trailing slash to directories for display, simplified logic
            // In this simple FS, we know strictly what are dirs
            const formatted = content
              .map((item) => {
                const fullPath = targetPath === "~" ? `~/${item}` : `${targetPath}/${item}`
                return Array.isArray(fileSystem[fullPath]) ? item + "/" : item
              })
              .join("  ")
            term.writeln(formatted)
          } else if (typeof content === "string") {
            term.writeln(arg) // Is a file
          } else {
            term.writeln(`ls: cannot access '${arg}': No such file or directory`)
          }
          break
        case "cat":
          if (!arg) {
            term.writeln("Usage: cat <filename>")
          } else {
            const targetFile = currentPath === "~" ? `~/${arg}` : `${currentPath}/${arg}`
            const fileContent = fileSystem[targetFile]
            if (typeof fileContent === "string") {
              term.writeln(fileContent)
            } else if (Array.isArray(fileContent)) {
              term.writeln(`cat: ${arg}: Is a directory`)
            } else {
              term.writeln(`cat: ${arg}: No such file or directory`)
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

// Quartz lifecycle hooks
document.addEventListener("nav", mountTerminal)
if (document.readyState === "complete" || document.readyState === "interactive") {
  mountTerminal()
} else {
  document.addEventListener("DOMContentLoaded", mountTerminal)
}
