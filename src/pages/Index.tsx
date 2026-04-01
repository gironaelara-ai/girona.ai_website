import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureStrip from "@/components/FeatureStrip";
import AboutSection from "@/components/AboutSection";
import BlogPreviewSection from "@/components/BlogPreviewSection";
import CTASection from "@/components/CTASection";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Girona.ai",
    url: "https://girona-ai-portfolio.lovable.app",
    description: "Stay ahead with Tech & AI — simplified. Daily tech updates and AI education by Girona.",
    author: {
      "@type": "Person",
      name: "Girona",
      url: "https://www.instagram.com/girona_.ai/",
    },
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Girona.ai — Tech & AI Simplified"
        description="Stay ahead with Tech & AI — simplified. Daily tech updates, AI tools, tutorials, and insights by Girona."
        canonical="https://girona-ai-portfolio.lovable.app/"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <HeroSection />
        <FeatureStrip />
        <AboutSection />
        <BlogPreviewSection />
        <CTASection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
