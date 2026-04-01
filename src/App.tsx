import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import WaitlistPopup from "./components/WaitlistPopup";

// Admin
import Login from "./pages/admin/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./components/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard";
import { BlogsManager } from "./pages/admin/BlogsManager";
import { ContactsManager } from "./pages/admin/ContactsManager";
import { WaitlistManager } from "./pages/admin/WaitlistManager";
import { SettingsManager } from "./pages/admin/SettingsManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <WaitlistPopup />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/blogs" element={<BlogsManager />} />
              <Route path="/admin/contacts" element={<ContactsManager />} />
              <Route path="/admin/waitlist" element={<WaitlistManager />} />
              <Route path="/admin/settings" element={<SettingsManager />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
