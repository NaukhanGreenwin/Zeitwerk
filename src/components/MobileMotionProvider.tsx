"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Disables all framer-motion animations on mobile (< 768px).
 *
 * CRITICAL: Defaults to isMobile=true so that during SSR, framer-motion
 * renders elements at their FINAL (visible) state instead of their
 * initial={{ opacity: 0 }} hidden state. This prevents the "black screen"
 * on mobile where JS hydration takes too long.
 *
 * On desktop, after hydration, isMobile flips to false and animations work.
 */
export default function MobileMotionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // Default TRUE = animations disabled on SSR → elements render visible
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return (
        <MotionConfig reducedMotion={isMobile ? "always" : "never"}>
            {children}
        </MotionConfig>
    );
}
