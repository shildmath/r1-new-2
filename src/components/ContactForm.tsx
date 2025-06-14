
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    setTimeout(() => {
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
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full">
          <label className="text-sm font-medium block mb-1" htmlFor="name">
            Full Name *
          </label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            required
            className="h-10"
          />
        </div>
        <div className="w-full">
          <label className="text-sm font-medium block mb-1" htmlFor="email">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            required
            className="h-10"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium block mb-1" htmlFor="phone">
          <Phone size={16} className="inline mr-1 opacity-60" /> Phone Number (Optional)
        </label>
        <Input
          id="phone"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={e => handleChange('phone', e.target.value)}
          className="h-10"
        />
      </div>
      <div>
        <label className="text-sm font-medium block mb-1" htmlFor="message">
          Message *
        </label>
        <Textarea
          id="message"
          placeholder="Tell us about your project, goals, or any questions you have..."
          value={formData.message}
          onChange={e => handleChange('message', e.target.value)}
          required
          rows={4}
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-gray-900 to-purple-400 hover:from-gray-700 hover:to-purple-500 transition duration-300"
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Sending...</span>
          </div>
        ) : (
          <>
            <MessageSquare size={18} className="mr-2" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
