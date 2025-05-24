
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      image: "/placeholder.svg",
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
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white pt-24 section-padding">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-accent text-white mb-6 text-lg px-4 py-2">
              97% Client Satisfaction Rate
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Client <span className="gradient-text">Success Stories</span>
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
              <SelectTrigger className="w-64">
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

      {/* Testimonials Grid */}
      <section className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="agency-card h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <Badge variant="outline" className="text-accent border-accent">
                        {testimonial.industry}
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-700 italic text-lg leading-relaxed">
                      "{testimonial.testimonial}"
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    {/* Results Before/After */}
                    <div className="bg-accent-light rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-primary mb-3">Results Achieved</h4>
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Before: </span>
                          <span className="text-gray-800">{testimonial.results.before}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">After: </span>
                          <span className="text-accent font-semibold">{testimonial.results.after}</span>
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
                        <div key={metricIndex} className="text-center">
                          <metric.icon size={20} className="text-accent mx-auto mb-1" />
                          <div className="text-lg font-bold text-accent">{metric.value}</div>
                          <div className="text-xs text-gray-600">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Client Info */}
                    <div className="border-t pt-4">
                      <div className="font-bold text-primary">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.position}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Our <span className="gradient-text">Track Record</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers don't lie. Here's what we've achieved for our clients across all industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">97%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">300%</div>
              <div className="text-gray-600">Average Growth</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">2.8M+</div>
              <div className="text-gray-600">Leads Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">$50M+</div>
              <div className="text-gray-600">Revenue Generated</div>
            </div>
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
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Ready to Be Our <span className="gradient-text">Next Success Story</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of successful businesses that have transformed their growth 
              with our AI-powered marketing strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/strategy-call">
                <Button className="agency-btn text-lg px-8 py-4">
                  Book Free Strategy Call <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" className="agency-btn-outline text-lg px-8 py-4">
                  View Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Testimonials;
