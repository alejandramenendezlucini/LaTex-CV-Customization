import { SampleTemplate } from "../types";

export const SAMPLE_TEMPLATES: SampleTemplate[] = [
  {
    id: "swe-fullstack",
    title: "Software Engineer (Full-Stack / Distributed Systems)",
    role: "Full-Stack & Systems Engineer",
    defaultCompanyUrl: "https://stripe.com/jobs",
    defaultCompanyName: "Stripe",
    defaultJobDescription: `Role: Senior Software Engineer, Payments & Financial Infrastructure
Responsibilities:
- Architect and scale low-latency distributed transaction processing pipelines handling billions of dollars in volume.
- Build reliable microservices in Go, Java, or Ruby with Postgres and Kafka.
- Optimize database queries, partition large-scale transaction datasets, and maintain 99.999% availability.
- Collaborate across cross-functional teams with product and risk engineering to combat fraud and streamline checkout experiences.
- Champion engineering excellence, code reviews, and automated CI/CD deployment pipelines.

Requirements:
- 4+ years software engineering experience with distributed backend systems.
- Deep familiarity with SQL, message queues (Kafka/RabbitMQ), and cloud environments (AWS/GCP/Kubernetes).
- Proven track record of improving system reliability and latency.`,
    latex: `%-------------------------
% Resume in LaTeX
% Author : Alex Rivera
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape Alex Rivera} \\\\ \\vspace{1pt}
    \\small +1 (555) 234-5678 $|$ \\href{mailto:alex.rivera@email.com}{\\underline{alex.rivera@email.com}} $|$ 
    \\href{https://linkedin.com/in/alexrivera}{\\underline{linkedin.com/in/alexrivera}} $|$
    \\href{https://github.com/alexrivera}{\\underline{github.com/alexrivera}}
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
  \\textbf{University of California, Berkeley} \\hfill Berkeley, CA \\\\
  \\textit{Bachelor of Science in Computer Science} \\hfill Aug 2017 -- May 2021

%-----------EXPERIENCE-----------
\\section{Experience}

  \\textbf{Senior Software Engineer} \\hfill Jan 2023 -- Present \\\\
  \\textit{Fintech Logistics Inc.} \\hfill San Francisco, CA
  \\begin{itemize}[noitemsep,topsep=0pt]
    \\item Built backend web services in TypeScript and Python for invoice generation and user verification.
    \\item Managed team code reviews and assisted junior engineers with debugging daily API issues.
    \\item Migrated monolithic API endpoints into containerized microservices running on AWS ECS.
    \\item Reduced database response times by 35\\% through indexing optimization on PostgreSQL database tables.
    \\item Handled on-call incidents and resolved pipeline outages for order processing batches.
  \\end{itemize}

  \\textbf{Software Engineer} \\hfill Jun 2021 -- Dec 2022 \\\\
  \\textit{CloudScale Systems} \\hfill San Jose, CA
  \\begin{itemize}[noitemsep,topsep=0pt]
    \\item Implemented customer dashboards using React, Redux, and Tailwind CSS for cloud monitoring metrics.
    \\item Developed event-driven microservices using Kafka and Go to process server telemetry logs.
    \\item Wrote unit tests and integration tests reaching 88\\% test coverage in CI/CD pipeline.
    \\item Worked with product managers to deliver user authentication and role-based permissions features.
  \\end{itemize}

%-----------PROJECTS-----------
\\section{Projects}

  \\textbf{Distributed Key-Value Store} $|$ \\emph{Go, Raft Consensus, gRPC, Docker} \\hfill Sep 2022
  \\begin{itemize}[noitemsep,topsep=0pt]
    \\item Created a distributed replicated storage system using the Raft consensus algorithm in Go.
    \\item Handled network partition scenarios, leader election failovers, and log compaction with low latency.
  \\end{itemize}

  \\textbf{High-Throughput Payment Gateway Simulator} $|$ \\emph{Python, Redis, PostgreSQL, FastAPI} \\hfill Apr 2022
  \\begin{itemize}[noitemsep,topsep=0pt]
    \\item Engineered a mock idempotency and transaction reconciliation engine capable of simulating 5,000 req/sec.
    \\item Implemented distributed locks with Redis to prevent double-spending in concurrent balance deductions.
  \\end{itemize}

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: Go, Python, TypeScript, JavaScript, Java, C++, SQL} \\\\
     \\textbf{Frameworks \\& Tools}{: React, Node.js, FastAPI, Docker, Kubernetes, Git, Kafka, Redis, PostgreSQL} \\\\
     \\textbf{Cloud \\& DevOps}{: AWS (ECS, S3, RDS, CloudWatch), CI/CD (GitHub Actions), Terraform}
    }}
 \\end{itemize}

\\end{document}`
  },
  {
    id: "ml-ai-engineer",
    title: "AI & Machine Learning Engineer",
    role: "ML / Data Infrastructure Engineer",
    defaultCompanyUrl: "https://openai.com/careers",
    defaultCompanyName: "Anthropic / OpenAI",
    defaultJobDescription: `Role: Machine Learning Systems Engineer, Model Inference & Platform
Responsibilities:
- Build and optimize large-scale distributed inference infrastructure for LLMs and vision models.
- Implement memory-efficient attention mechanisms (FlashAttention, vLLM, TensorRT-LLM) to maximize GPU throughput and reduce latency.
- Design real-time telemetry, model evaluation benchmarks, and safety guardrail pipelines.
- Collaborate with research scientists to deploy experimental architectures into production workloads.

Requirements:
- Strong programming experience in Python, C++, and PyTorch.
- Experience with GPU kernel optimization (CUDA, Triton) and distributed computing (Ray, Slurm).
- Experience measuring token throughput, TTFT (time-to-first-token), and caching strategies.`,
    latex: `%-------------------------
% Resume in LaTeX - ML Engineer
%------------------------
\\documentclass[letterpaper,10pt]{article}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\titleformat{\\section}{\\scshape\\large}{}{0em}{}[\\titlerule]

\\begin{document}

\\begin{center}
    \\textbf{\\Huge Jordan Chen} \\\\
    \\small San Francisco, CA $|$ jordan.chen@email.com $|$ github.com/jordanchen $|$ hf.co/jordanchen
\\end{center}

\\section{Summary}
Applied Machine Learning Engineer with 3+ years experience building deep learning pipelines, optimizing model serving latency, and training transformer models on distributed GPU clusters.

\\section{Experience}
\\textbf{Machine Learning Engineer} \\hfill 2022 -- Present \\\\
\\textit{Apex Vision AI} \\hfill San Francisco, CA
\\begin{itemize}[noitemsep,topsep=0pt]
  \\item Deployed computer vision and multimodal models on NVIDIA Triton server with ONNX runtime.
  \\item Reduced model inference latency from 140ms to 45ms per image using FP16 quantization.
  \\item Built automated data ingestion pipelines processing 2TB daily training images using Ray and Apache Arrow.
  \\item Maintained PyTorch training codebases and monitored experiment tracking via Weights \\& Biases.
\\end{itemize}

\\textbf{Data Science Intern} \\hfill 2021 -- 2022 \\\\
\\textit{DataMetrics Lab} \\hfill Seattle, WA
\\begin{itemize}[noitemsep,topsep=0pt]
  \\item Trained NLP sentiment analysis models using Hugging Face Transformers for customer support tickets.
  \\item Created interactive visualization dashboards using Streamlit and PostgreSQL.
\\end{itemize}

\\section{Projects}
\\textbf{FastLLM-Serve} $|$ \\emph{Python, PyTorch, CUDA, FastAPI} \\\\
Built an open-source lightweight continuous batching inference engine achieving 2.2x throughput increase for LLaMA models.

\\section{Technical Skills}
\\textbf{Languages \\& Frameworks:} Python, C++, PyTorch, JAX, Hugging Face, CUDA, Triton, Docker, vLLM \\\\
\\textbf{Infrastructure:} AWS EC2 (p4d/g5), Slurm, Kubernetes, Ray, Linux, Git

\\end{document}`
  }
];
