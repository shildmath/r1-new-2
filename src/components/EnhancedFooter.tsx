
import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Mail } from "lucide-react";
import { useFooterConfig } from "@/hooks/useFooterConfig";

const EnhancedFooter = () => {
  const { data: config } = useFooterConfig();

  // Default config in case Supabase data isn't loaded yet
  const footerConfig = config || {
    company_name: "AIAdMaxify",
    company_description: "Transforming businesses with AI-powered marketing solutions.",
    contact_email: "hello@aiadmaxify.com",
    contact_phone: "+1 (555) 123-4567",
    contact_address: "123 Innovation Drive, Tech City",
    copyright_text: "© 2024 AIAdMaxify. All rights reserved.",
    newsletter_title: "Newsletter",
    newsletter_placeholder: "Your email",
    privacy_policy_link: "/privacy",
    terms_of_service_link: "/terms",
    facebook_url: "https://facebook.com",
    instagram_url: "https://instagram.com",
    linkedin_url: "https://linkedin.com",
    twitter_url: "https://twitter.com",
    youtube_url: "https://youtube.com",
    quick_links: [
      { name: "Home", href: "/" },
      { name: "Services", href: "/services" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" }
    ],
    services_list: [
      "AI-Powered Social Media",
      "SEO & Content Strategy", 
      "PPC Advertising",
      "Email Marketing",
      "Conversion Optimization"
    ]
  };

  const socialLinks = [
    { icon: Facebook, url: footerConfig.facebook_url, name: "Facebook" },
    { icon: Instagram, url: footerConfig.instagram_url, name: "Instagram" },
    { icon: Linkedin, url: footerConfig.linkedin_url, name: "LinkedIn" },
    { icon: Twitter, url: footerConfig.twitter_url, name: "Twitter" },
    { icon: Youtube, url: footerConfig.youtube_url, name: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary mb-4">{footerConfig.company_name}</h3>
            <p className="text-gray-300 mb-6">
              {footerConfig.company_description}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerConfig.quick_links.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerConfig.services_list.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-2 text-gray-300 mb-6">
              <p>{footerConfig.contact_email}</p>
              <p>{footerConfig.contact_phone}</p>
              <p>{footerConfig.contact_address}</p>
            </div>

            <div>
              <h5 className="text-md font-semibold mb-2">{footerConfig.newsletter_title}</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder={footerConfig.newsletter_placeholder}
                  className="flex-1 px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-l-md focus:outline-none focus:border-primary"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90 transition-colors duration-200">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {footerConfig.copyright_text}
            </p>
            <div className="flex space-x-6 text-sm">
              <a 
                href={footerConfig.privacy_policy_link} 
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a 
                href={footerConfig.terms_of_service_link} 
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
