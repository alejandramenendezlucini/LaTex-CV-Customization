import React, { useState, useMemo } from "react";
import { computeLatexDiff } from "../utils/latexDiff";
import { Filter, Eye, Copy, Check } from "lucide-react";

interface DiffViewerProps {
  originalLatex: string;
  customizedLatex: string;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ originalLatex, customizedLatex }) => {
  const [onlyChanges, setOnlyChanges] = useState(false);
  const [copied, setCopied] = useState(false);

  const diffLines = useMemo(() => {
    return computeLatexDiff(originalLatex, customizedLatex);
  }, [originalLatex, customizedLatex]);

  const filteredLines = useMemo(() => {
    if (!onlyChanges) return diffLines;
    return diffLines.filter((l) => l.type === "added" || l.type === "removed" || l.type === "modified");
  }, [diffLines, onlyChanges]);

  const stats = useMemo(() => {
    let added = 0;
    let removed = 0;
    diffLines.forEach((l) => {
      if (l.type === "added") added++;
      if (l.type === "removed") removed++;
    });
    return { added, removed };
  }, [diffLines]);

  const handleCopyCustomized = () => {
    navigator.clipboard.writeText(customizedLatex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden">
      {/* Diff Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-neutral-900/90 border-b border-neutral-800 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-medium text-neutral-300">LaTeX Code Diff</span>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-mono">
              +{stats.added} additions
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-400 border border-rose-800/40 font-mono">
              -{stats.removed} modifications
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="toggle-diff-filter-btn"
            type="button"
            onClick={() => setOnlyChanges(!onlyChanges)}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              onlyChanges
                ? "bg-indigo-600 text-white border-indigo-500"
                : "bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700"
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>{onlyChanges ? "Showing Changes Only" : "Show All Lines"}</span>
          </button>

          <button
            id="copy-customized-latex-diff-btn"
            type="button"
            onClick={handleCopyCustomized}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors flex items-center gap-1"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-indigo-400" />}
            <span>{copied ? "Copied" : "Copy Code"}</span>
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto overflow-y-auto max-h-[600px] font-mono text-xs divide-y divide-neutral-900/60">
        {filteredLines.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No differences found.</div>
        ) : (
          filteredLines.map((line, idx) => {
            const isAdded = line.type === "added";
            const isRemoved = line.type === "removed";

            return (
              <div
                key={idx}
                className={`flex items-start leading-5 transition-colors ${
                  isAdded
                    ? "bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/40"
                    : isRemoved
                    ? "bg-rose-950/30 text-rose-300/80 hover:bg-rose-950/40"
                    : "text-neutral-400 hover:bg-neutral-900/40"
                }`}
              >
                {/* Line number indicators */}
                <div className="w-10 select-none text-right pr-2 py-0.5 text-[10px] text-neutral-600 shrink-0 font-mono">
                  {line.originalLineNumber ?? ""}
                </div>
                <div className="w-10 select-none text-right pr-2 py-0.5 text-[10px] text-neutral-600 shrink-0 font-mono">
                  {line.customLineNumber ?? ""}
                </div>
                <div className="w-6 select-none text-center py-0.5 font-bold shrink-0">
                  {isAdded ? (
                    <span className="text-emerald-400">+</span>
                  ) : isRemoved ? (
                    <span className="text-rose-400">-</span>
                  ) : (
                    <span className="text-neutral-700"> </span>
                  )}
                </div>
                {/* Content */}
                <div className="py-0.5 pr-4 pl-1 whitespace-pre flex-1 overflow-x-auto">
                  {line.content || " "}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
