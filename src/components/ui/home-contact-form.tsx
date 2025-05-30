
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/utils/localStorage';

const HomeContactForm = () => {
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
      // Add contact submission to localStorage with proper source
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        message: formData.message,
        source: 'home' as const
      };

      storage.addContactSubmission(
        submissionData.name,
        submissionData.email,
        submissionData.phone,
        submissionData.message,
        submissionData.source
      );

      console.log('Contact form submitted from home page:', submissionData);

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Message Failed",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-primary mb-2 block">
            Full Name *
          </label>
          <Input
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            className="h-12"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-primary mb-2 block">
            Email Address *
          </label>
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            className="h-12"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-primary mb-2 block">
          Phone Number
        </label>
        <Input
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="h-12"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-primary mb-2 block">
          Message *
        </label>
        <Textarea
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          required
          rows={4}
          className="resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 text-lg font-semibold agency-btn"
      >
        {isSubmitting ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span>Sending...</span>
          </div>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
};

export default HomeContactForm;
