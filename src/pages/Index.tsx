
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import PremiumStats from '@/components/PremiumStats';
import { 
  Users, 
  TrendingUp, 
  Award, 
  ArrowRight,
  CheckCircle,
  Star,
  BarChart3,
  Target,
  Brain,
  Zap,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';

const Index = () => {
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your interest. We'll get back to you within 24 hours.",
    });
  };

  const services = [
    {
      icon: Brain,
      title: "AI-Powered Social Media Marketing",
      description: "Intelligent content creation and audience targeting using advanced AI algorithms that deliver 300% better engagement rates.",
      features: ["AI Content Generation", "Smart Audience Targeting", "Automated Posting"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
    },
    {
      icon: TrendingUp,
      title: "SEO & Content Strategy",
      description: "Data-driven SEO strategies that boost your organic visibility and traffic with proven 250% growth results.",
      features: ["Keyword Research", "Content Optimization", "Technical SEO"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      icon: Target,
      title: "Data-Driven PPC Advertising",
      description: "Maximize ROI with precision-targeted advertising campaigns that achieve 17X average return on investment.",
      features: ["Google Ads", "Facebook Ads", "Conversion Tracking"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStartup Inc.",
      role: "CEO",
      content: "AIAdMaxify transformed our digital presence completely. Our leads increased by 300% in just 3 months!",
      rating: 5,
      result: "+300% leads",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mike Chen",
      company: "E-commerce Pro",
      role: "Marketing Director",
      content: "The AI-powered campaigns generated the highest ROI we've ever seen. Absolutely incredible results.",
      rating: 5,
      result: "+450% ROI",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      company: "Local Business Co.",
      role: "Owner",
      content: "Professional, results-driven, and incredibly knowledgeable. They exceeded every expectation.",
      rating: 5,
      result: "+280% revenue",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const whyChooseUs = [
    {
      icon: Brain,
      title: "AI-Driven Insights",
      description: "Leverage cutting-edge AI technology for data-driven marketing decisions that deliver results.",
      gradient: "from-purple-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Guaranteed Results",
      description: "We're so confident in our approach, we guarantee measurable results within 90 days.",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock support from our expert team to ensure your campaigns never stop performing.",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
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
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="bg-purple-600 text-white mb-6 text-lg px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Marketing Solutions
                </Badge>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Transform Your Business with 
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block">
                  AI Marketing
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Boost your revenue by 300%+ with our proven AI-driven digital marketing strategies. 
                Expert team, guaranteed results, 97% client satisfaction, and 17X average ROI.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/strategy-call">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 rounded-xl shadow-lg">
                      Get Free Strategy Call <ArrowRight className="ml-2" size={20} />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/testimonials">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-lg px-8 py-4 rounded-xl">
                      View Results
                    </Button>
                  </motion.div>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-green-400 mr-1" />
                  <span>450+ Clients</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-purple-400 mr-1" />
                  <span>17X Avg ROI</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">



                
                {/* Working Team Image */}

                
  {/* =================================================================================================================================*/}

                
                <div className="relative mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop" 
                    alt="Our Working Team"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
                </div>





  {/* =================================================================================================================================*/}





                
                
                {/* Rotating Animation Below */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="flex justify-center mb-4"
                >
                  <BarChart3 size={120} className="text-purple-400" />
                </motion.div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Real Client Growth</h3>
                  <p className="text-gray-300">Average results in 90 days</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Stats with Graphs */}
      <PremiumStats />

      {/* Enhanced Why Choose Us Section */}
      <section className="bg-gradient-to-br from-white to-purple-50 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AIAdMaxify</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with proven marketing expertise to deliver 
              exceptional results for businesses of all sizes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="relative h-full overflow-hidden bg-white border-0 shadow-xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5`} />
                  <CardHeader className="text-center relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon size={64} className={`bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent mx-auto mb-4`} />
                    </motion.div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center text-lg">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI-Powered Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive digital marketing solutions powered by artificial intelligence 
              and delivered by industry experts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full overflow-hidden shadow-xl border-0 bg-white">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute bottom-4 left-4"
                    >
                      <service.icon size={40} className="text-white" />
                    </motion.div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-green-500" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/services">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Learn More <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Client <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how we've helped businesses like yours achieve extraordinary growth 
              with our AI-powered marketing strategies.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white shadow-xl border-0">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <CardDescription className="text-gray-700 italic text-lg leading-relaxed">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                        />
                        <div>
                          <div className="font-bold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                          <div className="text-sm text-gray-500">{testimonial.company}</div>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                        {testimonial.result}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/testimonials">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
                View All Results <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Transform</span> Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get a free strategy consultation and discover how our AI-powered marketing 
                solutions can drive unprecedented growth for your business.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Free 30-minute strategy session</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>Custom marketing plan proposal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-green-400" />
                  <span>17X ROI projections for your business</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Get Your Free Consultation</CardTitle>
                  <CardDescription className="text-gray-300">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                        required
                      />
                      <Input
                        placeholder="Last Name"
                        className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                        required
                      />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      required
                    />
                    <Input
                      placeholder="Company Name"
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                      required
                    />
                    <Textarea
                      placeholder="Tell us about your business and marketing goals..."
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 min-h-[100px]"
                      required
                    />
                    <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full text-lg py-3">
                      Get Free Strategy Call <Zap className="ml-2" size={20} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </>
  );
};

export default Index;
