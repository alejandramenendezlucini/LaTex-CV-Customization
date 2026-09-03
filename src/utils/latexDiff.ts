export interface DiffLine {
  type: "added" | "removed" | "unchanged" | "modified";
  content: string;
  originalLineNumber?: number;
  customLineNumber?: number;
}

/**
 * Computes a clean line-based diff between original and customized LaTeX code.
 */
export function computeLatexDiff(original: string, customized: string): DiffLine[] {
  const origLines = original.split("\n");
  const custLines = customized.split("\n");

  const diff: DiffLine[] = [];
  let i = 0;
  let j = 0;

  while (i < origLines.length || j < custLines.length) {
    const orig = origLines[i];
    const cust = custLines[j];

    if (orig === cust) {
      if (orig !== undefined) {
        diff.push({
          type: "unchanged",
          content: orig,
          originalLineNumber: i + 1,
          customLineNumber: j + 1,
        });
      }
      i++;
      j++;
    } else if (i < origLines.length && j < custLines.length) {
      // Lookahead check to see if one was inserted or deleted
      const lookaheadOrig = origLines.slice(i, i + 5);
      const lookaheadCust = custLines.slice(j, j + 5);

      const custIdxInOrig = lookaheadOrig.indexOf(cust);
      const origIdxInCust = lookaheadCust.indexOf(orig);

      if (custIdxInOrig !== -1 && (origIdxInCust === -1 || custIdxInOrig <= origIdxInCust)) {
        // Original has extra lines deleted
        diff.push({
          type: "removed",
          content: orig,
          originalLineNumber: i + 1,
        });
        i++;
      } else if (origIdxInCust !== -1) {
        // Customized has new lines added
        diff.push({
          type: "added",
          content: cust,
          customLineNumber: j + 1,
        });
        j++;
      } else {
        // Line was modified in place
        diff.push({
          type: "removed",
          content: orig,
          originalLineNumber: i + 1,
        });
        diff.push({
          type: "added",
          content: cust,
          customLineNumber: j + 1,
        });
        i++;
        j++;
      }
    } else if (i < origLines.length) {
      diff.push({
        type: "removed",
        content: orig,
        originalLineNumber: i + 1,
      });
      i++;
    } else {
      diff.push({
        type: "added",
        content: cust,
        customLineNumber: j + 1,
      });
      j++;
    }
  }

  return diff;
}
