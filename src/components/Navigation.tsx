"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Settings, FolderOpen, Mail, Menu, X, Volume2, LucideIcon } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

interface NavItem {
    name: string;
    url: string;
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    { name: "Services", url: "#services", icon: Layers },
    { name: "Process", url: "#process", icon: Settings },
    { name: "Projects", url: "/projects", icon: FolderOpen },
    { name: "Contact", url: "#", icon: Mail },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || mobileOpen
                ? "bg-white/80 backdrop-blur-xl border-b border-neutral-200/50"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2 group">
                        <svg width="48" height="48" viewBox="0 0 100 100" fill="none" className="sm:w-[80px] sm:h-[80px] group-hover:scale-105 transition-transform duration-300">
                            <path d="M20 20 H60 L50 40 H10 Z" fill="#171717" />
                            <path d="M50 60 H90 L80 80 H40 Z" fill="#E2000F" />
                            <path d="M55 40 L45 60" stroke="#ccc" strokeWidth="1" />
                        </svg>
                        <span className="font-bold text-lg sm:text-xl text-neutral-900">
                            Zeitwerk
                        </span>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                speechSynthesis.cancel();
                                const name = new SpeechSynthesisUtterance("Zeitwerk");
                                name.lang = "de-CH";
                                name.rate = 0.8;
                                speechSynthesis.speak(name);
                            }}
                            className="ml-0.5 p-1 rounded-full text-neutral-300 hover:text-[#E2000F] hover:bg-red-50 transition-all duration-200"
                            aria-label="Listen to pronunciation"
                            title="Hear how it's pronounced"
                        >
                            <Volume2 size={14} />
                        </button>
                    </a>

                    {/* Tubelight Nav — desktop only, centered */}
                    <div className="hidden md:block">
                        <NavBar items={navItems} />
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* Get Started CTA — desktop */}
                        <button
                            onClick={() => document.dispatchEvent(new Event("open-contact-modal"))}
                            className="hidden md:flex items-center gap-1.5 px-5 py-2.5 bg-neutral-900 text-white text-[14px] font-medium rounded-full hover:bg-[#E2000F] transition-colors duration-300"
                            aria-label="Get started with Zeitwerk"
                        >
                            Get Started
                        </button>

                        {/* Hamburger — mobile */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-b border-neutral-200/50"
                    >
                        <div className="max-w-6xl mx-auto px-6 py-4 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <a
                                        key={item.name}
                                        href={item.name === "Contact" ? undefined : item.url}
                                        onClick={(e) => {
                                            if (item.name === "Contact") {
                                                e.preventDefault();
                                                setMobileOpen(false);
                                                document.dispatchEvent(new Event("open-contact-modal"));
                                            } else {
                                                setMobileOpen(false);
                                            }
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer"
                                    >
                                        <Icon size={18} className="text-neutral-400" />
                                        {item.name}
                                    </a>
                                );
                            })}
                            <div className="pt-2">
                                <button
                                    onClick={() => { setMobileOpen(false); document.dispatchEvent(new Event("open-contact-modal")); }}
                                    className="w-full flex items-center justify-center gap-1.5 px-5 py-3 bg-neutral-900 text-white text-[14px] font-medium rounded-full hover:bg-[#E2000F] transition-colors duration-300"
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav >
    );
}
