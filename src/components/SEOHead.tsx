import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  jsonLd?: Record<string, unknown>;
}

const SEOHead = ({ title, description, canonical, type = "website", jsonLd }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    // Canonical
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    } else if (link) {
      link.remove();
    }

    // JSON-LD
    const existingScript = document.querySelector('script[data-seo-jsonld]');
    if (existingScript) existingScript.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-seo-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.querySelector('script[data-seo-jsonld]');
      if (s) s.remove();
    };
  }, [title, description, canonical, type, jsonLd]);

  return null;
};

export default SEOHead;
