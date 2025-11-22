import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import portraitImage from "@/assets/my profile.png";
import { SiPython, SiMysql, SiTensorflow, SiScikitlearn, SiHuggingface } from "react-icons/si";
import { FaBrain, FaChartBar } from "react-icons/fa";

const Hero = () => {
  const techStack = [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "SQL", icon: SiMysql, color: "#4479A1" },
    { name: "Power BI", icon: FaChartBar, color: "#F2C811" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
    { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
    { name: "LLaMA", icon: SiHuggingface, color: "#FFD21E" },
    { name: "Stable Diffusion", icon: FaBrain, color: "#9333EA" }
  ];
  return <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16 sm:pt-20">
    <div className="absolute inset-0 hero-gradient opacity-50"></div>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>

    <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
      <div className="space-y-6 sm:space-y-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-gray-100">
          Hello<span className="text-[#9500ff]">.</span>
          <br />
          I'm <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">Subhro Pal</span>
          <br />
          <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-[#7c00ff] font-extrabold [text-shadow:_-1px_-1px_0_white,_1px_-1px_0_white,_-1px_1px_0_white,_1px_1px_0_white]">
            ASPIRING DATA SCIENTIST
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({
            behavior: 'smooth'
          })}>
            Got a project?
          </Button>
          <Button size="lg" variant="outline" className="border-2 hover:bg-accent hover:scale-105 transition-all duration-300 w-full sm:w-auto">
            My resume
          </Button>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-3 font-medium">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Badge
                  key={tech.name}
                  variant="secondary"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-secondary/80 transition-all duration-300 hover:scale-105 cursor-default flex items-center gap-1.5"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: tech.color }} />
                  {tech.name}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Profile Image */}
      <div className="relative animate-scale-in hidden lg:block">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative w-full max-w-md mx-auto">
          <div className="aspect-square rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl hover:border-primary/50 transition-all duration-500 hover:scale-105">
            <img alt="Subhro Pal portrait" className="w-full h-full object-cover" src={portraitImage} />
          </div>
        </div>
      </div>

      {/* Mobile Profile Image */}
      <div className="relative animate-scale-in lg:hidden flex justify-center mt-8">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="relative w-48 h-48 sm:w-56 sm:h-56">
          <div className="aspect-square rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl">
            <img alt="Subhro Pal portrait" className="w-full h-full object-cover" src={portraitImage} />
          </div>
        </div>
      </div>
    </div>
  </section>;
};
export default Hero;