import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Inline script to handle theme switching and persistence
const themeScript = `
function initTheme() {
    const html = document.documentElement;
    const storedTheme = localStorage.getItem("theme-id") || "matrix";
    html.setAttribute("data-theme-id", storedTheme);
    window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme: storedTheme } }));
}

function setupThemeListeners() {
    const themeButtons = document.querySelectorAll(".theme-btn");
    themeButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const themeId = (e.target as HTMLElement).getAttribute("data-value");
            if (themeId) {
                document.documentElement.setAttribute("data-theme-id", themeId);
                localStorage.setItem("theme-id", themeId);
                window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme: themeId } }));
            }
        });
    });
}

// Run on initial load
initTheme();

// Hook into Quartz navigation
document.addEventListener("nav", () => {
    initTheme();
    setupThemeListeners();
});
`

const ThemeSelector: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`theme-selector ${displayClass ?? ""}`}>
      <span class="theme-label">THEME_SELECT :: </span>
      <div class="theme-options">
        <button class="theme-btn" data-value="matrix">
          [ MTX ]
        </button>
        <button class="theme-btn" data-value="amber">
          [ AMB ]
        </button>
        <button class="theme-btn" data-value="cyan">
          [ CYN ]
        </button>
        <button class="theme-btn" data-value="red">
          [ RED ]
        </button>
        <button class="theme-btn" data-value="white">
          [ WHT ]
        </button>
      </div>
      <script dangerouslySetInnerHTML={{ __html: themeScript }}></script>
    </div>
  )
}

ThemeSelector.css = `
.theme-selector {
    margin-top: 1.5rem;
    font-family: "Fira Code", monospace;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-top: 1px dotted var(--theme-dim);
    padding-top: 0.5rem;
}

.theme-label {
    color: var(--text-dim);
    font-weight: bold;
    font-size: 0.75rem;
    margin-bottom: 0.2rem;
}

.theme-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
}

.theme-btn {
    background: transparent;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
    font-family: "Fira Code", monospace;
    font-size: 0.9rem;
    padding: 2px 5px;
    transition: all 0.2s;
    border: 1px solid transparent; /* Prevent jump on hover */
}

.theme-btn:hover {
    color: var(--theme-main);
    text-shadow: 0 0 5px var(--theme-main);
    border: 1px solid var(--theme-dim);
    background: rgba(128, 128, 128, 0.1);
}
`

export default (() => ThemeSelector) satisfies QuartzComponentConstructor
