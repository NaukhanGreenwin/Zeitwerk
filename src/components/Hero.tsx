"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ripple } from "@/components/ui/ripple";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
    ArrowRight,
    Zap,
    FileCheck,
    ShieldCheck,
    BarChart3,
    Clock,
    CheckCircle2,
    FileText,
    Database,
    Mail,
    CreditCard,
    Users,
} from "lucide-react";

/* ─── Dashboard mockup data ─── */
const metrics = [
    { label: "Tasks Automated", target: 2847, suffix: "", decimals: 0, change: "+12.3%", up: true },
    { label: "Hours Saved", target: 1204, suffix: "", decimals: 0, change: "+8.7%", up: true },
    { label: "Error Rate", target: 0.02, suffix: "%", decimals: 2, change: "-94%", up: true },
    { label: "ROI", target: 847, suffix: "%", decimals: 0, change: "+23%", up: true },
];

/* ─── Animated counter hook ─── */
function useCountUp(target: number, duration = 1800, delay = 0, decimals = 0) {
    const [value, setValue] = useState(0);
    const startRef = useRef<number | null>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const animate = (timestamp: number) => {
                if (!startRef.current) startRef.current = timestamp;
                const elapsed = timestamp - startRef.current;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setValue(eased * target);
                if (progress < 1) {
                    rafRef.current = requestAnimationFrame(animate);
                }
            };
            rafRef.current = requestAnimationFrame(animate);
        }, delay);
        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration, delay, decimals]);

    if (decimals > 0) return value.toFixed(decimals);
    return Math.round(value).toLocaleString();
}

/* ─── Animated metric cell ─── */
function MetricCell({ metric, index }: { metric: typeof metrics[0]; index: number }) {
    const displayed = useCountUp(metric.target, 1800, 1000 + index * 150, metric.decimals);
    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="px-5 py-4 bg-white"
        >
            <p className="text-[11px] text-neutral-600 uppercase tracking-wide mb-1">
                {metric.label}
            </p>
            <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold text-neutral-900 tracking-tight tabular-nums">
                    {displayed}{metric.suffix}
                </span>
                <motion.span
                    initial={false}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[11px] font-medium text-emerald-600"
                >
                    {metric.change}
                </motion.span>
            </div>
        </motion.div>
    );
}

/* Larger pool of automation events for variety */
const automationEvents = [
    { icon: <Zap size={13} />, label: "Invoice batch processed", color: "bg-blue-500" },
    { icon: <FileCheck size={13} />, label: "Compliance report filed", color: "bg-emerald-500" },
    { icon: <ShieldCheck size={13} />, label: "Security scan complete", color: "bg-violet-500" },
    { icon: <BarChart3 size={13} />, label: "KPI dashboard refreshed", color: "bg-amber-500" },
    { icon: <Clock size={13} />, label: "Payroll scheduled", color: "bg-rose-500" },
    { icon: <FileText size={13} />, label: "Contract auto-renewed", color: "bg-indigo-500" },
    { icon: <Database size={13} />, label: "Data backup completed", color: "bg-cyan-500" },
    { icon: <Mail size={13} />, label: "Client report emailed", color: "bg-orange-500" },
    { icon: <CreditCard size={13} />, label: "Payment reconciled", color: "bg-pink-500" },
    { icon: <Users size={13} />, label: "Onboarding workflow triggered", color: "bg-teal-500" },
    { icon: <Zap size={13} />, label: "Expense report approved", color: "bg-blue-400" },
    { icon: <ShieldCheck size={13} />, label: "SSL certificate renewed", color: "bg-lime-500" },
    { icon: <FileCheck size={13} />, label: "Tax filing submitted", color: "bg-fuchsia-500" },
    { icon: <BarChart3 size={13} />, label: "Revenue forecast updated", color: "bg-sky-500" },
];

const VISIBLE_COUNT = 5;

function formatTime(seconds: number) {
    if (seconds < 60) return `${seconds}s ago`;
    const mins = Math.floor(seconds / 60);
    return `${mins}m ago`;
}

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const [feedItems, setFeedItems] = useState<
        { id: number; event: (typeof automationEvents)[0]; addedAt: number }[]
    >([]);
    const [nextId, setNextId] = useState(0);
    const [tick, setTick] = useState(0); // for time refresh

    // Initialize feed with first 5 items
    useEffect(() => {
        setMounted(true);
        const now = Date.now();
        const initial = automationEvents.slice(0, VISIBLE_COUNT).map((event, i) => ({
            id: i,
            event,
            addedAt: now - (i * 6000), // stagger times
        }));
        setFeedItems(initial);
        setNextId(VISIBLE_COUNT);
    }, []);

    // Add a new item every 3 seconds
    const addNewItem = useCallback(() => {
        setFeedItems((prev) => {
            const eventIndex = (nextId) % automationEvents.length;
            const newItem = {
                id: nextId,
                event: automationEvents[eventIndex],
                addedAt: Date.now(),
            };
            const updated = [newItem, ...prev];
            // Keep only visible count
            return updated.slice(0, VISIBLE_COUNT);
        });
        setNextId((prev) => prev + 1);
    }, [nextId]);

    useEffect(() => {
        if (!mounted) return;
        const interval = setInterval(addNewItem, 2000);
        return () => clearInterval(interval);
    }, [mounted, addNewItem]);

    // Refresh relative times every second
    useEffect(() => {
        const timer = setInterval(() => setTick((t) => t + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-white">
            {/* Subtle ambient glow */}
            <div className="absolute top-[-20%] left-[20%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#E2000F]/[0.04] rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#E2000F]/[0.03] rounded-full blur-[100px]" />

            {/* Ripple background — subtle pulse */}
            {mounted && (
                <Ripple
                    mainCircleSize={240}
                    mainCircleOpacity={0.06}
                    numCircles={6}
                    className="absolute inset-0"
                />
            )}

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-8 sm:pb-12">
                {/* Hero copy — centered */}
                <div className="text-center max-w-3xl mx-auto">
                    {/* Red accent line */}
                    <motion.div
                        initial={false}
                        animate={{ scaleX: 1 }}
                        className="w-10 h-[3px] md:w-12 bg-[#E2000F] mx-auto mb-6 md:mb-8 rounded-full origin-left"
                    />

                    {/* Headline */}
                    <motion.h1
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[clamp(1.75rem,5.5vw,4rem)] font-bold leading-[1.08] tracking-[-0.04em] text-neutral-900 mb-4 md:mb-6"
                    >
                        Automation built with
                        <br />
                        <span className="bg-gradient-to-r from-[#E2000F] to-[#ff4d4d] bg-clip-text text-transparent">obsessive precision.</span>
                    </motion.h1>

                    {/* Subhead */}
                    <motion.p
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[15px] md:text-[19px] leading-[1.65] text-neutral-800 max-w-2xl mx-auto mb-6 md:mb-12 px-1 md:px-0"
                    >
                        We engineer systems that eliminate manual work,
                        reduce errors to near-zero, and scale your operations —{" "}
                        <span className="underline decoration-[#E2000F]/40 decoration-[1px] underline-offset-4 font-medium">without adding headcount</span>.
                    </motion.p>


                </div>

                {/* Dashboard preview */}
                {mounted && (
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 md:mt-20 mx-auto max-w-4xl"
                    >
                        <div
                            className="relative rounded-xl border border-neutral-200 bg-white overflow-hidden shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] md:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)] md:[transform:perspective(1200px)_rotateX(4deg)]"
                        >
                            <BorderBeam
                                size={200}
                                duration={12}
                                borderWidth={1.5}
                                colorFrom="#E2000F"
                                colorTo="#ff6b6b"
                            />

                            {/* Dashboard header bar */}
                            <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3 border-b border-neutral-100">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                                    </div>
                                    <span className="ml-3 text-[10px] sm:text-[11px] text-neutral-600 font-medium tracking-wide uppercase hidden sm:inline">
                                        Zeitwerk Dashboard
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[11px] text-emerald-600 font-medium">Live</span>
                                </div>
                            </div>

                            {/* Metrics row — animated counting */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-100">
                                {metrics.map((m, i) => (
                                    <MetricCell key={m.label} metric={m} index={i} />
                                ))}
                            </div>

                            {/* Animated Activity feed */}
                            <div className="px-3 sm:px-5 py-3 sm:py-4 border-t border-neutral-100">
                                <p className="text-[10px] sm:text-[11px] text-neutral-600 uppercase tracking-wide mb-2 sm:mb-3">
                                    Recent Activity
                                </p>
                                <div className="space-y-0 overflow-hidden" style={{ minHeight: `${VISIBLE_COUNT * 36}px` }}>
                                    <AnimatePresence initial={false} mode="popLayout">
                                        {feedItems.map((item) => {
                                            const elapsed = Math.max(0, Math.round((Date.now() - item.addedAt) / 1000));
                                            void tick; // consume tick to trigger re-render
                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    initial={false}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="flex items-center gap-3 py-1.5"
                                                /* Removed heavy layout animations and spring physics for performance */
                                                >
                                                    <div
                                                        className={`w-5 h-5 rounded-md ${item.event.color}/10 flex items-center justify-center text-neutral-600`}
                                                    >
                                                        {item.event.icon}
                                                    </div>
                                                    <span className="flex-1 text-[12px] sm:text-[13px] text-neutral-600 truncate">
                                                        {item.event.label}
                                                    </span>
                                                    <div className="flex items-center gap-1.5">
                                                        <CheckCircle2
                                                            size={11}
                                                            className="text-emerald-500"
                                                        />
                                                        <span className="text-[11px] text-neutral-600 tabular-nums">
                                                            {formatTime(elapsed)}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Bottom fade */}
                            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
