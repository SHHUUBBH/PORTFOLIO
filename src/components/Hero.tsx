import { useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import portraitImage from "@/assets/my profile.png";
import resumePdf from "@/doc/RESUME.pdf";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import Typewriter from "./Typewriter";

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

/* ── Data Network Canvas ────────────────────────────────────── */
function DataNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0;
    const NODES = 55;
    const MAX_DIST = 140;
    const REPEL_RADIUS = 100;
    const REPEL_STRENGTH = 0.6;

    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      ox: number; oy: number;
      r: number;
      pulse: number;
      pulseSpeed: number;
    }

    let nodes: Node[] = [];

    const init = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      nodes = Array.from({ length: NODES }, () => {
        const x = Math.random() * W;
        const y = Math.random() * H;
        return {
          x, y, ox: x, oy: y,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 2.5 + 1,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.02,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      nodes.forEach((n) => {
        // drift
        n.ox += n.vx;
        n.oy += n.vy;
        if (n.ox < 0 || n.ox > W) n.vx *= -1;
        if (n.oy < 0 || n.oy > H) n.vy *= -1;

        // repel from mouse
        const dx = n.ox - mouseRef.current.x;
        const dy = n.oy - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          n.x = n.ox + (dx / dist) * force * REPEL_STRENGTH * REPEL_RADIUS;
          n.y = n.oy + (dy / dist) * force * REPEL_STRENGTH * REPEL_RADIUS;
        } else {
          n.x += (n.ox - n.x) * 0.08;
          n.y += (n.oy - n.y) * 0.08;
        }

        n.pulse += n.pulseSpeed;
      });

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.35;
            ctx.beginPath();
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(149,0,255,${alpha})`);
            grad.addColorStop(1, `rgba(99,102,241,${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      nodes.forEach((n) => {
        const glow = Math.sin(n.pulse) * 0.5 + 0.5;
        const radius = n.r + glow * 1.5;

        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, radius * 3);
        gradient.addColorStop(0, `rgba(149,0,255,${0.7 + glow * 0.3})`);
        gradient.addColorStop(0.5, `rgba(124,0,255,${0.3 + glow * 0.2})`);
        gradient.addColorStop(1, "rgba(100,0,200,0)");

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,150,255,${0.8 + glow * 0.2})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(init);
    ro.observe(canvas);
    init();
    if (!prefersReduced) draw();

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", opacity: 0.65, zIndex: 1 }}
    />
  );
}

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
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(containerRef.current, { opacity: 0, duration: 0.5 })
        .from(".hero-text-group", { y: 60, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.2")
        .from(".hero-btn-group", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(imgRef.current, { scale: 0.8, opacity: 0, duration: 0.9 }, "-=0.7");
    }, containerRef);
    return () => ctx.revert();
  }, []);


  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16 sm:pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Data network canvas */}
      <DataNetworkCanvas />

      <div
        ref={containerRef}
        className="container mx-auto px-4 sm:px-6 py-12 md:py-0 grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10"
      >
        {/* Profile photo — always visible, stacks above text on mobile */}
        <div className="flex justify-center order-1 md:order-2">
          <FloatingPhoto imgRef={imgRef} size="responsive" />
        </div>

        {/* Text */}
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
    </section>
  );
};

/* ── Floating Photo Sub-component ───────────────────────────── */
function FloatingPhoto({
  imgRef,
  size,
}: {
  imgRef: React.RefObject<HTMLDivElement> | null;
  size: "responsive";
}) {
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 40, damping: 10, mass: 1.5 });

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    let t = 0;
    let raf: number;
    const animate = () => {
      t += 0.012;
      y.set(Math.sin(t) * 10);
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [y]);

  return (
    <div ref={imgRef} className="flex justify-center">
      {/* Ambient glow blob */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(149,0,255,0.3) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96"
          style={{ y: springY }}
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
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
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
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;