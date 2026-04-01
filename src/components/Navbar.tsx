import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    if (to.startsWith("/#")) return location.pathname === "/" && location.hash === `#${to.replace("/#", "")}`;
    return location.pathname.startsWith(to);
  };

  const handleNavClick = (to: string) => {
    setOpen(false);
    if (to.startsWith("/#")) {
      const id = to.replace("/#", "");
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="bg-background/90 backdrop-blur-xl border border-border rounded-full px-4 sm:px-6 md:px-8 flex items-center justify-between h-12 sm:h-14 w-full max-w-3xl shadow-sm">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-0.5 shrink-0">
          <span className="font-bold text-lg text-foreground">Girona</span>
          <span className="font-bold text-lg text-primary">.ai</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => handleNavClick(link.to)}
              className={`text-sm font-medium transition-colors ${
                isActive(link.to)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            to="/blog"
            className="inline-flex items-center px-5 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start Exploring
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-16 left-4 right-4 md:hidden bg-background border border-border rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => handleNavClick(link.to)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/blog"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-foreground text-background text-sm font-medium"
              >
                Start Exploring
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
