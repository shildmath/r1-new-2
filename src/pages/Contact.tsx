
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useContactPageConfig } from "@/hooks/useContactPageConfig";
import { useContactFormHandler } from "@/components/ContactFormHandler";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, ArrowRight } from "lucide-react";

const Contact = () => {
  const { data: config } = useContactPageConfig();
  const { handleContactSubmission } = useContactFormHandler();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = handleContactSubmission(
      formData.name,
      formData.email,
      formData.phone,
      formData.message,
      'contact'
    );
    
    if (success) {
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Default config in case data isn't loaded yet
  const contactConfig = config || {
    email_us_title: "Email Us",
    email_us_value: "info@aiadmaxify.com",
    email_us_description: "Send us an email anytime",
    call_us_title: "Call Us",
    call_us_value: "+1 (555) 123-4567",
    call_us_description: "Available 24/7 for support",
    visit_office_title: "Visit Office",
    visit_office_value: "123 Innovation Drive, Tech City",
    visit_office_description: "Come visit our headquarters",
    business_hours_title: "Business Hours",
    business_hours_value: "Mon-Fri: 9AM-6PM EST",
    business_hours_description: "We are here to help",
    whatsapp_title: "WhatsApp Message",
    whatsapp_value: "+1 (555) 123-4567",
    whatsapp_description: "Quick chat via WhatsApp",
    contact_directly_title: "Prefer to contact us directly?",
    contact_directly_description: "Choose your preferred method"
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: contactConfig.email_us_title,
      value: contactConfig.email_us_value,
      description: contactConfig.email_us_description,
      color: "from-blue-500 to-blue-600",
      action: () => window.open(`mailto:${contactConfig.email_us_value}`)
    },
    {
      icon: Phone,
      title: contactConfig.call_us_title,
      value: contactConfig.call_us_value,
      description: contactConfig.call_us_description,
      color: "from-green-500 to-green-600",
      action: () => window.open(`tel:${contactConfig.call_us_value}`)
    },
    {
      icon: MapPin,
      title: contactConfig.visit_office_title,
      value: contactConfig.visit_office_value,
      description: contactConfig.visit_office_description,
      color: "from-purple-500 to-purple-600",
      action: () => window.open(`https://maps.google.com?q=${encodeURIComponent(contactConfig.visit_office_value)}`)
    },
    {
      icon: Clock,
      title: contactConfig.business_hours_title,
      value: contactConfig.business_hours_value,
      description: contactConfig.business_hours_description,
      color: "from-orange-500 to-orange-600",
      action: () => {}
    },
    {
      icon: MessageSquare,
      title: contactConfig.whatsapp_title,
      value: contactConfig.whatsapp_value,
      description: contactConfig.whatsapp_description,
      color: "from-emerald-500 to-emerald-600",
      action: () => window.open(`https://wa.me/${contactConfig.whatsapp_value.replace(/\D/g, '')}`)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in
              <span className="block text-primary">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Ready to transform your business with AI-powered marketing? Let's start the conversation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {contactConfig.contact_directly_title}
            </h2>
            <p className="text-gray-600">
              {contactConfig.contact_directly_description}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
                onClick={method.action}
              >
                <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 group-hover:shadow-primary/20">
                  <CardContent className="p-0 text-center">
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${method.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="h-8 w-8" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {method.value}
                    </p>
                    <p className="text-xs text-gray-500">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="p-8 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-gray-900">
                  Start Your Journey Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
                        placeholder="Enter your full name"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
                        placeholder="Enter your email"
                      />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
                      placeholder="Enter your phone number"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      required
                      rows={5}
                      className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary/50"
                      placeholder="Tell us about your project and how we can help..."
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="pt-4"
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8">
              Join hundreds of businesses already transforming their marketing with AI
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Book a Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                View Our Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
