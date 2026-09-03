export interface CustomizationOptions {
  emphasisMode: "balanced" | "technical" | "leadership" | "impact_metrics";
  seniorityLevel: "entry" | "mid" | "senior" | "lead";
  preservePageFit: boolean;
  highlightKeywords: boolean;
}

export interface KeyChange {
  section: string;
  before: string;
  after: string;
  reason: string;
}

export interface CompanyProfile {
  name: string;
  targetRole: string;
  keyNeeds: string[];
}

export interface TailoredResult {
  customizedLatex: string;
  matchScoreBefore: number;
  matchScoreAfter: number;
  companyProfile: CompanyProfile;
  keyChanges: KeyChange[];
  matchedKeywords: string[];
  missingOrRecommendedKeywords: string[];
  interviewTips: string[];
}

export interface SampleTemplate {
  id: string;
  title: string;
  role: string;
  latex: string;
  defaultCompanyUrl: string;
  defaultCompanyName: string;
  defaultJobDescription: string;
}
