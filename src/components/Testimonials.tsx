"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "COO, MapleLeaf Logistics",
        content:
            "Zeitwerk automated our entire dispatch workflow. What took 6 hours daily now takes 6 minutes. The precision is remarkable.",
        rating: 5,
    },
    {
        name: "Marcus Thompson",
        role: "CTO, NorthBay Financial",
        content:
            "Bank-grade security wasn't negotiable for us. Zeitwerk delivered enterprise automation with zero compromises on compliance.",
        rating: 5,
    },
    {
        name: "Lisa Dubois",
        role: "VP Operations, Cascade Health",
        content:
            "Their engineering philosophy isn't marketing — it's real. Our patient intake automation hasn't had a single failure in 14 months.",
        rating: 5,
    },
    {
        name: "James Park",
        role: "CEO, Prestige Properties",
        content:
            "From lease processing to tenant communications — Zeitwerk automated our entire property management backend. A game changer.",
        rating: 5,
    },
    {
        name: "Anika Patel",
        role: "Director, EduBridge Academy",
        content:
            "We went from drowning in admin work to focusing entirely on our students. The ROI was visible within the first month.",
        rating: 5,
    },
    {
        name: "Robert Lavoie",
        role: "Founder, Québec Artisan Co.",
        content:
            "As a growing SMB, we needed automation that could scale with us. Zeitwerk felt like hiring a team of engineers at a fraction of the cost.",
        rating: 5,
    },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

function TestimonialCard({
    name,
    role,
    content,
    rating,
}: {
    name: string;
    role: string;
    content: string;
    rating: number;
}) {
    return (
        <div className="w-[280px] sm:w-[350px] p-5 sm:p-6 rounded-2xl bg-white border border-neutral-100 hover:border-neutral-200 hover:shadow-lg hover:shadow-neutral-100/50 transition-all duration-300">
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                    <Star
                        key={i}
                        size={14}
                        className="fill-[#E2000F] text-[#E2000F]"
                    />
                ))}
            </div>

            {/* Quote */}
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-neutral-700 mb-5">
                &ldquo;{content}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center text-[13px] font-semibold text-white">
                    {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </div>
                <div>
                    <p className="text-[14px] font-semibold text-neutral-900">{name}</p>
                    <p className="text-[12px] text-neutral-600">{role}</p>
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-16 lg:py-32 bg-neutral-50/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 lg:mb-16"
                >
                    <p className="text-[13px] font-medium text-[#E2000F] uppercase tracking-[0.15em] mb-4">
                        Testimonials
                    </p>
                    <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.035em] text-neutral-900 mb-4">
                        Trusted by businesses across Canada
                    </h2>
                    <p className="text-base md:text-lg text-neutral-700 max-w-2xl mx-auto px-2 md:px-0">
                        Don&apos;t take our word for it. Hear from the teams we&apos;ve transformed.
                    </p>
                </motion.div>
            </div>

            {/* Marquee rows */}
            <div className="space-y-4">
                <Marquee pauseOnHover className="[--duration:45s]">
                    {firstRow.map((testimonial) => (
                        <TestimonialCard key={testimonial.name} {...testimonial} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:45s]">
                    {secondRow.map((testimonial) => (
                        <TestimonialCard key={testimonial.name} {...testimonial} />
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
