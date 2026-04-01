import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Trash, Mail } from "lucide-react";

export const WaitlistManager = () => {
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWaitlist = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("waitlist").select("*").order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to fetch waitlist users");
    } else {
      setWaitlist(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWaitlist();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this user from the waitlist?")) return;
    const { error } = await supabase.from("waitlist").delete().eq("id", id);
    if (!error) {
      toast.success("User removed from waitlist");
      fetchWaitlist();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Waitlist Users</h1>
        <p className="text-muted-foreground mt-1">Manage early access requests for your platform.</p>
      </div>

      <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : waitlist.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No waitlist signups yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border">
                  <th className="p-4 text-sm font-semibold text-foreground">Name</th>
                  <th className="p-4 text-sm font-semibold text-foreground">Email Address</th>
                  <th className="p-4 text-sm font-semibold text-foreground">Signup Date</th>
                  <th className="p-4 text-sm font-semibold text-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {waitlist.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-foreground">
                      {user.name || "N/A"}
                    </td>
                    <td className="p-4 font-medium text-foreground flex items-center gap-2">
                      <Mail size={16} className="text-muted-foreground" />
                      <a href={`mailto:${user.email}`} className="hover:text-primary transition-colors">
                        {user.email}
                      </a>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(user.created_at).toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Remove User"
                      >
                        <Trash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default WaitlistManager;
