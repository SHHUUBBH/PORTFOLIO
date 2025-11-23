import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import contraImage from "@/assets/homepage.png";
import orbituneImage from "@/assets/project-orbitune.png";
import reservoirImage from "@/assets/project-reservoir.png";

const Projects = () => {
  const projects = [
    {
      title: "CONTRA",
      description:
        "Advanced ML model for classification and prediction tasks using ensemble methods and deep learning techniques.",
      image: contraImage,
      tags: ["Python", "TensorFlow", "scikit-learn"],
      github: "https://github.com/SHHUUBBH/CONTRA",
      live: "#",
    },
    {
      title: "ORBITUNE",
      description:
        "AI-powered system leveraging LLaMA and neural networks for natural language understanding and generation.",
      image: orbituneImage,
      tags: ["LLaMA", "NLP", "PyTorch"],
      github: "#",
      live: "#",
    },
    {
      title: "Reservoir Forecasting",
      description:
        "Predictive analytics platform using time-series analysis and ML models to forecast reservoir performance metrics.",
      image: reservoirImage,
      tags: ["Power BI", "SQL", "Python"],
      github: "https://github.com/SHHUUBBH/Chhattisgarh-Water-Model",
      live: "https://chhattisgarh-water-model-kkrpl4qikbkbkwepashpkb.streamlit.app/#2024-forecast-vs-actual-storage",
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
            Explore my latest work in machine learning, AI, and data science
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 animate-scale-in bg-card/20 backdrop-blur border-border/50 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video overflow-hidden bg-secondary/10 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs hover:bg-primary/20 transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    size="sm"
                    variant="default"
                    className="flex-1 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                    onClick={() => window.open(project.github, '_blank')}
                    disabled={project.github === '#'}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 hover:bg-accent hover:scale-105 transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
