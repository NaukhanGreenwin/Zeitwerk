"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Workflow, BarChart3, Shield, Mail, Database, Clock, FileText, Users, Lock } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";

const features = [
    {
        label: "Workflow Automation",
        title: "Your operations,\non autopilot.",
        description:
            "We replace manual handoffs, repetitive data entry, and fragile spreadsheet workflows with intelligent automation that runs 24/7.",
        capabilities: [
            "End-to-end process digitization",
            "Intelligent task routing",
            "Real-time status tracking",
        ],
    },
    {
        label: "Data & Reporting",
        title: "Insights that\nmove your business.",
        description:
            "Transform raw data into actionable intelligence. Automated dashboards, scheduled reports, and smart alerts — so you always know what matters.",
        capabilities: [
            "Automated report generation",
            "Live operational dashboards",
            "Anomaly detection & alerts",
        ],
    },
    {
        label: "Security & Compliance",
        title: "Built to protect.\nBuilt to last.",
        description:
            "Every automation includes enterprise-grade encryption, comprehensive audit trails, and regulatory compliance baked in — not bolted on.",
        capabilities: [
            "Bank-grade encryption",
            "Complete audit trails",
            "SOC 2 & PIPEDA compliant",
        ],
    },
];

/* ─── Visual 1: OrbitingCircles — integration hub ─── */
function IntegrationHub() {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Center hub */}
            <div className="absolute w-14 h-14 rounded-2xl bg-white shadow-lg border border-neutral-100 flex items-center justify-center z-10">
                <Workflow size={20} className="text-[#E2000F]" strokeWidth={1.5} />
            </div>

            {/* 21st.dev — OrbitingCircles */}
            <OrbitingCircles radius={80} duration={25} delay={0}>
                <div className="w-9 h-9 rounded-xl bg-white shadow-md border border-neutral-100 flex items-center justify-center">
                    <Mail size={14} className="text-neutral-600" />
                </div>
            </OrbitingCircles>
            <OrbitingCircles radius={80} duration={25} delay={8}>
                <div className="w-9 h-9 rounded-xl bg-white shadow-md border border-neutral-100 flex items-center justify-center">
                    <Database size={14} className="text-neutral-600" />
                </div>
            </OrbitingCircles>
            <OrbitingCircles radius={80} duration={25} delay={16}>
                <div className="w-9 h-9 rounded-xl bg-white shadow-md border border-neutral-100 flex items-center justify-center">
                    <Clock size={14} className="text-neutral-600" />
                </div>
            </OrbitingCircles>

            {/* Outer orbit */}
            <OrbitingCircles radius={130} duration={35} delay={0} reverse>
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-neutral-100 flex items-center justify-center">
                    <FileText size={12} className="text-neutral-700" />
                </div>
            </OrbitingCircles>
            <OrbitingCircles radius={130} duration={35} delay={12} reverse>
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-neutral-100 flex items-center justify-center">
                    <Users size={12} className="text-neutral-700" />
                </div>
            </OrbitingCircles>
            <OrbitingCircles radius={130} duration={35} delay={24} reverse>
                <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-neutral-100 flex items-center justify-center">
                    <Lock size={12} className="text-neutral-700" />
                </div>
            </OrbitingCircles>
        </div>
    );
}

/* ─── Visual 2: Dashboard with BorderBeam ─── */
function DashboardVisual() {
    return (
        <div className="relative w-full h-full flex items-center justify-center p-6">
            <div className="relative w-full max-w-[300px] bg-white rounded-2xl shadow-xl shadow-neutral-200/40 border border-neutral-200/60 overflow-hidden">
                {/* 21st.dev — BorderBeam */}
                <BorderBeam size={180} duration={10} colorFrom="#E2000F" colorTo="#ff6b6b" borderWidth={1.5} />

                {/* Window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-100">
                    <div className="w-2 h-2 rounded-full bg-red-300" />
                    <div className="w-2 h-2 rounded-full bg-amber-300" />
                    <div className="w-2 h-2 rounded-full bg-green-300" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 p-3">
                    {[
                        { val: "2.4k", sub: "Processed", dot: "bg-blue-400" },
                        { val: "99.8%", sub: "Uptime", dot: "bg-green-400" },
                        { val: "↓42%", sub: "Errors", dot: "bg-violet-400" },
                    ].map((s) => (
                        <div key={s.sub} className="bg-neutral-50 rounded-lg p-2.5 text-center">
                            <div className="text-[12px] font-bold text-neutral-800">{s.val}</div>
                            <div className="text-[9px] text-neutral-600 mt-0.5 flex items-center justify-center gap-1">
                                <span className={`w-1 h-1 rounded-full ${s.dot}`} />
                                {s.sub}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chart */}
                <div className="px-3 pb-3">
                    <div className="flex items-end gap-[4px] h-[70px]">
                        {[35, 60, 42, 75, 50, 85, 65, 80, 55, 92, 70, 85].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-t-[2px]"
                                style={{
                                    height: `${h}%`,
                                    background: i === 9
                                        ? "linear-gradient(to top, #E2000F, rgba(226,0,15,0.3))"
                                        : `rgba(0,0,0,${0.04 + (h / 100) * 0.06})`,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Visual 3: Animated security flow ─── */
function SecurityFlow() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sourceRef = useRef<HTMLDivElement>(null);
    const shieldRef = useRef<HTMLDivElement>(null);
    const lockRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center p-8">
            {/* 21st.dev — AnimatedBeam connections */}
            <AnimatedBeam
                containerRef={containerRef as React.RefObject<HTMLElement>}
                fromRef={sourceRef as React.RefObject<HTMLElement>}
                toRef={shieldRef as React.RefObject<HTMLElement>}
                gradientStartColor="#E2000F"
                gradientStopColor="#22c55e"
                pathColor="#e5e5e5"
                pathOpacity={0.12}
                pathWidth={2}
                duration={5}
            />
            <AnimatedBeam
                containerRef={containerRef as React.RefObject<HTMLElement>}
                fromRef={shieldRef as React.RefObject<HTMLElement>}
                toRef={lockRef as React.RefObject<HTMLElement>}
                gradientStartColor="#22c55e"
                gradientStopColor="#3b82f6"
                pathColor="#e5e5e5"
                pathOpacity={0.12}
                pathWidth={2}
                duration={5}
                delay={1.5}
            />

            <div className="relative flex items-center gap-8 sm:gap-16 z-10">
                {/* Source */}
                <div ref={sourceRef} className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-neutral-100 flex items-center justify-center">
                    <FileText size={18} className="text-neutral-600" />
                </div>

                {/* Shield (center) */}
                <div ref={shieldRef} className="w-20 h-20 rounded-3xl bg-white shadow-xl border border-neutral-100 flex items-center justify-center relative overflow-hidden">
                    <BorderBeam size={80} duration={8} colorFrom="#22c55e" colorTo="#3b82f6" borderWidth={1.5} />
                    <Shield size={24} className="text-[#E2000F]" strokeWidth={1.5} />
                </div>

                {/* Lock (output) */}
                <div ref={lockRef} className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-neutral-100 flex items-center justify-center">
                    <Lock size={18} className="text-green-500" />
                </div>
            </div>
        </div>
    );
}

const visuals = [IntegrationHub, DashboardVisual, SecurityFlow];

function FeatureSection({
    feature,
    index,
}: {
    feature: (typeof features)[0];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const Visual = visuals[index];
    const isEven = index % 2 === 0;

    return (
        <div
            ref={ref}
            className={`py-12 lg:py-40 ${index % 2 === 0 ? "bg-[#fafafa]" : "bg-white"}`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div
                    className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8 lg:gap-24`}
                >
                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 max-w-md text-center lg:text-left"
                    >
                        <span className="text-[13px] font-medium text-[#E2000F] uppercase tracking-widest mb-4 block">
                            {feature.label}
                        </span>

                        <h2 className="text-[clamp(1.75rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-neutral-900 mb-4 sm:mb-5 whitespace-pre-line">
                            {feature.title}
                        </h2>

                        <p className="text-[15px] md:text-[19px] leading-[1.6] text-neutral-700 mb-5 md:mb-8">
                            {feature.description}
                        </p>

                        <ul className="space-y-2.5">
                            {feature.capabilities.map((cap) => (
                                <li key={cap} className="flex items-center gap-2.5 text-[14px] md:text-[17px] text-neutral-700">
                                    <span className="w-1 h-1 rounded-full bg-[#E2000F]/40 flex-shrink-0" />
                                    {cap}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Visual */}
                    <motion.div className="flex-1 w-full max-w-[280px] sm:max-w-sm md:max-w-md" style={{ y }}>
                        <div className="aspect-square rounded-3xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-200/50 overflow-hidden">
                            <Visual />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default function Features() {
    return (
        <section id="services">
            {features.map((feature, i) => (
                <FeatureSection key={feature.label} feature={feature} index={i} />
            ))}
        </section>
    );
}
