import type { AnalysisResult } from "./types";

export const mockAnalysis: AnalysisResult = {
    overallRiskLevel: "High",
    riskScore: 82,
    flaggedClauses: [
        {
            clauseName: "Termination for Convenience",
            riskLevel: "High",
            reason:
                "The provider may terminate the agreement at any time with limited protection for the customer.",
            suggestedFix:
                "Require a minimum notice period and transition support obligations.",
        },
        {
            clauseName: "Liability Cap",
            riskLevel: "High",
            reason:
                "Liability is capped at one month of fees, which may be too low relative to commercial exposure.",
            suggestedFix:
                "Negotiate a higher cap tied to annual fees or carve out key risk categories.",
        },
        {
            clauseName: "Data Privacy Protections",
            riskLevel: "Medium",
            reason:
                "The agreement does not clearly define notification timelines or security obligations.",
            suggestedFix:
                "Add breach notification timing, security commitments, and data processing terms.",
        },
    ],
    missingClauses: [
        "Service level commitments",
        "Data breach notification timeline",
        "Security incident cooperation language",
        "Detailed exit assistance obligations",
    ],
    negotiationPoints: [
        "Add 30-day termination notice and transition support.",
        "Increase liability cap for privacy, confidentiality, and IP claims.",
        "Introduce specific SLA and uptime remedies.",
        "Add explicit breach notification and response obligations.",
    ],
    executiveSummary:
        "This contract presents elevated commercial and operational risk from one-sided termination rights, a narrow liability cap, and missing data protection commitments. The document is workable, but it should be revised before approval.",
};