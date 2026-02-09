"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
    ArrowUpRight,
} from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";

const steps = [
    {
        id: "01",
        title: "Discovery & Audit",
        description: "We analyze your current workflows to identify bottlenecks and high-impact automation opportunities.",
        icon: "/branding/icons/icon-discovery.svg",
    },
    {
        id: "02",
        title: "Solution Design",
        description: "Our engineers architect a scalable solution tailored to your specific business needs and tech stack.",
        icon: "/branding/icons/icon-design.svg",
    },
    {
        id: "03",
        title: "System Build",
        description: "We develop custom automation scripts and integrations with Swiss-level precision and error handling.",
        icon: "/branding/icons/icon-build.svg",
    },
    {
        id: "04",
        title: "Integration",
        description: "Seamlessly connecting your existing tools (CRM, ERP, Email) into a unified, automated ecosystem.",
        icon: "/branding/icons/icon-integration.svg",
    },
    {
        id: "05",
        title: "Testing & QA",
        description: "Rigorous stress testing ensures your automations run reliably 24/7 without manual intervention.",
        icon: "/branding/icons/icon-qa.svg",
    },
    {
        id: "06",
        title: "Launch & Scale",
        description: "We deploy the solution and provide ongoing support to scale as your business grows.",
        icon: "/branding/icons/icon-launch.svg",
    },
];

export default function HowItWorks() {
    return (
        <section id="process" className="py-12 lg:py-40 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 lg:gap-20 items-start">
                    {/* Left — sticky headline */}
                    <div className="text-center lg:text-left lg:sticky lg:top-32">
                        <BlurFade delay={0.1}>
                            <span className="text-[12px] font-medium text-[#E2000F] uppercase tracking-widest">
                                Our Model
                            </span>
                        </BlurFade>
                        <BlurFade delay={0.2}>
                            <h2 className="mt-3 sm:mt-4 text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-neutral-900">
                                How We
                                <br />
                                Do It
                            </h2>
                        </BlurFade>
                        <BlurFade delay={0.3}>
                            <p className="mt-3 md:mt-5 text-[15px] md:text-[19px] leading-[1.65] text-neutral-700 max-w-sm mx-auto lg:mx-0">
                                A disciplined, six-stage methodology that
                                transforms manual processes into
                                precision-engineered automation — delivering
                                measurable ROI at every step.
                            </p>
                        </BlurFade>
                        <BlurFade delay={0.4}>
                            <button
                                onClick={() => document.dispatchEvent(new Event("open-contact-modal"))}
                                className="inline-flex items-center gap-2 mt-5 lg:mt-8 px-6 py-3 bg-neutral-900 text-white text-[14px] font-medium rounded-full hover:bg-neutral-800 transition-colors"
                            >
                                Learn More
                                <ArrowUpRight size={14} />
                            </button>
                        </BlurFade>
                    </div>

                    {/* Right — 2×3 card grid */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                        {steps.map((step, i) => (
                            <BlurFade key={step.title} delay={0.1 + i * 0.08}>
                                <motion.div
                                    whileHover={{ y: -3 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                    }}
                                    className="group relative p-4 sm:p-5 lg:p-6 rounded-2xl border border-neutral-200/80 bg-white hover:border-neutral-300 hover:shadow-md transition-all duration-300 cursor-default"
                                >
                                    {/* Icon */}
                                    <div className="mb-3 sm:mb-4 lg:mb-6 inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-neutral-50 border border-neutral-100 group-hover:border-neutral-200 group-hover:bg-white transition-colors duration-300">
                                        <Image
                                            src={step.icon}
                                            alt={step.title}
                                            width={32}
                                            height={32}
                                            className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8"
                                        />
                                    </div>

                                    {/* Text */}
                                    <h3 className="text-[13px] sm:text-[14px] lg:text-[16px] font-semibold text-neutral-900 tracking-[-0.01em] mb-1">
                                        {step.title}
                                    </h3>
                                    <p className="text-[12px] sm:text-[14px] lg:text-[15px] text-neutral-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </motion.div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
