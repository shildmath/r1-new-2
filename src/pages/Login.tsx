
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from '@/hooks/use-toast';
import { LogIn, ArrowLeft, Crown, Users } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithDemo } = useSupabaseAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await login(formData.email, formData.password);
    
    if (!error) {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      navigate('/');
    } else {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = async (role: 'admin' | 'closer') => {
    setIsLoading(true);
    const { error } = await loginWithDemo(role);
    
    if (!error) {
      toast({
        title: "Demo Login Successful",
        description: `Logged in as demo ${role}!`,
      });
      navigate('/');
    } else {
      toast({
        title: "Demo Login Failed",
        description: error.message || "Failed to login with demo credentials",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="agency-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
              <LogIn size={24} />
              Login
            </CardTitle>
            <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Demo Login Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-primary text-center">Quick Demo Access</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleDemoLogin('admin')}
                  disabled={isLoading}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Crown size={20} className="mb-1" />
                  <span className="text-xs">Demo Admin</span>
                </Button>
                <Button
                  onClick={() => handleDemoLogin('closer')}
                  disabled={isLoading}
                  variant="outline"
                  className="flex flex-col items-center p-4 h-auto"
                >
                  <Users size={20} className="mb-1" />
                  <span className="text-xs">Demo Closer</span>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Regular Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-primary mb-2 block">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full agency-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
