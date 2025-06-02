
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, ArrowLeft, Crown, Users } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'closer' as 'admin' | 'closer'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useSupabaseAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    const { error } = await signup(formData.email, formData.password, formData.fullName, formData.role);
    
    if (!error) {
      toast({
        title: "Signup Successful",
        description: "Please check your email to verify your account.",
      });
      navigate('/login');
    } else {
      toast({
        title: "Signup Failed",
        description: error.message || "An error occurred during signup",
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
              <UserPlus size={24} />
              Sign Up
            </CardTitle>
            <p className="text-gray-600 mt-2">Create your account to get started.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-primary mb-2 block">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

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
                  placeholder="Enter password (min. 6 characters)"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-primary mb-2 block">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-primary mb-3 block">
                  Select Your Role
                </label>
                <RadioGroup 
                  value={formData.role} 
                  onValueChange={(value: 'admin' | 'closer') => setFormData({ ...formData, role: value })}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="admin" id="admin" />
                    <label htmlFor="admin" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Crown size={20} className="text-yellow-600" />
                      <div>
                        <div className="font-medium">Admin</div>
                        <div className="text-sm text-gray-600">Full access to all features and settings</div>
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <RadioGroupItem value="closer" id="closer" />
                    <label htmlFor="closer" className="flex items-center space-x-2 cursor-pointer flex-1">
                      <Users size={20} className="text-blue-600" />
                      <div>
                        <div className="font-medium">Closer</div>
                        <div className="text-sm text-gray-600">Access to client management and bookings</div>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                className="w-full agency-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Signup;
