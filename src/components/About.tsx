import { Brain, BarChart3, Server } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const services = [
    {
      icon: Brain,
      title: "ML Models",
      description: "Building and deploying machine learning models",
    },
    {
      icon: BarChart3,
      title: "EDA",
      description: "Exploratory Data Analysis and visualization",
    },
    {
      icon: Server,
      title: "Deployment",
      description: "End-to-end model deployment solutions",
    },
  ];

  const stats = [
    { value: "7+", label: "Projects" },
    { value: "95%", label: "Client satisfaction" },
    { value: "Fresher" },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-2xl font-semibold mb-6 text-foreground/90">What I Do</h3>
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-6 flex items-start gap-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-card/20 backdrop-blur border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="animate-fade-in space-y-8">
            <div className="bg-card/20 backdrop-blur border border-border/50 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I hold a BCA (Hons.) in Data Science and specialize in Python, machine learning, and
                generative AI. Through rigorous training and hands-on projects, I've honed my skills
                in building intelligent systems that solve real-world problems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My passion lies in transforming data into actionable insights and creating AI solutions
                that make a difference.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 md:p-6 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
