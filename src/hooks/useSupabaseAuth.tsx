
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, fullName: string, role: 'admin' | 'closer') => Promise<{ error: any }>;
  loginWithDemo: (role: 'admin' | 'closer') => Promise<{ error: any }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const SupabaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserRole = async (userId: string) => {
    try {
      console.log('Fetching user role for:', userId);
      const { data, error } = await supabase.rpc('get_user_role', { user_id: userId });
      console.log('Role fetch result:', { data, error });
      if (!error && data) {
        setUserRole(data);
        console.log('User role set to:', data);
      } else if (error) {
        console.error('Error fetching user role:', error);
        // If role doesn't exist, default to closer
        setUserRole('closer');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('closer');
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Delay the role fetch to avoid conflicts
          setTimeout(() => {
            fetchUserRole(session.user.id);
          }, 100);
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('Initial session:', session?.user?.id, error);
        
        if (error) {
          console.error('Error getting initial session:', error);
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserRole(session.user.id);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error in getInitialSession:', error);
        setIsLoading(false);
      }
    };

    getInitialSession();

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      console.log('Login result:', { user: data?.user?.id, error });
      setIsLoading(false);
      return { error };
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return { error };
    }
  };

  const signup = async (email: string, password: string, fullName: string, role: 'admin' | 'closer') => {
    console.log('Attempting signup for:', email, 'with role:', role);
    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/`;
      console.log('Signup redirect URL:', redirectUrl);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            role: role,
          }
        }
      });
      
      console.log('Signup result:', { user: data?.user?.id, error });
      
      // If signup is successful and user is confirmed, try to insert role manually
      if (!error && data.user && !data.user.email_confirmed_at) {
        console.log('User created but email not confirmed. Role will be set on email confirmation.');
      } else if (!error && data.user && data.user.email_confirmed_at) {
        console.log('User created and confirmed. Setting role manually.');
        // User is immediately confirmed, set role
        const { error: roleError } = await supabase
          .from('user_roles')
          .upsert([
            {
              user_id: data.user.id,
              role: role
            }
          ]);
        
        if (roleError) {
          console.error('Error setting user role:', roleError);
        } else {
          console.log('Role set successfully for user:', data.user.id);
        }
      }
      
      setIsLoading(false);
      return { error };
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      return { error };
    }
  };

  const loginWithDemo = async (role: 'admin' | 'closer') => {
    setIsLoading(true);
    const demoCredentials = {
      admin: { email: 'admin@aiadmaxify.com', password: 'admin123' },
      closer: { email: 'closer@aiadmaxify.com', password: 'closer123' }
    };

    const { email, password } = demoCredentials[role];
    console.log('Attempting demo login for role:', role);
    
    try {
      // Try to login first
      let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // If login fails, create the demo account
      if (error?.message?.includes('Invalid login credentials')) {
        console.log('Demo user not found, creating account...');
        
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: role === 'admin' ? 'Demo Admin' : 'Demo Closer',
              role: role,
            }
          }
        });

        if (!signupError && signupData.user) {
          console.log('Demo user created, now logging in...');
          // If user is immediately confirmed, log them in
          if (signupData.user.email_confirmed_at) {
            const { error: loginError } = await supabase.auth.signInWithPassword({
              email,
              password,
            });
            error = loginError;
          } else {
            // For demo purposes, we'll confirm the user manually if needed
            console.log('Demo user created but needs confirmation');
            error = signupError;
          }
        } else {
          error = signupError;
        }
      }

      console.log('Demo login result:', { error });
      setIsLoading(false);
      return { error };
    } catch (error) {
      console.error('Demo login error:', error);
      setIsLoading(false);
      return { error };
    }
  };

  const logout = async () => {
    console.log('Logging out user');
    await supabase.auth.signOut();
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      userRole, 
      login, 
      signup, 
      loginWithDemo, 
      logout, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSupabaseAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};
