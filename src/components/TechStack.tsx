import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import matplotlibPng from "@/assets/Matplotlib.png";

/* ─────────────────────────────────────────────────────────────
   Inline SVG data URIs for logos not on Simple Icons CDN
   or needing user-provided artwork.
───────────────────────────────────────────────────────────── */
const CSS3_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cpath fill='%231572B6' d='M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z'/%3E%3Cpath fill='%2333A9DC' d='M64.001 117.062l36.559-10.136 8.601-96.354h-45.16v106.49z'/%3E%3Cpath fill='%23fff' d='M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z'/%3E%3Cpath fill='%23EBEBEB' d='M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z'/%3E%3Cpath fill='%23fff' d='M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881H81.127z'/%3E%3Cpath fill='%23EBEBEB' d='M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711h34.646zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.33-3.711h16.447z'/%3E%3C/svg%3E`;

const VSCODE_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 128 128'%3E%3Cmask id='a' width='128' height='128' x='0' y='0' maskUnits='userSpaceOnUse' style='mask-type:alpha'%3E%3Cpath fill='%23fff' fill-rule='evenodd' d='M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z' clip-rule='evenodd'/%3E%3C/mask%3E%3Cg mask='url(%23a)'%3E%3Cpath fill='%230065A9' d='M123.471 13.82 97.097 1.12A7.973 7.973 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.333 5.333 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8.001 8.001 0 0 0-4.529-7.208Z'/%3E%3Cpath fill='%23007ACC' d='m123.471 114.181-26.374 12.698A7.973 7.973 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.333 5.333 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8.001 8.001 0 0 1-4.529 7.208Z'/%3E%3Cpath fill='%231F9CF0' d='M97.098 126.882A7.977 7.977 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.977 7.977 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21l-26.369 12.681Z'/%3E%3C/g%3E%3C/svg%3E`;

const EXCEL_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%23169154' d='M29 6H15.744C14.781 6 14 6.781 14 7.744v7.259h15V6z'/%3E%3Cpath fill='%2318482a' d='M14 33.054v7.202C14 41.219 14.781 42 15.743 42H29v-8.946H14z'/%3E%3Cpath fill='%230c8045' d='M14 15.003H29V24.005H14z'/%3E%3Cpath fill='%2317472a' d='M14 24.005H29V33.055H14z'/%3E%3Cpath fill='%2329c27f' d='M42.256 6H29v9.003h15V7.744C44 6.781 43.219 6 42.256 6z'/%3E%3Cpath fill='%2327663f' d='M29 33.054V42h13.257C43.219 42 44 41.219 44 40.257v-7.202H29z'/%3E%3Cpath fill='%2319ac65' d='M29 15.003H44V24.005H29z'/%3E%3Cpath fill='%23129652' d='M29 24.005H44V33.055H29z'/%3E%3Cpath fill='%230c7238' d='M22.319 34H5.681C4.753 34 4 33.247 4 32.319V15.681C4 14.753 4.753 14 5.681 14h16.638C23.247 14 24 14.753 24 15.681v16.638C24 33.247 23.247 34 22.319 34z'/%3E%3Cpath fill='%23fff' d='M9.807 19L12.193 19 14.129 22.754 16.175 19 18.404 19 15.333 24 18.474 29 16.123 29 14.013 25.07 11.912 29 9.526 29 12.719 23.982z'/%3E%3C/svg%3E`;

/* ─────────────────────────────────────────────────────────────
   Tech list — single marquee row
───────────────────────────────────────────────────────────── */
const TECHS = [
    { name: "Python", color: "#3776AB", icon: "https://cdn.simpleicons.org/python/3776AB" },
    { name: "Pandas", color: "#8EB0D4", icon: "https://cdn.simpleicons.org/pandas/8EB0D4" },
    { name: "NumPy", color: "#4DABCF", icon: "https://cdn.simpleicons.org/numpy/4DABCF" },
    { name: "Matplotlib", color: "#11557C", icon: matplotlibPng },
    { name: "Seaborn", color: "#4C72B0", icon: "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg" },
    { name: "Plotly", color: "#7CB3D8", icon: "https://cdn.simpleicons.org/plotly/7CB3D8" },
    { name: "scikit-learn", color: "#F7931E", icon: "https://cdn.simpleicons.org/scikitlearn/F7931E" },
    { name: "PyTorch", color: "#EE4C2C", icon: "https://cdn.simpleicons.org/pytorch/EE4C2C" },
    { name: "TensorFlow", color: "#FF6F00", icon: "https://cdn.simpleicons.org/tensorflow/FF6F00" },
    { name: "Keras", color: "#D00000", icon: "https://cdn.simpleicons.org/keras/D00000" },
    { name: "Jupyter", color: "#F37626", icon: "https://cdn.simpleicons.org/jupyter/F37626" },
    { name: "HTML5", color: "#E34F26", icon: "https://cdn.simpleicons.org/html5/E34F26" },
    { name: "CSS3", color: "#1572B6", icon: CSS3_SVG },
    { name: "JavaScript", color: "#F7DF1E", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
    { name: "React", color: "#61DAFB", icon: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "Node.js", color: "#5FA04E", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
    { name: "FastAPI", color: "#009688", icon: "https://cdn.simpleicons.org/fastapi/009688" },
    { name: "Firebase", color: "#FFCA28", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
    { name: "MySQL", color: "#4479A1", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
    { name: "MongoDB", color: "#47A248", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
    { name: "Git", color: "#F05032", icon: "https://cdn.simpleicons.org/git/F05032" },
    { name: "GitHub", color: "#D0D0D0", icon: "https://cdn.simpleicons.org/github/D0D0D0" },
    { name: "Vercel", color: "#D0D0D0", icon: "https://cdn.simpleicons.org/vercel/D0D0D0" },
    { name: "Netlify", color: "#00C7B7", icon: "https://cdn.simpleicons.org/netlify/00C7B7" },
    { name: "Railway", color: "#B0B0D0", icon: "https://cdn.simpleicons.org/railway/B0B0D0" },
    { name: "Selenium", color: "#43B02A", icon: "https://cdn.simpleicons.org/selenium/43B02A" },
    { name: "VS Code", color: "#007ACC", icon: VSCODE_SVG },
    { name: "Power BI", color: "#F2C811", icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg" },
    { name: "Excel", color: "#217346", icon: EXCEL_SVG },
    { name: "GSAP", color: "#88CE02", icon: "https://cdn.simpleicons.org/greensock/88CE02" },
];

// Triplicate for a truly seamless loop at any screen width
const DUPED = [...TECHS, ...TECHS, ...TECHS];

/* ── TechStack ──────────────────────────────────────────────── */
const TechStack = () => {
    const trackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);
    const [tooltip, setTooltip] = useState<string | null>(null);

    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) return;

        // Animate from 0 → -33.333% (one full copy width) for seamless loop
        tweenRef.current = gsap.to(trackRef.current, {
            x: "-33.333%",
            duration: 50,
            ease: "none",
            repeat: -1,
        });

        return () => {
            tweenRef.current?.kill();
        };
    }, []);

    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.resume();

    return (
        <section
            id="tech-stack"
            className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

            {/* Gradient fade masks on sides */}
            <div className="absolute inset-y-0 left-0 w-20 sm:w-36 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-20 sm:w-36 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

            {/* Heading */}
            <div className="container mx-auto px-4 sm:px-6 relative mb-12 sm:mb-16">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Tech Stack</h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-4" />
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                        Tools and technologies I work with — from data wrangling to model deployment
                    </p>
                </div>
            </div>

            {/*
        ─── Single marquee row ───────────────────────────────────
        py-6 gives vertical breathing room so scale-up cards
        don't clip against the overflow:hidden edge.
        overflow-hidden is only on the x axis via overflow-x-hidden.
      */}
            <div
                className="overflow-x-hidden"
                style={{ paddingBlock: "1.75rem" }}          /* vertical clearance for hover pop */
                onMouseEnter={pause}
                onMouseLeave={resume}
                onFocus={pause}
                onBlur={resume}
            >
                <div ref={trackRef} className="flex gap-4 w-max will-change-transform">
                    {DUPED.map((tech, i) => (
                        <TechCard key={`r - ${i} `} tech={tech} onTooltip={setTooltip} />
                    ))}
                </div>
            </div>

            {/* Tooltip */}
            {tooltip && (
                <div
                    className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-full shadow-lg z-50 whitespace-nowrap"
                    style={{ animation: "fadeIn 0.12s ease" }}
                >
                    {tooltip}
                </div>
            )}
        </section>
    );
};

/* ── TechCard ───────────────────────────────────────────────── */
function TechCard({
    tech,
    onTooltip,
}: {
    tech: (typeof TECHS)[0];
    onTooltip: (name: string | null) => void;
}) {
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div
            className="flex flex-col items-center justify-center gap-2 w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-2xl bg-card/20 backdrop-blur border border-border/50 cursor-pointer select-none flex-shrink-0"
            whileHover={{
                scale: 1.15,
                boxShadow: `0 0 28px ${tech.color} 60`,
                borderColor: tech.color,
                backgroundColor: `${tech.color} 18`,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            onHoverStart={() => onTooltip(tech.name)}
            onHoverEnd={() => onTooltip(null)}
            onFocus={() => onTooltip(tech.name)}
            onBlur={() => onTooltip(null)}
            tabIndex={0}
            role="img"
            aria-label={tech.name}
        >
            {!imgError ? (
                <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    loading="lazy"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: tech.color }}
                >
                    {tech.name[0]}
                </div>
            )}
            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium text-center leading-tight px-1 w-full truncate text-center">
                {tech.name}
            </span>
        </motion.div>
    );
}

export default TechStack;
