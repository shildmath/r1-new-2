import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { supabase } from "@/integrations/supabase/client";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase contact_submissions table
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: "contact", // "contact" for contact page, "home" for home page, etc.
        }
      ]);
      if (error) throw error;

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });
    } catch (err) {
      toast({
        title: "Message Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-xl mx-auto"
      initial={{ opacity: 0, scale: 0.98, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <label className="text-sm font-semibold block mb-1" htmlFor="name">
            Full Name *
          </label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            required
            className="h-11 bg-gray-100"
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-semibold block mb-1" htmlFor="email">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            required
            className="h-11 bg-gray-100"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold block mb-1" htmlFor="phone">
          <Phone size={14} className="inline mr-1 opacity-60" /> Phone Number (Optional)
        </label>
        <Input
          id="phone"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={e => handleChange('phone', e.target.value)}
          className="h-11 bg-gray-100"
        />
      </div>
      <div>
        <label className="text-sm font-semibold block mb-1" htmlFor="message">
          Message *
        </label>
        <Textarea
          id="message"
          placeholder="Tell us about your project, goals, or any questions you have..."
          value={formData.message}
          onChange={e => handleChange('message', e.target.value)}
          required
          rows={4}
          className="bg-gray-100"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-lg font-bold rounded-lg bg-gradient-to-r from-slate-900 to-purple-500 hover:from-slate-700 hover:to-purple-700 shadow-lg transition-all duration-300 hover:scale-105 focus:scale-100"
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full border-2 border-white border-t-transparent h-5 w-5"></div>
            <span>Sending...</span>
          </div>
        ) : (
          <>
            <MessageSquare size={18} className="mr-2" /> Send Message
          </>
        )}
      </Button>
    </motion.form>
  );
};

export default ContactForm;
