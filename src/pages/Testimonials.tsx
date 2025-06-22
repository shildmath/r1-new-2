
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useTestimonials } from '@/hooks/useTestimonials';
import { Star, Users, TrendingUp, Award, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

const industries = [
  'All Industries',
  'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education',
  'Real Estate', 'Manufacturing', 'Retail', 'Hospitality', 'Consulting',
  'Marketing', 'Legal', 'Non-profit', 'Automotive', 'Food & Beverage'
];

const Testimonials = () => {
  const { testimonials, stats, loading, fetchTestimonials } = useTestimonials();
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 6;

  useEffect(() => {
    fetchTestimonials(selectedIndustry);
    setCurrentPage(1);
  }, [selectedIndustry]);

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const startIndex = (currentPage - 1) * testimonialsPerPage;
  const endIndex = startIndex + testimonialsPerPage;
  const currentTestimonials = testimonials.slice(startIndex, endIndex);

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg">Loading testimonials...</div>
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
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-purple-600 text-white mb-6 text-lg px-4 py-2">
              Client Success Stories
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              What Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Clients Say</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover how we've helped businesses transform their digital presence and achieve remarkable results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">{stats?.happy_clients}</h3>
                <p className="text-blue-100">Happy Clients</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">{stats?.average_roi}</h3>
                <p className="text-green-100">Average ROI</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">{stats?.success_rate}</h3>
                <p className="text-purple-100">Success Rate</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">{stats?.client_rating}</h3>
                <p className="text-orange-100">Client Rating</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 md:mb-0">
              Client Testimonials ({testimonials.length})
            </h2>
            <div className="w-full md:w-auto">
              <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-gray-50 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="h-full bg-white shadow-xl border-0 overflow-hidden">
                  <CardContent className="p-6">
                    {/* Client Info */}
                    <div className="flex items-center space-x-4 mb-4">
                      {testimonial.profile_photo ? (
                        <img
                          src={testimonial.profile_photo}
                          alt={testimonial.client_name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-purple-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{testimonial.client_name}</h3>
                        <p className="text-gray-600">{testimonial.company_name}</p>
                        <Badge variant="secondary" className="mt-1">
                          {testimonial.industry}
                        </Badge>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-4">
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

                    {/* Description */}
                    <blockquote className="text-gray-700 mb-4 leading-relaxed">
                      "{testimonial.description}"
                    </blockquote>

                    {/* Results */}
                    {testimonial.results && (
                      <div className="mt-4">
                        <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                          📈 {testimonial.results}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mt-12">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center space-x-2"
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(i + 1)}
                    className="w-10 h-10"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          )}

          {testimonials.length === 0 && (
            <div className="text-center py-16">
              <Users className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                No testimonials found
              </h3>
              <p className="text-gray-500">
                {selectedIndustry === 'All Industries' 
                  ? 'No testimonials available at the moment.'
                  : `No testimonials found for ${selectedIndustry} industry.`
                }
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Testimonials;
