import { useEffect, useRef } from "react";
import { Award, ExternalLink, ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import oracleImg from "@/assets/OCI AI FUNDAMENTALS.png";
import nvidiaImg from "@/assets/NVIDIA.png";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ── Certification data ─────────────────────────────────────── */
const certifications = [
    {
        title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
        issuer: "Oracle",
        date: "Nov 2025",
        tags: ["OCI AI Portfolio", "OCI Generative AI", "OCI AI Services", "Machine Learning", "Deep Learning", "Large Language Models"],
        credentialId: "OCI25AICFA",
        imageUrl: oracleImg,
        link: null,
        accent: "#C74634",
    },
    {
        title: "Nvidia — AI Infrastructure and Operations Fundamentals",
        issuer: "Coursera",
        date: "Jul 2025",
        tags: ["Generative AI", "Artificial Intelligence", "Machine Learning", "LLMs", "Deep Learning", "PyTorch"],
        credentialId: "8SHL514U9R5G",
        imageUrl: nvidiaImg,
        link: null,
        accent: "#76B900",
    },
    {
        title: "Microsoft Azure AI Fundamentals (AI-900)",
        issuer: "Udemy",
        date: "2025",
        tags: ["Azure Cognitive Services", "Azure Machine Learning", "Azure Bot Service", "Generative AI"],
        credentialId: "UC-acc18b14-44eb-455b-845d-8fab2b519389",
        imageUrl: null,
        link: "https://www.udemy.com/certificate/UC-acc18b14-44eb-455b-845d-8fab2b519389/",
        accent: "#0078D4",
    },
    {
        title: "AI for Business Professionals",
        issuer: "HP LIFE",
        date: "2025",
        tags: ["Generative AI Tools", "Standalone AI Tools", "Integrated AI Features"],
        credentialId: "dbba0a9d-68fb-4e7f-b550-b4ae03e7317c",
        imageUrl: null,
        link: "https://www.life-global.org/certificate/dbba0a9d-68fb-4e7f-b550-b4ae03e7317c",
        accent: "#0096D6",
    },
];

/* ── Light-box helper ───────────────────────────────────────── */
function openLightbox(imageUrl: string) {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9998;display:flex;align-items:center;justify-content:center;";
    const img = document.createElement("img");
    img.src = imageUrl;
    img.style.cssText = "max-width:92%;max-height:88vh;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.6);object-fit:contain;";
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "✕";
    closeBtn.style.cssText = "position:absolute;top:20px;right:20px;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.2);color:#fff;border-radius:50%;width:44px;height:44px;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;";
    const close = () => { document.body.removeChild(overlay); document.body.style.overflow = ""; };
    closeBtn.onclick = close;
    overlay.onclick = (e) => { if (e.target === overlay) close(); };
    overlay.appendChild(img);
    overlay.appendChild(closeBtn);
    document.body.style.overflow = "hidden";
    document.body.appendChild(overlay);
}

/* ── Certifications ─────────────────────────────────────────── */
const Certifications = () => {
    const sectionRef = useRef<HTMLElement>(null);

    /* GSAP — only heading; cards use Framer Motion whileInView */
    useEffect(() => {
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced || !sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(".cert-heading", {
                y: 55, opacity: 0, duration: 0.85, ease: "power3.out",
                scrollTrigger: { trigger: ".cert-heading", start: "top 88%", once: true },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="certifications" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 relative">
                {/* Heading */}
                <div className="cert-heading text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Certifications</h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-4" />
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Professional certifications and achievements in data science and AI
                    </p>
                </div>

                {/* Cards — ONLY Framer Motion controls visibility */}
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                    {certifications.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
                            whileHover={{
                                y: -8,
                                boxShadow: `0 24px 48px ${cert.accent}30`,
                                borderColor: cert.accent,
                            }}
                            style={{ borderRadius: "0.75rem" }}
                        >
                            <Card
                                className="p-6 space-y-4 transition-colors duration-300 bg-card/20 backdrop-blur border-border/50 group cursor-pointer h-full"
                                onClick={() => {
                                    if (cert.link) { window.open(cert.link, "_blank"); return; }
                                    if (cert.imageUrl) openLightbox(cert.imageUrl);
                                }}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <motion.div
                                        className="p-3 rounded-xl flex-shrink-0"
                                        style={{ background: `${cert.accent}18` }}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    >
                                        <Award className="w-6 h-6" style={{ color: cert.accent }} />
                                    </motion.div>

                                    <div className="flex-1 min-w-0">
                                        {/* Title row */}
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className="text-base sm:text-lg font-semibold group-hover:text-primary transition-colors duration-300 leading-snug">
                                                {cert.title}
                                            </h3>
                                            {cert.link ? (
                                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                                            ) : cert.imageUrl ? (
                                                <ImageIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                                            ) : null}
                                        </div>

                                        {/* Meta */}
                                        <p className="text-muted-foreground text-sm mb-1 font-medium">
                                            {cert.issuer} · {cert.date}
                                        </p>
                                        <p className="text-xs text-muted-foreground/50 font-mono mb-3 truncate">
                                            ID: {cert.credentialId}
                                        </p>

                                        {/* Skill tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {cert.tags.map((tag, ti) => (
                                                <motion.div
                                                    key={tag}
                                                    initial={{ opacity: 0, scale: 0.75 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.08 + ti * 0.05, duration: 0.35, ease: EASE }}
                                                    whileHover={{ scale: 1.1, y: -2 }}
                                                >
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs transition-colors cursor-default"
                                                        style={{ borderColor: `${cert.accent}40` }}
                                                    >
                                                        {tag}
                                                    </Badge>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
