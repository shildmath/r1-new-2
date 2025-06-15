import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Calendar, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNavbarConfig } from '@/utils/navbarConfig';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [config, setConfig] = useState(getNavbarConfig());

  // Keep in sync with config if changed in localStorage
  useEffect(() => {
    function sync() {
      setConfig(getNavbarConfig());
    }
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  // Hot reload config when editing in admin view
  useEffect(() => {
    // Allow other components to dispatch this event to auto-refresh the navbar
    const handler = () => setConfig(getNavbarConfig());
    window.addEventListener('navbarConfigUpdated', handler);
    return () => window.removeEventListener('navbarConfigUpdated', handler);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = config.navItems;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              {config.brand}
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/strategy-call">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                <Calendar size={16} className="mr-2" />
                Book Call
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg">
                <Mail size={16} className="mr-2" />
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.path) 
                        ? 'text-primary bg-primary/10' 
                        : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-200">
                  <Link to="/strategy-call" onClick={() => setIsOpen(false)}>
                    <Button 
                      variant="outline" 
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <Calendar size={16} className="mr-2" />
                      Book Strategy Call
                    </Button>
                  </Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white">
                      <Mail size={16} className="mr-2" />
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
