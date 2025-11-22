import { Mail, Github, Linkedin } from "lucide-react";
const Footer = () => {
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=shubhropal62@gmail.com', '_blank');
  };

  return <footer className="py-12 sm:py-16 bg-gradient-to-t from-card to-background border-t border-border/50">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center space-y-4 sm:space-y-6">
        <p className="text-xl sm:text-2xl font-bold text-foreground">Subhro Pal</p>
        <p className="text-sm sm:text-base text-muted-foreground">
          Aspiring Data Scientist
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          All rights reserved © 2025
        </p>

        <div className="flex justify-center gap-3 sm:gap-4 pt-4">
          <button onClick={handleEmailClick} className="group bg-background/10 p-3 sm:p-4 rounded-full hover:bg-primary/20 transition-all duration-300 hover:scale-110 border border-border/50" aria-label="Email">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" />
          </button>
          <a href="https://github.com/SHHUUBBH" target="_blank" rel="noopener noreferrer" className="group bg-background/10 p-3 sm:p-4 rounded-full hover:bg-primary/20 transition-all duration-300 hover:scale-110 border border-border/50" aria-label="GitHub">
            <Github className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" />
          </a>
          <a href="https://www.linkedin.com/in/subhro-pal-b00a60356" target="_blank" rel="noopener noreferrer" className="group bg-background/10 p-3 sm:p-4 rounded-full hover:bg-primary/20 transition-all duration-300 hover:scale-110 border border-border/50" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" />
          </a>
        </div>
      </div>
    </div>
  </footer>;
};
export default Footer;