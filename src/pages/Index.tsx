import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
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

/* ── Scroll Progress Bar ────────────────────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 via-primary to-violet-400 z-[9999] shadow-[0_0_10px_rgba(149,0,255,0.8)]"
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
  }, []);

  const enabledWaves = [
    backgroundConfig.enableTop && 'top',
    backgroundConfig.enableMiddle && 'middle',
    backgroundConfig.enableBottom && 'bottom',
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-background relative">
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
