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
                padding: 20,
                display: "grid",
                gap: 16,
            }}
        >
            <div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em" }}>
                    Document intake
                </div>
                <p className="muted" style={{ marginBottom: 0 }}>
                    Paste contract language now. PDF upload can be wired next.
                </p>
            </div>

            <div
                style={{
                    border: "1px dashed rgba(255,255,255,0.16)",
                    borderRadius: 20,
                    padding: 18,
                    background: "rgba(255,255,255,0.015)",
                }}
            >
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Upload zone</div>
                <div className="muted" style={{ fontSize: 14 }}>
                    PDF support placeholder for next step. For now, paste raw contract text below.
                </div>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
                <label className="muted" htmlFor="contractText">
                    Contract text
                </label>
                <textarea
                    id="contractText"
                    value={payload.contractText}
                    onChange={(e) => updateField("contractText", e.target.value)}
                    rows={14}
                    placeholder="Paste contract language here..."
                    style={{
                        width: "100%",
                        resize: "vertical",
                        borderRadius: 18,
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.02)",
                        color: "#f5f5f5",
                        padding: 16,
                        outline: "none",
                    }}
                />
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                }}
            >
                <Field label="Contract type">
                    <select
                        value={payload.contractType}
                        onChange={(e) => updateField("contractType", e.target.value)}
                        style={inputStyle}
                    >
                        <option>SaaS Agreement</option>
                        <option>NDA</option>
                        <option>Vendor Agreement</option>
                        <option>Employment Agreement</option>
                        <option>MSA</option>
                    </select>
                </Field>

                <Field label="Party perspective">
                    <select
                        value={payload.partyPerspective}
                        onChange={(e) => updateField("partyPerspective", e.target.value)}
                        style={inputStyle}
                    >
                        <option>Buyer</option>
                        <option>Seller</option>
                        <option>Neutral</option>
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
                        <option>Standard</option>
                        <option>Conservative</option>
                        <option>Aggressive</option>
                    </select>
                </Field>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
                <label className="muted">Focus areas</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
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
                                    padding: "10px 14px",
                                    borderRadius: 999,
                                    cursor: "pointer",
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
                    padding: "14px 18px",
                    borderRadius: 16,
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
        <div style={{ display: "grid", gap: 8 }}>
            <label className="muted">{label}</label>
            {children}
        </div>
    );
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.02)",
    color: "#f5f5f5",
    padding: "12px 14px",
    outline: "none",
};