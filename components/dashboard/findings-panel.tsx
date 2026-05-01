import type { AnalysisResult } from "@/lib/types";

type FindingsPanelProps = {
    result: AnalysisResult;
};

export function FindingsPanel({ result }: FindingsPanelProps) {
    return (
        <section
            className="slide-up"
            style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 0.85fr",
                gap: 16,
            }}
        >
            <div className="panel" style={{ padding: 20 }}>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 14 }}>
                    Flagged clauses
                </div>

                <div style={{ display: "grid", gap: 12 }}>
                    {result.flaggedClauses.map((clause) => (
                        <div
                            key={clause.clauseName}
                            style={{
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 18,
                                padding: 16,
                                background: "rgba(255,255,255,0.02)",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 12,
                                    marginBottom: 10,
                                    alignItems: "center",
                                }}
                            >
                                <div style={{ fontWeight: 700 }}>{clause.clauseName}</div>
                                <span
                                    style={{
                                        fontSize: 12,
                                        padding: "6px 10px",
                                        borderRadius: 999,
                                        border: "1px solid rgba(255,255,255,0.12)",
                                        color:
                                            clause.riskLevel === "High"
                                                ? "#fca5a5"
                                                : clause.riskLevel === "Medium"
                                                    ? "#fde68a"
                                                    : "#86efac",
                                    }}
                                >
                  {clause.riskLevel}
                </span>
                            </div>

                            <p className="muted" style={{ marginTop: 0, marginBottom: 10, lineHeight: 1.6 }}>
                                {clause.reason}
                            </p>

                            <div
                                style={{
                                    borderLeft: "2px solid rgba(255,255,255,0.15)",
                                    paddingLeft: 12,
                                    color: "#d4d4d8",
                                    lineHeight: 1.6,
                                }}
                            >
                                {clause.suggestedFix}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: "grid", gap: 16 }}>
                <div className="panel" style={{ padding: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                        Missing protections
                    </div>
                    <ul className="muted" style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
                        {result.missingClauses.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="panel" style={{ padding: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                        Negotiation points
                    </div>
                    <ul className="muted" style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
                        {result.negotiationPoints.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="panel" style={{ padding: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
                        Executive summary
                    </div>
                    <p className="muted" style={{ margin: 0, lineHeight: 1.75 }}>
                        {result.executiveSummary}
                    </p>
                </div>
            </div>
        </section>
    );
}