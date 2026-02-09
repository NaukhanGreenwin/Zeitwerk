"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

export default function LegalPageLayout({
    title,
    lastUpdated,
    children,
}: LegalPageLayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* Minimal nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200/50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        <Link
                            href="/"
                            className="flex items-center gap-2 group"
                        >
                            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="group-hover:scale-105 transition-transform duration-300">
                                {/* Top Z part (Black) */}
                                <path d="M20 20 H60 L50 40 H10 Z" fill="#171717" />
                                {/* Bottom W part (Red) */}
                                <path d="M50 60 H90 L80 80 H40 Z" fill="#E2000F" />
                                {/* Connecting Line */}
                                <path d="M55 40 L45 60" stroke="#ccc" strokeWidth="1" />
                            </svg>
                            <span className="text-[15px] font-semibold tracking-[-0.03em] text-neutral-900">
                                Zeitwerk
                            </span>
                        </Link>

                        <Link
                            href="/"
                            className="flex items-center gap-1.5 text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
                        >
                            <ArrowLeft size={14} />
                            Back to home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-[clamp(2rem,4vw,3rem)] font-semibold tracking-[-0.035em] text-neutral-900 mb-3">
                        {title}
                    </h1>
                    <p className="text-[14px] text-neutral-500 mb-12">
                        Last updated: {lastUpdated}
                    </p>
                </motion.div>

                {/* Body */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.15,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="legal-content 
                        [&_h2]:text-[1.375rem] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-neutral-900 [&_h2]:mt-10 [&_h2]:mb-4 
                        [&_h3]:text-[1.1rem] [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-semibold [&_h3]:tracking-tight
                        [&_p]:text-[0.9375rem] [&_p]:leading-[1.75] [&_p]:text-neutral-600 [&_p]:mb-4
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                        [&_li]:text-[0.9375rem] [&_li]:leading-[1.75] [&_li]:text-neutral-600 [&_li]:mb-1.5
                        [&_a]:text-[#E2000F] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#b5000c]
                        [&_strong]:font-semibold [&_strong]:text-neutral-900
                        [&_hr]:border-neutral-100 [&_hr]:my-10"
                >
                    {children}
                </motion.div>
            </main>

            {/* Minimal footer */}
            <footer className="border-t border-neutral-100">
                <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[13px] text-neutral-500">
                        © {new Date().getFullYear()} Zeitwerk. All rights
                        reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="text-[13px] text-neutral-500 hover:text-neutral-700 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-[13px] text-neutral-500 hover:text-neutral-700 transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
