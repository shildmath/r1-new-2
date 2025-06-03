
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { contactService } from '@/services/supabase';
import { Mail, Phone, MessageSquare, Send } from 'lucide-react';

interface ContactFormProps {
  source?: 'home' | 'contact';
}

const ContactForm = ({ source = 'contact' }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactService.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message,
        source,
        status: 'new'
      });

      // Reset form
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

    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-2xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-white p-8">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
            <MessageSquare size={28} />
            <span>Send Us a Message</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Full Name *
                </label>
                <Input
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                  <Mail size={16} className="mr-2 text-primary" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="h-12 border-gray-300 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                <Phone size={16} className="mr-2 text-primary" />
                Phone Number (Optional)
              </label>
              <Input
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="h-12 border-gray-300 focus:border-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Message *
              </label>
              <Textarea
                placeholder="Tell us about your project, goals, or any questions you have..."
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                required
                rows={5}
                className="resize-none border-gray-300 focus:border-primary"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Sending Message...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send size={20} />
                  <span>Send Message</span>
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">
              Prefer to contact us directly?
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <a href="mailto:info@aiadmaxify.com" className="text-primary hover:underline flex items-center space-x-1">
                <Mail size={16} />
                <span>info@aiadmaxify.com</span>
              </a>
              <a href="tel:+15551234567" className="text-primary hover:underline flex items-center space-x-1">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
