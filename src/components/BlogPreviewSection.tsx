import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  thumbnail_url?: string;
  image_url?: string;
  category: string;
  created_at: string;
  content?: string;
}

export const mockBlogs: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 AI Tools You Need in 2026",
    description: "Discover the most powerful AI tools that can boost your productivity and creativity this year.",
    thumbnail_url: "",
    category: "AI Tools",
    created_at: "2026-03-25",
  },
  {
    id: "2",
    title: "How AI is Changing Content Creation",
    description: "From writing to design, AI is revolutionizing how creators produce content. Here's what you need to know.",
    thumbnail_url: "",
    category: "Trends",
    created_at: "2026-03-20",
  },
  {
    id: "3",
    title: "Getting Started with Machine Learning",
    description: "A beginner-friendly guide to understanding machine learning concepts and starting your first project.",
    thumbnail_url: "",
    category: "Tutorials",
    created_at: "2026-03-15",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

const BlogCard = ({ blog, index }: { blog: BlogPost | any; index: number }) => {
  const image = blog.image_url || blog.thumbnail_url;
  
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="bg-background rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-shadow flex flex-col h-full border border-border"
    >
      <div className="h-48 bg-muted relative overflow-hidden flex items-center justify-center">
        {image ? (
          <img src={image} alt={blog.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-muted-foreground text-sm">{blog.category}</span>
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
            {blog.category}
          </span>
          <time className="text-xs text-muted-foreground" dateTime={blog.created_at}>
            {new Date(blog.created_at).toLocaleDateString()}
          </time>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{blog.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{blog.description}</p>
        <Link
          to={`/blog/${blog.id}`}
          className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1 mt-auto"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
};

const BlogPreviewSection = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);
          
        if (error || !data || data.length === 0) {
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

  return (
    <section id="blog" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-semibold text-sm mb-2 flex items-center gap-2">
            <span className="w-6 h-[2px] bg-primary inline-block" aria-hidden="true" /> Latest Posts
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
            From the <span className="text-primary">Blog</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            // Skeleton loaders
            [1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-muted rounded-2xl animate-pulse"></div>
            ))
          ) : (
            blogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} />
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
          >
            View All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
