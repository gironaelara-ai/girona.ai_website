import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Linkedin, Facebook } from "lucide-react";
import { TikTokIcon, SnapchatIcon, XIcon, ThreadsIcon } from "./SocialIcons";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const ContactFormSection = () => {
  const [links, setLinks] = useState([
    { icon: Instagram, href: "https://www.instagram.com/girona_.ai/", label: "Instagram", key: "instagramUrl" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", key: "facebookUrl" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube", key: "youtubeUrl" },
    { icon: XIcon, href: "https://x.com", label: "X (Twitter)", key: "xUrl" },
    { icon: ThreadsIcon, href: "https://threads.net", label: "Threads", key: "threadsUrl" },
    { icon: TikTokIcon, href: "https://tiktok.com", label: "TikTok", key: "tiktokUrl" },
    { icon: SnapchatIcon, href: "https://snapchat.com", label: "Snapchat", key: "snapchatUrl" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", key: "linkedinUrl" },
  ]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      const { data } = await supabase.from("site_settings").select("key, value");
      if (data) {
        const settings = data.reduce((acc: any, item: any) => ({ ...acc, [item.key]: item.value }), {});
        setLinks(prev => prev.map(link => ({
          ...link,
          href: settings[link.key] || link.href
        })));
      }
    };
    fetchSocialLinks();
  }, []);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.from("contacts").insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }
      ]);

      if (error) throw error;
      
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
        >
          {/* Left side - heading & description */}
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Contact Us
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Questions?<br />
              Get in <span className="text-primary">touch!</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md">
              Have questions or ready to get started? Get in touch with Girona.ai today and let's build smarter solutions together.
            </p>
            <div className="flex items-center gap-3 pt-2">
                {links.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`rounded-full flex items-center justify-center transition-all ${
                      label === "Threads" 
                      ? "w-10 h-10 hover:scale-110" 
                      : "w-10 h-10 bg-primary text-primary-foreground hover:opacity-80"
                    }`}
                  >
                    {label === "Threads" ? (
                      <img src="/threads-icon.png" alt="Threads" className="w-full h-full rounded-full" />
                    ) : label === "Snapchat" ? (
                      <img src="/snapchat-contact-icon.png" alt="Snapchat" className="w-full h-full rounded-full" />
                    ) : (
                      <Icon size={20} />
                    )}
                  </a>
                ))}
            </div>
          </div>

          {/* Right side - form */}
          <form onSubmit={handleSubmit} className="space-y-5" aria-label="Home contact form">
            <div>
              <label htmlFor="home-name" className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2 block">Name</label>
              <input
                id="home-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
                autoComplete="name"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
            <div>
              <label htmlFor="home-email" className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2 block">Email</label>
              <input
                id="home-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
            <div>
              <label htmlFor="home-phone" className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2 block">Phone</label>
              <input
                id="home-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 12345 67890"
                autoComplete="tel"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
            <div>
              <label htmlFor="home-message" className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2 block">Message</label>
              <textarea
                id="home-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFormSection;
