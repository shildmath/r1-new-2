import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
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
  ChevronRight,
  Clock,
  Mail
} from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useSupabaseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/contact-submissions', icon: MessageSquare, label: 'Contact Submissions' },
    { path: '/admin/home-page-contacts', icon: Mail, label: 'Home Page Contacts' },
    { path: '/admin/bookings', icon: Calendar, label: 'Strategy Call Bookings' },
    { path: '/admin/time-slots', icon: Clock, label: 'Time Slots Management' },
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex w-full">
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
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform lg:transform-none lg:translate-x-0 transition-transform duration-300 ease-in-out rounded-r-2xl lg:rounded-none`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-2xl lg:rounded-none">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/20"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>

        <nav className="mt-6">
          <div className="px-6 mb-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-800">Welcome back!</p>
              <p className="text-lg font-bold text-blue-900">{user?.email || 'Admin'}</p>
              <p className="text-xs text-blue-600 capitalize bg-blue-100 px-2 py-1 rounded-full inline-block mt-1">
                Admin
              </p>
            </div>
          </div>

          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
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
        <div className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6 rounded-bl-2xl lg:rounded-none">
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
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 text-blue-700 hover:from-blue-100 hover:to-blue-200"
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
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 text-purple-700 hover:from-purple-100 hover:to-purple-200"
                >
                  <span>{nextPage.label}</span>
                  <ChevronRight size={16} />
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
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
