# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

"Chrono's Cyber Chronicles" is a heavily customized digital garden built on Quartz v4 with a cyberpunk/hacker terminal aesthetic. The project extends Quartz with custom components, a dynamic theme system, CRT visual effects, and an embedded terminal emulator.

## Build System & Commands

This project uses **npm** with Node.js 22+. The custom CLI is accessed via `npx quartz`.

### Development Workflow

**Start development server (with hot reload):**
```powershell
npx quartz build --serve
```
This builds the site and serves it at `http://localhost:8080/` with live reload on file changes.

**Build for production:**
```powershell
npx quartz build
```
Output is generated in the `public/` directory.

**Type checking:**
```powershell
npm run check
```
Runs TypeScript compiler in no-emit mode and Prettier validation.

**Code formatting:**
```powershell
npm run format
```
Auto-formats code with Prettier.

**Run tests:**
```powershell
npm test
```
Executes tests using tsx's built-in test runner.

### CLI Options

The `npx quartz build` command supports:
- `-d, --directory`: Content folder (default: `content`)
- `-o, --output`: Output folder (default: `public`)
- `-v, --verbose`: Verbose logging
- `--serve`: Enable local preview server
- `--port`: Server port (default: 8080)
- `--concurrency`: Number of parsing threads

## Architecture

### Configuration Structure

Quartz uses a **plugin-based architecture** with three configuration layers:

**1. `quartz.config.ts`** - Core site configuration
- Global settings (title, analytics, theme colors, typography)
- Plugin pipeline definition (transformers → filters → emitters)
- Content processing rules (ignorePatterns, date handling)

**2. `quartz.layout.ts`** - Page layout composition
- `sharedPageComponents`: Global elements (head, header, footer)
- `defaultContentPageLayout`: Single page layout (before/left/right sidebars)
- `defaultListPageLayout`: List page layout (tags, folders)
- Components are pure functions returning Preact JSX

**3. Plugin Pipeline** (`quartz/plugins/`)
- **Transformers**: Process markdown AST (frontmatter, syntax highlighting, links)
- **Filters**: Remove content (e.g., RemoveDrafts)
- **Emitters**: Generate output files (HTML, sitemap, RSS, assets)

### Custom Components

All components are in `quartz/components/` and follow Quartz's component interface:

**Custom components unique to this project:**
- `InteractiveTerminal.tsx` - Embedded xterm.js terminal with command system
- `ThemeSelector.tsx` - Theme switching UI (Matrix, Amber, Cyan, etc.)
- `HeaderBar.tsx` - Custom status bar with system indicators
- `TerminalGreeting.tsx` - Terminal welcome message

**Key component patterns:**
- Components export a constructor function: `() => QuartzComponent`
- Inline scripts use `.inline.ts` suffix and are bundled separately
- Component styles use SCSS and are imported via `.css` property
- Client-side interactivity requires `afterDOMLoaded` lifecycle hook

### Terminal System

The terminal (`InteractiveTerminal.inline.ts`) is a key feature:

**Architecture:**
- Uses xterm.js + FitAddon for terminal emulation
- Theme colors sync with CSS variables from `custom.scss`
- Command system with history support (arrow keys)
- Virtual file system (mock directory structure)
- Commands: `help`, `theme set <name>`, `cd`, `ls`, `cat`, `clear`, etc.

**Theme synchronization:**
- Reads CSS vars from `:root` (`--theme-main`, `--theme-bg`, `--theme-dim`)
- Maps to xterm.js ANSI color palette
- Listens for `themeChanged` CustomEvent from ThemeSelector
- Observes DOM mutations for Quartz dark/light mode toggle

**State persistence:**
- Terminal collapse state: `localStorage.getItem("terminal-collapsed")`
- CRT effects: `--crt-opacity`, `--vignette-opacity`, `--flicker-strength`
- Selected theme: `localStorage.getItem("theme-id")`

### Theme System

The theme engine lives in `quartz/styles/custom.scss`:

**CSS Variable-based themes:**
- Root defines fallback (Matrix green)
- `[data-theme-id="matrix|amber|cyan|red|purple|ocean|cherry|rainy|white"]` attribute on `<html>`
- Each theme overrides: `--theme-main`, `--theme-dim`, `--theme-border`, `--term-green`, `--panel-bg`
- Light mode (`[saved-theme="light"]`) has separate high-contrast overrides

**CRT Effects:**
- Scanlines: `body::before` with dual gradients (horizontal lines + vertical sub-pixels)
- Vignette: `body::after` with radial gradient
- Flicker: `@keyframes flicker` controlled by `--flicker-strength`
- All effects use `pointer-events: none` to allow click-through
- Opacity controlled via CSS vars for toggle functionality

### Build Process

`quartz/build.ts` orchestrates the build:

1. **Parse** - Markdown files → AST via transformers
2. **Filter** - Remove drafts and ignored content
3. **Emit** - Generate HTML, assets, sitemap, RSS
4. **Watch mode** - Uses chokidar to detect changes and incremental rebuild

**Incremental builds:**
- Maintains `ContentMap` of all files in memory
- Tracks `changesSinceLastBuild` for delta processing
- Uses `Mutex` from async-mutex for build serialization
- Client refresh via WebSocket during `--serve` mode

### Static Assets

- `static/` - Copied to output root (images, fonts, etc.)
- `public/` - Generated output (git-ignored)
- Component resources auto-bundled (CSS, inline scripts)

## Development Patterns

### Adding a New Theme

1. Add theme definition to `custom.scss` with `[data-theme-id="name"]`
2. Define all CSS variables: `--theme-main`, `--theme-dim`, `--theme-border`, `--term-green`, `--panel-bg`
3. Add light mode overrides under `:root[saved-theme="light"] &[data-theme-id="name"]`
4. Update `ThemeSelector.tsx` to include the new theme button
5. Update terminal command handler in `InteractiveTerminal.inline.ts` if needed

### Creating a Custom Component

1. Create `.tsx` file in `quartz/components/`
2. Export constructor: `export default (() => MyComponent) satisfies QuartzComponentConstructor`
3. For client-side logic, create `.inline.ts` in `components/scripts/`
4. Assign to component: `MyComponent.afterDOMLoaded = script`
5. For styles, create `.scss` in `components/styles/` and assign: `MyComponent.css = style`
6. Export from `components/index.ts`
7. Use in `quartz.layout.ts`

### Modifying the Terminal

Terminal logic is in `InteractiveTerminal.inline.ts`. Key sections:
- **Command registry** (around line 200+): Add new commands to the command handler
- **File system** (lines 160-177): Modify `fileSystem` object for virtual directories
- **Theme sync** (lines 31-68): Adjust color mapping if adding new theme variables

### Styling Considerations

- Main styles in `quartz/styles/custom.scss` (CRT effects, themes, overrides)
- Base Quartz styles in `base.scss`, `variables.scss`
- Component-specific styles in `components/styles/`
- Always use CSS variables for themeable properties
- Prefix custom components/effects with descriptive comments for maintainability

## TypeScript Configuration

- `jsxImportSource: "preact"` - Uses Preact instead of React
- `strict: true` - Full strict mode enabled
- `noUnusedLocals` and `noUnusedParameters` enforced
- Build output excluded via `exclude: ["build/**/*.d.ts"]`

## Content Structure

- `content/` - Markdown files (digital garden notes)
- Frontmatter parsed by FrontMatter plugin
- Obsidian-flavored markdown supported
- Date priority: frontmatter → git → filesystem

## Obsidian Sync

`sync-obsidian-to-quartz.ps1` - PowerShell script to sync content from Obsidian vault to Quartz content directory. Used for automated content publishing workflow.
