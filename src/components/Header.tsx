import React from "react";
import { FileCode2, Sparkles, Wand2, ExternalLink } from "lucide-react";
import { SAMPLE_TEMPLATES } from "../data/sampleCVs";
import { SampleTemplate } from "../types";

interface HeaderProps {
  onSelectSample: (sample: SampleTemplate) => void;
  onReset: () => void;
  hasCustomized: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onSelectSample, onReset, hasCustomized }) => {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <FileCode2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold text-neutral-100 tracking-tight">
                LaTeX CV Customizer
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                <Sparkles className="w-3 h-3" /> AI Tailoring
              </span>
            </div>
            <p className="text-xs text-neutral-400 hidden sm:block">
              Tailor LaTeX bullet points, skills, and projects to any company & job description
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick preset loader */}
          <div className="relative group">
            <button
              id="load-sample-dropdown-btn"
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            >
              <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Load Sample</span>
            </button>
            <div className="absolute right-0 mt-1 w-64 p-1 rounded-xl bg-neutral-900 border border-neutral-800 shadow-xl opacity-0 translate-y-1 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-150 z-50">
              <div className="px-2 py-1 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Select Starter Template
              </div>
              {SAMPLE_TEMPLATES.map((sample) => (
                <button
                  key={sample.id}
                  id={`sample-select-${sample.id}`}
                  onClick={() => onSelectSample(sample)}
                  className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-neutral-800 text-neutral-200 transition-colors flex flex-col gap-0.5"
                >
                  <span className="font-medium text-neutral-100">{sample.title}</span>
                  <span className="text-[11px] text-neutral-400 truncate">Target: {sample.defaultCompanyName}</span>
                </button>
              ))}
            </div>
          </div>

          {hasCustomized && (
            <button
              id="reset-form-btn"
              type="button"
              onClick={onReset}
              className="text-xs px-3 py-1.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60 transition-colors"
            >
              Reset
            </button>
          )}

          <a
            href="https://www.overleaf.com"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-neutral-200 transition-colors px-2 py-1"
          >
            Overleaf <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
};
