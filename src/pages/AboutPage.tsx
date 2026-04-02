import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContactFormSection from "@/components/ContactFormSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const AboutPage = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "about_faqs").single();
      if (data && data.value) {
        try {
          setFaqs(JSON.parse(data.value));
        } catch (e) {
          console.error("Error parsing about FAQs", e);
        }
      }
    };
    fetchFaqs();
  }, []);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Girona AI",
    description:
      "Girona AI is the public education campaign of Oyik AI — making artificial intelligence accessible for everyone.",
    mainEntity: {
      "@type": "Organization",
      name: "Girona AI",
      description:
        "Public education campaign by Oyik AI covering AI news, trends, tools, and breakthroughs.",
      url: "https://www.instagram.com/girona_.ai/",
      parentOrganization: {
        "@type": "Organization",
        name: "Oyik AI",
        url: "https://oyik.ai",
      },
    },
  };

  const contentPillars = [
    {
      title: "Breaking News",
      desc: "New model releases, research breakthroughs, regulatory changes, and industry shifts — covered as they happen, with context that matters.",
    },
    {
      title: "Trend Analysis",
      desc: "We go beyond the headline — explaining the forces behind emerging AI patterns and what they signal for businesses, careers, and everyday life.",
    },
    {
      title: "Tools & Products",
      desc: "Honest, accessible coverage of AI-powered platforms transforming how people work, create, and communicate.",
    },
    {
      title: "Big Picture",
      desc: "Thoughtful exploration of where AI is taking us — ethically, economically, and socially.",
    },
  ];

  const missions = [
    {
      label: "Educate",
      desc: "Demystify AI for everyone — translating dense technical breakthroughs into plain language any reader can absorb.",
    },
    {
      label: "Inform",
      desc: "Report on what actually matters — curating only developments with genuine real-world impact.",
    },
    {
      label: "Empower",
      desc: "Prepare you for what is coming — giving every reader the foundation to navigate the AI era with confidence.",
    },
  ];

  const audiences = [
    "Business owners",
    "Operations managers",
    "Startup founders",
    "Marketing professionals",
    "Product & tech teams",
    "Students & researchers",
    "HR & people teams",
    "The simply curious",
  ];

  const standards = [
    {
      title: "Accuracy before speed",
      desc: "We verify before we publish. Credibility is our most important asset.",
    },
    {
      title: "No assumed knowledge",
      desc: "Every piece is written for someone encountering the topic for the first time. We never use jargon without explanation.",
    },
    {
      title: "Transparent about our origins",
      desc: "Girona AI is openly a campaign of Oyik AI. Our industry expertise is an asset — not a conflict of interest.",
    },
    {
      title: "Consistent and reliable",
      desc: "We publish daily, maintaining a standard our audience can depend on.",
    },
  ];

  const timeline = [
    {
      title: "Girona AI Launches",
      desc: "Launched on Instagram as a dedicated public education campaign — publishing daily content on AI news, trends, and breakthroughs.",
    },
    {
      title: "Growing Community",
      desc: "An engaged audience of professionals, students, founders, and curious minds joins the campaign.",
    },
    {
      title: "Expanding to a Full Website",
      desc: "The campaign grows beyond Instagram with a dedicated website — extending reach and deepening content.",
    },
    {
      title: "Next: Newsletter, Deep Dives & More",
      desc: "Building towards a newsletter, long-form reports, and video content — establishing a leading independent voice in global AI media.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="About Girona AI — Public Education Campaign by Oyik AI"
        description="Girona AI is the public education campaign of Oyik AI — a UK-based AI automation company. Making AI accessible for everyone."
        canonical="https://girona-ai-portfolio.lovable.app/about"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="section-padding pt-28 sm:pt-32 md:pt-40">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <p className="text-primary font-semibold text-sm mb-2 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-primary inline-block" aria-hidden="true" />
              Oyik AI · Public Education Campaign
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              About <span className="text-primary">Girona AI</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl leading-relaxed">
              Where AI meets technology — explained for everyone.
            </p>
          </motion.div>

          {/* Intro card */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-card rounded-2xl p-6 sm:p-8 md:p-12 card-shadow mb-10 md:mb-14"
          >
            <p className="text-foreground text-base md:text-lg leading-relaxed mb-6">
              Girona AI is the public education campaign of{" "}
              <a
                href="https://oyik.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline"
              >
                Oyik AI
              </a>{" "}
              — a UK-based AI automation company. We exist to close the gap between complex
              artificial intelligence technology and the everyday people it is already affecting.
              No jargon. No hype. Just the developments that matter, made accessible.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { value: "Oyik AI", label: "Parent company" },
                { value: "@girona_.ai", label: "Instagram campaign" },
                { value: "Daily", label: "Publishing cadence" },
                { value: "Global", label: "Audience reach" },
              ].map((stat) => (
                <div key={stat.label} className="bg-secondary rounded-xl p-4">
                  <p className="text-foreground font-bold text-sm md:text-base">{stat.value}</p>
                  <p className="text-muted-foreground text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.article>

          {/* What Girona AI is */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              What Girona AI <span className="text-primary">Is</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-3xl leading-relaxed">
              A campaign born from real AI expertise. Girona AI is not a standalone media outlet — it is a deliberately
              built public education initiative created and operated by Oyik AI.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Oyik AI — The Company",
                  type: "AI automation technology",
                  desc: "Oyik AI builds intelligent automation systems and AI voice and chat agents for UK startups and SMEs — helping businesses eliminate manual work, streamline operations, and scale faster.",
                },
                {
                  title: "Girona AI — The Campaign",
                  type: "Public education initiative",
                  desc: "Girona AI is Oyik AI's public-facing education campaign — covering AI news, trends, tools, and breakthroughs for a general audience via Instagram and this website.",
                },
              ].map((card) => (
                <div key={card.title} className="bg-card rounded-2xl p-6 card-shadow">
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                    {card.type}
                  </p>
                  <h3 className="text-foreground font-bold text-lg mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Mission */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Our <span className="text-primary">Mission</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-3xl leading-relaxed">
              The world of artificial intelligence is moving faster than most people can follow. Girona AI was built
              with one clear purpose: make that world understandable — and keep you ahead of it.
            </p>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {missions.map((m, i) => (
                <motion.div
                  key={m.label}
                  variants={item}
                  className="bg-card rounded-2xl p-6 card-shadow"
                >
                  <span className="text-primary font-bold text-2xl mr-2">{i + 1}.</span>
                  <h3 className="text-foreground font-bold text-lg inline">{m.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-2">{m.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <blockquote className="border-l-4 border-primary bg-secondary rounded-r-2xl p-6 italic text-muted-foreground text-sm md:text-base leading-relaxed">
              "The tech revolution won't wait for you. Girona AI exists so that no one — regardless of their background
              or technical expertise — is left behind by the most significant shift of our generation."
              <footer className="mt-3 not-italic text-foreground font-semibold text-sm">
                — Oyik AI, on founding the Girona AI campaign
              </footer>
            </blockquote>
          </motion.section>

          {/* Content Pillars */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              What We <span className="text-primary">Cover</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              Four content pillars — one coherent purpose.
            </p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {contentPillars.map((pillar) => (
                <motion.div
                  key={pillar.title}
                  variants={item}
                  className="bg-card rounded-2xl p-6 card-shadow"
                >
                  <h3 className="text-foreground font-bold mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Powered by Oyik AI */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-6 sm:p-8 md:p-12 card-shadow mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Powered by <span className="text-primary">Oyik AI</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              Girona AI draws its credibility from Oyik AI's day-to-day work at the frontier of AI automation. Our
              content is grounded in firsthand technical expertise — not speculation or repurposed press releases.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Business Process Automation", link: "oyik.ai/workflow-automation" },
                { title: "AI Chatbots & Voice Agents", link: "oyik.ai/ai-voice-chat-agents" },
              ].map((s) => (
                <div key={s.title} className="bg-secondary rounded-xl p-5">
                  <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">
                    Core Service
                  </p>
                  <p className="text-foreground font-bold">{s.title}</p>
                  <a
                    href={`https://${s.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline"
                  >
                    {s.link}
                  </a>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Who This Is For */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Who This Is <span className="text-primary">For</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              Built for every level of AI literacy. No prior knowledge required.
            </p>
            <div className="flex flex-wrap gap-3">
              {audiences.map((a) => (
                <span
                  key={a}
                  className="bg-secondary text-foreground px-4 py-2 rounded-full text-sm font-medium"
                >
                  {a}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Editorial Standards */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Editorial <span className="text-primary">Standards</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              How we hold ourselves accountable.
            </p>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
            >
              {standards.map((s, i) => (
                <motion.div
                  key={s.title}
                  variants={item}
                  className="bg-card rounded-2xl p-6 card-shadow"
                >
                  <span className="text-primary font-bold text-lg">{i + 1}.</span>
                  <h3 className="text-foreground font-bold inline ml-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-2">{s.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Journey / Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 md:mb-14"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8">
              From an Instagram page to a full platform.
            </p>
            <div className="relative border-l-2 border-primary/30 ml-4 space-y-8">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="pl-8 relative"
                >
                  <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                  <h3 className="text-foreground font-bold mb-1">{t.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* FAQ */}
          <FAQSection 
            faqs={faqs} 
            title="About FAQ" 
            subtitle="Learn more about who we are, what we do, and our relationship with Oyik AI."
          />

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-6 sm:p-8 md:p-12 card-shadow text-center"
          >
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6 max-w-2xl mx-auto">
              Follow the campaign. Stay ahead of AI. Join the Girona AI community on Instagram for daily content on
              artificial intelligence — produced by the team at Oyik AI. No jargon. No noise. Just the developments
              that matter, explained clearly and consistently.
            </p>
            <motion.a
              href="https://www.instagram.com/girona_.ai/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full text-sm md:text-base transition-colors"
            >
              Follow @girona_.ai
            </motion.a>
            <p className="text-muted-foreground text-xs mt-6">
              Girona AI is a public education campaign by Oyik AI — AI automation agency, London, UK.
            </p>
          </motion.section>
        </div>
      </main>
      <ContactFormSection />
      <Footer />
    </div>
  );
};

export default AboutPage;
