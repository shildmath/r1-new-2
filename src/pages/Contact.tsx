
import { Send } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import EnhancedFooter from "@/components/EnhancedFooter";
import ContactInfo from "@/components/ContactInfo";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/50 via-white to-purple-100/30 flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center p-2 pt-20 pb-8 md:pb-14">
        {/* Animated Contact Info Section */}
        <ContactInfo />

        {/* Form Area (entrance animation) */}
        <motion.section
          initial={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-2xl flex flex-col items-center"
        >
          <div className="w-full rounded-t-3xl bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-500 shadow-2xl text-white p-7 pt-10 text-center relative z-10 animate-glow">
            <Send size={36} className="mx-auto mb-2 animate-bounce-slow" />
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-1 font-playfair tracking-tight">Send Us a Message</h1>
            <p className="opacity-95 text-base">We&apos;ll get back to you within 24 hours.</p>
          </div>
          <div className="-mt-5 w-full bg-white shadow-2xl rounded-b-3xl px-3 py-5 sm:p-8 relative z-0 animate-fade-in">
            <ContactForm />
            <div className="border-t pt-6 mt-7 text-center">
              <p className="text-gray-500 mb-3 text-sm">Prefer to contact us directly?</p>
              <div className="flex flex-col gap-2 sm:flex-row justify-center text-sm flex-wrap">
                <a href="mailto:info@aiadmaxify.com" className="flex items-center gap-2 justify-center text-blue-700 hover:text-blue-900 hover:underline font-semibold transition-colors">
                  info@aiadmaxify.com
                </a>
                <a href="tel:+15551234567" className="flex items-center gap-2 justify-center text-green-600 hover:text-green-900 hover:underline font-semibold transition-colors">
                  +1 (555) 123-4567
                </a>
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center text-green-500 hover:text-green-700 hover:underline font-semibold transition-colors">
                  WhatsApp
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
