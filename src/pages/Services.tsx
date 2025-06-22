import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceModal from '@/components/ServiceModal';
import { supabase } from '@/integrations/supabase/client';
import { Service } from '@/types/service';
import {
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('is_active', true)
          .order('sequence_order', { ascending: true });

        if (error) throw error;
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleLearnMore = (service: any) => {
    const serviceWithModal = {
      ...service,
      fullDescription: service.description + " Our expert team combines cutting-edge technology with proven strategies to deliver exceptional results for your business.",
      features: service.key_features || [],
      benefits: service.expected_benefits || [],
      icon: getIconComponent(service.icon)
    };
    setSelectedService(serviceWithModal);
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.Star;
  };

  // Default service image for services that don't have one
  const getServiceImage = (index: number) => {
    const images = [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop"
    ];
    return images[index % images.length];
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading services...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white page-with-navbar section-padding overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 float-animation"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="slide-up"
          >
            <Badge className="bg-purple-600 text-white mb-6 text-lg px-4 py-2 pulse-glow">
              Comprehensive Marketing Solutions
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bounce-in">
              AI-Powered <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Marketing Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 fade-in">
              Transform your business with our comprehensive suite of AI-powered digital marketing services. 
              From strategy to execution, we deliver results that drive growth.
            </p>
            <Link to="/strategy-call">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 rounded-xl shimmer">
                  Get Custom Strategy <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = getIconComponent(service.icon);
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="h-full scale-on-hover"
                >
                  <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                    {/* Service Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={getServiceImage(index)}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="absolute bottom-4 left-4 rotate-on-hover"
                      >
                        <IconComponent size={40} className="text-white pulse-glow" />
                      </motion.div>
                    </div>

                    <CardHeader className="flex-grow">
                      <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 mb-4 slide-up">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.key_features.slice(0, 3).map((feature, featureIndex) => (
                            <motion.li 
                              key={featureIndex} 
                              className="flex items-start space-x-2"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: featureIndex * 0.1 }}
                            >
                              <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                              <span className="text-gray-600 text-sm">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto">
                        <Button 
                          onClick={() => handleLearnMore(service)}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shimmer"
                        >
                          Learn More <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="float-animation"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bounce-in">
              Ready to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Scale Your Business</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 slide-up">
              Let's discuss which services are right for your business and create a custom 
              strategy that drives real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/strategy-call">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 shimmer">
                    Book Free Consultation <ArrowRight className="ml-2" size={20} />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-lg px-8 py-4 glow-border">
                    Contact Us
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      
      <ServiceModal 
        isOpen={!!selectedService}
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </>
  );
};

export default Services;
