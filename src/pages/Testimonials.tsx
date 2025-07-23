
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Filter, ChevronDown, Users, Award, TrendingUp, BarChart3 } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useTestimonialIndustries } from '@/hooks/useTestimonialIndustries';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Testimonials = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const { testimonials, stats, loading } = useTestimonials();
  const { data: industries = [] } = useTestimonialIndustries();

  const filteredTestimonials = testimonials.filter(testimonial => 
    selectedIndustry === 'All' || testimonial.industry === selectedIndustry
  );

  const activeIndustries = industries.filter(industry => industry.is_active);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Real results from real businesses who transformed their marketing with our AI solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{stats?.happy_clients || '500+'}</div>
                <div className="text-blue-100">Happy Clients</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-lg">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{stats?.average_roi || '342%'}</div>
                <div className="text-green-100">Average ROI</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{stats?.success_rate || '97%'}</div>
                <div className="text-purple-100">Success Rate</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-2xl shadow-lg">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{stats?.client_rating || '4.9/5'}</div>
                <div className="text-orange-100">Client Rating</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter and Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Client Testimonials
              </h2>
              <p className="text-gray-600">
                Discover how we've helped businesses across various industries
              </p>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>{selectedIndustry}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedIndustry('All')}>
                  All Industries
                </DropdownMenuItem>
                {activeIndustries.map((industry) => (
                  <DropdownMenuItem
                    key={industry.id}
                    onClick={() => setSelectedIndustry(industry.name)}
                  >
                    {industry.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      {testimonial.profile_photo ? (
                        <img
                          src={testimonial.profile_photo}
                          alt={testimonial.client_name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {testimonial.client_name}
                        </h3>
                        <p className="text-gray-600">{testimonial.company_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < testimonial.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {testimonial.industry}
                      </Badge>
                    </div>

                    <blockquote className="text-gray-700 mb-4 italic">
                      "{testimonial.description}"
                    </blockquote>

                    {testimonial.results && (
                      <div className="mt-4">
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {testimonial.results}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No testimonials found
              </h3>
              <p className="text-gray-500">
                {selectedIndustry === 'All' 
                  ? 'No testimonials available at the moment.' 
                  : `No testimonials found for ${selectedIndustry} industry.`}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
