import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initialization of Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in the environment.");
    }
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Quick company preview / URL inspection endpoint
app.post("/api/cv/analyze-url", async (req, res) => {
  try {
    const { companyUrl } = req.body;
    if (!companyUrl || typeof companyUrl !== "string") {
      return res.status(400).json({ error: "Company URL is required" });
    }

    const ai = getGeminiClient();
    const prompt = `Analyze this company URL or domain name: "${companyUrl}".
Provide a concise overview of what the company does, their domain/industry, likely engineering or work culture, and key technical stack or skills commonly valued there.
Return a valid JSON object with:
{
  "companyName": "Inferred company name",
  "industry": "Industry / Domain",
  "summary": "2-3 sentence overview of what the company does",
  "valuedSkills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
  "cultureKeywords": ["Innovation", "Scalability", "Customer Focus", ...]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("Error analyzing company URL:", error);
    return res.status(500).json({
      error: error.message || "Failed to analyze company URL",
    });
  }
});

// Main CV Customization endpoint
app.post("/api/cv/customize", async (req, res) => {
  try {
    const {
      latexCode,
      companyUrl,
      companyName,
      jobDescription,
      customizationOptions = {},
    } = req.body;

    if (!latexCode || !latexCode.trim()) {
      return res.status(400).json({ error: "Original LaTeX code is required." });
    }
    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ error: "Job or position description is required." });
    }

    const {
      emphasisMode = "balanced", // 'technical' | 'leadership' | 'impact_metrics' | 'balanced'
      seniorityLevel = "mid",
      preservePageFit = true,
      highlightKeywords = true,
    } = customizationOptions;

    const ai = getGeminiClient();

    const systemInstruction = `You are a world-class LaTeX typesetting and executive career strategist expert.
Your mission is to customize, restructure, and optimize a user's LaTeX CV for a target company and specific position/project description.

CRITICAL LATEX INTEGRITY RULES:
1. THE OUTPUT MUST BE 100% VALID, COMPILABLE LATEX.
2. PRESERVE THE EXACT PREAMBLE: Keep \\documentclass, \\usepackage, custom macros (e.g., \\cventry, \\resumeItem, \\datedsubsection, \\resumeSubheading, etc.), document geometry, and all custom environments intact.
3. ESCAPING: Always properly escape special LaTeX characters in any new or modified text (e.g., use \\%, \\&, \\_, \\#, \\$, \\{, \\}). Do not leave unescaped '%' or '&' in body text.
4. DO NOT INVENT FALSE FACTS: Do not invent false companies, fake educational degrees, or fictitious job titles. Instead, accentuate real transferable achievements, reframe bullet points using the target role's terminology, and elevate the most relevant projects/experiences.
5. TAILORING ACTIONS:
   - Re-order bullet points in experience and project sections so the most relevant to the target role appear first.
   - Refine bullet points using the Google XYZ framework ("Accomplished [X] as measured by [Y], by doing [Z]") and action verbs that resonate with the job requirements.
   - Emphasize and reorder skills in the Skills section so that technologies demanded by the target company appear first.
   - ${highlightKeywords ? "Lightly emphasize 2-4 critical technical keywords per section with \\textbf{...} where fitting standard CV styling." : "Do not add excessive bold tags."}
   - ${preservePageFit ? "Keep the overall length and bullet counts balanced so the document preserves its 1-2 page layout without overflow." : "Optimize for comprehensive depth."}
   - Adjust the Professional Summary / Objective (if present in the CV) to hook the target company (${companyName || companyUrl || "the target company"}).

You must respond with a JSON object strictly following this structure:
{
  "customizedLatex": "Complete compilable LaTeX source code",
  "matchScoreBefore": 65,
  "matchScoreAfter": 94,
  "companyProfile": {
    "name": "${companyName || "Target Company"}",
    "targetRole": "Identified job title/role",
    "keyNeeds": ["Key requirement 1", "Key requirement 2", "Key requirement 3"]
  },
  "keyChanges": [
    {
      "section": "Experience / Projects / Skills / Summary",
      "before": "Original bullet or snippet",
      "after": "Tailored bullet or snippet",
      "reason": "Why this aligns better with the target role"
    }
  ],
  "matchedKeywords": ["Keywords successfully highlighted and integrated"],
  "missingOrRecommendedKeywords": ["Desirable keywords from the JD not present in original CV with quick tips"],
  "interviewTips": ["Specific talking point or project to bring up based on this tailored CV"]
}`;

    const prompt = `TARGET COMPANY CONTEXT:
Company URL: ${companyUrl || "Not specified"}
Company Name: ${companyName || "Target Company"}

TARGET POSITION OR PROJECT DESCRIPTION:
"""
${jobDescription}
"""

CUSTOMIZATION SETTINGS:
- Emphasis Mode: ${emphasisMode}
- Seniority Level: ${seniorityLevel}
- Preserve Page Fit: ${preservePageFit ? "Yes (maintain tight spacing)" : "No"}
- Highlight Keywords with \\textbf: ${highlightKeywords ? "Yes" : "No"}

ORIGINAL LATEX CV CODE:
"""
${latexCode}
"""

Please customize this LaTeX CV according to the instructions and return the JSON object.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch (parseErr) {
      // Fallback extraction if JSON contains markdown markers
      const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedResult = JSON.parse(cleaned);
    }

    return res.json(parsedResult);
  } catch (error: any) {
    console.error("Error customizing CV:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while customizing the LaTeX CV.",
    });
  }
});

// Setup Vite development server middleware or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
