
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useFooterConfig } from '@/hooks/useFooterConfig';

const Footer = () => {
  const { data: config } = useFooterConfig();

  if (!config) {
    return null; // or loading state
  }

  const socialLinks = [
    { icon: Facebook, href: config.facebook_url, label: "Facebook" },
    { icon: Instagram, href: config.instagram_url, label: "Instagram" },
    { icon: Linkedin, href: config.linkedin_url, label: "LinkedIn" },
    { icon: Twitter, href: config.twitter_url, label: "Twitter" },
    { icon: Youtube, href: config.youtube_url, label: "YouTube" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-white">{config.company_name}</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {config.company_description}
              </p>
            </motion.div>
            
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3 text-gray-300"
                whileHover={{ x: 5, color: "#a855f7" }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Mail size={18} className="text-purple-400" />
                <span>{config.contact_email}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-300"
                whileHover={{ x: 5, color: "#a855f7" }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Phone size={18} className="text-purple-400" />
                <span>{config.contact_phone}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-gray-300"
                whileHover={{ x: 5, color: "#a855f7" }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <MapPin size={18} className="text-purple-400" />
                <span>{config.contact_address}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-purple-400">Quick Links</h4>
            <ul className="space-y-3">
              {config.quick_links.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-all duration-200 block"
                  >
                    <motion.span
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="inline-block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-purple-400">Our Services</h4>
            <ul className="space-y-3">
              {config.services_list.map((service, index) => (
                <motion.li 
                  key={index} 
                  className="text-gray-300 text-sm"
                  whileHover={{ x: 5, color: "#d8b4fe" }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-lg font-semibold mb-6 text-purple-400">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors duration-200"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      backgroundColor: "#8b5cf6"
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-400">{config.newsletter_title}</h4>
              <motion.div 
                className="flex overflow-hidden rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <input
                  type="email"
                  placeholder={config.newsletter_placeholder}
                  className="flex-1 px-4 py-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white min-w-0"
                />
                <motion.button 
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 transition-colors duration-200 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <motion.p 
            className="text-gray-400 text-sm"
            whileHover={{ color: "#d8b4fe" }}
            transition={{ duration: 0.2 }}
          >
            {config.copyright_text}
          </motion.p>
          <div className="flex space-x-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to={config.privacy_policy_link} className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Privacy Policy
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to={config.terms_of_service_link} className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
