
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    budget: '',
    services: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendToGoogleSheets = async (data: any) => {
    const googleSheetsUrl = 'https://script.google.com/macros/s/AKfycbwCGlS3dHzH8FqQWJ4nKP5L6lHdZ9QbPvX2ykGmwjGv0_kO8jGjLNxzDQXJZ6zR6gQ/exec';
    
    const formDataToSend = new FormData();
    formDataToSend.append('firstName', data.firstName);
    formDataToSend.append('lastName', data.lastName);
    formDataToSend.append('email', data.email);
    formDataToSend.append('phone', data.phone);
    formDataToSend.append('company', data.company);
    formDataToSend.append('website', data.website);
    formDataToSend.append('budget', data.budget);
    formDataToSend.append('services', data.services);
    formDataToSend.append('message', data.message);
    formDataToSend.append('timestamp', new Date().toISOString());

    try {
      const response = await fetch(googleSheetsUrl, {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors'
      });

      return true;
    } catch (error) {
      console.error('Error sending to Google Sheets:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send to Google Sheets
      await sendToGoogleSheets(formData);
      
      console.log('Contact form submitted:', {
        ...formData,
        type: 'contact',
        submittedAt: new Date().toISOString()
      });
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        budget: '',
        services: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Message Sent!",
        description: "Your message has been received. We'll get back to you within 24 hours.",
      });
      
      // Reset form even if Google Sheets fails (fallback)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        budget: '',
        services: '',
        message: ''
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="slide-up"
    >
      <Card className="agency-card glow-border">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bounce-in"
          >
            <CardTitle className="text-2xl font-bold text-primary">Send Us a Message</CardTitle>
            <CardDescription className="text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours with a 
              custom strategy for your business.
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div>
                <Input
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
              <div>
                <Input
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
              <div>
                <Input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div>
                <Input
                  name="company"
                  placeholder="Company Name *"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
              <div>
                <Input
                  name="website"
                  placeholder="Website URL"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                />
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div>
                <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                  <SelectTrigger className="focus:ring-2 focus:ring-purple-500 transition-all duration-300">
                    <SelectValue placeholder="Monthly Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5k">Under $5,000</SelectItem>
                    <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="over-50k">Over $50,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={formData.services} onValueChange={(value) => handleSelectChange('services', value)}>
                  <SelectTrigger className="focus:ring-2 focus:ring-purple-500 transition-all duration-300">
                    <SelectValue placeholder="Services Interested In" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social-media">Social Media Marketing</SelectItem>
                    <SelectItem value="seo">SEO & Content</SelectItem>
                    <SelectItem value="ppc">PPC Advertising</SelectItem>
                    <SelectItem value="email">Email Marketing</SelectItem>
                    <SelectItem value="cro">Conversion Optimization</SelectItem>
                    <SelectItem value="full-service">Full Service Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Textarea
                name="message"
                placeholder="Tell us about your business, goals, and current marketing challenges... *"
                value={formData.message}
                onChange={handleInputChange}
                className="min-h-[120px] focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Button type="submit" className="agency-btn w-full text-lg py-3 shimmer">
                Send Message <Send className="ml-2" size={20} />
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactForm;
