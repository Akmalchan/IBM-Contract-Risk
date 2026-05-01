export type RiskLevel = "Low" | "Medium" | "High";

export type ClauseFinding = {
    clauseName: string;
    riskLevel: RiskLevel;
    reason: string;
    suggestedFix: string;
};

export type AnalysisResult = {
    overallRiskLevel: RiskLevel;
    riskScore: number;
    flaggedClauses: ClauseFinding[];
    missingClauses: string[];
    negotiationPoints: string[];
    executiveSummary: string;
};

export type AnalyzePayload = {
    contractText: string;
    contractType: string;
    partyPerspective: string;
    jurisdiction: string;
    reviewMode: string;
    focusAreas: string[];
};