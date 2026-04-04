import { useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import portraitImage from "@/assets/my profile.png";
import resumePdf from "@/doc/RESUME.pdf";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import HeroNetwork from "./HeroNetwork";
import Typewriter from "./Typewriter";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

/* ── Animation Variants ─────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* ── Magnetic Button ────────────────────────────────────────── */
function MagneticButton({ children, className, onClick, variant = "primary" }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY, display: "inline-block" }}
    >
      <Button
        size="lg"
        className={className}
        onClick={onClick}
        variant={variant === "outline" ? "outline" : "default"}
      >
        {children}
      </Button>
    </motion.div>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = resumePdf;
    link.download = "Subhro_Pal_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* GSAP entrance timeline */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    gsap.context(() => {
      gsap.from(".floating-photo-container", { scale: 0.7, opacity: 0, duration: 1.2, ease: "power4.out" });
    }, containerRef);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-10 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] z-[1] pointer-events-none" />

      {/* Data Science Theme: Network Graph Animation */}
      <div className="absolute inset-0 z-[2] opacity-60">
        <HeroNetwork />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Profile photo — order-1 on mobile, 2 on desktop */}
          <div className="flex justify-center order-1 md:order-2">
            <FloatingPhoto imgRef={imgRef} />
          </div>

          {/* Text — order-2 on mobile, 1 on desktop */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-5 sm:space-y-7 order-2 md:order-1 text-center md:text-left"
          >
            <div className="space-y-2">
              <motion.p variants={fadeUp} className="hero-text-group text-xs sm:text-sm text-primary font-mono tracking-widest uppercase opacity-80">
                Welcome to my portfolio
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="hero-text-group text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-100"
              >
                Hello,
                <br />
                I'm{" "}
                <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  Subhro Pal
                </span>
              </motion.h1>
              <motion.h2
                variants={fadeUp}
                className="hero-text-group text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold"
              >
                <Typewriter
                  words={[
                    "Aspiring Data Scientist",
                    "AI Tools Explorer",
                    "Data Visualization Expert",
                    "BCA Hons. in Data Science",
                  ]}
                  typeSpeed={65}
                  deleteSpeed={35}
                  pauseAfterType={2000}
                  className="bg-gradient-to-r from-violet-400 via-primary to-purple-300 bg-clip-text text-transparent"
                />
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="hero-text-group text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed mx-auto md:mx-0"
              >
                BCA (Hons.) in Data Science · Python · ML · Generative AI · LLaMA · Stable Diffusion
              </motion.p>
            </div>

            <motion.div variants={fadeUp} className="hero-btn-group flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
              <MagneticButton
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/40 hover:shadow-xl w-full xs:w-auto"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Got a project?
              </MagneticButton>
              <MagneticButton
                variant="outline"
                className="border-2 hover:bg-accent w-full xs:w-auto"
                onClick={handleResumeDownload}
              >
                My Resume
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ── Floating Photo Sub-component ───────────────────────────── */
function FloatingPhoto({
  imgRef,
}: {
  imgRef: React.RefObject<HTMLDivElement> | null;
}) {
  return (
    <div className="flex justify-center floating-photo-container">
      <style>
        {`
          @keyframes float-bob {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            33% { transform: translateY(-15px) rotate(1deg); }
            66% { transform: translateY(-5px) rotate(-1deg); }
          }
          .animate-float-bob {
            animation: float-bob 6s ease-in-out infinite;
          }
        `}
      </style>
      {/* Ambient glow blob */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(149,0,255,0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 animate-float-bob"
        >
          {/* Rotating glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, #9500ff, #7c00ff, #4f00ff, #9500ff)",
              filter: "blur(3px)",
              opacity: 0.8,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner mask to keep photo visible */}
          <div className="absolute inset-[3px] rounded-full bg-background z-[1]" />

          {/* Second pulsing ring */}
          <motion.div
            className="absolute -inset-3 rounded-full border border-primary/25"
            animate={{ scale: [1, 1.07, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Photo */}
          <motion.div
            className="w-full h-full aspect-square rounded-full overflow-hidden border-2 border-primary/40 shadow-2xl relative z-[2]"
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img
              alt="Subhro Pal portrait"
              className="w-full h-full object-cover"
              src={portraitImage}
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;