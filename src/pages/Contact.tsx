import { Mail, Phone, Send } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import EnhancedFooter from "@/components/EnhancedFooter";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col">
      <Navbar />
      <section className="flex-grow flex flex-col items-center justify-center px-2 py-12">
        {/* HERO CARD */}
        <div className="w-full max-w-2xl rounded-t-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl text-white p-8 pt-10 text-center">
          <Send size={32} className="mx-auto mb-3" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Send Us a Message</h1>
          <p className="opacity-90 text-base">We&apos;ll get back to you within 24 hours</p>
        </div>
        {/* CONTACT FORM CARD */}
        <div className="-mt-4 mb-8 w-full max-w-2xl bg-white shadow-2xl rounded-b-2xl p-6 sm:p-8">
          <ContactForm />
          <div className="border-t pt-6 mt-6 text-center">
            <p className="text-gray-500 mb-4">Prefer to contact us directly?</p>
            <div className="flex justify-center gap-6 text-sm flex-wrap">
              <a href="mailto:info@aiadmaxify.com" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
                <Mail size={16} /> info@aiadmaxify.com
              </a>
              <a href="tel:+15551234567" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
                <Phone size={16} /> +1 (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </section>
      <EnhancedFooter />
    </div>
  );
};

export default Contact;
