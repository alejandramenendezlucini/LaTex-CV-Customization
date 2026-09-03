import React, { useState } from "react";
import { Header } from "./components/Header";
import { InputSection } from "./components/InputSection";
import { ResultsSection } from "./components/ResultsSection";
import { SAMPLE_TEMPLATES } from "./data/sampleCVs";
import { CustomizationOptions, TailoredResult, SampleTemplate } from "./types";
import {
  Sparkles,
  FileCode2,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function App() {
  const defaultSample = SAMPLE_TEMPLATES[0];

  const [companyUrl, setCompanyUrl] = useState<string>(defaultSample.defaultCompanyUrl);
  const [companyName, setCompanyName] = useState<string>(defaultSample.defaultCompanyName);
  const [jobDescription, setJobDescription] = useState<string>(defaultSample.defaultJobDescription);
  const [latexCode, setLatexCode] = useState<string>(defaultSample.latex);

  const [options, setOptions] = useState<CustomizationOptions>({
    emphasisMode: "balanced",
    seniorityLevel: "mid",
    preservePageFit: true,
    highlightKeywords: true,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TailoredResult | null>(null);

  const handleSelectSample = (sample: SampleTemplate) => {
    setCompanyUrl(sample.defaultCompanyUrl);
    setCompanyName(sample.defaultCompanyName);
    setJobDescription(sample.defaultJobDescription);
    setLatexCode(sample.latex);
    setResult(null);
    setError(null);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const handleCustomize = async () => {
    if (!latexCode.trim()) {
      setError("Please provide your original LaTeX CV code.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please provide the project or position description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingStep("Analyzing company context & requirements...");

    try {
      setTimeout(() => {
        setLoadingStep("Matching skills & restructuring LaTeX bullet points...");
      }, 1400);

      setTimeout(() => {
        setLoadingStep("Verifying LaTeX macro preservation & compiling diff...");
      }, 2800);

      const response = await fetch("/api/cv/customize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latexCode,
          companyUrl,
          companyName,
          jobDescription,
          customizationOptions: options,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to customize LaTeX CV.");
      }

      setResult(data);
    } catch (err: any) {
      console.error("Customize error:", err);
      setError(err.message || "An unexpected error occurred. Please verify your input and try again.");
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      <Header
        onSelectSample={handleSelectSample}
        onReset={handleReset}
        hasCustomized={!!result}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Value Proposition Highlights Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span>
              <strong>Zero Syntax Breakage:</strong> Preamble, macros (<code className="font-mono text-indigo-300">\resumeItem</code>, <code className="font-mono text-indigo-300">\cventry</code>), and geometry remain 100% valid.
            </span>
          </div>

          <div className="flex items-center gap-4 text-neutral-400">
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Google XYZ Framework
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> ATS Keywords
            </span>
          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <div className={`grid grid-cols-1 ${result ? "lg:grid-cols-12 gap-6" : "lg:grid-cols-12 gap-8"}`}>
          {/* Left Column: Input Form */}
          <div className={`${result ? "lg:col-span-5" : "lg:col-span-6"}`}>
            <InputSection
              companyUrl={companyUrl}
              setCompanyUrl={setCompanyUrl}
              companyName={companyName}
              setCompanyName={setCompanyName}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              latexCode={latexCode}
              setLatexCode={setLatexCode}
              options={options}
              setOptions={setOptions}
              onCustomize={handleCustomize}
              isLoading={isLoading}
              loadingStep={loadingStep}
              error={error}
            />
          </div>

          {/* Right Column: Results OR Initial Guidance Preview */}
          <div className={`${result ? "lg:col-span-7" : "lg:col-span-6"}`}>
            {result ? (
              <ResultsSection
                originalLatex={latexCode}
                result={result}
                companyName={companyName}
              />
            ) : (
              <div className="h-full flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-semibold text-neutral-200">
                      How the LaTeX Customizer Works
                    </h3>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    Rather than manually editing LaTeX code for every job application, provide your LaTeX CV, company link, and target job description. The AI engine analyzes the role and intelligently tailors your document.
                  </p>

                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs">
                      <div className="font-semibold text-neutral-200 flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-indigo-900/50 text-indigo-300 flex items-center justify-center font-bold text-[11px]">
                          1
                        </span>
                        <span>Company & JD Intelligence</span>
                      </div>
                      <p className="text-neutral-400 ml-7 leading-relaxed text-[11px]">
                        Scans the company link and extracts required technologies, leadership expectations, and domain priorities.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs">
                      <div className="font-semibold text-neutral-200 flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-indigo-900/50 text-indigo-300 flex items-center justify-center font-bold text-[11px]">
                          2
                        </span>
                        <span>Experience Prioritization & Rewriting</span>
                      </div>
                      <p className="text-neutral-400 ml-7 leading-relaxed text-[11px]">
                        Re-orders bullet points to elevate your most relevant accomplishments to the top. Reframes technical contributions with quantifiable impact metrics.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs">
                      <div className="font-semibold text-neutral-200 flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-indigo-900/50 text-indigo-300 flex items-center justify-center font-bold text-[11px]">
                          3
                        </span>
                        <span>Compilable Output & Diff View</span>
                      </div>
                      <p className="text-neutral-400 ml-7 leading-relaxed text-[11px]">
                        Generates verified LaTeX code ready for Overleaf with a side-by-side line diff and simulated document preview.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-indigo-950/20 border border-indigo-900/30 text-xs text-neutral-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-indigo-400" />
                    <span>Sample templates preloaded. Click "Customize" to see live results!</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCustomize}
                    disabled={isLoading}
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium ml-2 shrink-0"
                  >
                    <span>Run Sample</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-900 bg-neutral-950 py-4 text-center text-xs text-neutral-600">
        <p>LaTeX CV Customizer • Powered by Gemini • Safe LaTeX Macro Preservation</p>
      </footer>
    </div>
  );
}
