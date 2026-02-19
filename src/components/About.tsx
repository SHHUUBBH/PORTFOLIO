import { useEffect, useRef, useState } from "react";
import { Brain, BarChart3, Server, Cpu, Database, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Shared easing ──────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Animated Counter ───────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || typeof target !== "number") return;
    let raf: number;
    const duration = 1800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {typeof target === "number" ? count : target}{suffix}
    </span>
  );
}

/* ── 3D Tilt Card (GSAP) ────────────────────────────────────── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, { rotateY: x * 14, rotateX: -y * 14, duration: 0.25, ease: "power2.out", transformPerspective: 900 });
  };
  const handleLeave = () =>
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
}

/* ── About ──────────────────────────────────────────────────── */
const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    {
      icon: Brain,
      title: "Machine Learning & Deep Learning",
      description: "Design and train ML/DL models — from classic sklearn pipelines to PyTorch neural networks — solving real-world classification, regression, and generation tasks.",
    },
    {
      icon: BarChart3,
      title: "EDA & Data Visualization",
      description: "Exploratory Data Analysis with Python (Pandas, NumPy, Matplotlib, Seaborn, Plotly) and Power BI — turning raw data into compelling visual stories.",
    },
    {
      icon: Cpu,
      title: "Generative AI & LLMs",
      description: "Research and deployment of Generative AI systems using LLaMA, Stable Diffusion, and HuggingFace — including NLP pipelines and multimodal applications.",
    },
    {
      icon: Database,
      title: "Data Engineering & SQL",
      description: "Structured data handling with MySQL and MongoDB, advanced SQL queries, data wrangling, and building efficient data pipelines for analytics.",
    },
    {
      icon: Server,
      title: "Model Deployment",
      description: "End-to-end deployment of ML models via FastAPI and Streamlit hosted on Railway, Vercel, and Netlify — production-ready and scalable.",
    },
    {
      icon: Sparkles,
      title: "AI Research & Simulation",
      description: "Participant in Tata iQ / Forage virtual simulations, applying data science workflows to real enterprise business problems.",
    },
  ];

  const stats = [
    { value: 7, suffix: "+", label: "Projects Built" },
    { value: 3, suffix: "+", label: "Certifications" },
    { value: 1, suffix: "", label: "Data Science Internship" },
    { value: "BCA", suffix: "", label: "Hons. in Data Science" },
  ];

  const skills = ["Python", "SQL", "EDA", "ML/DL", "LLaMA", "Stable Diffusion", "NLP", "Power BI", "FastAPI"];

  /* GSAP scroll reveals — only on elements NOT controlled by Framer Motion */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading pinned reveal
      gsap.from(".about-heading", {
        y: 60, opacity: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".about-heading", start: "top 88%", once: true },
      });
      // Service cards stagger
      gsap.from(".about-service-card", {
        y: 70, opacity: 0, duration: 0.7, stagger: 0.09, ease: "power3.out",
        scrollTrigger: { trigger: ".about-service-card", start: "top 82%", once: true },
      });
      // Journey panel slide in
      gsap.from(".about-journey", {
        x: 80, opacity: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".about-journey", start: "top 82%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Heading */}
        <div className="about-heading text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Service Cards */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-foreground/90">What I Do</h3>
            {services.map((service, index) => (
              <TiltCard key={index} className="about-service-card">
                <Card className="p-4 sm:p-5 flex items-start gap-3 sm:gap-4 hover:shadow-xl transition-all duration-300 bg-card/20 backdrop-blur border-border/50 hover:border-primary/40">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <service.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </div>
                </Card>
              </TiltCard>
            ))}
          </div>

          {/* Right column: Journey + Stats */}
          <div className="space-y-8">
            {/* Journey panel — GSAP animates this, no Framer Motion conflict */}
            <div className="about-journey bg-card/20 backdrop-blur border border-border/50 rounded-xl p-5 sm:p-8 shadow-lg space-y-4 sm:space-y-5">
              <h3 className="text-2xl font-semibold">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a <span className="text-primary font-semibold">BCA (Hons.) in Data Science</span> graduate, passionate about turning complex data into actionable intelligence. My core stack is <strong>Python, SQL, EDA, and Data Visualization</strong> — with deep hands-on experience in Machine Learning, Deep Learning, and Generative AI.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I've built systems using <span className="text-primary font-semibold">LLaMA, Stable Diffusion, NLP pipelines</span>, and deployed applications end-to-end. Key projects include <strong>CONTRA</strong> (ensemble ML), <strong>ORBITUNE</strong> (AI-powered NLP system), and a <strong>Reservoir Forecasting</strong> platform combining Power BI, SQL, and time-series ML.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I completed a <span className="text-primary font-semibold">Data Science Internship at The Developers Arena</span> and participated in the <strong>Tata iQ / Forage</strong> virtual simulation — applying real enterprise data science workflows.
              </p>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
                    whileHover={{ scale: 1.12, y: -2 }}
                    className="text-xs font-mono px-3 py-1 rounded-full border border-primary/30 text-primary/80 bg-primary/5 cursor-default hover:bg-primary/15 transition-colors"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* ── Stat Cards ─────────────────────────────────────────
                ONLY Framer Motion here — no GSAP touching these.
                whileInView handles the scroll reveal trigger.
            ──────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.75, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1,
                    ease: EASE,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0 16px 40px rgba(149,0,255,0.25)",
                  }}
                  className="about-stat text-center p-5 rounded-xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors duration-300 group cursor-default"
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 group-hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter target={stat.value as number} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
