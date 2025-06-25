
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useContactPageConfig } from "@/hooks/useContactPageConfig";

const ContactInfo = () => {
  const { data: config } = useContactPageConfig();

  if (!config) {
    return null;
  }

  const contactItems = [
    {
      icon: Mail,
      title: config.email_us_title,
      value: config.email_us_value,
      description: config.email_us_description,
      href: `mailto:${config.email_us_value}`,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      title: config.call_us_title,
      value: config.call_us_value,
      description: config.call_us_description,
      href: `tel:${config.call_us_value}`,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      title: config.visit_office_title,
      value: config.visit_office_value,
      description: config.visit_office_description,
      href: `https://maps.google.com/?q=${encodeURIComponent(config.visit_office_value)}`,
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Clock,
      title: config.business_hours_title,
      value: config.business_hours_value,
      description: config.business_hours_description,
      href: null,
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: MessageCircle,
      title: config.whatsapp_title,
      value: config.whatsapp_value,
      description: config.whatsapp_description,
      href: `https://wa.me/${config.whatsapp_value.replace(/[^\d]/g, '')}`,
      color: "from-green-600 to-green-500",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, translateY: 30 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-6xl mx-auto mb-12 px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Get in Touch
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We're here to help! Reach out to us through any of these channels and we'll get back to you promptly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {contactItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="group"
          >
            {item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center h-full"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    <item.icon size={28} />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {item.value}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.description}
                  </p>
                </motion.div>
              </a>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center h-full"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg`}
                >
                  <item.icon size={28} />
                </motion.div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  {item.value}
                </p>
                <p className="text-xs text-gray-500">
                  {item.description}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ContactInfo;
