"use client";

import { motion } from "framer-motion";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Shield, Gauge, Clock, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const values = [
    {
        icon: Gauge,
        title: "Precision Engineering",
        description: "Every automation is built with meticulous attention to detail — like a fine timepiece.",
        stat: "0.001",
        statLabel: "Second response time",
        statSuffix: "s",
    },
    {
        icon: Shield,
        title: "Bank-Grade Security",
        description: "Enterprise encryption, SOC 2 compliance, and zero-trust architecture at every layer.",
        stat: "256",
        statLabel: "Bit encryption",
        statSuffix: "-bit",
    },
    {
        icon: Clock,
        title: "24/7 Autonomous",
        description: "Your automations run continuously, autonomously, and with zero intervention required.",
        stat: "24",
        statLabel: "Hours of operation",
        statSuffix: "/7",
    },
    {
        icon: TrendingUp,
        title: "Infinite Scalability",
        description: "From 10 tasks to 10 million. Zeitwerk grows with your business, effortlessly.",
        stat: "10",
        statLabel: "Million+ tasks handled",
        statSuffix: "M+",
    },
];

export default function WhyZeitwerk() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <section id="why" className="py-16 lg:py-32 bg-white relative overflow-hidden">
            {/* Swiss-flag accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#E2000F] to-transparent opacity-20" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 lg:mb-20"
                >
                    <p className="text-[13px] font-medium text-[#E2000F] uppercase tracking-[0.15em] mb-4">
                        Why Zeitwerk
                    </p>
                    <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.035em] text-neutral-900 mb-4">
                        Engineered like a Swiss watch
                    </h2>
                    <p className="text-base md:text-lg text-neutral-700 max-w-2xl mx-auto px-2 md:px-0">
                        We don&apos;t just automate — we engineer reliability into every process.
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((value, i) => (
                        <motion.div
                            key={value.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative p-6 lg:p-10 rounded-3xl bg-neutral-50/50 border border-neutral-100 hover:bg-white hover:border-neutral-200 hover:shadow-xl hover:shadow-neutral-100/50 transition-all duration-500"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    {/* Icon */}
                                    <div className="w-11 h-11 rounded-xl bg-white group-hover:bg-red-50 border border-neutral-100 flex items-center justify-center mb-6 transition-all duration-300">
                                        <value.icon
                                            size={20}
                                            className="text-neutral-600 group-hover:text-[#E2000F] transition-colors duration-300"
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    <h3 className="text-lg font-semibold text-neutral-900 mb-2 tracking-[-0.01em]">
                                        {value.title}
                                    </h3>
                                    <p className="text-[14px] md:text-[15px] leading-relaxed text-neutral-700">
                                        {value.description}
                                    </p>
                                </div>

                                {/* Stat */}
                                <div className="text-right ml-4 md:ml-8 flex-shrink-0">
                                    <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-200 group-hover:text-neutral-300 transition-colors tracking-tight">
                                        {mounted && (
                                            <NumberTicker value={parseFloat(value.stat)} />
                                        )}
                                        <span className="text-lg text-neutral-300">{value.statSuffix}</span>
                                    </div>
                                    <p className="text-[11px] md:text-[12px] text-neutral-600 mt-1">{value.statLabel}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
