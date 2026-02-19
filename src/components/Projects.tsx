import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ArrowRight } from "lucide-react";
import contraImage from "@/assets/homepage.png";
import orbituneImage from "@/assets/project-orbitune.png";
import reservoirImage from "@/assets/project-reservoir.png";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Variants ───────────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const badgeVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.1, transition: { type: "spring" as const, stiffness: 400, damping: 17 } },
};

/* ── Magnetic CTA ───────────────────────────────────────────── */
function MagneticCTA({ href }: { href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: springX, y: springY, display: "inline-flex" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.05 }}
      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow-lg hover:shadow-primary/40 hover:shadow-xl transition-shadow duration-300"
    >
      <Github className="w-5 h-5" />
      Explore More on GitHub
      <motion.span
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowRight className="w-5 h-5" />
      </motion.span>
    </motion.a>
  );
}

/* ── Projects ───────────────────────────────────────────────── */
const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: "CONTRA",
      description:
        "Advanced ML classification and prediction system built with ensemble methods and deep learning. Combines gradient boosting, random forests, and neural network architectures for high-accuracy real-world predictions.",
      image: contraImage,
      tags: ["Python", "TensorFlow", "scikit-learn", "EDA"],
      github: "https://github.com/SHHUUBBH/CONTRA",
    },
    {
      title: "ORBITUNE",
      description:
        "AI-powered music & content discovery system leveraging LLaMA and neural networks for natural language understanding, personalised recommendations, and generative NLP responses.",
      image: orbituneImage,
      tags: ["LLaMA", "NLP", "PyTorch", "HuggingFace"],
      github: "https://github.com/SHHUUBBH/ORBITUNE",
    },
    {
      title: "Reservoir Forecasting",
      description:
        "Predictive analytics platform using time-series analysis and ML models to forecast Chhattisgarh reservoir performance metrics — visualised via interactive Power BI dashboards.",
      image: reservoirImage,
      tags: ["Power BI", "SQL", "Python", "Time Series"],
      github: "https://github.com/SHHUUBBH/Chhattisgarh-Water-Model",
    },
  ];

  /* No GSAP on cards — only heading reveal via Framer Motion */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !sectionRef.current) return;
    // Minimal GSAP context — only for any non-card elements if needed
    return;
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative">
        {/* Heading — Framer Motion only */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Explore my latest work in machine learning, AI, and data science
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <MagneticCTA href="https://github.com/SHHUUBBH" />
        </div>
      </div>
    </section>
  );
};

/* ── ProjectCard ────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: { title: string; description: string; image: string; tags: string[]; github: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: x * 10, rotateX: -y * 10, duration: 0.3,
      ease: "power2.out", transformPerspective: 1000,
    });
  };
  const handleLeave = () => {
    gsap.to(cardRef.current, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <Card
        ref={cardRef}
        className="group overflow-hidden hover:shadow-2xl hover:shadow-primary/15 transition-all duration-500 bg-card/20 backdrop-blur border-border/50 hover:border-primary/40 cursor-pointer"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Image with parallax overlay */}
        <div className="aspect-video overflow-hidden bg-secondary/10 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Animated tech badges */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <motion.div key={tag} variants={badgeVariants} initial="rest" whileHover="hover">
                <Badge
                  variant="secondary"
                  className="text-xs hover:bg-primary/20 transition-colors cursor-default"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* GitHub only */}
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              variant="default"
              className="flex-1 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
              onClick={() => window.open(project.github, "_blank")}
              disabled={project.github === "#"}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default Projects;
