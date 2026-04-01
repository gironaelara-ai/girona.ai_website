import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import gironaPhoto from "@/assets/girona-photo.webp";
import heroGradientBg from "@/assets/hero-gradient-bg.webp";

const HeroSection = () => {
  const [bgImage, setBgImage] = useState(heroGradientBg);
  const [profileImage, setProfileImage] = useState(gironaPhoto);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("key, value");
      if (data) {
        const settings = data.reduce((acc: any, item: any) => ({ ...acc, [item.key]: item.value }), {});
        if (settings.heroProfileImage) setProfileImage(settings.heroProfileImage);
        if (settings.heroImage) setBgImage(settings.heroImage);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="relative section-padding pt-28 sm:pt-32 md:pt-40 overflow-hidden">
      {/* Gradient background image */}
      <div className="absolute inset-0 -z-10 bg-background">
        <img
          src={bgImage}
          alt=""
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-primary font-semibold text-sm mb-3 flex items-center gap-2">
            <span className="w-6 h-[2px] bg-primary inline-block" aria-hidden="true" />
            Hello There!
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
            Stay Ahead with{" "}
            <span className="text-primary">Tech & AI</span> — Simplified
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-3 max-w-lg">
            I'm <strong className="text-foreground">Girona</strong> — I break down the latest tech news and AI concepts into simple, practical insights you can actually use.
          </p>
          <p className="text-muted-foreground text-sm mb-8 max-w-lg">
            From daily tech updates to easy-to-understand AI education, my goal is to help you stay informed without the overwhelm.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.instagram.com/girona_.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Follow on Instagram
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
            <button
              onClick={() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors bg-background/50 backdrop-blur-sm"
            >
              Explore Content
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20 card-shadow mx-auto">
              <img
                src={profileImage}
                alt="Girona - AI Creator"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-2 -right-2 bg-foreground text-background px-4 py-2 rounded-2xl text-xs font-medium"
            >
              AI Creator ✨
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
