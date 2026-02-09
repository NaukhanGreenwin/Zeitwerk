"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import {
    Building2,
    ShoppingBag,
    Landmark,
    HeartPulse,
    Truck,
    Briefcase,
    GraduationCap,
    Wrench,
} from "lucide-react";

const logos = [
    { name: "Enterprise Co.", icon: Building2 },
    { name: "RetailFlow", icon: ShoppingBag },
    { name: "CapitalTrust", icon: Landmark },
    { name: "MedSync", icon: HeartPulse },
    { name: "LogiPrime", icon: Truck },
    { name: "Atlas Group", icon: Briefcase },
    { name: "EduVault", icon: GraduationCap },
    { name: "BuildCore", icon: Wrench },
];

function LogoCard({ name, icon: Icon }: { name: string; icon: React.ElementType }) {
    return (
        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white border border-neutral-100">
            <Icon size={20} className="text-neutral-500" strokeWidth={1.5} />
            <span className="text-[15px] font-medium text-neutral-500 whitespace-nowrap tracking-[-0.01em]">
                {name}
            </span>
        </div>
    );
}

export default function TrustedBy() {
    return (
        <section className="py-16 bg-neutral-50/50 border-y border-neutral-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-[13px] font-medium text-neutral-500 uppercase tracking-[0.15em] mb-8"
                >
                    Trusted by forward-thinking Canadian businesses
                </motion.p>
            </div>
            <Marquee pauseOnHover className="[--duration:30s]">
                {logos.map((logo) => (
                    <LogoCard key={logo.name} {...logo} />
                ))}
            </Marquee>
        </section>
    );
}
