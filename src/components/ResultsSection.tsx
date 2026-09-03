import React, { useState } from "react";
import {
  FileCode2,
  GitCompare,
  FileText,
  BarChart3,
  Copy,
  Check,
  Download,
  ExternalLink,
  Sparkles,
  Info,
  X,
} from "lucide-react";
import { TailoredResult } from "../types";
import { DiffViewer } from "./DiffViewer";
import { VisualCVPreview } from "./VisualCVPreview";
import { InsightsPanel } from "./InsightsPanel";

interface ResultsSectionProps {
  originalLatex: string;
  result: TailoredResult;
  companyName: string;
}

type TabType = "diff" | "code" | "preview" | "insights";

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  originalLatex,
  result,
  companyName,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("diff");
  const [copied, setCopied] = useState(false);
  const [showOverleafModal, setShowOverleafModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.customizedLatex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${(companyName || "Tailored").replace(/[^a-zA-Z0-9_-]/g, "_")}_CV.tex`;
    const blob = new Blob([result.customizedLatex], { type: "text/x-tex;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Header & Actions Bar */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-neutral-100">
                Customized LaTeX CV
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono">
                Score: {result.matchScoreAfter}%
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Ready to compile or export into Overleaf / TeXShop
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            id="copy-customized-latex-btn"
            type="button"
            onClick={handleCopy}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{copied ? "Copied LaTeX!" : "Copy LaTeX"}</span>
          </button>

          <button
            id="download-customized-tex-btn"
            type="button"
            onClick={handleDownload}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>Download .tex</span>
          </button>

          <button
            id="open-overleaf-guide-btn"
            type="button"
            onClick={() => setShowOverleafModal(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-indigo-600/90 hover:bg-indigo-600 text-white shadow-sm transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Overleaf</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 border-b border-neutral-800 pb-2 overflow-x-auto text-xs">
        <button
          id="tab-diff-btn"
          type="button"
          onClick={() => setActiveTab("diff")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === "diff"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
          }`}
        >
          <GitCompare className="w-3.5 h-3.5" />
          <span>Line Diff View</span>
        </button>

        <button
          id="tab-code-btn"
          type="button"
          onClick={() => setActiveTab("code")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === "code"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>Customized LaTeX Code</span>
        </button>

        <button
          id="tab-preview-btn"
          type="button"
          onClick={() => setActiveTab("preview")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === "preview"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Rendered Paper Preview</span>
        </button>

        <button
          id="tab-insights-btn"
          type="button"
          onClick={() => setActiveTab("insights")}
          className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1.5 shrink-0 ${
            activeTab === "insights"
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Strategic AI Insights</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === "diff" && (
          <DiffViewer
            originalLatex={originalLatex}
            customizedLatex={result.customizedLatex}
          />
        )}

        {activeTab === "code" && (
          <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/80 border-b border-neutral-800 text-xs text-neutral-400">
              <span className="font-mono">{result.customizedLatex.split("\n").length} lines</span>
              <button
                type="button"
                onClick={handleCopy}
                className="hover:text-neutral-100 flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={result.customizedLatex}
              rows={24}
              className="w-full p-4 bg-neutral-950 text-neutral-200 font-mono text-xs focus:outline-none resize-y leading-relaxed"
              spellCheck={false}
            />
          </div>
        )}

        {activeTab === "preview" && (
          <VisualCVPreview
            latexCode={result.customizedLatex}
            onDownloadTex={handleDownload}
          />
        )}

        {activeTab === "insights" && <InsightsPanel result={result} />}
      </div>

      {/* Overleaf Quick Instructions Modal */}
      {showOverleafModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-neutral-200 text-xs">
            <button
              type="button"
              onClick={() => setShowOverleafModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ExternalLink className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-100">
                Compile on Overleaf
              </h3>
            </div>

            <p className="text-neutral-400 mb-4 leading-relaxed">
              You can instantly compile this tailored LaTeX CV to PDF in Overleaf or any local TeX engine:
            </p>

            <ol className="list-decimal pl-4 space-y-2 text-neutral-300 mb-5">
              <li>
                Click <strong className="text-indigo-300">"Copy LaTeX"</strong> or <strong className="text-indigo-300">"Download .tex"</strong> above.
              </li>
              <li>
                Open your project in{" "}
                <a
                  href="https://www.overleaf.com/project"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:underline inline-flex items-center gap-0.5"
                >
                  Overleaf.com <ExternalLink className="w-3 h-3" />
                </a>.
              </li>
              <li>
                Paste into your <code className="px-1 py-0.5 rounded bg-neutral-950 text-indigo-300 font-mono">main.tex</code> file and hit <kbd className="px-1.5 py-0.5 bg-neutral-800 rounded border border-neutral-700 font-mono text-[10px]">Ctrl+Enter</kbd> (or Recompile).
              </li>
            </ol>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  handleCopy();
                  window.open("https://www.overleaf.com/project", "_blank");
                  setShowOverleafModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-center transition-colors"
              >
                Copy Code & Open Overleaf
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
