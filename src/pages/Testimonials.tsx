
import React, { useState, useEffect } from 'react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useTestimonialIndustries } from '@/hooks/useTestimonialIndustries';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Quote, Users, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { EnhancedFooter } from '@/components/EnhancedFooter';

const Testimonials = () => {
  const { testimonials, stats, loading, error, fetchTestimonials } = useTestimonials();
  const { industries, loading: industriesLoading } = useTestimonialIndustries();
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');

  useEffect(() => {
    fetchTestimonials(selectedIndustry);
  }, [selectedIndustry, fetchTestimonials]);

  if (loading || industriesLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
        <EnhancedFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
        <EnhancedFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Client Success Stories
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Discover how businesses across industries have transformed their growth with our AI-powered marketing solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stats.total_clients}</div>
                <div className="text-gray-600">Happy Clients</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stats.average_rating}</div>
                <div className="text-gray-600">Average Rating</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stats.success_rate}%</div>
                <div className="text-gray-600">Success Rate</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stats.total_projects}</div>
                <div className="text-gray-600">Projects Completed</div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
              Filter by Industry
            </h2>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Industries">All Industries</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry.id} value={industry.name}>
                    {industry.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {testimonials.length === 0 ? (
            <div className="text-center py-12">
              <Quote className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No testimonials found</h3>
              <p className="text-gray-500">
                {selectedIndustry === 'All Industries' 
                  ? 'No testimonials available at the moment.' 
                  : `No testimonials found for ${selectedIndustry}.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {testimonial.rating}/5
                        </span>
                      </div>
                      
                      <blockquote className="text-gray-700 mb-4 italic">
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {testimonial.client_name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold text-gray-800">
                            {testimonial.client_name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {testimonial.company_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {testimonial.industry}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with AI-powered marketing solutions.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              Start Your Success Story
            </Button>
          </motion.div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
};

export default Testimonials;
