
import { storage } from '@/utils/localStorage';
import { useToast } from '@/hooks/use-toast';

export const useContactFormHandler = () => {
  const { toast } = useToast();

  const handleContactSubmission = (name: string, email: string, phone: string, message: string, source: 'home' | 'contact') => {
    try {
      storage.addContactSubmission(name, email, phone, message, source);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you within 24 hours.",
      });
      
      return true;
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Message Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return { handleContactSubmission };
};
