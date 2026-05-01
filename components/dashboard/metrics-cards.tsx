import type { AnalysisResult } from "@/lib/types";

type MetricsCardsProps = {
    result: AnalysisResult;
};

export function MetricsCards({ result }: MetricsCardsProps) {
    const cards = [
        ["Overall Risk", result.overallRiskLevel],
        ["Risk Score", String(result.riskScore)],
        ["Flagged Clauses", String(result.flaggedClauses.length)],
        ["Missing Protections", String(result.missingClauses.length)],
    ];

    return (
        <section
            className="slide-up"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 14,
            }}
        >
            {cards.map(([label, value]) => (
                <div
                    key={label}
                    className="panel"
                    style={{
                        padding: 18,
                        minHeight: 120,
                    }}
                >
                    <div className="soft" style={{ fontSize: 13, marginBottom: 10 }}>
                        {label}
                    </div>
                    <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: "-0.05em" }}>
                        {value}
                    </div>
                </div>
            ))}
        </section>
    );
}