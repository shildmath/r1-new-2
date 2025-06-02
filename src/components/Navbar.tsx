
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Menu, X, User, LogOut, Crown, Users, Settings } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, userRole, logout } = useSupabaseAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Results', path: '/testimonials' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
  };

  const getRoleIcon = (role: string | null) => {
    switch (role) {
      case 'admin':
        return <Crown size={16} className="text-yellow-600" />;
      case 'closer':
        return <Users size={16} className="text-blue-600" />;
      default:
        return <User size={16} />;
    }
  };

  const getRoleDisplayName = (role: string | null) => {
    if (!role) return 'User';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-2xl">
                <span className="text-primary">AI</span>
                <span className="text-accent">AdMaxify</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-accent bg-accent-light'
                    : 'text-gray-700 hover:text-accent hover:bg-accent-light'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/strategy-call">
              <Button className="agency-btn">Book Strategy Call</Button>
            </Link>
            
            {/* User menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  {getRoleIcon(userRole)}
                  <span>Welcome {getRoleDisplayName(userRole)}!</span>
                </div>
                
                {/* Role-based navigation */}
                {userRole === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Settings size={16} />
                      <span>Admin Panel</span>
                    </Button>
                  </Link>
                )}
                
                {userRole === 'closer' && (
                  <Link to="/closer-panel">
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>Closer Panel</span>
                    </Button>
                  </Link>
                )}
                
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-accent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-accent bg-accent-light'
                      : 'text-gray-700 hover:text-accent hover:bg-accent-light'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Link to="/strategy-call" onClick={() => setIsOpen(false)}>
                  <Button className="agency-btn w-full">Book Strategy Call</Button>
                </Link>
              </div>
              
              {/* Mobile user menu */}
              {user ? (
                <div className="px-3 py-2 border-t mt-2 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {getRoleIcon(userRole)}
                    <span>Welcome {getRoleDisplayName(userRole)}!</span>
                  </div>
                  
                  {/* Role-based navigation */}
                  {userRole === 'admin' && (
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1">
                        <Settings size={16} />
                        <span>Admin Panel</span>
                      </Button>
                    </Link>
                  )}
                  
                  {userRole === 'closer' && (
                    <Link to="/closer-panel" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full flex items-center justify-center space-x-1">
                        <Users size={16} />
                        <span>Closer Panel</span>
                      </Button>
                    </Link>
                  )}
                  
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="w-full flex items-center justify-center space-x-1"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="px-3 py-2 border-t mt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
