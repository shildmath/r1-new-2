
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useTestimonialIndustries } from '@/hooks/useTestimonialIndustries';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Quote, Users, TrendingUp, Award, Target } from 'lucide-react';

const Testimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials();
  const { data: industries } = useTestimonialIndustries();
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');

  const filteredTestimonials = testimonials?.filter(testimonial => 
    selectedIndustry === 'All Industries' || testimonial.industry === selectedIndustry
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const stats = [
    { value: "500+", label: "Happy Clients", icon: Users },
    { value: "342%", label: "Average ROI", icon: TrendingUp },
    { value: "97%", label: "Success Rate", icon: Target },
    { value: "4.9/5", label: "Client Rating", icon: Award }
  ];

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="pt-20 flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

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
              What Our Clients
              <span className="block text-primary">Say About Us</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Real results from real businesses. Discover how our AI-powered marketing solutions have transformed companies across various industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-gray-600">
              Join hundreds of satisfied clients who have achieved remarkable growth
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-0">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              Client Success Stories
            </h2>
            <div className="flex items-center gap-4">
              <label htmlFor="industry-filter" className="text-sm font-medium text-gray-700">
                Filter by Industry:
              </label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Industries">All Industries</SelectItem>
                  {industries?.map((industry) => (
                    <SelectItem key={industry.id} value={industry.name}>
                      {industry.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredTestimonials?.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {testimonial.profile_photo && (
                          <img 
                            src={testimonial.profile_photo} 
                            alt={testimonial.client_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900">{testimonial.client_name}</h3>
                          <p className="text-sm text-gray-600">{testimonial.company_name}</p>
                        </div>
                      </div>
                      <Quote className="h-6 w-6 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 flex-1">
                      "{testimonial.description}"
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-sm text-primary font-medium bg-primary/10 px-2 py-1 rounded">
                        {testimonial.industry}
                      </span>
                      {testimonial.results && (
                        <span className="text-sm text-green-600 font-medium">
                          {testimonial.results}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl mb-8">
              Let's discuss how we can help transform your business with AI-powered marketing
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;
