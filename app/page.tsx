"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";

export default function Page() {
    const [guestMode, setGuestMode] = useState(false);

    return (
        <main style={{ minHeight: "100vh" }}>
            {!guestMode ? (
                <>
                    <Header />
                    <Hero onContinue={() => setGuestMode(true)} />
                </>
            ) : (
                <DashboardShell />
            )}
        </main>
    );
}