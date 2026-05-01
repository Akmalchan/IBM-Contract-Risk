export function Header() {
    return (
        <header
            className="container"
            style={{
                paddingTop: 20,
                paddingBottom: 20,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                }}
            >
                <div
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.14)",
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))",
                    }}
                />
                <span>ClauseLens</span>
            </div>

            <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
                <a
                    className="muted"
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
                <a
                    className="muted"
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noreferrer"
                >
                    LinkedIn
                </a>
            </nav>
        </header>
    );
}