import React from "react"
import { createRoot } from "react-dom/client"
import Terminal from "react-console-emulator"

// Logic to mount the terminal
async function mountTerminal() {
  const container = document.getElementById("terminal-container")
  if (!container) return

  // Prevent double-mounting
  if (container.dataset.mounted === "true") return
  container.dataset.mounted = "true"
  container.innerHTML = "" // Clear loading placeholder

  const commands = {
    whoami: {
      description: "Current user",
      fn: () => "sysadmin@chron0.tech",
    },
    pwd: {
      description: "Print working directory",
      fn: () => "/home/chron0/public_html",
    },
    ls: {
      description: "List directory content",
      fn: () => "about.md  articles/  ctfs/  projects/  contact.md  secrets.txt",
    },
    cat: {
      description: "Read file",
      fn: (arg: string) => {
        if (arg === "secrets.txt") return "ACCESS DENIED: LEVEL 5 CLEARANCE REQUIRED"
        if (arg === "about.md") return "Redirecting to /about ..."
        return "File not found or permission denied."
      },
    },
    help: {
      description: "Show help",
      fn: () => "Available commands: whoami, pwd, ls, cat, clear, help",
    },
  }

  const root = createRoot(container)
  root.render(
    React.createElement(Terminal, {
      commands: commands,
      welcomeMessage: [
        "CONNECTED TO CHRON0.TECH [TERMINAL v1.0.4]",
        "--------------------------------------------",
        "Type 'help' to see available commands.",
      ],
      promptLabel: "sysadmin@chron0:~",
      style: {
        borderRadius: "0",
        minHeight: "300px",
        backgroundColor: "#050505",
        border: "1px solid #00ff41",
        boxShadow: "0 0 10px rgba(0, 255, 65, 0.2)",
      },
      contentStyle: { color: "#e0e0e0", fontFamily: '"Fira Code", monospace' },
      promptLabelStyle: { color: "#00ff41", fontWeight: "bold" },
      inputTextStyle: { color: "#00ff41", fontWeight: "bold" },
      autoFocus: true,
    }),
  )
}

document.addEventListener("nav", mountTerminal)
if (document.readyState === "complete" || document.readyState === "interactive") {
  mountTerminal()
} else {
  document.addEventListener("DOMContentLoaded", mountTerminal)
}
