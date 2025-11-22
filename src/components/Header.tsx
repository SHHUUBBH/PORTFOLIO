import { useState, useEffect } from "react";
import CustomizePanel from "./CustomizePanel";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  backgroundConfig: any;
  onBackgroundConfigChange: (config: any) => void;
}

const Header = ({ backgroundConfig, onBackgroundConfigChange }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-transparent"
        }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
        <div className="text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors duration-300 cursor-pointer">
          Subhro Pal
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-8">
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="relative text-foreground/80 hover:text-primary transition-colors duration-300 font-medium group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              </li>
            ))}
          </ul>
          <CustomizePanel
            config={backgroundConfig}
            onConfigChange={onBackgroundConfigChange}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50">
          <ul className="container mx-auto px-4 py-4 space-y-2">
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-3 px-4 text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300 font-medium"
                >
                  {item}
                </button>
              </li>
            ))}
            <li className="pt-2">
              <CustomizePanel
                config={backgroundConfig}
                onConfigChange={onBackgroundConfigChange}
              />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
