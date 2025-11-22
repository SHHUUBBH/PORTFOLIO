import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        'service_v7ha69p',
        'template_pafdg2a',
        form,
        'Ds_HgD7n8ciT7qc5W'
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground text-base sm:text-lg px-4">
              Have a project in mind? Let's work together to bring your ideas to life.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 bg-card/20 backdrop-blur border border-border/50 rounded-lg p-4 sm:p-6 md:p-8 shadow-xl animate-scale-in">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground/90">Name</label>
              <Input
                id="name"
                type="text"
                name="from_name"
                placeholder="Your Name"
                required
                className="w-full h-12 transition-all duration-300 focus:scale-[1.02]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground/90">Email</label>
              <Input
                id="email"
                type="email"
                name="from_email"
                placeholder="your.email@example.com"
                required
                className="w-full h-12 transition-all duration-300 focus:scale-[1.02]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-foreground/90">Subject</label>
              <Input
                id="subject"
                type="text"
                name="subject"
                placeholder="Project Inquiry"
                required
                className="w-full h-12 transition-all duration-300 focus:scale-[1.02]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground/90">Message</label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                required
                className="w-full min-h-[150px] transition-all duration-300 focus:scale-[1.02]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
