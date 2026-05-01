type ExpiredModalProps = {
    open: boolean;
    onClose: () => void;
};

export function ExpiredModal({ open, onClose }: ExpiredModalProps) {
    if (!open) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.68)",
                display: "grid",
                placeItems: "center",
                zIndex: 100,
                padding: 16,
            }}
        >
            <div
                style={{
                    width: "min(620px, 100%)",
                    background: "#0c0c0e",
                    border: "1px solid rgba(239,68,68,0.35)",
                    borderRadius: 24,
                    padding: 24,
                    boxShadow: "0 20px 80px rgba(0,0,0,0.5)",
                }}
            >
                <div
                    style={{
                        display: "inline-flex",
                        padding: "6px 10px",
                        borderRadius: 999,
                        color: "#fca5a5",
                        border: "1px solid rgba(239,68,68,0.35)",
                        background: "rgba(239,68,68,0.08)",
                        marginBottom: 16,
                        fontSize: 13,
                    }}
                >
                    Service temporarily unavailable
                </div>

                <h2 style={{ marginTop: 0, fontSize: 30, letterSpacing: "-0.04em" }}>
                    Live AI analysis is currently disabled.
                </h2>

                <p className="muted" style={{ lineHeight: 1.7, marginBottom: 20 }}>
                    The academic IBM watsonx access window for this prototype has ended. The product
                    interface remains available for preview and portfolio demonstration.
                </p>

                <div style={{ display: "flex", gap: 12 }}>
                    <button
                        onClick={onClose}
                        style={{
                            border: "1px solid rgba(255,255,255,0.12)",
                            background: "#f5f5f5",
                            color: "#050505",
                            padding: "12px 16px",
                            borderRadius: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Continue in Preview Mode
                    </button>

                    <button
                        onClick={onClose}
                        style={{
                            border: "1px solid rgba(255,255,255,0.1)",
                            background: "transparent",
                            color: "#f5f5f5",
                            padding: "12px 16px",
                            borderRadius: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}