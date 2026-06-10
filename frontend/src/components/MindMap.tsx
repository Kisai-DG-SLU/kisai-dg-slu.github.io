import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// Initialize mermaid with dark theme
mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",
  securityLevel: "loose",
  themeVariables: {
    darkMode: true,
    background: "#1a1a2e",
    primaryColor: "#6c63ff",
    primaryTextColor: "#e0e0e0",
    primaryBorderColor: "#6c63ff",
    lineColor: "#a0a0c0",
    secondaryColor: "#16213e",
    tertiaryColor: "#0f3460",
  },
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderStars(count: number): string {
  const full = "★".repeat(count);
  const empty = "☆".repeat(Math.max(0, 5 - count));
  return full + empty;
}

function parseMarkdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const sections: string[] = [];
  let inMermaid = false;
  let mermaidBuffer: string[] = [];
  let mermaidId = 0;

  for (const line of lines) {
    if (/^```mermaid/i.test(line)) {
      inMermaid = true;
      mermaidBuffer = [];
      continue;
    }
    if (inMermaid && /^```/.test(line)) {
      inMermaid = false;
      const id = "mermaid-render-" + mermaidId++;
      const code = mermaidBuffer.join("\n").trim();
      sections.push(
        '<div class="mermaid-placeholder" id="' +
          id +
          '" data-code="' +
          encodeURIComponent(code) +
          '"></div>'
      );
      continue;
    }
    if (inMermaid) {
      mermaidBuffer.push(line);
      continue;
    }

    if (line.trim() === "") {
      continue;
    }

    const hMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (hMatch) {
      const level = hMatch[1].length;
      const title = hMatch[2].trim();
      if (level === 1) {
        sections.push(
          '<h1 class="section-title text-3xl font-bold text-center mb-6 text-[var(--color-primary)]">' +
            escapeHtml(title) +
            "</h1>"
        );
      } else if (level === 2) {
        sections.push(
          '<h2 class="section-subtitle text-2xl font-semibold mb-4 mt-8 text-[var(--color-accent)] border-b border-[var(--color-border)] pb-2">' +
            escapeHtml(title) +
            "</h2>"
        );
      } else if (level === 3) {
        sections.push(
          '<h3 class="text-xl font-semibold mb-3 mt-6 text-[var(--color-primary)]">' +
            escapeHtml(title) +
            "</h3>"
        );
      } else {
        sections.push(
          '<h4 class="text-lg font-medium mb-2 mt-4 text-[var(--color-text-primary)]">' +
            escapeHtml(title) +
            "</h4>"
        );
      }
      continue;
    }

    const liMatch = line.match(/^(\s*)[-*+]\s+(.+)/);
    if (liMatch) {
      const content = liMatch[2].trim();
      const starMatch = content.match(/^(.*?)(★[★☆]*)$/);
      if (starMatch) {
        const label = starMatch[1].trim();
        const filled = (starMatch[2].match(/★/g) || []).length;
        sections.push(
          '<div class="skill-item flex items-center justify-between py-1.5 px-3 rounded hover:bg-[var(--color-surface-hover)] transition-colors">' +
            '<span class="text-[var(--color-text-primary)]">' +
            escapeHtml(label) +
            '</span>' +
            '<span class="stars text-amber-400">' +
            renderStars(filled) +
            "</span>" +
            "</div>"
        );
      } else {
        sections.push(
          '<div class="list-item flex items-center gap-3 py-1.5 px-3 rounded hover:bg-[var(--color-surface-hover)] transition-colors">' +
            '<span class="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0"></span>' +
            '<span class="text-[var(--color-text-primary)]">' +
            escapeHtml(content) +
            "</span>" +
            "</div>"
        );
      }
      continue;
    }

    if (line.trim()) {
      sections.push(
        '<p class="text-[var(--color-text-secondary)] py-1">' +
          escapeHtml(line.trim()) +
          "</p>"
      );
    }
  }

  return sections.join("\n");
}

const MindMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndRender = async () => {
      try {
        const response = await fetch("/data/carte-mentale.md");
        if (!response.ok) {
          throw new Error("Failed to fetch: " + response.status + " " + response.statusText);
        }
        const markdown = await response.text();

        const hasMermaid = /```mermaid/i.test(markdown);

        if (containerRef.current) {
          if (hasMermaid) {
            containerRef.current.innerHTML = parseMarkdownToHtml(markdown);

            const placeholders =
              containerRef.current.querySelectorAll(".mermaid-placeholder");
            for (const el of placeholders) {
              const code = decodeURIComponent(el.getAttribute("data-code") || "");
              const id = el.id;
              try {
                const { svg } = await mermaid.render(id, code);
                el.outerHTML =
                  '<div class="mermaid-rendered flex justify-center my-6">' +
                  svg +
                  "</div>";
              } catch (mmErr) {
                el.outerHTML =
                  '<div class="bg-[var(--color-error-bg)] border border-[var(--color-error)] text-[var(--color-error)] px-4 py-3 rounded-lg my-4 text-sm">' +
                  '<p class="font-medium mb-1">Erreur de rendu Mermaid</p>' +
                  '<p class="opacity-80 text-xs">' +
                  escapeHtml(String(mmErr)) +
                  "</p></div>";
              }
            }
          } else {
            containerRef.current.innerHTML = parseMarkdownToHtml(markdown);
          }
        }
      } catch (err) {
        console.error("MindMap rendering error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAndRender();
  }, []);

  return (
    <section id="mindmap" className="mindmap-section py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="card">
          <h2 className="section__title text-center mb-8">Carte Mentale</h2>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[var(--color-text-secondary)] font-medium">
                Chargement de la carte mentale...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-[var(--color-error-bg)] border border-[var(--color-error)] text-[var(--color-error)] px-6 py-4 rounded-lg text-center">
              <p className="font-semibold mb-1">Erreur de chargement</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          )}

          <div
            ref={containerRef}
            className={
              "mindmap-container " + (loading || error ? "hidden" : "")
            }
            style={{ minHeight: "400px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default MindMap;
