
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send, ArrowRight, CheckCircle } from 'lucide-react';

const Contact = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
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
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "hello@aiadmaxify.com",
      description: "Send us an email anytime"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm EST"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Innovation Drive, Tech City, TC 12345",
      description: "Our headquarters location"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 8am-6pm EST",
      description: "Saturday: 9am-2pm EST"
    }
  ];

  const reasons = [
    {
      icon: CheckCircle,
      title: "Free Consultation",
      description: "Get expert advice on your marketing strategy at no cost"
    },
    {
      icon: CheckCircle,
      title: "Custom Strategy",
      description: "Receive a tailored marketing plan for your business"
    },
    {
      icon: CheckCircle,
      title: "Quick Response",
      description: "We respond to all inquiries within 24 hours"
    },
    {
      icon: CheckCircle,
      title: "No Obligation",
      description: "No pressure, just valuable insights and recommendations"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white pt-24 section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-accent text-white mb-6 text-lg px-4 py-2">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Let's discuss how our AI-powered marketing solutions can help you achieve 
              extraordinary growth. Get your free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/strategy-call">
                <Button className="agency-btn text-lg px-8 py-4">
                  Book Strategy Call <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="agency-btn-outline text-lg px-8 py-4"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Send Message
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us. Choose the method that works best for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="agency-card h-full text-center">
                  <CardHeader>
                    <info.icon size={48} className="text-accent mx-auto mb-4" />
                    <CardTitle className="text-xl font-bold text-primary">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-semibold text-accent mb-2">
                      {info.details}
                    </div>
                    <CardDescription className="text-gray-600">
                      {info.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="agency-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">Send Us a Message</CardTitle>
                  <CardDescription className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours with a 
                    custom strategy for your business.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          name="firstName"
                          placeholder="First Name *"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          name="lastName"
                          placeholder="Last Name *"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          name="email"
                          type="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Input
                          name="company"
                          placeholder="Company Name *"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Input
                          name="website"
                          placeholder="Website URL"
                          value={formData.website}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                          <SelectTrigger>
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
                          <SelectTrigger>
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
                    </div>

                    <div>
                      <Textarea
                        name="message"
                        placeholder="Tell us about your business, goals, and current marketing challenges... *"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="agency-btn w-full text-lg py-3">
                      Send Message <Send className="ml-2" size={20} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Why Contact Us */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-serif font-bold text-primary mb-6">
                  Why <span className="gradient-text">Contact Us</span>?
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  When you reach out to AIAdMaxify, you're not just getting another marketing agency. 
                  You're getting a strategic partner committed to your success.
                </p>
              </div>

              <div className="space-y-6">
                {reasons.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <reason.icon size={24} className="text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{reason.title}</h4>
                      <p className="text-gray-600">{reason.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Card className="bg-accent text-white">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-2">🚀 Special Offer</h4>
                  <p className="mb-4">
                    Book a strategy call this week and receive a free competitor analysis 
                    worth $500!
                  </p>
                  <Link to="/strategy-call">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
                      Claim Free Analysis
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
