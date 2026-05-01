"use client";

import { useState } from "react";
import { mockAnalysis } from "@/lib/mock-data";
import type { AnalysisResult, AnalyzePayload } from "@/lib/types";
import { ExpiredModal } from "./expired-modal";
import { FindingsPanel } from "./findings-panel";
import { MetricsCards } from "./metrics-cards";
import { UploadPanel } from "./upload-panel";

export function DashboardShell() {
    const [isLoading, setIsLoading] = useState(false);
    const [showExpiredModal, setShowExpiredModal] = useState(false);
    const [result, setResult] = useState<AnalysisResult>(mockAnalysis);
    const [payload, setPayload] = useState<AnalyzePayload>({
        contractText:
            "The Provider may terminate this Agreement at any time for convenience with written notice. The Provider's total liability shall not exceed the fees paid in the previous one month. The agreement does not mention data breach notification timelines or service level commitments.",
        contractType: "SaaS Agreement",
        partyPerspective: "Buyer",
        jurisdiction: "US",
        reviewMode: "Conservative",
        focusAreas: ["Liability", "Termination", "Privacy"],
    });

    const handleAnalyze = async () => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data);
                alert(data.error || "Analysis failed.");
                return;
            }

            setResult(data);
        } catch (error) {
            console.error(error);
            alert("Something went wrong while analyzing the contract.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ExpiredModal open={showExpiredModal} onClose={() => setShowExpiredModal(false)} />

            <div className="container" style={{ paddingTop: 10, paddingBottom: 36 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 20,
                        gap: 12,
                    }}
                >
                    <div>
                        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.05em" }}>
                            ClauseLens
                        </div>
                        <div className="muted">Guest Mode · Contract Risk Workspace</div>
                    </div>

                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span
                style={{
                    padding: "8px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#86efac",
                    fontSize: 13,
                }}
            >
              Preview Mode
            </span>

                        <button
                            onClick={() => setShowExpiredModal(true)}
                            style={{
                                border: "1px solid rgba(255,255,255,0.1)",
                                background: "transparent",
                                color: "#f5f5f5",
                                padding: "10px 14px",
                                borderRadius: 14,
                                cursor: "pointer",
                            }}
                        >
                            View Service Alert
                        </button>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "0.9fr 1.1fr",
                        gap: 18,
                        alignItems: "start",
                    }}
                >
                    <UploadPanel
                        payload={payload}
                        setPayload={setPayload}
                        onAnalyze={handleAnalyze}
                        isLoading={isLoading}
                    />

                    <div style={{ display: "grid", gap: 16 }}>
                        <MetricsCards result={result} />
                        <FindingsPanel result={result} />
                    </div>
                </div>
            </div>
        </>
    );
}