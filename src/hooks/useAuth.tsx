
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '@/types/admin';
import { storage } from '@/utils/localStorage';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize defaults and check for existing user
    storage.initializeDefaults();
    const currentUser = storage.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simple authentication - in real app, this would be server-side
    const users = storage.getUsers();
    const foundUser = users.find(u => u.email === email);
    
    if (foundUser && password === 'admin123') { // Simple password for demo
      setUser(foundUser);
      storage.setCurrentUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    storage.setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
