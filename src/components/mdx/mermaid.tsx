"use client";

import mermaid from "mermaid";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface MermaidProps {
  chart: string;
  className?: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#a6e3a1",
    primaryTextColor: "#cdd6f4",
    primaryBorderColor: "#6c7086",
    lineColor: "#6c7086",
    secondaryColor: "#313244",
    tertiaryColor: "#1e1e2e",
    background: "#1e1e2e",
    mainBkg: "#1e1e2e",
    nodeBorder: "#6c7086",
    clusterBkg: "#181825",
    clusterBorder: "#6c7086",
    titleColor: "#cdd6f4",
    edgeLabelBackground: "#1e1e2e",
    textColor: "#cdd6f4",
    nodeTextColor: "#cdd6f4",
  },
  fontFamily:
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  flowchart: {
    htmlLabels: true,
    curve: "basis",
  },
  sequence: {
    diagramMarginX: 50,
    diagramMarginY: 10,
    actorMargin: 50,
    width: 150,
    height: 65,
    boxMargin: 10,
    boxTextMargin: 5,
    noteMargin: 10,
    messageMargin: 35,
  },
});

export function Mermaid({ chart, className }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current) return;

      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to render diagram"
        );
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
        <p className="text-destructive text-sm">
          Failed to render diagram: {error}
        </p>
        <pre className="mt-2 overflow-x-auto text-muted-foreground text-xs">
          {chart}
        </pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "not-prose my-6 flex justify-center overflow-x-auto rounded-lg border border-border bg-[#1e1e2e] p-6",
        className
      )}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

// Code block wrapper that detects mermaid language
interface MermaidCodeBlockProps {
  children: string;
  className?: string;
}

export function MermaidCodeBlock({
  children,
  className,
}: MermaidCodeBlockProps) {
  return <Mermaid chart={children.trim()} className={className} />;
}
