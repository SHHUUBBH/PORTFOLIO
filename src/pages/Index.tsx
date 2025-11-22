import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingLines from "@/components/FloatingLines";

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
    // Set dark mode by default
    document.documentElement.classList.add("dark");
  }, []);

  const enabledWaves = [
    backgroundConfig.enableTop && 'top',
    backgroundConfig.enableMiddle && 'middle',
    backgroundConfig.enableBottom && 'bottom',
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-background relative">
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
          <Certifications />
          <Projects />
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
