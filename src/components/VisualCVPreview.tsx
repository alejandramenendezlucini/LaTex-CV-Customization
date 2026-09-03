import React, { useMemo } from "react";
import { parseLatexToCV } from "../utils/latexParser";
import { Download, Printer } from "lucide-react";

interface VisualCVPreviewProps {
  latexCode: string;
  onDownloadTex: () => void;
}

export const VisualCVPreview: React.FC<VisualCVPreviewProps> = ({ latexCode, onDownloadTex }) => {
  const cv = useMemo(() => {
    return parseLatexToCV(latexCode);
  }, [latexCode]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-2">
        <div className="text-xs text-neutral-400">
          Simulated Document Layout (Rendered from LaTeX AST)
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            <Printer className="w-3 h-3" />
            <span>Print Preview</span>
          </button>
          <button
            type="button"
            onClick={onDownloadTex}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Save .tex</span>
          </button>
        </div>
      </div>

      {/* Styled Resume Paper Container */}
      <div className="bg-white text-neutral-900 rounded-xl shadow-2xl p-8 sm:p-12 max-w-3xl mx-auto w-full font-serif border border-neutral-300 min-h-[750px]">
        {/* Header Name & Contact */}
        <div className="text-center pb-4 border-b border-neutral-300 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1 font-sans">
            {cv.name}
          </h1>
          {cv.contactInfo.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-600 font-sans">
              {cv.contactInfo.map((info, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-neutral-400">•</span>}
                  <span>{info}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Professional Summary if parsed */}
        {cv.summary && (
          <div className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800 pb-1 border-b border-neutral-300 mb-2 font-sans">
              Professional Summary
            </h2>
            <p
              className="text-xs text-neutral-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: cv.summary }}
            />
          </div>
        )}

        {/* Sections */}
        {cv.sections.map((section, sIdx) => (
          <div key={sIdx} className="mb-5">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800 pb-1 border-b border-neutral-400 mb-2.5 font-sans flex items-center justify-between">
              <span>{section.title}</span>
            </h2>

            <div className="flex flex-col gap-3">
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="text-xs">
                  {/* Job/Project Header */}
                  {(item.heading || item.date) && (
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-0.5 font-sans">
                      <div className="font-semibold text-neutral-900" dangerouslySetInnerHTML={{ __html: item.heading || "" }} />
                      {item.date && (
                        <div className="text-neutral-500 font-normal text-[11px] shrink-0">
                          {item.date}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Subtitle / Company / Location */}
                  {(item.subheading || item.location) && (
                    <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1 text-neutral-600 italic font-sans text-[11px]">
                      <span dangerouslySetInnerHTML={{ __html: item.subheading || "" }} />
                      {item.location && <span>{item.location}</span>}
                    </div>
                  )}

                  {/* Bullet points */}
                  {item.bullets.length > 0 && (
                    <ul className="list-disc pl-4 space-y-1 text-neutral-700 leading-relaxed">
                      {item.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="pl-0.5 text-xs text-neutral-800"
                          dangerouslySetInnerHTML={{ __html: bullet }}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
