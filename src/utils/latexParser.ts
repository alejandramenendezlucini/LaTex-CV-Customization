export interface ParsedCVSection {
  title: string;
  items: ParsedCVItem[];
}

export interface ParsedCVItem {
  heading?: string;
  subheading?: string;
  date?: string;
  location?: string;
  bullets: string[];
}

export interface ParsedCV {
  name: string;
  contactInfo: string[];
  summary?: string;
  sections: ParsedCVSection[];
}

/**
 * Strips and converts standard LaTeX macros into clean HTML/text formatting
 */
export function cleanLatexText(text: string): string {
  if (!text) return "";

  return text
    // Replace hrefs: \href{url}{label} -> label
    .replace(/\\href\{[^}]*\}\{([^}]*)\}/g, "$1")
    // Replace textbf, textit, emph, underline
    .replace(/\\textbf\{([^}]*)\}/g, "<strong>$1</strong>")
    .replace(/\\textit\{([^}]*)\}/g, "<em>$1</em>")
    .replace(/\\emph\{([^}]*)\}/g, "<em>$1</em>")
    .replace(/\\underline\{([^}]*)\}/g, "<u>$1</u>")
    .replace(/\\small\{([^}]*)\}/g, "$1")
    .replace(/\\Huge\s*/g, "")
    .replace(/\\Large\s*/g, "")
    .replace(/\\large\s*/g, "")
    .replace(/\\scshape\s*/g, "")
    .replace(/\\sc\s*/g, "")
    // Escaped characters
    .replace(/\\%/g, "%")
    .replace(/\\&/g, "&")
    .replace(/\\_/g, "_")
    .replace(/\\#/g, "#")
    .replace(/\\\$/g, "$")
    .replace(/\\\{/g, "{")
    .replace(/\\\}/g, "}")
    .replace(/\\item\s*/g, "")
    .replace(/\\\\/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Parses LaTeX CV code into structured document model for visual paper rendering
 */
export function parseLatexToCV(latex: string): ParsedCV {
  const lines = latex.split("\n");
  const result: ParsedCV = {
    name: "",
    contactInfo: [],
    sections: [],
  };

  let currentSection: ParsedCVSection | null = null;
  let currentItem: ParsedCVItem | null = null;
  let inItemize = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i].trim();

    // Skip comments
    if (rawLine.startsWith("%") || !rawLine) continue;

    // Detect Name
    if (!result.name) {
      const nameMatch = rawLine.match(/\\textbf\{(\\Huge|\\huge|\\LARGE)?\s*(\\scshape)?\s*([^}]+)\}/);
      if (nameMatch) {
        result.name = cleanLatexText(nameMatch[3]).replace(/<[^>]+>/g, "").trim();
        continue;
      }
    }

    // Detect Contact line
    if (rawLine.includes("\\small") && (rawLine.includes("@") || rawLine.includes("href") || rawLine.includes("+") || rawLine.includes("linkedin"))) {
      const cleaned = cleanLatexText(rawLine).replace(/<[^>]+>/g, "");
      const parts = cleaned.split("$|$").map((p) => p.trim()).filter(Boolean);
      if (parts.length > 0 && result.contactInfo.length === 0) {
        result.contactInfo = parts;
        continue;
      }
    }

    // Detect Sections: \section{...}
    const sectionMatch = rawLine.match(/\\section\*?\{([^}]+)\}/);
    if (sectionMatch) {
      if (currentSection) {
        if (currentItem) currentSection.items.push(currentItem);
        result.sections.push(currentSection);
      }
      currentSection = {
        title: cleanLatexText(sectionMatch[1]).replace(/<[^>]+>/g, "").trim(),
        items: [],
      };
      currentItem = null;
      inItemize = false;
      continue;
    }

    // Inside a section
    if (currentSection) {
      if (rawLine.includes("\\begin{itemize}")) {
        inItemize = true;
        continue;
      }
      if (rawLine.includes("\\end{itemize}")) {
        inItemize = false;
        continue;
      }

      // Detect item bullet
      if (rawLine.startsWith("\\item")) {
        const bulletText = cleanLatexText(rawLine.replace(/^\\item\s*/, ""));
        if (bulletText) {
          if (!currentItem) {
            currentItem = { bullets: [] };
          }
          currentItem.bullets.push(bulletText);
        }
        continue;
      }

      // Detect job header line like \textbf{Senior Software Engineer} \hfill Jan 2023 -- Present
      if (rawLine.includes("\\textbf{") && (rawLine.includes("\\hfill") || rawLine.includes(" -- ") || rawLine.includes("Present"))) {
        if (currentItem) {
          currentSection.items.push(currentItem);
        }

        const parts = rawLine.split("\\hfill");
        const headingPart = cleanLatexText(parts[0] || "");
        const datePart = parts[1] ? cleanLatexText(parts[1]).replace(/<[^>]+>/g, "").trim() : "";

        // Lookahead for next line (company name or subtitle like \textit{Fintech Logistics Inc.} \hfill San Francisco, CA)
        let subheading = "";
        let location = "";
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1].trim();
          if (nextLine.includes("\\textit{") || nextLine.includes("\\emph{")) {
            i++;
            const subParts = nextLine.split("\\hfill");
            subheading = cleanLatexText(subParts[0] || "");
            location = subParts[1] ? cleanLatexText(subParts[1]).replace(/<[^>]+>/g, "").trim() : "";
          }
        }

        currentItem = {
          heading: headingPart,
          date: datePart,
          subheading,
          location,
          bullets: [],
        };
        continue;
      }

      // Check for standalone text or summary paragraph
      if (!inItemize && currentSection.title.toLowerCase().includes("summary")) {
        const text = cleanLatexText(rawLine);
        if (text && !text.startsWith("\\")) {
          if (!result.summary) result.summary = text;
          else result.summary += " " + text;
        }
      } else if (!inItemize && rawLine.includes("\\textbf{")) {
        // standalone bold line (e.g. project title or skill group)
        if (currentItem && currentItem.bullets.length > 0) {
          currentSection.items.push(currentItem);
          currentItem = null;
        }
        const cleaned = cleanLatexText(rawLine);
        currentItem = {
          heading: cleaned,
          bullets: [],
        };
      }
    }
  }

  if (currentSection) {
    if (currentItem) currentSection.items.push(currentItem);
    result.sections.push(currentSection);
  }

  // Fallback name if none found
  if (!result.name) {
    result.name = "Curriculum Vitae";
  }

  return result;
}
