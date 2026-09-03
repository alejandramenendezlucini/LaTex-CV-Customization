import React, { useState, useRef } from "react";
import {
  Building2,
  Briefcase,
  FileCode2,
  Sliders,
  UploadCloud,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { CustomizationOptions } from "../types";

interface InputSectionProps {
  companyUrl: string;
  setCompanyUrl: (url: string) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  jobDescription: string;
  setJobDescription: (jd: string) => void;
  latexCode: string;
  setLatexCode: (code: string) => void;
  options: CustomizationOptions;
  setOptions: React.Dispatch<React.SetStateAction<CustomizationOptions>>;
  onCustomize: () => void;
  isLoading: boolean;
  loadingStep: string;
  error: string | null;
}

export const InputSection: React.FC<InputSectionProps> = ({
  companyUrl,
  setCompanyUrl,
  companyName,
  setCompanyName,
  jobDescription,
  setJobDescription,
  latexCode,
  setLatexCode,
  options,
  setOptions,
  onCustomize,
  isLoading,
  loadingStep,
  error,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [analyzingUrl, setAnalyzingUrl] = useState(false);
  const [urlAnalysisResult, setUrlAnalysisResult] = useState<{
    industry?: string;
    summary?: string;
    valuedSkills?: string[];
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Analyze company URL for quick intelligence
  const handleAnalyzeUrl = async () => {
    if (!companyUrl.trim()) return;
    setAnalyzingUrl(true);
    try {
      const res = await fetch("/api/cv/analyze-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyUrl }),
      });
      const data = await res.json();
      if (res.ok && data) {
        if (data.companyName && !companyName) {
          setCompanyName(data.companyName);
        }
        setUrlAnalysisResult({
          industry: data.industry,
          summary: data.summary,
          valuedSkills: data.valuedSkills,
        });
      }
    } catch (err) {
      console.warn("Could not analyze URL", err);
    } finally {
      setAnalyzingUrl(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setLatexCode(content);
      }
    };
    reader.readAsText(file);
  };

  const lineCount = latexCode ? latexCode.split("\n").length : 0;
  const wordCount = jobDescription ? jobDescription.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col gap-5">
      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 flex items-start gap-2.5 text-xs text-red-200">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-red-300">Customization Failed</p>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Target Company & Position Section */}
      <div className="bg-neutral-900/90 border border-neutral-800/80 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Building2 className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-semibold text-neutral-100 uppercase tracking-wider">
            Target Company & Role
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <div className="sm:col-span-2">
            <label htmlFor="company-url-input" className="block text-xs font-medium text-neutral-300 mb-1">
              Company Website or Job Posting URL
            </label>
            <div className="relative flex items-center">
              <input
                id="company-url-input"
                type="text"
                placeholder="e.g. https://stripe.com or https://jobs.lever.co/..."
                value={companyUrl}
                onChange={(e) => setCompanyUrl(e.target.value)}
                className="w-full pl-3 pr-24 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
              <button
                id="analyze-company-url-btn"
                type="button"
                onClick={handleAnalyzeUrl}
                disabled={analyzingUrl || !companyUrl.trim()}
                className="absolute right-1 px-2.5 py-1 text-[11px] font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
              >
                {analyzingUrl ? (
                  <span className="inline-block animate-spin">⟳</span>
                ) : (
                  <Search className="w-3 h-3 text-indigo-400" />
                )}
                <span>{analyzingUrl ? "Analyzing..." : "Inspect"}</span>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="company-name-input" className="block text-xs font-medium text-neutral-300 mb-1">
              Company Name (optional)
            </label>
            <input
              id="company-name-input"
              type="text"
              placeholder="e.g. Stripe"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* URL Inspection summary badge */}
        {urlAnalysisResult && (
          <div className="mb-3 p-2.5 rounded-xl bg-indigo-950/20 border border-indigo-800/30 text-xs text-neutral-300 flex flex-col gap-1.5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-indigo-300 flex items-center gap-1 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Company Intelligence: {urlAnalysisResult.industry || "Detected"}
              </span>
              <button
                type="button"
                onClick={() => setUrlAnalysisResult(null)}
                className="text-neutral-500 hover:text-neutral-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {urlAnalysisResult.summary && (
              <p className="text-[11px] text-neutral-400 line-clamp-2">{urlAnalysisResult.summary}</p>
            )}
            {urlAnalysisResult.valuedSkills && urlAnalysisResult.valuedSkills.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-0.5">
                {urlAnalysisResult.valuedSkills.map((sk, idx) => (
                  <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700/50">
                    {sk}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Position or Project Description */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="job-description-input" className="text-xs font-medium text-neutral-300 flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-indigo-400" /> Project / Position Description & Requirements
            </label>
            <span className="text-[11px] text-neutral-500">{wordCount} words</span>
          </div>
          <textarea
            id="job-description-input"
            rows={5}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description, key responsibilities, target requirements, or project details here..."
            className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-100 placeholder-neutral-500 font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-y"
          />
        </div>
      </div>

      {/* Advanced Customization Options Toggle */}
      <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-2xl overflow-hidden transition-all">
        <button
          id="toggle-options-btn"
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-medium text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tailoring Strategy & Formatting Controls</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-neutral-700">
              {options.emphasisMode} • {options.seniorityLevel}
            </span>
          </span>
          {showOptions ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
        </button>

        {showOptions && (
          <div className="p-4 pt-1 border-t border-neutral-800/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label htmlFor="emphasis-mode-select" className="block text-neutral-400 font-medium mb-1">
                Strategic Emphasis
              </label>
              <select
                id="emphasis-mode-select"
                value={options.emphasisMode}
                onChange={(e) => setOptions((prev) => ({ ...prev, emphasisMode: e.target.value as any }))}
                className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="balanced">Balanced (Skills + Impact + Domain)</option>
                <option value="technical">Technical Depth & Architecture</option>
                <option value="impact_metrics">Metrics & Business Impact (Google XYZ)</option>
                <option value="leadership">Leadership, Ownership & Mentorship</option>
              </select>
              <p className="text-[10px] text-neutral-500 mt-1">
                Determines the framing angle for your rewritten experience bullets.
              </p>
            </div>

            <div>
              <label htmlFor="seniority-select" className="block text-neutral-400 font-medium mb-1">
                Target Role Seniority
              </label>
              <select
                id="seniority-select"
                value={options.seniorityLevel}
                onChange={(e) => setOptions((prev) => ({ ...prev, seniorityLevel: e.target.value as any }))}
                className="w-full px-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-neutral-200 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="entry">Entry / Junior Level</option>
                <option value="mid">Mid-Level Engineer</option>
                <option value="senior">Senior Specialist</option>
                <option value="lead">Staff / Tech Lead / Manager</option>
              </select>
              <p className="text-[10px] text-neutral-500 mt-1">
                Calibrates action verbs and scope of responsibility.
              </p>
            </div>

            <div className="sm:col-span-2 flex flex-wrap gap-4 pt-1 border-t border-neutral-800/40">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                <input
                  id="checkbox-preserve-page"
                  type="checkbox"
                  checked={options.preservePageFit}
                  onChange={(e) => setOptions((prev) => ({ ...prev, preservePageFit: e.target.checked }))}
                  className="rounded border-neutral-700 bg-neutral-950 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Preserve strict page length (keep bullet counts compact)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-neutral-300">
                <input
                  id="checkbox-highlight-keywords"
                  type="checkbox"
                  checked={options.highlightKeywords}
                  onChange={(e) => setOptions((prev) => ({ ...prev, highlightKeywords: e.target.checked }))}
                  className="rounded border-neutral-700 bg-neutral-950 text-indigo-600 focus:ring-indigo-500"
                />
                <span>Highlight key matching technologies with \textbf&#123;...&#125;</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* LaTeX Source Code Editor / Uploader */}
      <div className="bg-neutral-900/90 border border-neutral-800/80 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-neutral-100 uppercase tracking-wider">
              Original LaTeX Source Code
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept=".tex,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              id="upload-tex-file-btn"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5 text-indigo-400" />
              <span>Upload .tex</span>
            </button>
            {latexCode && (
              <button
                id="clear-latex-code-btn"
                type="button"
                onClick={() => setLatexCode("")}
                className="text-xs text-neutral-500 hover:text-neutral-300 px-1.5 py-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <textarea
            id="latex-code-input"
            rows={12}
            value={latexCode}
            onChange={(e) => setLatexCode(e.target.value)}
            placeholder="\documentclass[letterpaper,11pt]{article}&#10;\begin{document}&#10;... Paste your complete LaTeX CV code here ...&#10;\end{document}"
            className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-100 font-mono placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-y leading-relaxed"
            spellCheck={false}
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-neutral-500 bg-neutral-900/90 px-2 py-0.5 rounded border border-neutral-800 pointer-events-none">
            {lineCount} lines • Compiles safely
          </div>
        </div>
      </div>

      {/* Main Submit Button */}
      <div>
        <button
          id="customize-cv-submit-btn"
          type="button"
          onClick={onCustomize}
          disabled={isLoading || !latexCode.trim() || !jobDescription.trim()}
          className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-600/25 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{loadingStep || "Customizing LaTeX CV..."}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Customize & Highlight Experience</span>
            </>
          )}
        </button>
        <p className="text-center text-[11px] text-neutral-500 mt-2">
          Preserves LaTeX preamble, document geometry, and macros intact while elevating target achievements.
        </p>
      </div>
    </div>
  );
};
