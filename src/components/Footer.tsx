"use client";

import { Footer as FooterUI } from "@/components/ui/footer";

export default function Footer() {
    return (
        <FooterUI
            logo={
                <svg width="48" height="48" viewBox="0 0 100 100" fill="none">
                    <path d="M20 20 H60 L50 40 H10 Z" fill="#171717" />
                    <path d="M50 60 H90 L80 80 H40 Z" fill="#E2000F" />
                    <path d="M55 40 L45 60" stroke="#ccc" strokeWidth="1" />
                </svg>
            }
            brandName="Zeitwerk"
            mainLinks={[
                { href: "#services", label: "Workflow Automation" },
                { href: "#services", label: "Data & Reporting" },
                { href: "#services", label: "Security & Compliance" },
                { href: "#process", label: "Our Process" },
                { href: "#", label: "Contact" },
            ]}
            legalLinks={[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
            ]}
            copyright={{
                text: `© ${new Date().getFullYear()} Zeitwerk`,
                license: "Precision automation for modern business",
            }}
        />
    );
}
