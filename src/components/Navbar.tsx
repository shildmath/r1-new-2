
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavbarConfig } from "@/hooks/useNavbarConfig";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: config } = useNavbarConfig();
  
  // Default config in case Supabase data isn't loaded yet
  const navConfig = config || {
    brand: "AIAdMaxify",
    nav_items: [
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: 'About', path: '/about' },
      { name: 'Testimonials', path: '/testimonials' },
      { name: 'Contact', path: '/contact' }
    ]
  };

  // Listen for navbar config updates
  useEffect(() => {
    const handleConfigUpdate = () => {
      // Force re-render when config is updated
      setIsOpen(false);
    };

    window.addEventListener('navbarConfigUpdated', handleConfigUpdate);
    return () => window.removeEventListener('navbarConfigUpdated', handleConfigUpdate);
  }, []);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary">
              {navConfig.brand}
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navConfig.nav_items.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none focus:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navConfig.nav_items.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
