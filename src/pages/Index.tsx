import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingLines from "@/components/FloatingLines";
import BackToTop from "@/components/BackToTop";

gsap.registerPlugin(ScrollToPlugin);

/* ── Scroll Progress Bar ────────────────────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-primary to-fuchsia-500 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

const Index = () => {
  const [backgroundConfig, setBackgroundConfig] = useState({
    enableTop: true,
    enableMiddle: true,
    enableBottom: true,
    lineCount: 5,
    lineDistance: 5,
    bendRadius: 5.0,
    bendStrength: -0.5,
  });

  useEffect(() => {
    document.documentElement.classList.add("dark");

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP ScrollTo for Anchor Links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.hash.startsWith("#") && anchor.origin === window.location.origin) {
        e.preventDefault();
        const targetId = anchor.hash.substring(1);
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          gsap.to(window, {
            scrollTo: { y: targetElem, offsetY: 80 }, // Offset for sticky header
            duration: 1.5,
            ease: "power4.inOut"
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  const enabledWaves = [
    backgroundConfig.enableTop && 'top',
    backgroundConfig.enableMiddle && 'middle',
    backgroundConfig.enableBottom && 'bottom',
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/30">
      {/* Floating back-to-top button */}
      <BackToTop />
      {/* Scroll progress bar */}
      <ScrollProgressBar />

      <div className="fixed inset-0 z-[1]">
        <FloatingLines
          enabledWaves={enabledWaves}
          lineCount={backgroundConfig.lineCount}
          lineDistance={backgroundConfig.lineDistance}
          bendRadius={backgroundConfig.bendRadius}
          bendStrength={backgroundConfig.bendStrength}
          interactive={true}
          parallax={true}
        />
      </div>
      <div className="relative z-[2] pointer-events-none">
        <div className="pointer-events-auto">
          <Header
            backgroundConfig={backgroundConfig}
            onBackgroundConfigChange={setBackgroundConfig}
          />
        </div>
        <main className="pointer-events-auto">
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <div className="pointer-events-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
