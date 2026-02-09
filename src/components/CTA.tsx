"use client";

import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { Ripple } from "@/components/ui/ripple";
import { ArrowRight } from "lucide-react";

export default function CTA() {
    return (
        <section id="contact" className="relative py-16 lg:py-44 bg-neutral-950 overflow-hidden">
            {/* 21st.dev — Ripple background (dark mode) */}
            <Ripple
                mainCircleSize={200}
                mainCircleOpacity={0.04}
                numCircles={5}
                className="absolute inset-0 [&_div]:!border-white/[0.04]"
            />

            <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
                {/* Badge */}

                {/* Headline */}
                <motion.h2
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[clamp(1.5rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-white mb-3 md:mb-5"
                >
                    Ready to automate?
                </motion.h2>

                <motion.p
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[15px] md:text-[19px] text-neutral-400 mb-6 md:mb-10 max-w-sm mx-auto leading-relaxed"
                >
                    Book a free consultation. We&apos;ll audit your workflows and show you exactly what to automate first.
                </motion.p>

                {/* CTA — 21st.dev ShimmerButton */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <ShimmerButton
                        onClick={() => document.dispatchEvent(new Event("open-contact-modal"))}
                        className="h-12 sm:h-14 px-8 text-[15px] sm:text-[16px] font-medium mx-auto w-full sm:w-auto"
                        shimmerColor="#ffffff"
                        shimmerSize="0.06em"
                        background="rgba(226, 0, 15, 1)"
                    >
                        <span className="text-white flex items-center gap-2">
                            Book consultation
                            <ArrowRight size={14} />
                        </span>
                    </ShimmerButton>
                </motion.div>
            </div>
        </section>
    );
}
