# 📄 AI-Powered LaTeX CV Customizer

An AI-driven web application built with **Google AI Studio** and **Gemini 1.5/2.0** that allows users to seamlessly tailor, compile, and export professional, ATS-optimized LaTeX resumes based on job descriptions.
APP Link: https://latex-cv-customizer.ai.studio/
---

## ✨ Features

- **🤖 AI-Driven CV Tailoring:** Automatically rewrites summary sections, work experience bullet points, and skills to align with targeted job descriptions.
- **📄 Real-Time LaTeX Compilation:** Instant web preview of generated LaTeX code compiled into a clean, downloadable PDF.
- **🎨 Custom Templates:** Support for modern, minimalist, and ATS-friendly LaTeX templates.
- **🛡️ Anti-Fabrication Safeguards:** Prevents the AI model from making up untruthful experience, credentials, or work dates.
- **🔍 ATS Optimization & Keyword Analysis:** Identifies keyword gaps between your CV and the job posting.

---

## 🛠️ Tech Stack

- **Frontend:** React / Next.js / TypeScript / Tailwind CSS
- **AI Core:** Google AI Studio API (Gemini Flash / Gemini Pro)
- **LaTeX Renderer:** Node.js Web Server / WebAssembly (pdflatex / XeLaTeX engine)
- **Hosting:** Google AI Studio App Platform

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- Node.js (v18+)
- Local TeX Distribution (e.g., TeX Live or MiKTeX) or Docker
- Google AI Studio API Key ([Get one here](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/latex-cv-customizer.git](https://github.com/your-username/latex-cv-customizer.git)
   cd latex-cv-customizer
