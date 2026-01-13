# 📟 Chrono's Cyber Chronicles

A highly customized digital garden built on **Quartz v4**, engineered with a distinct Cyberpunk / Hacker terminal aesthetic.

> "Unlocking the future, one exploit at a time."

## 🚀 Features

This project pushes the boundaries of the default Quartz setup with extensive visual and interactive customizations:

### 🖥️ Interactive Terminal
Integrated **xterm.js** terminal emulator embedded directly into the landing page.
- **Commands**: Typing `help` reveals available system commands.
- **Theme Control**: Use `theme set <name>` to dynamically switch the site's entire color palette.
- **History**: Full command history support (Up/Down arrows).

### 🎨 Dynamic Theme System
A robust custom theming engine built on SCSS variables, supporting instant switching between:
- **Matrix** (Default Neon Green)
- **Amber** (Retro Monochrome)
- **Cyan** (Tron-like)
- **Red** (Sith/Warning)
- **Purple** (Synthwave)
- **Ocean** (Deep Blue)
- **Cherry** (Retro Pink)
- **Rainy** (Muted Blue-Grey)

*All themes support both Dark (CRT) and Light (High Contrast) modes.*

### 📺 CRT & Visual Effects
Pure CSS implementation of retro hardware artifacts:
- **Scanlines**: Subtle overlay for that authentic monitor feel.
- **Vignette**: Radial dimming at the screen edges.
- **Screen Flicker**: Gentle, non-intrusive animation (can be disabled).
- **ASCII Art**: Custom pre-rendered text headers.

### 🛠️ Custom Components
- **Styled Graph View**: Node/link colors sync dynamically with the active theme.
- **Hacker Sidebar**: "Explorer" and "Table of Contents" restyled to look like system directories.
- **System Status Bar**: Custom header bar with mock system indicators.

## 🧰 Tech Stack

- **Core**: [Quartz v4](https://quartz.jzhao.xyz/) (Preact, SSG)
- **Styling**: Sass (SCSS) with extensive custom modules.
- **Scripting**: TypeScript for terminal logic and component behavior.
- **Terminal**: xterm.js integration.

## 💻 Usage

To run the system locally:

```bash
# Install dependencies
npm install

# Initialize the development server
npx quartz build --serve
```

## 📝 Customization

Styles are primarily located in `quartz/styles/custom.scss`.
Component logic can be found in `quartz/components/`.

---
*Powered by Quartz. Hacked by Chrono.*
