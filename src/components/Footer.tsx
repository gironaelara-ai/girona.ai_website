import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Instagram, Youtube, Twitter, Linkedin } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/girona_.ai/", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="bg-secondary border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-0.5 shrink-0">
            <span className="font-bold text-lg text-foreground">Girona</span>
            <span className="font-bold text-lg text-primary">.ai</span>
          </Link>
          <nav aria-label="Footer navigation" className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
          </nav>
          <p className="text-xs text-muted-foreground">© 2026 Girona. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
