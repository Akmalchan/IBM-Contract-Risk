import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ClauseLens",
    description: "Enterprise-grade contract risk review powered by AI.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}