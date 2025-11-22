import { Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import deloitteImg from "@/assets/DELOITTE.png";
import oracleImg from "@/assets/OCI AI FUNDAMENTALS.png";
import nvidiaImg from "@/assets/NVIDIA.png";

const Certifications = () => {
    const certifications = [
        {
            title: "Deloitte Australia - Data Analytics Job Simulation",
            issuer: "Forage",
            date: "Nov 2025",
            tags: ["Data Analysis"],
            credentialId: "YwLpTiq2Pz3Lpd88n",
            imageUrl: deloitteImg,
        },
        {
            title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
            issuer: "Oracle",
            date: "Nov 2025",
            tags: ["OCI AI Portfolio", "OCI Generative AI Service", "OCI AI Services", "Machine Learning", "Deep Learning", "AI Foundation", "Artificial Intelligence (AI)", "Large Language Models (LLM)"],
            credentialId: "OCI25AICFA",
            imageUrl: oracleImg,
        },
        {
            title: "Nvidia - AI Infrastructure and Operations Fundamentals",
            issuer: "Coursera",
            date: "Jul 2025",
            tags: ["Generative AI", "Artificial Intelligence (AI)", "Machine Learning", "Large Language Models (LLM)", "Deep Learning", "Data Centers", "Artificial Neural Networks", "PyTorch (Machine Learning Library)"],
            credentialId: "8SHL514U9R5G",
            imageUrl: nvidiaImg,
        },
    ];

    const handleCardClick = (imageUrl: string) => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.cssText = 'max-width:95%;max-height:90vh;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10000;border-radius:8px;box-shadow:0 10px 50px rgba(0,0,0,0.5);object-fit:contain;';

        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:9998;';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = 'position:fixed;top:20px;right:20px;z-index:10001;background:white;border:none;border-radius:50%;width:40px;height:40px;font-size:24px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,0.3);';

        const closePreview = () => {
            document.body.removeChild(img);
            document.body.removeChild(overlay);
            document.body.removeChild(closeBtn);
            document.body.style.overflow = '';
        };

        closeBtn.onclick = closePreview;
        overlay.onclick = closePreview;

        document.body.style.overflow = 'hidden';
        document.body.appendChild(overlay);
        document.body.appendChild(img);
        document.body.appendChild(closeBtn);
    }; return (
        <section id="certifications" className="py-16 sm:py-24 md:py-32 relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

            <div className="container mx-auto px-4 sm:px-6 relative">
                <div className="text-center mb-12 sm:mb-16 animate-fade-in">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Certifications</h2>
                    <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                        Professional certifications and achievements in data science and AI
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
                    {certifications.map((cert, index) => (
                        <Card
                            key={index}
                            className="p-6 space-y-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-card/20 backdrop-blur border-border/50 group cursor-pointer"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => handleCardClick(cert.imageUrl)}
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Award className="w-6 h-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                                        {cert.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-2">
                                        {cert.issuer} • {cert.date}
                                    </p>
                                    <p className="text-xs text-muted-foreground/70 font-mono mb-3">
                                        ID: {cert.credentialId}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {cert.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="text-xs hover:bg-primary/20 transition-colors"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
