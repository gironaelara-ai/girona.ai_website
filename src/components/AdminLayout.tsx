import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Users, Clock, Settings, LogOut, Menu, X, HelpCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Contacts", href: "/admin/contacts", icon: Users },
  { name: "Waitlist", href: "/admin/waitlist", icon: Clock },
  { name: "Website Content", href: "/admin/settings", icon: Settings },
  { name: "FAQ Manager", href: "/admin/faq", icon: HelpCircle },
];

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flexh-screen bg-muted/30">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-background border border-border rounded-md shadow-sm"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar component */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-center border-b border-border bg-background">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Girona Admin
          </span>
        </div>
        <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto pt-6 px-4">
          <nav className="flex-1 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  <Icon size={18} className={active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="pb-6">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 lg:pl-64 min-h-screen">
        <div className="p-6 md:p-8 pt-20 lg:pt-8 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
