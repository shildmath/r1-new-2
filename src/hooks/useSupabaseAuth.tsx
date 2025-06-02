
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
      const { data, error } = await supabase.rpc('get_user_role', { user_id: userId });
      if (!error && data) {
        setUserRole(data);
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchUserRole(session.user.id);
        } else {
          setUserRole(null);
        }
        
        setIsLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserRole(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setIsLoading(false);
    return { error };
  };

  const signup = async (email: string, password: string, fullName: string, role: 'admin' | 'closer') => {
    setIsLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
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
    setIsLoading(false);
    return { error };
  };

  const loginWithDemo = async (role: 'admin' | 'closer') => {
    setIsLoading(true);
    const demoCredentials = {
      admin: { email: 'admin@aiadmaxify.com', password: 'admin123' },
      closer: { email: 'closer@aiadmaxify.com', password: 'closer123' }
    };

    const { email, password } = demoCredentials[role];
    
    // Try to login first
    let { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // If login fails, create the demo account
    if (error?.message?.includes('Invalid login credentials')) {
      const { error: signupError } = await supabase.auth.signUp({
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

      if (!signupError) {
        // Now try to login again
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        error = loginError;
      } else {
        error = signupError;
      }
    }

    setIsLoading(false);
    return { error };
  };

  const logout = async () => {
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
