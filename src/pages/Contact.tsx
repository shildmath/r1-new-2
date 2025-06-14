import { Mail, Phone, Send } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import EnhancedFooter from "@/components/EnhancedFooter";
import ContactInfo from "@/components/ContactInfo";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center px-2 pt-20 pb-10 md:pb-20">
        {/* Animated Contact Info Section */}
        <ContactInfo />

        {/* Main Hero + Form section */}
        <motion.section
          initial={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-2xl flex flex-col items-center"
        >
          {/* Hero Card */}
          <div className="w-full rounded-t-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl text-white p-7 pt-9 text-center relative z-10">
            <Send size={32} className="mx-auto mb-2 animate-bounce-slow" />
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Send Us a Message</h1>
            <p className="opacity-95 text-base">We’ll get back to you within 24 hours.</p>
          </div>
          {/* Contact Form Card */}
          <div className="-mt-4 w-full bg-white shadow-2xl rounded-b-2xl p-5 sm:p-8 relative z-0">
            <ContactForm />
            <div className="border-t pt-6 mt-6 text-center">
              <p className="text-gray-500 mb-3">Prefer to contact us directly?</p>
              <div className="flex flex-col gap-2 sm:flex-row justify-center text-sm flex-wrap">
                <a href="mailto:info@aiadmaxify.com" className="flex items-center gap-2 justify-center text-gray-700 hover:text-blue-600 hover:underline font-medium transition-colors">
                  <Mail size={16} /> info@aiadmaxify.com
                </a>
                <a href="tel:+15551234567" className="flex items-center gap-2 justify-center text-gray-700 hover:text-blue-600 hover:underline font-medium transition-colors">
                  <Phone size={16} /> +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <EnhancedFooter />
    </div>
  );
};

export default Contact;
