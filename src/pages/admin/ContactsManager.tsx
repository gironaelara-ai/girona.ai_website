import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Mail, Phone, Trash } from "lucide-react";

export const ContactsManager = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to fetch contacts");
    } else {
      setContacts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this contact message?")) return;
    const { error } = await supabase.from("contacts").delete().eq("id", id);
    if (!error) {
      toast.success("Message deleted");
      fetchContacts();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contact Form Messages</h1>
        <p className="text-muted-foreground mt-1">Review messages sent through your website contact forms.</p>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground border border-border rounded-xl">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground border border-border rounded-xl">No contact messages yet.</div>
        ) : (
          contacts.map((contact) => (
            <div key={contact.id} className="bg-background border border-border rounded-xl p-5 shadow-sm relative group">
              <button
                onClick={() => handleDelete(contact.id)}
                className="absolute top-4 right-4 p-2 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                title="Delete Message"
              >
                <Trash size={18} />
              </button>
              
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-full font-bold text-lg uppercase">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{contact.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Mail size={14} /> {contact.email}
                    </a>
                    {contact.phone && (
                      <a href={`tel:${contact.phone}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Phone size={14} /> {contact.phone}
                      </a>
                    )}
                    <span className="text-xs border-l border-border pl-4">
                      {new Date(contact.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-sm text-foreground">
                <p className="whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactsManager;
