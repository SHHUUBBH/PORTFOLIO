import { useState, useEffect } from "react";
import CustomizePanel from "./CustomizePanel";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  backgroundConfig: any;
  onBackgroundConfigChange: (config: any) => void;
}

const NAV_ITEMS = ["Home", "About", "Projects", "Certifications", "Contact"];

const Header = ({ backgroundConfig, onBackgroundConfigChange }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobile] = useState(false);
  const [activeSection, setActive] = useState("home");

  /* Track scroll depth + active section via IntersectionObserver */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.toLowerCase());
    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobile(false);
  };

  /* Logo letter animation */
  const logoLetters = "Subhro Pal".split("");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
        {/* Animated logo */}
        <motion.div
          className="text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer flex overflow-hidden"
          onClick={() => scrollToSection("home")}
          title="Back to top"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {logoLetters.map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ color: "#9500ff", y: -2, transition: { duration: 0.15 } }}
              className="inline-block"
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden md:flex items-center gap-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ul className="flex gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <li key={item} className="relative">
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="relative py-1 px-1 font-medium transition-colors duration-300"
                    style={{ color: isActive ? "#9500ff" : undefined }}
                  >
                    <span className={`transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground/75 hover:text-primary"}`}>
                      {item}
                    </span>
                    {/* Active underline indicator with layoutId for smooth transition */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        style={{ boxShadow: "0 0 8px rgba(149,0,255,0.8)" }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <CustomizePanel config={backgroundConfig} onConfigChange={onBackgroundConfigChange} />
        </motion.div>

        {/* Mobile menu button */}
        <motion.button
          onClick={() => setMobile(!mobileMenuOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-background/97 backdrop-blur-xl border-t border-border/50 overflow-hidden"
          >
            <ul className="container mx-auto px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-300 ${activeSection === item.toLowerCase()
                        ? "text-primary bg-primary/10"
                        : "text-foreground/75 hover:text-primary hover:bg-primary/5"
                      }`}
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
              <motion.li className="pt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <CustomizePanel config={backgroundConfig} onConfigChange={onBackgroundConfigChange} />
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
