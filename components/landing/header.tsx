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
                    aria-hidden="true"
                    style={{
                        width: 32,
                        height: 32,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.14)",
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.04))",
                    }}
                >
                    <div
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: "8px solid transparent",
                            borderRight: "8px solid transparent",
                            borderBottom: "14px solid #ef4444",
                            transform: "translateY(-1px)",
                            filter: "drop-shadow(0 4px 10px rgba(239,68,68,0.35))",
                        }}
                    />
                </div>
                <span>IBM Contract Risk Manager</span>
            </div>

            <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
                <a
                    className="muted"
                    href="https://github.com/Akmalchan"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
                <a
                    className="muted"
                    href="https://www.linkedin.com/in/ashovkatov"
                    target="_blank"
                    rel="noreferrer"
                >
                    LinkedIn
                </a>
            </nav>
        </header>
    );
}
