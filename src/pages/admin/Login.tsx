import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid User ID or Password");
      } else if (data.session) {
        toast.success("Login successful!");
        navigate("/admin");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-background rounded-3xl p-8 border border-border shadow-xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 text-primary flex items-center justify-center rounded-2xl mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground text-sm text-center mt-2">
            Secure admin portal for Girona.ai
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">User ID</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Enter User ID"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 pr-12"
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
