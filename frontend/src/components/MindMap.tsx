import React, { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";
mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "loose" });
export default function MindMap() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mermaidRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("/data/carte-mentale.md");
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        const text = await resp.text();
        const match = text.match(/```mermaid\n([\s\S]*?)\n```/);
        if (match && mermaidRef.current) {
          const code = match[1];
          const id = "mermaid-" + Date.now();
          const { svg } = await mermaid.render(id, code);
          mermaidRef.current.innerHTML = svg;
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return React.createElement("section", { id: "mindmap", className: "mindmap-section py-16 px-4" },
    React.createElement("div", { className: "max-w-6xl mx-auto" },
      React.createElement("div", { className: "card" },
        React.createElement("h2", { className: "section__title text-center mb-8" }, "Carte Mentale"),
        loading && React.createElement("div", { className: "flex flex-col items-center justify-center py-12" },
          React.createElement("div", { className: "w-10 h-10 border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-4" }),
          React.createElement("p", { className: "text-[var(--color-text-secondary)] font-medium" }, "Chargement...")
        ),
        error && React.createElement("div", { className: "bg-[var(--color-error-bg)] border border-[var(--color-error)] text-[var(--color-error)] px-6 py-4 rounded-lg text-center" },
          React.createElement("p", { className: "font-medium" }, "Erreur"),
          React.createElement("p", { className: "text-sm opacity-80" }, error)
        ),
        React.createElement("div", { ref: mermaidRef, className: "flex justify-center overflow-x-auto" })
      )
    )
  );
}
