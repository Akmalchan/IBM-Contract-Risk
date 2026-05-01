type HeroProps = {
    onContinue: () => void;
};

export function Hero({ onContinue }: HeroProps) {
    return (
        <section className="container fade-in" style={{ paddingTop: 36, paddingBottom: 56 }}>
            <div
                className="panel"
                style={{
                    padding: 32,
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.08), transparent 30%)",
                        pointerEvents: "none",
                    }}
                />

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 0.8fr",
                        gap: 28,
                    }}
                >
                    <div>
                        <div
                            style={{
                                display: "inline-flex",
                                padding: "8px 12px",
                                borderRadius: 999,
                                border: "1px solid rgba(255,255,255,0.12)",
                                color: "#cfcfd4",
                                fontSize: 13,
                                marginBottom: 18,
                            }}
                        >
                            AI contract review for high-stakes commercial workflows
                        </div>

                        <h1
                            style={{
                                fontSize: 64,
                                lineHeight: 1,
                                letterSpacing: "-0.06em",
                                margin: 0,
                                maxWidth: 720,
                            }}
                        >
                            Enterprise contract risk review, built for decision speed.
                        </h1>

                        <p
                            className="muted"
                            style={{
                                fontSize: 18,
                                lineHeight: 1.65,
                                maxWidth: 760,
                                marginTop: 20,
                                marginBottom: 28,
                            }}
                        >
                            ClauseLens transforms raw contract language into a structured risk dashboard
                            with flagged clauses, missing protections, negotiation guidance, and an
                            executive summary.
                        </p>

                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <button
                                onClick={onContinue}
                                style={{
                                    border: "1px solid rgba(255,255,255,0.18)",
                                    background: "#f5f5f5",
                                    color: "#050505",
                                    padding: "12px 18px",
                                    borderRadius: 14,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Continue as Guest
                            </button>

                            <a
                                href="#demo-note"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    background: "transparent",
                                    color: "#f5f5f5",
                                    padding: "12px 18px",
                                    borderRadius: 14,
                                    fontWeight: 600,
                                }}
                            >
                                Service Notice
                            </a>
                        </div>
                    </div>

                    <div
                        className="glass"
                        style={{
                            borderRadius: 24,
                            padding: 20,
                            display: "grid",
                            gap: 14,
                            minHeight: 320,
                        }}
                    >
                        <div className="muted" style={{ fontSize: 13 }}>
                            Preview
                        </div>

                        <div
                            style={{
                                border: "1px solid rgba(255,255,255,0.08)",
                                borderRadius: 18,
                                padding: 18,
                                background: "rgba(255,255,255,0.02)",
                            }}
                        >
                            <div className="soft" style={{ fontSize: 12, marginBottom: 8 }}>
                                Overall risk
                            </div>
                            <div style={{ fontSize: 34, fontWeight: 700 }}>High</div>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 12,
                            }}
                        >
                            {[
                                ["Risk score", "82"],
                                ["Flagged clauses", "3"],
                                ["Missing protections", "4"],
                                ["Review mode", "Conservative"],
                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    style={{
                                        border: "1px solid rgba(255,255,255,0.08)",
                                        borderRadius: 18,
                                        padding: 16,
                                        background: "rgba(255,255,255,0.02)",
                                    }}
                                >
                                    <div className="soft" style={{ fontSize: 12, marginBottom: 6 }}>
                                        {label}
                                    </div>
                                    <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    id="demo-note"
                    style={{
                        marginTop: 24,
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        paddingTop: 18,
                    }}
                >
                    <p className="muted" style={{ margin: 0, lineHeight: 1.6 }}>
                        Demo note: Live AI analysis depends on temporary academic access to IBM
                        watsonx. If access expires, the interface remains available in preview mode for
                        portfolio demonstration.
                    </p>
                </div>
            </div>
        </section>
    );
}