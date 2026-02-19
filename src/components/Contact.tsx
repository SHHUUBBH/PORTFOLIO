import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Mail, Github, Linkedin, Sparkles } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";

gsap.registerPlugin(ScrollTrigger);

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/SHHUUBBH", color: "#D0D0D0" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/subhro-pal-b7055a257/", color: "#0A66C2" },
  { icon: Mail, label: "Email", href: "mailto:subhropal27@gmail.com", color: "#EA4335" },
];

const formFields = [
  { id: "name", name: "from_name", label: "Name", placeholder: "Your Name", type: "text", required: true },
  { id: "email", name: "from_email", label: "Email", placeholder: "your.email@example.com", type: "email", required: true },
  { id: "subject", name: "subject", label: "Subject", placeholder: "Project Inquiry", type: "text", required: true },
];

/* ── Contact ──────────────────────────────────────────────── */
const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* GSAP heading reveal */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-heading", {
        y: 60, opacity: 0, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: ".contact-heading", start: "top 88%", once: true },
      });
      gsap.from(".contact-social-item", {
        x: -40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".bg-card\/20", start: "top 85%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);
    try {
      await emailjs.sendForm("service_v7ha69p", "template_pafdg2a", form, "Ds_HgD7n8ciT7qc5W");
      toast({ title: "Message sent! ✓", description: "Thank you for reaching out. I'll get back to you soon." });
      form.reset();
    } catch {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionReveal>
      <section ref={sectionRef} id="contact" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        {/* Ambient glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative">
          {/* Heading */}
          <div className="contact-heading text-center mb-12 sm:mb-16">
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              Get In Touch
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-primary mx-auto mb-4"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            />
            <motion.p
              className="text-muted-foreground text-base sm:text-lg px-4 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            >
              Have a project in mind? Let's work together to bring your ideas to life.
            </motion.p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6 sm:gap-10 items-start">
            {/* ── Left info panel ───────────────────────────────── */}
            <motion.div
              className="md:col-span-2 space-y-8 order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              <div className="bg-card/20 backdrop-blur border border-border/50 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="text-primary w-6 h-6" />
                  </motion.div>
                  <h3 className="text-xl font-semibold">Let's Connect</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I'm always open to discussing new opportunities, interesting data science problems, or just a good conversation about AI and tech.
                </p>

                {/* Availability badge */}
                <div className="flex items-center gap-2">
                  <motion.span
                    className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                  <span className="text-sm text-emerald-400 font-medium">Available for work</span>
                </div>

                {/* Social links */}
                <div className="space-y-3 pt-2">
                  {socials.map(({ icon: Icon, label, href, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group contact-social-item"
                      whileHover={{ x: 6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:shadow-lg"
                        style={{ background: `${color}18` }}
                      >
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-sm font-medium">{label}</span>
                      <motion.span
                        className="ml-auto opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Right form ────────────────────────────────────── */}
            <motion.form
              onSubmit={handleSubmit}
              className="md:col-span-3 space-y-5 bg-card/20 backdrop-blur border border-border/50 rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl order-2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: EASE }}
            >
              {formFields.map((field, i) => (
                <motion.div
                  key={field.id}
                  className="space-y-1.5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.15, duration: 0.5, ease: EASE }}
                >
                  <label htmlFor={field.id} className="text-sm font-medium text-foreground/80">
                    {field.label}
                  </label>
                  <div className="relative">
                    <Input
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full h-12 bg-background/50 border-border/60 focus:border-primary/60 transition-all duration-300"
                      onFocus={() => setFocusedField(field.id)}
                      onBlur={() => setFocusedField(null)}
                    />
                    {focusedField === field.id && (
                      <motion.div
                        layoutId="input-focus"
                        className="absolute inset-0 rounded-md border-2 border-primary/50 pointer-events-none"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Message textarea */}
              <motion.div
                className="space-y-1.5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
              >
                <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
                <div className="relative">
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    className="w-full min-h-[140px] bg-background/50 border-border/60 focus:border-primary/60 transition-all duration-300 resize-none"
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                  />
                  {focusedField === "message" && (
                    <motion.div
                      layoutId="input-focus"
                      className="absolute inset-0 rounded-md border-2 border-primary/50 pointer-events-none"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/40 hover:shadow-xl transition-all duration-300 gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
};

export default Contact;
