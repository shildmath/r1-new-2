
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import { Star, ArrowRight, TrendingUp, Target, Users } from 'lucide-react';

const Testimonials = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechStartup Inc.",
      position: "CEO",
      industry: "Technology",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify completely transformed our digital presence. Within 3 months, we saw a 300% increase in qualified leads and our revenue grew by 180%. Their AI-powered approach to social media marketing is absolutely game-changing.",
      results: {
        before: "50 leads/month, $50K revenue",
        after: "200 leads/month, $140K revenue",
        timeframe: "3 months"
      },
      metrics: [
        { label: "Lead Increase", value: "+300%", icon: TrendingUp },
        { label: "Revenue Growth", value: "+180%", icon: Target },
        { label: "Conversion Rate", value: "+45%", icon: Users }
      ]
    },
    {
      id: 2,
      name: "Mike Chen",
      company: "E-commerce Pro",
      position: "Marketing Director",
      industry: "E-commerce",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "The ROI we've achieved with AIAdMaxify is unprecedented. Their data-driven PPC campaigns generated a 450% ROI while reducing our cost per acquisition by 60%. The team's expertise in AI marketing is unmatched.",
      results: {
        before: "2.1% conversion rate, $85 CPA",
        after: "5.8% conversion rate, $34 CPA",
        timeframe: "4 months"
      },
      metrics: [
        { label: "ROI Improvement", value: "+450%", icon: TrendingUp },
        { label: "CPA Reduction", value: "-60%", icon: Target },
        { label: "Conversion Rate", value: "+176%", icon: Users }
      ]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "Local Business Co.",
      position: "Owner",
      industry: "Local Services",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "As a local business, I was skeptical about digital marketing. AIAdMaxify proved me wrong. Their local SEO strategies helped us dominate our market, increasing our revenue by 280% and establishing us as the go-to provider in our area.",
      results: {
        before: "15 local customers/month",
        after: "57 local customers/month",
        timeframe: "6 months"
      },
      metrics: [
        { label: "Revenue Growth", value: "+280%", icon: TrendingUp },
        { label: "Local Visibility", value: "+320%", icon: Target },
        { label: "Customer Base", value: "+380%", icon: Users }
      ]
    },
    {
      id: 4,
      name: "David Park",
      company: "HealthTech Solutions",
      position: "VP Marketing",
      industry: "Healthcare",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "AIAdMaxify's content marketing strategy elevated our brand authority in the healthcare space. Our organic traffic increased by 400% and we're now recognized as thought leaders. The quality of their AI-generated content with human oversight is exceptional.",
      results: {
        before: "5K monthly organic visitors",
        after: "25K monthly organic visitors",
        timeframe: "8 months"
      },
      metrics: [
        { label: "Organic Traffic", value: "+400%", icon: TrendingUp },
        { label: "Brand Authority", value: "+250%", icon: Target },
        { label: "Lead Quality", value: "+85%", icon: Users }
      ]
    },
    {
      id: 5,
      name: "Lisa Thompson",
      company: "Fashion Forward",
      position: "CMO",
      industry: "Fashion",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "The influencer marketing campaigns AIAdMaxify created for us were phenomenal. We reached 2M+ potential customers and saw a 190% increase in brand awareness. Their strategic approach to influencer partnerships is brilliant.",
      results: {
        before: "50K social media reach",
        after: "2.1M social media reach",
        timeframe: "5 months"
      },
      metrics: [
        { label: "Reach Increase", value: "+4100%", icon: TrendingUp },
        { label: "Brand Awareness", value: "+190%", icon: Target },
        { label: "Engagement Rate", value: "+230%", icon: Users }
      ]
    },
    {
      id: 6,
      name: "Robert Martinez",
      company: "Financial Advisors Plus",
      position: "Partner",
      industry: "Finance",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      testimonial: "Trust is everything in our industry. AIAdMaxify helped us build that trust through strategic content marketing and thought leadership positioning. Our client acquisition increased by 220% and our average client value grew by 65%.",
      results: {
        before: "8 new clients/month, $5K avg value",
        after: "26 new clients/month, $8.2K avg value",
        timeframe: "7 months"
      },
      metrics: [
        { label: "Client Acquisition", value: "+220%", icon: TrendingUp },
        { label: "Client Value", value: "+65%", icon: Target },
        { label: "Trust Score", value: "+180%", icon: Users }
      ]
    }
  ];

  const industries = ['all', 'Technology', 'E-commerce', 'Local Services', 'Healthcare', 'Fashion', 'Finance'];

  const filteredTestimonials = selectedIndustry === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.industry === selectedIndustry);

  return (
    <>
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white pt-24 section-padding relative overflow-hidden">
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
            className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-green-600 text-white mb-6 text-lg px-4 py-2">
              97% Client Satisfaction Rate
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Client <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Success Stories</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              See how we've helped businesses across industries achieve extraordinary growth 
              with our AI-powered marketing strategies. Real clients, real results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-64 border-2 border-purple-200 focus:border-purple-500">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Grid */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full shadow-xl border-0 bg-white overflow-hidden">
                  <CardHeader>
                    {/* Client Image and Rating */}
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-3 border-purple-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <Badge variant="outline" className="text-purple-600 border-purple-600">
                          {testimonial.industry}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardDescription className="text-gray-700 italic text-lg leading-relaxed">
                      "{testimonial.testimonial}"
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Results Before/After */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Results Achieved</h4>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Before: </span>
                          <span className="text-gray-800">{testimonial.results.before}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">After: </span>
                          <span className="text-purple-600 font-semibold">{testimonial.results.after}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Timeframe: </span>
                          <span className="text-gray-800">{testimonial.results.timeframe}</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {testimonial.metrics.map((metric, metricIndex) => (
                        <motion.div 
                          key={metricIndex} 
                          className="text-center p-3 bg-white rounded-lg shadow-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          <metric.icon size={20} className="text-purple-600 mx-auto mb-1" />
                          <div className="text-lg font-bold text-purple-600">{metric.value}</div>
                          <div className="text-xs text-gray-600">{metric.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Client Info */}
                    <div className="border-t pt-4">
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.position}</div>
                      <div className="text-sm text-purple-600 font-medium">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Track Record</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers don't lie. Here's what we've achieved for our clients across all industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "97%", label: "Client Satisfaction", color: "text-green-600" },
              { value: "17X", label: "Average ROI", color: "text-purple-600" },
              { value: "2.8M+", label: "Leads Generated", color: "text-blue-600" },
              { value: "$50M+", label: "Revenue Generated", color: "text-orange-600" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg"
              >
                <div className={`text-4xl lg:text-6xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Be Our <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Next Success Story</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of successful businesses that have transformed their growth 
              with our AI-powered marketing strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/strategy-call">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
                    Book Free Strategy Call <ArrowRight className="ml-2" size={20} />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/services">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-lg px-8 py-4">
                    View Our Services
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default Testimonials;
