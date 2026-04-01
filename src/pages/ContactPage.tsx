import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ContactFormSection from "@/components/ContactFormSection";

const ContactPage = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Girona",
    description: "Get in touch with Girona for collaborations, questions, or feedback.",
    url: "https://girona-ai-portfolio.lovable.app/contact",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Contact Girona — Get in Touch | Girona.ai"
        description="Have a question or want to collaborate? Reach out to Girona for tech and AI related inquiries."
        canonical="https://girona-ai-portfolio.lovable.app/contact"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="flex-1 pt-20">
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
