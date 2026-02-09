"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ContactModal() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleOpen = useCallback(() => setOpen(true), []);

    useEffect(() => {
        document.addEventListener("open-contact-modal", handleOpen);
        return () => document.removeEventListener("open-contact-modal", handleOpen);
    }, [handleOpen]);

    // Lock body scroll when open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const handleClose = () => {
        setOpen(false);
        // Reset after animation
        setTimeout(() => {
            setStatus("idle");
            setFormData({ name: "", email: "", company: "", message: "" });
        }, 300);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("sent");
                setFormData({ name: "", email: "", company: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="contact-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100]"
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl pointer-events-auto overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 pt-6 pb-2">
                                <div>
                                    <span className="text-[11px] font-medium text-[#E2000F] uppercase tracking-widest">
                                        Get in touch
                                    </span>
                                    <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-neutral-900">
                                        Book a consultation
                                    </h2>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-neutral-600"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="px-6 pb-6 pt-3">
                                <AnimatePresence mode="wait">
                                    {status === "sent" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center text-center py-12"
                                        >
                                            <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200/60 flex items-center justify-center mb-5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-green-600">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                                                Message sent!
                                            </h3>
                                            <p className="text-[14px] text-neutral-500 mb-6">
                                                We&apos;ll be in touch within 24 hours.
                                            </p>
                                            <button
                                                onClick={handleClose}
                                                className="px-5 py-2.5 text-[14px] font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                                            >
                                                Close
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            onSubmit={handleSubmit}
                                            className="space-y-4"
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[13px] font-medium text-neutral-600">
                                                        Full name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full mt-1.5 px-3.5 py-2.5 text-[14px] text-neutral-900 bg-white outline-none border border-neutral-200 focus:border-[#E2000F] focus:ring-1 focus:ring-[#E2000F]/20 rounded-lg transition-colors"
                                                        placeholder="Jane Smith"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[13px] font-medium text-neutral-600">
                                                        Company
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.company}
                                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                                        className="w-full mt-1.5 px-3.5 py-2.5 text-[14px] text-neutral-900 bg-white outline-none border border-neutral-200 focus:border-[#E2000F] focus:ring-1 focus:ring-[#E2000F]/20 rounded-lg transition-colors"
                                                        placeholder="Acme Inc."
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[13px] font-medium text-neutral-600">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full mt-1.5 px-3.5 py-2.5 text-[14px] text-neutral-900 bg-white outline-none border border-neutral-200 focus:border-[#E2000F] focus:ring-1 focus:ring-[#E2000F]/20 rounded-lg transition-colors"
                                                    placeholder="jane@company.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[13px] font-medium text-neutral-600">
                                                    Message
                                                </label>
                                                <textarea
                                                    required
                                                    value={formData.message}
                                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                    className="w-full mt-1.5 h-28 px-3.5 py-2.5 text-[14px] text-neutral-900 bg-white outline-none border border-neutral-200 focus:border-[#E2000F] focus:ring-1 focus:ring-[#E2000F]/20 rounded-lg resize-none transition-colors"
                                                    placeholder="Tell us about your project..."
                                                />
                                            </div>

                                            {status === "error" && (
                                                <p className="text-[13px] text-red-600">
                                                    Something went wrong. Please try again.
                                                </p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === "sending"}
                                                className="w-full px-5 py-3 text-[14px] text-white font-medium bg-neutral-900 hover:bg-[#E2000F] rounded-lg transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                {status === "sending" ? "Sending..." : "Send message"}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
