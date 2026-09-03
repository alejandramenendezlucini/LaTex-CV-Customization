import React, { useState } from "react";
import {
  TrendingUp,
  Target,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { TailoredResult } from "../types";

interface InsightsPanelProps {
  result: TailoredResult;
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ result }) => {
  const [expandedChangeIdx, setExpandedChangeIdx] = useState<number | null>(0);

  const scoreDiff = result.matchScoreAfter - result.matchScoreBefore;

  return (
    <div className="flex flex-col gap-5">
      {/* Top Banner: Match Score Meter */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Job Alignment & ATS Optimization
              </span>
            </div>
            <h3 className="text-base font-semibold text-neutral-100">
              Tailored for {result.companyProfile.name}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Role: {result.companyProfile.targetRole || "Target Position"}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-neutral-950/80 p-3 rounded-xl border border-neutral-800">
            <div className="text-center">
              <div className="text-[11px] text-neutral-500 font-medium">Initial Fit</div>
              <div className="text-lg font-bold text-neutral-400 font-mono">
                {result.matchScoreBefore}%
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-neutral-600 shrink-0" />

            <div className="text-center">
              <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-0.5 justify-center">
                <TrendingUp className="w-3 h-3" /> +{scoreDiff}%
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                {result.matchScoreAfter}%
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar visual */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80">
          <div className="flex justify-between text-[11px] text-neutral-400 mb-1.5 font-mono">
            <span>Alignment Progression</span>
            <span>Target Goal: 90%+</span>
          </div>
          <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden flex">
            <div
              className="bg-neutral-600 transition-all duration-500"
              style={{ width: `${result.matchScoreBefore}%` }}
            />
            <div
              className="bg-emerald-500 transition-all duration-500 shadow-sm"
              style={{ width: `${Math.max(0, scoreDiff)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Target Requirements Identified */}
      {result.companyProfile.keyNeeds && result.companyProfile.keyNeeds.length > 0 && (
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-neutral-200 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Key Requirements Prioritized</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
            {result.companyProfile.keyNeeds.map((need, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-xs text-neutral-300 flex items-start gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{need}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Rewritten Bullet Points & Changes */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-200 uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>Key Tailored Bullet Points & Strategic Rationale</span>
          </div>
          <span className="text-[11px] text-neutral-400">
            {result.keyChanges.length} key modifications
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {result.keyChanges.map((change, idx) => {
            const isExpanded = expandedChangeIdx === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950/70 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedChangeIdx(isExpanded ? null : idx)}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-neutral-800/30 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs font-medium text-neutral-200 truncate">
                    <span className="px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 text-[10px] font-mono shrink-0">
                      {change.section}
                    </span>
                    <span className="truncate text-neutral-300">{change.reason}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0 ml-2" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-3.5 pt-1 border-t border-neutral-800/80 flex flex-col gap-2.5 text-xs">
                    <div>
                      <div className="text-[10px] font-semibold uppercase text-rose-400 mb-1">
                        Original Bullet / Snippet
                      </div>
                      <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-800/30 text-rose-200 font-mono text-[11px] leading-relaxed">
                        {change.before}
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-semibold uppercase text-emerald-400 mb-1">
                        Tailored for Target Role
                      </div>
                      <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-emerald-200 font-mono text-[11px] leading-relaxed">
                        {change.after}
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-neutral-300 text-xs flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-indigo-300">Strategy: </span>
                        <span>{change.reason}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Keywords Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Matched Keywords */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Keywords Integrated & Highlighted</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.matchedKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-lg bg-emerald-950/30 text-emerald-300 border border-emerald-800/40 font-mono"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Missing / Recommended Keywords */}
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Unmatched JD Keywords (Recommended)</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.missingOrRecommendedKeywords.map((kw, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-lg bg-amber-950/30 text-amber-300 border border-amber-800/40 font-mono"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Prep / Talking Points */}
      {result.interviewTips && result.interviewTips.length > 0 && (
        <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-indigo-300 uppercase tracking-wider">
            <Lightbulb className="w-4 h-4 text-indigo-400" />
            <span>Interview Talking Points & Defense Strategy</span>
          </div>
          <p className="text-xs text-neutral-400 mb-3">
            Since your customized CV emphasizes these areas, be prepared to speak in-depth on these topics:
          </p>
          <ul className="space-y-2 text-xs text-neutral-300">
            {result.interviewTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800/60">
                <span className="w-4 h-4 rounded-full bg-indigo-900/60 text-indigo-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
