import type { AnalyzePayload } from "@/lib/types";

type UploadPanelProps = {
    payload: AnalyzePayload;
    setPayload: React.Dispatch<React.SetStateAction<AnalyzePayload>>;
    onAnalyze: () => void;
    isLoading: boolean;
};

export function UploadPanel({
                                payload,
                                setPayload,
                                onAnalyze,
                                isLoading,
                            }: UploadPanelProps) {
    const updateField = (field: keyof AnalyzePayload, value: string | string[]) => {
        setPayload((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <section
            className="panel slide-up"
            style={{
                padding: 18,
                display: "grid",
                gap: 14,
                position: "sticky",
                top: 20,
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: 20,
                        fontWeight: 700,
                        letterSpacing: "-0.04em",
                        marginBottom: 4,
                    }}
                >
                    Document intake
                </div>
                <p className="muted" style={{ margin: 0, lineHeight: 1.5, fontSize: 14 }}>
                    Submit contract text for live AI review. File ingestion is part of the product
                    roadmap, but not enabled in this academic demo environment.
                </p>
            </div>

            <div
                style={{
                    border: "1px dashed rgba(255,255,255,0.14)",
                    borderRadius: 18,
                    padding: 14,
                    background: "rgba(255,255,255,0.015)",
                    display: "grid",
                    gap: 10,
                    opacity: 0.72,
                }}
            >
                <div>
                    <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 14 }}>Upload zone</div>
                    <div className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>
                        Planned input types: PDF, DOCX, PNG, JPG.
                    </div>
                </div>

                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)",
                        color: "#a1a1aa",
                        padding: "10px 12px",
                        borderRadius: 12,
                        fontWeight: 600,
                        fontSize: 14,
                        width: "fit-content",
                        cursor: "not-allowed",
                    }}
                    aria-disabled="true"
                >
                    File upload unavailable
                </div>

                <div
                    style={{
                        border: "1px solid rgba(239,68,68,0.22)",
                        background: "rgba(239,68,68,0.08)",
                        borderRadius: 14,
                        padding: 12,
                    }}
                >
                    <div
                        style={{
                            color: "#fca5a5",
                            fontSize: 12,
                            fontWeight: 700,
                            marginBottom: 4,
                        }}
                    >
                        File analysis currently disabled
                    </div>
                    <div className="muted" style={{ fontSize: 13, lineHeight: 1.55 }}>
                        Direct document and image ingestion is not enabled in this version due to the
                        limited IBM watsonx lab configuration used for the prototype.
                    </div>
                </div>
            </div>

            <div style={{ display: "grid", gap: 6 }}>
                <label className="muted" htmlFor="contractText" style={{ fontSize: 14 }}>
                    Contract text
                </label>
                <textarea
                    id="contractText"
                    value={payload.contractText}
                    onChange={(e) => updateField("contractText", e.target.value)}
                    rows={10}
                    placeholder="Paste contract language here..."
                    style={{
                        width: "100%",
                        resize: "vertical",
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.02)",
                        color: "#f5f5f5",
                        padding: 14,
                        outline: "none",
                        lineHeight: 1.55,
                        minHeight: 220,
                        maxHeight: 320,
                    }}
                />
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 10,
                }}
            >
                <Field label="Contract type">
                    <select
                        value={payload.contractType}
                        onChange={(e) => updateField("contractType", e.target.value)}
                        style={inputStyle}
                    >
                        <option value="SaaS Agreement">SaaS Agreement</option>
                        <option value="NDA">NDA</option>
                        <option value="Vendor Agreement">Vendor Agreement</option>
                        <option value="Employment Agreement">Employment Agreement</option>
                        <option value="MSA">MSA</option>
                    </select>
                </Field>

                <Field label="Party perspective">
                    <select
                        value={payload.partyPerspective}
                        onChange={(e) => updateField("partyPerspective", e.target.value)}
                        style={inputStyle}
                    >
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                        <option value="Neutral">Neutral</option>
                    </select>
                </Field>

                <Field label="Jurisdiction">
                    <input
                        value={payload.jurisdiction}
                        onChange={(e) => updateField("jurisdiction", e.target.value)}
                        style={inputStyle}
                        placeholder="US"
                    />
                </Field>

                <Field label="Review mode">
                    <select
                        value={payload.reviewMode}
                        onChange={(e) => updateField("reviewMode", e.target.value)}
                        style={inputStyle}
                    >
                        <option value="Standard">Standard</option>
                        <option value="Conservative">Conservative</option>
                        <option value="Aggressive">Aggressive</option>
                    </select>
                </Field>
            </div>

            <div style={{ display: "grid", gap: 6 }}>
                <label className="muted" style={{ fontSize: 14 }}>
                    Focus areas
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Liability", "Termination", "Privacy", "IP", "Payment"].map((item) => {
                        const active = payload.focusAreas.includes(item);
                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => {
                                    const next = active
                                        ? payload.focusAreas.filter((v) => v !== item)
                                        : [...payload.focusAreas, item];
                                    updateField("focusAreas", next);
                                }}
                                style={{
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    background: active ? "#f5f5f5" : "transparent",
                                    color: active ? "#050505" : "#f5f5f5",
                                    padding: "8px 12px",
                                    borderRadius: 999,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    fontSize: 13,
                                }}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </div>

            <button
                onClick={onAnalyze}
                disabled={isLoading}
                style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "#f5f5f5",
                    color: "#050505",
                    padding: "12px 16px",
                    borderRadius: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                }}
            >
                {isLoading ? "Analyzing..." : "Analyze Contract"}
            </button>
        </section>
    );
}

function Field({
                   label,
                   children,
               }: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div style={{ display: "grid", gap: 6 }}>
            <label className="muted" style={{ fontSize: 14 }}>
                {label}
            </label>
            {children}
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#111214",
    color: "#f5f5f5",
    padding: "10px 12px",
    outline: "none",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    fontSize: 14,
};