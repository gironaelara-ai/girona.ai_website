import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { mockBlogs } from "@/components/BlogPreviewSection";
import { supabase } from "@/lib/supabase";
import DOMPurify from 'dompurify';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.from("blogs").select("*").eq("id", id).single();
        if (error || !data) {
          const fallbackBlog = mockBlogs.find((b) => b.id === id);
          setBlog(fallbackBlog || null);
        } else {
          setBlog(data);
        }
      } catch (err) {
        const fallbackBlog = mockBlogs.find((b) => b.id === id);
        setBlog(fallbackBlog || null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">Loading...</main>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEOHead title="Blog not found | Girona.ai" description="The blog post you're looking for doesn't exist." />
        <Navbar />
        <main className="flex-1 section-padding pt-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Blog not found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to blogs</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    datePublished: blog.created_at,
    author: { "@type": "Person", name: "Girona" },
    url: `https://girona-ai-portfolio.lovable.app/blog/${blog.id}`,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${blog.title} | Girona.ai`}
        description={blog.description}
        canonical={`https://girona-ai-portfolio.lovable.app/blog/${blog.id}`}
        type="article"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="flex-1 section-padding pt-28 sm:pt-32">
        <article className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">← Back to blogs</Link>
            </nav>
            <div className="h-64 md:h-80 bg-muted rounded-2xl mb-8 flex items-center justify-center overflow-hidden relative" role="img" aria-label={`${blog.category} blog header`}>
              {blog.image_url ? (
                <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-muted-foreground">{blog.category}</span>
              )}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{blog.category}</span>
              <time className="text-xs text-muted-foreground" dateTime={blog.created_at}>
                {new Date(blog.created_at).toLocaleDateString()}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{blog.title}</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              {blog.content ? (
                blog.content.includes('<') && blog.content.includes('>') ? (
                  <div 
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} 
                    className="prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground" 
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{blog.content}</p>
                )
              ) : (
                <>
                  <p>{blog.description}</p>
                  <p className="mt-4">
                    This is a placeholder for the full blog content. Once you enable Lovable Cloud,
                    blog content will be fetched from the database and rendered here with full rich text support.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
