import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FileText, Users, Clock } from "lucide-react";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    blogs: 0,
    contacts: 0,
    waitlist: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [
          { count: blogsCount },
          { count: contactsCount },
          { count: waitlistCount }
        ] = await Promise.all([
          supabase.from("blogs").select("*", { count: "exact", head: true }),
          supabase.from("contacts").select("*", { count: "exact", head: true }),
          supabase.from("waitlist").select("*", { count: "exact", head: true })
        ]);

        setStats({
          blogs: blogsCount || 0,
          contacts: contactsCount || 0,
          waitlist: waitlistCount || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your website's activity here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Blogs"
          value={loading ? "-" : stats.blogs}
          icon={FileText}
          className="bg-blue-500/10 text-blue-500 border-blue-500/20"
        />
        <StatCard
          title="Total Contacts"
          value={loading ? "-" : stats.contacts}
          icon={Users}
          className="bg-green-500/10 text-green-500 border-green-500/20"
        />
        <StatCard
          title="Total Waitlist Users"
          value={loading ? "-" : stats.waitlist}
          icon={Clock}
          className="bg-orange-500/10 text-orange-500 border-orange-500/20"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, className }: any) => (
  <div className="bg-background rounded-2xl p-6 border border-border shadow-sm flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
        {title}
      </p>
      <h3 className="text-3xl font-bold text-foreground">{value}</h3>
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${className}`}>
      <Icon size={28} className="currentColor" />
    </div>
  </div>
);

export default Dashboard;
