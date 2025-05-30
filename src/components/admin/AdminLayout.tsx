
import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Calendar,
  Star, 
  Briefcase, 
  UserCheck, 
  Phone, 
  Share2, 
  Home, 
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/contact-submissions', icon: MessageSquare, label: 'Contact Submissions' },
    { path: '/admin/bookings', icon: Calendar, label: 'Strategy Call Bookings' },
    { path: '/admin/testimonials', icon: Star, label: 'Testimonials' },
    { path: '/admin/services', icon: Briefcase, label: 'Services' },
    { path: '/admin/team', icon: UserCheck, label: 'Team Members' },
    { path: '/admin/contact-info', icon: Phone, label: 'Contact Info' },
    { path: '/admin/social-links', icon: Share2, label: 'Social Links' },
    { path: '/admin/home-content', icon: Home, label: 'Home Page Content' },
  ];

  const currentIndex = menuItems.findIndex(item => item.path === location.pathname);
  const previousPage = currentIndex > 0 ? menuItems[currentIndex - 1] : null;
  const nextPage = currentIndex < menuItems.length - 1 ? menuItems[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform lg:transform-none lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>

        <nav className="mt-6">
          <div className="px-6 mb-4">
            <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>

          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full flex items-center space-x-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </Button>
            
            {/* Side Navigation buttons */}
            <div className="hidden md:flex items-center space-x-2">
              {previousPage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(previousPage.path)}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft size={16} />
                  <span>{previousPage.label}</span>
                </Button>
              )}
              {nextPage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(nextPage.path)}
                  className="flex items-center space-x-2"
                >
                  <span>{nextPage.label}</span>
                  <ChevronRight size={16} />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
