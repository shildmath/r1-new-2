import { useState } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceModal from '@/components/ServiceModal';
import {
  Brain,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Megaphone,
  Search,
  ShoppingCart,
  Mail,
  Camera,
  Code,
  ArrowRight,
  CheckCircle,
  Star,
  Zap
} from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const mainServices = [
    {
      id: 1,
      icon: Brain,
      title: "AI-Powered Social Media Marketing",
      description: "Intelligent content creation, audience targeting, and automated posting using cutting-edge AI algorithms.",
      features: [
        "AI Content Generation",
        "Smart Audience Targeting", 
        "Automated Posting Schedule",
        "Performance Analytics",
        "Competitor Analysis",
        "Brand Voice Optimization"
      ],
      pricing: "Starting at $997/month",
      results: "+300% engagement rates",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"
    },
    {
      icon: Search,
      title: "SEO & Content Strategy",
      description: "Data-driven SEO strategies that boost your organic visibility and traffic.",
      features: [
        "Advanced Keyword Research & Analysis",
        "Technical SEO Optimization",
        "Content Strategy & Creation",
        "Link Building & Outreach",
        "Local SEO Optimization"
      ],
      pricing: "Starting at $297/month",
      results: "+250% increase in organic traffic",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      icon: Target,
      title: "Data-Driven PPC Advertising",
      description: "Maximize ROI with precision-targeted advertising campaigns across all platforms.",
      features: [
        "Google Ads & Microsoft Ads Management",
        "Facebook & Instagram Advertising",
        "AI-Powered Bid Optimization",
        "Advanced Conversion Tracking",
        "A/B Testing & Performance Analysis"
      ],
      pricing: "Starting at $197/month",
      results: "+400% ROI improvement",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      icon: Mail,
      title: "Email Marketing Automation",
      description: "Personalized email campaigns that nurture leads and drive conversions.",
      features: [
        "Automated Email Sequences",
        "Personalization & Segmentation",
        "A/B Testing & Optimization",
        "Advanced Analytics & Reporting",
        "Integration with CRM Systems"
      ],
      pricing: "Starting at $297/month",
      results: "+45% increase in email open rates",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop"
    },
    {
      icon: BarChart3,
      title: "Conversion Rate Optimization",
      description: "Increase your website's conversion rates through data-driven testing and optimization.",
      features: [
        "Comprehensive Website Audits",
        "A/B & Multivariate Testing",
        "User Experience Optimization",
        "Landing Page Development",
        "Conversion Funnel Analysis"
      ],
      pricing: "Starting at $197/month",
      results: "+35% increase in conversion rates",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      icon: Video,
      title: "Video Marketing Excellence",
      description: "Engage your audience with compelling video content and strategic distribution.",
      features: [
        "Video Strategy Development",
        "Production & Post-Production",
        "YouTube Channel Optimization",
        "Video Advertising Campaigns",
        "Performance Analytics"
      ],
      pricing: "Starting at $197/month",
      results: "+Higher engagement rates",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop"
    },
    {
      icon: Smartphone,
      title: "Mobile App Marketing",
      description: "Drive app downloads and engagement with targeted mobile marketing strategies.",
      features: [
        "App Store Optimization (ASO)",
        "Mobile Ad Campaign Management",
        "User Acquisition Strategies",
        "In-App Engagement Optimization",
        "App Analytics & Reporting"
      ],
      pricing: "Starting at $197/month",
      results: "+300% increase in app downloads",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
    },
    {
      icon: Globe,
      title: "Website Design & Development",
      description: "Create stunning, high-converting websites that drive business growth.",
      features: [
        "Custom Website Design",
        "Responsive Development",
        "E-commerce Solutions",
        "CMS Integration",
        "Performance Optimization"
      ],
      pricing: "Starting at $197/month",
      results: "+Improved user experience",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop"
    },
    {
      icon: MessageSquare,
      title: "Chatbot & AI Automation",
      description: "Automate customer service and lead generation with intelligent chatbots.",
      features: [
        "AI Chatbot Development",
        "Lead Qualification Automation",
        "Customer Support Integration",
        "Multi-platform Deployment",
        "Analytics & Optimization"
      ],
      pricing: "Starting at $197/month",
      results: "+24/7 customer support availability",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Marketing",
      description: "Boost online sales with comprehensive e-commerce marketing strategies.",
      features: [
        "Product Listing Optimization",
        "Shopping Campaign Management",
        "Cart Abandonment Recovery",
        "Inventory Marketing",
        "Customer Retention Strategies"
      ],
      pricing: "Starting at $197/month",
      results: "+40% increase in online sales",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      icon: Camera,
      title: "Brand Photography & Design",
      description: "Professional visual content that elevates your brand presence.",
      features: [
        "Professional Photography",
        "Brand Identity Design",
        "Graphic Design Services",
        "Visual Content Strategy",
        "Brand Guidelines Development"
      ],
      pricing: "Starting at $197/month",
      results: "+Enhanced brand recognition",
      image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&h=400&fit=crop"
    },
    {
      icon: Megaphone,
      title: "Influencer Marketing",
      description: "Leverage influencer partnerships to expand your reach and credibility.",
      features: [
        "Influencer Identification & Outreach",
        "Campaign Strategy & Management",
        "Content Collaboration",
        "Performance Tracking",
        "ROI Measurement"
      ],
      pricing: "Starting at $197/month",
      results: "+Expanded brand reach",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop"
    }
  ];

  const additionalServices = [
    {
      icon: Mail,
      title: "Email Marketing Automation",
      description: "Personalized email campaigns that convert leads into customers.",
      features: [
        "Automated Email Sequences",
        "Personalization & Segmentation",
        "A/B Testing & Optimization",
        "Advanced Analytics & Reporting",
        "Integration with CRM Systems"
      ],
      pricing: "Starting at $297/month",
      results: "+45% increase in email open rates",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop"
    },
    {
      icon: Code,
      title: "Custom Software Development",
      description: "Build custom software solutions tailored to your business needs.",
      features: [
        "Custom Application Development",
        "API Integration",
        "Scalability & Performance",
        "User Experience Design",
        "Maintenance & Support"
      ],
      pricing: "Starting at $297/month",
      results: "+Increased efficiency",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop"
    },
    {
      icon: Star,
      title: "SEO & Content Strategy",
      description: "Data-driven SEO strategies that boost your organic visibility and traffic.",
      features: [
        "Advanced Keyword Research & Analysis",
        "Technical SEO Optimization",
        "Content Strategy & Creation",
        "Link Building & Outreach",
        "Local SEO Optimization"
      ],
      pricing: "Starting at $297/month",
      results: "+250% increase in organic traffic",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      icon: Zap,
      title: "Data-Driven PPC Advertising",
      description: "Maximize ROI with precision-targeted advertising campaigns across all platforms.",
      features: [
        "Google Ads & Microsoft Ads Management",
        "Facebook & Instagram Advertising",
        "AI-Powered Bid Optimization",
        "Advanced Conversion Tracking",
        "A/B Testing & Performance Analysis"
      ],
      pricing: "Starting at $197/month",
      results: "+400% ROI improvement",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    }
  ];

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

      {/* Main Services Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
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
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="absolute bottom-4 left-4 rotate-on-hover"
                    >
                      <service.icon size={40} className="text-white pulse-glow" />
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
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
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
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="absolute bottom-4 left-4 rotate-on-hover"
                    >
                      <service.icon size={40} className="text-white pulse-glow" />
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
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop" 
                    alt="AI-Powered Social Media Marketing"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <Brain size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    AI-Powered Social Media Marketing
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Intelligent content creation, audience targeting, and automated posting using cutting-edge AI algorithms.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">AI Content Generation</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Smart Audience Targeting</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Automated Posting Schedule</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" 
                    alt="SEO & Content Strategy"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <Search size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    SEO & Content Strategy
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Data-driven SEO strategies that boost your organic visibility and traffic.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Advanced Keyword Research & Analysis</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Technical SEO Optimization</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Content Strategy & Creation</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" 
                    alt="Data-Driven PPC Advertising"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <Target size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    Data-Driven PPC Advertising
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Maximize ROI with precision-targeted advertising campaigns across all platforms.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Google Ads & Microsoft Ads Management</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Facebook & Instagram Advertising</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">AI-Powered Bid Optimization</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop" 
                    alt="Email Marketing Automation"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <Mail size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    Email Marketing Automation
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Personalized email campaigns that nurture leads and drive conversions.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Automated Email Sequences</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Personalization & Segmentation</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">A/B Testing & Optimization</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" 
                    alt="Conversion Rate Optimization"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <BarChart3 size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    Conversion Rate Optimization
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Increase your website's conversion rates through data-driven testing and optimization.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Comprehensive Website Audits</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">A/B & Multivariate Testing</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">User Experience Optimization</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop" 
                    alt="Video Marketing Excellence"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <Video size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    Video Marketing Excellence
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Engage your audience with compelling video content and strategic distribution.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Video Strategy Development</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Production & Post-Production</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">YouTube Channel Optimization</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop" 
                    alt="Mobile App Marketing"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <Smartphone size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    Mobile App Marketing
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Drive app downloads and engagement with targeted mobile marketing strategies.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">App Store Optimization (ASO)</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Mobile Ad Campaign Management</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">User Acquisition Strategies</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop" 
                    alt="Website Design & Development"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <Globe size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    Website Design & Development
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Create stunning, high-converting websites that drive business growth.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Custom Website Design</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Responsive Development</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">E-commerce Solutions</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop" 
                    alt="Chatbot & AI Automation"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <MessageSquare size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    Chatbot & AI Automation
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Automate customer service and lead generation with intelligent chatbots.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">AI Chatbot Development</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Lead Qualification Automation</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Customer Support Integration</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop" 
                    alt="E-commerce Marketing"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <ShoppingCart size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    E-commerce Marketing
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Boost online sales with comprehensive e-commerce marketing strategies.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Product Listing Optimization</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Shopping Campaign Management</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Cart Abandonment Recovery</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=400&h=300&fit=crop" 
                    alt="Brand Photography & Design"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <Camera size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    Brand Photography & Design
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Professional visual content that elevates your brand presence.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Professional Photography</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Brand Identity Design</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Graphic Design Services</span>
                      </motion.li>
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="h-full scale-on-hover"
            >
              <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white glow-border">
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop" 
                    alt="Influencer Marketing"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute bottom-4 left-4 rotate-on-hover"
                  >
                    <Megaphone size={40} className="text-white pulse-glow" />
                  </motion.div>
                </div>

                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2 bounce-in">
                    Influencer Marketing
                  </CardTitle>
                  <CardDescription className="text-gray-600 mb-4 slide-up">
                    Leverage influencer partnerships to expand your reach and credibility.
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      <motion.li 
                        key={0} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Influencer Identification & Outreach</span>
                      </motion.li>
                      <motion.li 
                        key={1} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Campaign Strategy & Management</span>
                      </motion.li>
                      <motion.li 
                        key={2} 
                        className="flex items-start space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0 pulse" />
                        <span className="text-gray-600 text-sm">Content Collaboration</span>
                      </motion.li>
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
      
      {selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </>
  );
};

export default Services;
