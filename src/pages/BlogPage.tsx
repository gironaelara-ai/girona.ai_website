import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { mockBlogs } from "@/components/BlogPreviewSection";
import { supabase } from "@/lib/supabase";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
        if (error || !data || data.length === 0) {
          // Fallback to mock data if no db connected or empty
          setBlogs(mockBlogs);
        } else {
          setBlogs(data);
        }
      } catch (err) {
        setBlogs(mockBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Girona.ai Blog",
    description: "Explore articles on AI, tech trends, tools, and tutorials by Girona.",
    url: "https://girona-ai-portfolio.lovable.app/blog",
    author: { "@type": "Person", name: "Girona" },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      datePublished: blog.created_at,
      url: `https://girona-ai-portfolio.lovable.app/blog/${blog.id}`,
    })),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Blog — AI, Tech Trends & Tutorials | Girona.ai"
        description="Explore all articles on AI, tech trends, tools, and tutorials by Girona. Stay informed with simplified tech insights."
        canonical="https://girona-ai-portfolio.lovable.app/blog"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="flex-1 section-padding pt-28 sm:pt-32">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All <span className="text-primary">Blogs</span>
            </h1>
            <p className="text-muted-foreground mb-12 max-w-lg">
              Explore all articles on AI, tech trends, tools, and tutorials.
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 animate-pulse">
              {[1, 2, 3].map((i) => (
                 <div key={i} className="h-80 bg-muted rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.map((blog, i) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-background rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-shadow border border-border flex flex-col"
                >
                  <div className="h-48 bg-muted relative overflow-hidden" role="img" aria-label={`${blog.category} blog thumbnail`}>
                    {blog.image_url ? (
                      <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">{blog.category}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">{blog.category}</span>
                      <time className="text-xs text-muted-foreground" dateTime={blog.created_at}>
                        {new Date(blog.created_at).toLocaleDateString()}
                      </time>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{blog.title}</h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{blog.description}</p>
                    <Link to={`/blog/${blog.id}`} className="text-sm font-medium text-primary hover:underline mt-auto" aria-label={`Read more about ${blog.title}`}>
                      Read More →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
