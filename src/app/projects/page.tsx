"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChevronDown, Layers, Cpu, Globe, Sparkles } from "lucide-react";

/* ─── Categories ─── */
const categories = ["All", "Platforms", "AI & Data", "Operations", "Internal Tools"];

/* ─── Projects (Case Studies) ─── */
const allProjects = [
    {
        title: "Property Intelligence Platform",
        category: "Platforms",
        industry: "Real Estate",
        year: "2024",
        challenge: "No single source of truth across 171 properties and 17,968 units. Reporting was manual and days out of date.",
        solution: "Real-time executive dashboard with geospatial mapping, drill-down analytics, and automated portfolio KPIs.",
        impact: [
            "Eliminated manual portfolio reporting",
            "Real-time visibility across 17,968 units",
            "Geospatial mapping with drill-down",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Leaflet · Graph API", ai: null },
        leftShift: "Weekly manual reporting → live, self-service dashboard.",
        referenceAvailable: true,
        savings: { cost: "~$80K/yr saved", time: "~40 hrs/week saved" },
        featured: true,
    },
    {
        title: "Intelligent Collections Engine",
        category: "AI & Data",
        industry: "Finance",
        year: "2024",
        challenge: "Rent collections relied on static scripts and one-size-fits-all messaging — low engagement, high delinquency.",
        solution: "Two-way SMS and AI voice system with GPT-personalized messaging, calibrated pacing, and campaign tracking.",
        impact: [
            "98% SMS delivery rate",
            "AI-personalized outreach per resident",
            "70% fewer manual calls",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Twilio · ElevenLabs", ai: "OpenAI GPT-4o" },
        leftShift: "Agents now only handle escalated cases — AI drives first contact.",
        referenceAvailable: true,
        savings: { cost: "~$120K/yr saved", time: "70% fewer calls" },
        featured: true,
    },
    {
        title: "Innovation Hub",
        category: "Platforms",
        industry: "Corporate",
        year: "2025",
        challenge: "Innovation ideas came through ad-hoc emails — no tracking, scoring, or executive visibility.",
        solution: "Committee-driven platform with submission wizard, AI triage scoring, lifecycle tracking, and oversight dashboards.",
        impact: [
            "Structured idea-to-implementation pipeline",
            "Committee-driven scoring",
            "Real-time executive telemetry",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Graph API · Teams", ai: "OpenAI" },
        leftShift: "Suggestion boxes → structured upstream pipeline with scoring and tracking.",
        referenceAvailable: true,
        savings: { cost: "~$50K/yr saved", time: "90% faster review" },
        featured: true,
    },
    {
        title: "Employee Marketplace",
        category: "Internal Tools",
        industry: "Corporate",
        year: "2025",
        challenge: "Employees used WhatsApp and bulletin boards to buy/sell — no oversight or identity verification.",
        solution: "Internal marketplace with AI-powered listings, Entra ID identity integration, and real-time fuzzy search.",
        impact: [
            "500+ employees onboarded",
            "AI-assisted listing creation",
            "Identity-verified transactions",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Entra ID · Teams", ai: "GPT-4o" },
        leftShift: "Self-service from day one — AI drafts listings, identity auto-resolved.",
        referenceAvailable: true,
        savings: { cost: "~$15K/yr saved", time: "~10 hrs/week saved" },
    },
    {
        title: "Executive Portfolio Tracker",
        category: "Operations",
        industry: "Project Management",
        year: "2024",
        challenge: "Project updates via PowerPoint decks and email threads — no dashboard for leadership.",
        solution: "PMP-methodology tracker with RAG indicators, real-time KPIs, and automated HTML executive reports.",
        impact: [
            "Replaced slide-based reporting",
            "RAG indicators with live KPIs",
            "Automated status emails",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Graph API · ExcelJS", ai: null },
        leftShift: "Weekly manual assembly → automated push-based executive updates.",
        referenceAvailable: true,
        savings: { cost: "~$30K/yr saved", time: "~8 hrs/week saved" },
    },
    {
        title: "Performance Review System",
        category: "Operations",
        industry: "HR",
        year: "2025",
        challenge: "Quarterly reviews relied on Word docs emailed back and forth — paper-heavy and impossible to track.",
        solution: "Five-step digital wizard with AI text enhancement, Entra ID lookup, dual-signature workflow, and manager dashboard.",
        impact: [
            "100% paperless reviews",
            "AI-enhanced competency writing",
            "Manager dashboard for oversight",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Entra ID · Graph API", ai: "OpenAI" },
        leftShift: "AI helps employees draft better competencies upfront, reducing revision cycles.",
        referenceAvailable: true,
        savings: { cost: "~$25K/yr saved", time: "~15 hrs/cycle saved" },
    },
    {
        title: "EV Charging Reservations",
        category: "Internal Tools",
        industry: "Infrastructure",
        year: "2024",
        challenge: "Two Tesla chargers at HQ with no booking system — employees arrived to find them occupied.",
        solution: "Zero-conflict reservation system with real-time availability and automated notifications.",
        impact: [
            "Zero double-booking incidents",
            "Real-time availability",
            "Automated notifications",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Graph API", ai: null },
        leftShift: "Conflicts prevented at the database level — no manual coordination needed.",
        referenceAvailable: true,
        savings: { cost: "~$5K/yr saved", time: "100% conflict-free" },
    },
    {
        title: "Identity Governance Portal",
        category: "Operations",
        industry: "IT Security",
        year: "2025",
        challenge: "Employee offboarding was manual across Azure AD, Intune, and license pools — risky and slow.",
        solution: "Single-click termination: license cleanup, session revocation, group removal, device wipe, and identity recovery.",
        impact: [
            "Offboarding in seconds vs. hours",
            "Forensic identity recovery",
            "Prevents orphaned license costs",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Entra ID · Graph API · Intune", ai: null },
        leftShift: "Manual checklist → single-click full offboarding with zero gaps.",
        referenceAvailable: true,
        savings: { cost: "~$40K/yr saved", time: "~20 hrs/week saved" },
    },
    {
        title: "Mystery Shopping Evaluator",
        category: "AI & Data",
        industry: "Real Estate",
        year: "2024",
        challenge: "Leasing evaluations on paper with subjective scoring — no benchmarking or trend analysis.",
        solution: "Multi-section scoring platform with instant PDF reports and executive analytics.",
        impact: [
            "Standardized scoring",
            "Instant PDF reports",
            "Trend benchmarking",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "PDF Generation", ai: null },
        leftShift: "Evaluations scored in real time — reports generated instantly, not days later.",
        referenceAvailable: true,
        savings: { cost: "~$35K/yr saved", time: "Seconds vs. days" },
    },
    {
        title: "Digital Site Inspections",
        category: "Operations",
        industry: "Real Estate",
        year: "2024",
        challenge: "Clipboard inspections with manual photo handling — reports took days and were inconsistent.",
        solution: "Paperless inspection platform with AI photo analysis, instant PDF reporting, and partner access.",
        impact: [
            "100% paperless inspections",
            "AI photo analysis",
            "Instant PDF reports",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "PDF Generation", ai: "OpenAI Vision" },
        leftShift: "AI flags defects during capture — no waiting for post-inspection review.",
        referenceAvailable: true,
        savings: { cost: "~$60K/yr saved", time: "Instant vs. 3 days" },
    },
    {
        title: "AI Virtual Staging",
        category: "AI & Data",
        industry: "Real Estate",
        year: "2025",
        challenge: "Physical staging cost thousands per unit and took weeks to arrange.",
        solution: "AI transforms empty room photos into staged spaces across multiple styles with 4K output — in seconds.",
        impact: [
            "Cost reduced from $thousands to near-zero",
            "Multiple design styles",
            "4K marketing-ready output",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "4K Output Pipeline", ai: "AI Image Models" },
        leftShift: "On-demand staged photos — no movers, no furniture rentals.",
        referenceAvailable: true,
        savings: { cost: "~$90K/yr saved", time: "Seconds vs. 2 weeks" },
    },
    {
        title: "Expense Report Automation",
        category: "Operations",
        industry: "Finance",
        year: "2024",
        challenge: "Manual expense entry with paper receipts — slow G/L coding and accounting bottlenecks.",
        solution: "AI receipt extraction via GPT-4o/OCR, intelligent G/L mapping, mileage calculation, and Excel exports.",
        impact: [
            "95%+ extraction accuracy",
            "Auto G/L code assignment",
            "Professional Excel exports",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "ExcelJS · OCR Space", ai: "GPT-4o" },
        leftShift: "Photograph receipts → AI handles extraction, categorization, and coding.",
        referenceAvailable: true,
        savings: { cost: "~$45K/yr saved", time: "~12 hrs/week saved" },
    },
    {
        title: "Executive Calendar Concierge",
        category: "AI & Data",
        industry: "Corporate",
        year: "2025",
        challenge: "Executives frequently missed meetings — default Outlook notifications weren't enough.",
        solution: "Proactive SMS and AI voice call reminders via Twilio, triggered by Graph API calendar monitoring.",
        impact: [
            "SMS + voice reminders",
            "Ultra-realistic neural TTS",
            "Fully automated polling",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Graph API · Twilio", ai: "Google Neural TTS" },
        leftShift: "Passive pop-ups → personalized voice calls that demand attention.",
        referenceAvailable: true,
        savings: { cost: "~$20K/yr saved", time: "Zero missed meetings" },
    },
    {
        title: "Snow Operations Log",
        category: "Operations",
        industry: "Property Management",
        year: "2024",
        challenge: "Paper-based snow removal tracking — unreliable compliance docs, hard to audit.",
        solution: "Digital tracking with contractor management, timestamped entries, and audit-ready reporting.",
        impact: [
            "Audit-ready documentation",
            "Digital contractor management",
            "Timestamped logs",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: null, ai: null },
        leftShift: "Continuous real-time documentation at the point of service.",
        referenceAvailable: true,
        savings: { cost: "~$15K/yr saved", time: "~6 hrs/week saved" },
    },
    {
        title: "Travel Access Manager",
        category: "Internal Tools",
        industry: "IT Security",
        year: "2025",
        challenge: "Travel requests required manual IT intervention for VPN whitelisting — slow and insecure.",
        solution: "Self-service travel system with automated Conditional Access lifecycle and email approval loops.",
        impact: [
            "Automated security whitelist",
            "Self-service requests",
            "Zero-touch IT",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Graph API · Entra ID · Twilio", ai: null },
        leftShift: "Auto-manages group membership based on travel dates — no IT tickets.",
        referenceAvailable: true,
        savings: { cost: "~$10K/yr saved", time: "Zero-touch whitelisting" },
    },
    {
        title: "Adobe License Governor",
        category: "Internal Tools",
        industry: "IT",
        year: "2025",
        challenge: "Adobe licenses untracked — no visibility into allocation, usage, or spend optimization.",
        solution: "Analytics dashboard with UMAPI auditing, automated procurement via Graph API, and lifecycle management.",
        impact: [
            "Full license visibility",
            "Automated procurement",
            "Cost optimization via analytics",
        ],
        techDetails: { frontend: "Next.js", backend: "Supabase", integrations: "Adobe UMAPI · Graph API", ai: null },
        leftShift: "Reactive audits → proactive real-time governance with auto-cleanup.",
        referenceAvailable: true,
        savings: { cost: "~$30K/yr saved", time: "~5 hrs/week saved" },
    },
    {
        title: "Service Call Dashboard",
        category: "Platforms",
        industry: "Fire & Security",
        challenge: "Paper-based service calls and manual PO creation — no centralized tracking or map visibility.",
        solution: "Service management platform with real-time tracking, calendar scheduling, map views, and automated PDF purchase orders.",
        impact: [
            "Centralized service tracking",
            "Automated PDF purchase orders",
            "Map view + calendar scheduling",
        ],
        techDetails: { frontend: "React · TypeScript", backend: "Supabase", integrations: "Graph API · Leaflet · jsPDF", ai: null },
        leftShift: "Phone coordination → live dashboard with real-time dispatch.",
        referenceAvailable: true,
        savings: { cost: "~$50K/yr saved", time: "~25 hrs/week saved" },
    },
    {
        title: "Employee Sign-In App",
        category: "Operations",
        industry: "Fire & Security",
        challenge: "No reliable field attendance tracking — head office had zero visibility into on-site presence.",
        solution: "Mobile PWA with GPS location capture, timestamped sign-in, and automated email notifications to head office.",
        impact: [
            "GPS-verified attendance",
            "Automated email alerts",
            "Works on any mobile device",
        ],
        techDetails: { frontend: "HTML5 · CSS3 · JavaScript", backend: "Node.js · Express", integrations: "Nodemailer · Geolocation API", ai: null },
        leftShift: "Self-service GPS sign-in replaces manual calls and paper sheets.",
        referenceAvailable: true,
        savings: { cost: "~$10K/yr saved", time: "100% automated" },
    },
];

/* ─── Tech Stack Icon Helper ─── */
function TechIcon({ type }: { type: string }) {
    const iconClass = "w-3.5 h-3.5";
    switch (type) {
        case "frontend":
            return <Layers className={iconClass} />;
        case "backend":
            return <Globe className={iconClass} />;
        case "integrations":
            return <Cpu className={iconClass} />;
        case "ai":
            return <Sparkles className={iconClass} />;
        default:
            return null;
    }
}

const techLabels: Record<string, string> = {
    frontend: "Frontend",
    backend: "Backend",
    integrations: "Integrations",
    ai: "AI / ML",
};

/* ─── Compact Expandable Card ─── */
function CompactCard({ project, index }: { project: typeof allProjects[number]; index: number }) {
    const [open, setOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl border border-neutral-200/60 hover:border-neutral-300 hover:shadow-md transition-all duration-300 overflow-hidden"
        >
            {/* Collapsed header — always visible */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left p-6 cursor-pointer"
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-100 rounded-full">
                                {project.industry}
                            </span>
                            <span className="px-2.5 py-0.5 text-[10px] font-medium text-neutral-500 bg-neutral-50 rounded-full">
                                {project.category}
                            </span>
                        </div>
                        <h3 className="text-[17px] font-semibold tracking-[-0.02em] text-neutral-900 mb-2">
                            {project.title}
                        </h3>
                        <p className="text-[13px] leading-[1.6] text-neutral-600 line-clamp-2">
                            {project.challenge}
                        </p>
                        {/* Savings — compact */}
                        {project.savings && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-[#E2000F] bg-red-50 rounded-lg border border-red-200/50">
                                    <span className="text-[#E2000F]/60 text-[10px]">$</span>
                                    {project.savings.cost}
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold text-neutral-700 bg-neutral-50 rounded-lg border border-neutral-200/50">
                                    <span className="text-neutral-400 text-[10px]">⏱</span>
                                    {project.savings.time}
                                </span>
                            </div>
                        )}
                        {/* Tech pills — compact */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                            {Object.entries(project.techDetails)
                                .filter(([, val]) => val)
                                .map(([key, val]) => (
                                    <span
                                        key={key}
                                        className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-neutral-700 bg-neutral-50 rounded-full border border-neutral-200/50"
                                    >
                                        <TechIcon type={key} />
                                        {val}
                                    </span>
                                ))}
                        </div>
                    </div>
                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="shrink-0 mt-1"
                    >
                        <ChevronDown className="w-5 h-5 text-neutral-400" />
                    </motion.div>
                </div>
            </button>

            {/* Expanded detail — accordion */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 pt-2 border-t border-neutral-100">
                            <div className="grid sm:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-2">
                                        The Solution
                                    </h4>
                                    <p className="text-[13px] leading-[1.7] text-neutral-800">
                                        {project.solution}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-2">
                                        Key Impact
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {project.impact.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className="flex items-start gap-2 text-[13px] leading-[1.55] text-neutral-800"
                                            >
                                                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#E2000F] shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-2">
                                    Left-Shift &amp; Automation
                                </h4>
                                <p className="text-[13px] leading-[1.7] text-neutral-800">
                                    {project.leftShift}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ─── Page ─── */
export default function ProjectsPage() {
    const [active, setActive] = useState("All");
    const filtered =
        active === "All"
            ? allProjects
            : allProjects.filter((p) => p.category === active);

    return (
        <div className="min-h-screen bg-[#fbfbfd]">
            {/* Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fbfbfd]/80 backdrop-blur-xl border-b border-neutral-200/40">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="flex items-center gap-2 group">
                            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="group-hover:scale-105 transition-transform duration-300">
                                <path d="M20 20 H60 L50 40 H10 Z" fill="#171717" />
                                <path d="M50 60 H90 L80 80 H40 Z" fill="#E2000F" />
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
                            Home
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-6 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4">
                            <div>
                                <span className="text-[12px] font-medium text-[#E2000F] uppercase tracking-widest">
                                    Recently Implemented
                                </span>
                                <h1 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-900">
                                    Systems that cut costs and multiply output.
                                </h1>
                            </div>
                            <p className="text-[15px] leading-[1.7] text-neutral-600 max-w-md md:pb-1">
                                Real case studies — designed, engineered, and deployed.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filter tabs */}
            <section className="px-6 pb-8 sticky top-20 z-40 bg-[#fbfbfd]/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="flex gap-1 overflow-x-auto pb-1 pt-4 border-b border-neutral-200/40"
                    >
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActive(cat)}
                                className={`px-4 py-2 text-[13px] font-medium rounded-full whitespace-nowrap transition-all duration-200 ${active === cat
                                    ? "bg-neutral-900 text-white"
                                    : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100"
                                    }`}
                            >
                                {cat}
                                {cat !== "All" && (
                                    <span className={`ml-1.5 text-[11px] ${active === cat ? "text-neutral-400" : "text-neutral-300"}`}>
                                        {allProjects.filter((p) => p.category === cat).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── Featured Case Studies ─── */}
            <section className="pb-12">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active + "-featured"}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                    >
                        {filtered.filter(p => p.featured).map((project, i) => (
                            <motion.section
                                key={project.title}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: Math.min(i * 0.06, 0.5),
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className={`border-b border-neutral-200/30 ${i % 2 === 0 ? 'bg-white' : 'bg-[#f8f8fa]'}`}
                            >
                                <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
                                    {/* Header row */}
                                    <div className="flex flex-wrap items-center gap-3 mb-6">
                                        <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-600 bg-white/70 rounded-full border border-neutral-200/50">
                                            {project.industry}
                                        </span>
                                        <span className="px-3 py-1 text-[11px] font-medium text-neutral-500 bg-white/50 rounded-full border border-neutral-200/30">
                                            {project.category}
                                        </span>
                                        <span className="px-2 py-0.5 text-[9px] font-bold text-[#E2000F] bg-red-50 rounded uppercase tracking-wider">
                                            Featured
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.03em] text-neutral-900 mb-4">
                                        {project.title}
                                    </h2>

                                    {/* Savings Metrics */}
                                    {project.savings && (
                                        <div className="flex flex-wrap gap-3 mb-8">
                                            <span className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-[#E2000F] bg-red-50 rounded-xl border border-red-200/60">
                                                <span className="text-[#E2000F]/60">$</span>
                                                {project.savings.cost}
                                            </span>
                                            <span className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-semibold text-neutral-700 bg-neutral-50 rounded-xl border border-neutral-200/60">
                                                <span className="text-neutral-400">⏱</span>
                                                {project.savings.time}
                                            </span>
                                        </div>
                                    )}

                                    {/* Challenge / Solution / Impact */}
                                    <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-10">
                                        <div>
                                            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">
                                                The Challenge
                                            </h3>
                                            <p className="text-[14px] leading-[1.75] text-neutral-800">
                                                {project.challenge}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">
                                                The Solution
                                            </h3>
                                            <p className="text-[14px] leading-[1.75] text-neutral-800">
                                                {project.solution}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-3">
                                                Key Impact
                                            </h3>
                                            <ul className="space-y-2">
                                                {project.impact.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-[14px] leading-[1.65] text-neutral-800"
                                                    >
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E2000F] shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Tech Stack + Left-Shift */}
                                    <div className="grid md:grid-cols-2 gap-8 md:gap-10 pt-8 border-t border-neutral-200/40">
                                        <div>
                                            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-4">
                                                Technology Stack
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {Object.entries(project.techDetails)
                                                    .filter(([, val]) => val)
                                                    .map(([key, val]) => (
                                                        <span
                                                            key={key}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-neutral-800 bg-neutral-50 rounded-full border border-neutral-200/60 shadow-sm"
                                                        >
                                                            <TechIcon type={key} />
                                                            <span className="text-neutral-400 mr-0.5">{techLabels[key]}:</span>
                                                            {val}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-600 mb-4">
                                                Left-Shift &amp; Automation
                                            </h3>
                                            <p className="text-[14px] leading-[1.75] text-neutral-800">
                                                {project.leftShift}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </section>

            {/* ─── All Other Projects — Compact Grid ─── */}
            {filtered.filter(p => !p.featured).length > 0 && (
                <section className="px-6 pb-24">
                    <div className="max-w-6xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-[-0.03em] text-neutral-900 mb-8"
                        >
                            More projects
                        </motion.h2>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active + "-grid"}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}
                                className="grid md:grid-cols-2 gap-4"
                            >
                                {filtered.filter(p => !p.featured).map((project, i) => (
                                    <CompactCard key={project.title} project={project} index={i} />
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-[#f5f5f7] border-t border-neutral-200/40">
                <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.03em] text-neutral-900 mb-3">
                            Your system could be next.
                        </h2>
                        <p className="text-[15px] text-neutral-500 mb-8 max-w-md mx-auto leading-[1.7]">
                            We&apos;re always taking on new challenges.
                            Let&apos;s talk about what precision engineering
                            can do for your operations.
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-flex items-center gap-2 px-7 py-3.5 bg-neutral-900 text-white text-[14px] font-medium rounded-full hover:bg-neutral-800 transition-colors"
                        >
                            Start a conversation
                            <ArrowUpRight size={14} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-neutral-200/40 bg-[#fbfbfd]">
                <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[13px] text-neutral-500">
                        &copy; {new Date().getFullYear()} Zeitwerk
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-[13px] text-neutral-500 hover:text-neutral-700 transition-colors">
                            Privacy
                        </Link>
                        <Link href="/terms" className="text-[13px] text-neutral-500 hover:text-neutral-700 transition-colors">
                            Terms
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
