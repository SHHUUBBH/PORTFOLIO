import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCursor() {
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);
    const ringX = useSpring(dotX, { stiffness: 90, damping: 20, mass: 0.6 });
    const ringY = useSpring(dotY, { stiffness: 90, damping: 20, mass: 0.6 });
    const isHoverRef = useRef(false);
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /* Hide on touch */
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const onMove = (e: MouseEvent) => {
            dotX.set(e.clientX);
            dotY.set(e.clientY);
        };

        const onEnter = (e: Event) => {
            const target = e.target as HTMLElement;
            const hoverable = target.closest("a, button, [role='button'], [tabindex='0'], .cursor-pointer");
            if (hoverable && !isHoverRef.current) {
                isHoverRef.current = true;
                if (dotRef.current) dotRef.current.style.transform += " scale(2.5)";
                if (ringRef.current) ringRef.current.style.transform += " scale(2)";
            }
        };
        const onLeave = (e: Event) => {
            const target = e.target as HTMLElement;
            const hoverable = target.closest("a, button, [role='button'], [tabindex='0'], .cursor-pointer");
            if (hoverable && isHoverRef.current) {
                isHoverRef.current = false;
                if (dotRef.current) dotRef.current.style.transform = "";
                if (ringRef.current) ringRef.current.style.transform = "";
            }
        };

        window.addEventListener("mousemove", onMove);
        document.addEventListener("mouseover", onEnter);
        document.addEventListener("mouseout", onLeave);
        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseover", onEnter);
            document.removeEventListener("mouseout", onLeave);
        };
    }, [dotX, dotY]);

    /* Hide on touch screens via CSS */
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

    return (
        <>
            {/* Dot — snappy */}
            <motion.div
                ref={dotRef}
                className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-screen"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #bf80ff 0%, #9500ff 60%, transparent 100%)",
                    boxShadow: "0 0 12px 4px rgba(149,0,255,0.7)",
                    transition: "transform 0.18s cubic-bezier(0.22,1,0.36,1)",
                }}
            />
            {/* Ring — laggy spring */}
            <motion.div
                ref={ringRef}
                className="fixed top-0 left-0 z-[99998] pointer-events-none"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1.5px solid rgba(149,0,255,0.45)",
                    boxShadow: "0 0 8px 1px rgba(149,0,255,0.2)",
                    transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                }}
            />
        </>
    );
}
