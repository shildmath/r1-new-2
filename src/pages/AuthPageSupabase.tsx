
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
// ADDED: Import supabase client directly
import { supabase } from "@/integrations/supabase/client";

const AuthPageSupabase = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "closer" as "closer" | "admin",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const { register, login } = useSupabaseAuth();
  const navigate = useNavigate();

  // ADDED: Helper function to get role by user id
  const getRoleByUserId = async (userId: string): Promise<"admin" | "closer" | null> => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();
    if (data?.role === "admin" || data?.role === "closer") {
      return data.role;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    if (isLogin) {
      const { success, message } = await login(form.email, form.password);
      if (success) {
        // AFTER login, fetch user and get role for redirect
        // (Session is now available, retrieve user from supabase client)
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.id) {
          const role = await getRoleByUserId(user.id);
          if (role === "admin") {
            navigate("/admin-panel");
          } else if (role === "closer") {
            navigate("/closer-panel");
          } else {
            // fallback, if role not found, go to home
            navigate("/");
          }
        } else {
          // No user? Fallback
          navigate("/");
        }
        setFeedback("Login successful!");
      } else {
        setFeedback(message || "Login failed");
      }
    } else {
      const { success, message } = await register(form.name, form.email, form.password, form.role as "admin" | "closer");
      if (success) {
        setFeedback("Registration successful! Check your email to confirm.");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "", role: "closer" });
      } else {
        setFeedback(message || "Registration failed");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            {isLogin ? <LogIn size={24} /> : <UserPlus size={24} />}
            {isLogin ? "Login" : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">Full Name</label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-primary mb-2 block">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-primary mb-2 block">Password</label>
              <Input
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">Role</label>
                <Select
                  value={form.role}
                  onValueChange={(v) =>
                    setForm({ ...form, role: v as "admin" | "closer" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="closer">Closer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <Button
              type="submit"
              className="w-full agency-btn"
              disabled={isLoading}
            >
              {isLoading
                ? isLogin
                  ? "Logging in..."
                  : "Creating account..."
                : isLogin
                ? "Login"
                : "Sign Up"}
            </Button>
          </form>

          {feedback && (
            <div className="mt-4 text-center text-red-600 font-medium">
              {feedback}
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFeedback(null);
              }}
              className="text-primary hover:underline text-sm"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPageSupabase;
