import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Facebook } from "lucide-react";
import { TikTokIcon, SnapchatIcon, XIcon, ThreadsIcon } from "./SocialIcons";

const Footer = () => {
  const [links, setLinks] = useState([
    { icon: Instagram, href: "https://www.instagram.com/girona_.ai/", label: "Instagram", key: "instagramUrl" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", key: "facebookUrl" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube", key: "youtubeUrl" },
    { icon: XIcon, href: "https://x.com", label: "X", key: "xUrl" },
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
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="bg-secondary border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Logo & Brand Description */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-0.5">
              <span className="font-bold text-3xl text-foreground">Girona</span>
              <span className="font-bold text-3xl text-primary">.ai</span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-md">
              Girona AI is a public education campaign by{" "}
              <a 
                href="https://oyik.ai/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Oyik AI
              </a>{" "}
              — AI automation agency, London, UK.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                {links.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-colors"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Vertical Navigation */}
          <div className="flex flex-col gap-4 items-center md:items-center">
            <nav className="flex flex-col gap-4 text-sm font-medium">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Right Column - Contact & Socials */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Contact Us</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Email</p>
                    <a href="mailto:gironaelara@gmail.com" className="text-sm text-foreground hover:text-primary transition-colors">
                      gironaelara@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Phone</p>
                    <a href="tel:+447352328646" className="text-sm text-foreground hover:text-primary transition-colors">
                      +44 7352 328646
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Location</p>
                    <p className="text-sm text-foreground">
                      OYIK LTD, 124 CITY ROAD LONDON, EC1V 2NX
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Simplified */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-center">
          <p className="text-xs text-muted-foreground">© 2026 Girona. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
