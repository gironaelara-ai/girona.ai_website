import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Save, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQManager = () => {
  const [homeFaqs, setHomeFaqs] = useState<FAQItem[]>(Array(5).fill({ question: "", answer: "" }));
  const [aboutFaqs, setAboutFaqs] = useState<FAQItem[]>(Array(5).fill({ question: "", answer: "" }));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("site_settings").select("*").in("key", ["home_faqs", "about_faqs"]);
      if (data) {
        data.forEach((item) => {
          try {
            const parsed = JSON.parse(item.value);
            if (item.key === "home_faqs") setHomeFaqs(parsed.length ? parsed : Array(5).fill({ question: "", answer: "" }));
            if (item.key === "about_faqs") setAboutFaqs(parsed.length ? parsed : Array(5).fill({ question: "", answer: "" }));
          } catch (e) {
            console.error("Error parsing FAQs", e);
          }
        });
      }
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  const handleFaqChange = (type: "home" | "about", index: number, field: "question" | "answer", value: string) => {
    if (type === "home") {
      const newFaqs = [...homeFaqs];
      newFaqs[index] = { ...newFaqs[index], [field]: value };
      setHomeFaqs(newFaqs);
    } else {
      const newFaqs = [...aboutFaqs];
      newFaqs[index] = { ...newFaqs[index], [field]: value };
      setAboutFaqs(newFaqs);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const updates = [
      { key: "home_faqs", value: JSON.stringify(homeFaqs.filter(f => f.question || f.answer)) },
      { key: "about_faqs", value: JSON.stringify(aboutFaqs.filter(f => f.question || f.answer)) }
    ];

    for (const update of updates) {
      const { error } = await supabase.from("site_settings").upsert({ 
        key: update.key, 
        value: update.value,
        updated_at: new Date().toISOString()
      });
      if (error) {
        toast.error(`Failed to save ${update.key}: ${error.message}`);
        setSaving(false);
        return;
      }
    }

    toast.success("FAQs saved successfully!");
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center text-muted-foreground">Loading FAQs...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">FAQ Manager</h1>
          <p className="text-muted-foreground mt-1">Manage frequently asked questions for Home and About pages.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-full flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? "Saving..." : "Save All FAQs"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Home Page FAQs */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <HelpCircle size={20} />
            </div>
            <h2 className="text-xl font-bold text-foreground">Home Page FAQs (Max 5)</h2>
          </div>
          
          <div className="space-y-6">
            {homeFaqs.map((faq, index) => (
              <div key={`home-${index}`} className="bg-secondary/30 p-5 rounded-2xl border border-border space-y-3">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">Question {index + 1}</p>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleFaqChange("home", index, "question", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30"
                  placeholder="Enter question..."
                />
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => handleFaqChange("home", index, "answer", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Enter answer..."
                />
              </div>
            ))}
          </div>
        </div>

        {/* About Page FAQs */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <HelpCircle size={20} />
            </div>
            <h2 className="text-xl font-bold text-foreground">About Page FAQs (Max 5)</h2>
          </div>
          
          <div className="space-y-6">
            {aboutFaqs.map((faq, index) => (
              <div key={`about-${index}`} className="bg-secondary/30 p-5 rounded-2xl border border-border space-y-3">
                <p className="text-xs font-bold text-primary uppercase tracking-widest">Question {index + 1}</p>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => handleFaqChange("about", index, "question", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30"
                  placeholder="Enter question..."
                />
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => handleFaqChange("about", index, "answer", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/30 resize-none"
                  placeholder="Enter answer..."
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
