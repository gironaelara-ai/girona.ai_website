import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Edit, Trash, Plus, X } from "lucide-react";

export const BlogsManager = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to fetch blogs");
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete blog");
    } else {
      toast.success("Blog deleted");
      fetchBlogs();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blogs Manager</h1>
          <p className="text-muted-foreground mt-1">Manage your website's blog posts.</p>
        </div>
        <button
          onClick={() => {
            setEditingBlog(null);
            setIsFormOpen(true);
          }}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Plus size={18} />
          Add Blog
        </button>
      </div>

      {isFormOpen ? (
        <BlogForm
          initialData={editingBlog}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            fetchBlogs();
          }}
        />
      ) : (
        <div className="bg-background border border-border rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : blogs.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No blogs found. Create one!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="p-4 text-sm font-semibold text-foreground">Title</th>
                    <th className="p-4 text-sm font-semibold text-foreground">Category</th>
                    <th className="p-4 text-sm font-semibold text-foreground">Date</th>
                    <th className="p-4 text-sm font-semibold text-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="p-4 font-medium text-foreground">{blog.title}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                          {blog.category}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingBlog(blog);
                              setIsFormOpen(true);
                            }}
                            className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const BlogForm = ({ initialData, onClose, onSuccess }: any) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    image_url: initialData?.image_url || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    let finalImageUrl = formData.image_url;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('blog-images')
        .upload(fileName, imageFile);
        
      if (uploadError) {
        toast.error(`Image upload failed: ${uploadError.message}. Make sure you created the 'blog-images' bucket!`);
        setSaving(false);
        return;
      }
      
      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);
        
      finalImageUrl = publicUrlData.publicUrl;
    }

    const payload = { ...formData, image_url: finalImageUrl };
    
    let error;
    if (initialData?.id) {
      const { error: updateError } = await supabase.from("blogs").update(payload).eq("id", initialData.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from("blogs").insert([payload]);
      error = insertError;
    }

    if (error) {
      toast.error(`Error saving blog: ${error.message}`);
    } else {
      toast.success(initialData ? "Blog updated successfully!" : "Blog created successfully!");
      onSuccess();
    }
    setSaving(false);
  };

  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-foreground">
          {initialData ? "Edit Blog" : "Create New Blog"}
        </h2>
        <button onClick={onClose} className="p-2 text-muted-foreground hover:bg-muted rounded-full">
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Title</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30"
              placeholder="Post title"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-1">Category</label>
            <input
              required
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30"
              placeholder="e.g. AI Trends"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 rounded-lg text-sm border border-border bg-background focus:ring-2 focus:ring-primary/30 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
          {formData.image_url && !imageFile && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              Currently uploaded: <a href={formData.image_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline max-w-[200px] truncate">{formData.image_url}</a>
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Short Description</label>
          <textarea
            required
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 resize-none"
            placeholder="A brief summary of the post..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-1">Full Content</label>
          <textarea
            required
            rows={10}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 font-mono text-sm"
            placeholder="Write the full markdown or text content here..."
          />
        </div>

        <div className="flex justify-end pt-4 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-border hover:bg-muted text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saving ? "Saving..." : "Save Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogsManager;
