import { useEffect, useRef, useState } from "react";
import { Brain, BarChart3, Server, Cpu, Database, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion, useInView, useScroll, useTransform, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Shared easing ──────────────────────────────────────────── */
const PREMIUM_EASE = [0.25, 0.4, 0.25, 1] as const;

/* ── Variants ───────────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.9,
      ease: PREMIUM_EASE,
    },
  },
};

const cardHoverVariants: Variants = {
  rest: { scale: 1, y: 0, z: 0 },
  hover: {
    scale: 1.03,
    y: -5,
    zIndex: 10,
    transition: { duration: 0.4, ease: "backOut" },
  },
};

/* ── Animated Counter ───────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView || typeof target !== "number") return;
    let raf: number;
    const duration = 2000;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Quartic ease out
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

/* ── About Component ────────────────────────────────────────── */
const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ offset: ["start center", "center center"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]); // Parallax effect
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Parallax effect (bottom blob)

  const services = [
    {
      icon: Brain,
      title: "Machine Learning & DL",
      description: "Design and train ML/DL models — from classic sklearn pipelines to PyTorch neural networks — solving real-world classification, regression, and generation tasks.",
    },
    {
      icon: BarChart3,
      title: "EDA & Visualization",
      description: "Exploratory Data Analysis with Python (Pandas, NumPy, Matplotlib, Seaborn, Plotly) and Power BI — turning raw data into compelling visual stories.",
    },
    {
      icon: Cpu,
      title: "Generative AI & LLMs",
      description: "Research and deployment of Generative AI systems using LLaMA, Stable Diffusion, and HuggingFace — including NLP pipelines and multimodal applications.",
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Structured data handling with MySQL and MongoDB, advanced SQL queries, data wrangling, and building efficient data pipelines for analytics.",
    },
    {
      icon: Server,
      title: "Model Deployment",
      description: "End-to-end deployment of ML models via FastAPI and Streamlit hosted on Railway, Vercel, and Netlify — production-ready and scalable.",
    },
    {
      icon: Sparkles,
      title: "AI Research",
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

  return (
    <section ref={containerRef} id="about" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      {/* Parallax Blobs */}
      <motion.div style={{ y }} className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        className="container mx-auto px-4 sm:px-6 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
            About Me
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column: Services Grid */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Technical Arsenal
              </h3>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  custom={index}
                  whileHover="hover"
                  initial="rest"
                >
                  <Card className="h-full p-5 bg-card/10 backdrop-blur-sm border-white/5 hover:border-primary/20 transition-colors duration-300 overflow-hidden group relative">
                    <motion.div variants={cardHoverVariants} className="relative z-10 h-full flex flex-col">
                      <div className="bg-primary/10 w-fit p-3 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{service.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </motion.div>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Journey & Stats */}
          <div className="space-y-8 lg:pt-12">
            <motion.div variants={itemVariants} className="bg-card/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              <h3 className="text-2xl font-semibold mb-6">My Journey</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed relative z-10">
                <p>
                  I'm a <span className="text-foreground font-medium border-b border-primary/30">BCA (Hons.) in Data Science</span> graduate, passionate about turning complex data into actionable intelligence. My core stack is <span className="text-foreground">Python, SQL, EDA, and Data Visualization</span> — with deep hands-on experience in Machine Learning, Deep Learning, and Generative AI.
                </p>
                <p>
                  I've built systems using <span className="text-primary font-medium">LLaMA, Stable Diffusion, NLP pipelines</span>, and deployed applications end-to-end. Key projects include <strong>CONTRA</strong> (ensemble ML), <strong>ORBITUNE</strong> (AI-powered NLP system), and a <strong>Reservoir Forecasting</strong> platform.
                </p>
                <p>
                  Completed a <span className="text-foreground font-medium">Data Science Internship</span> and participated in the <strong>Tata iQ / Forage</strong> simulation.
                </p>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
                {skills.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="text-xs font-mono px-3 py-1.5 rounded-full bg-primary/5 text-primary/80 border border-primary/20"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(var(--primary), 0.15)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(var(--primary), 0.3)" }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/30 to-card/10 border border-white/5 text-center group cursor-default"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">
                    <AnimatedCounter target={stat.value as number} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-foreground/60 font-medium uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
