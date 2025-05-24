
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import ServiceModal from '@/components/ServiceModal';
import {
  Brain,
  Search,
  Target,
  Mail,
  BarChart3,
  Palette,
  TrendingUp,
  Video,
  Users,
  MapPin,
  Zap,
  FileText,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    {
      icon: Brain,
      title: "AI-Powered Social Media Marketing",
      shortDescription: "Intelligent content creation and audience targeting using advanced AI algorithms.",
      fullDescription: "Transform your social media presence with AI-driven content creation, smart audience targeting, and automated engagement strategies that drive real results. Our advanced algorithms analyze your audience behavior, optimize posting times, and create compelling content that resonates with your target market.",
      features: [
        "AI Content Generation & Scheduling",
        "Smart Audience Targeting & Segmentation",
        "Automated Social Listening & Engagement",
        "Performance Analytics & Optimization",
        "Multi-Platform Campaign Management"
      ],
      benefits: [
        "300% increase in engagement rates",
        "50% reduction in content creation time",
        "Advanced competitor analysis",
        "Real-time performance optimization"
      ],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
    },
    {
      icon: Search,
      title: "SEO & Content Strategy",
      shortDescription: "Data-driven SEO strategies that boost your organic visibility and traffic.",
      fullDescription: "Dominate search results with our comprehensive SEO and content strategy services, powered by AI insights and industry expertise. We create content that not only ranks but converts, driving qualified traffic to your website.",
      features: [
        "Advanced Keyword Research & Analysis",
        "Technical SEO Optimization",
        "Content Strategy & Creation",
        "Link Building & Outreach",
        "Local SEO Optimization"
      ],
      benefits: [
        "Average 250% increase in organic traffic",
        "First-page rankings for target keywords",
        "Improved website authority and trust",
        "Long-term sustainable growth"
      ],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      icon: Target,
      title: "Data-Driven PPC Advertising",
      shortDescription: "Maximize ROI with precision-targeted advertising campaigns across all platforms.",
      fullDescription: "Drive immediate results with our advanced PPC management services, featuring AI-powered bid optimization and conversion tracking. Our campaigns are designed to deliver maximum ROI while minimizing wasted ad spend.",
      features: [
        "Google Ads & Microsoft Ads Management",
        "Facebook & Instagram Advertising",
        "AI-Powered Bid Optimization",
        "Advanced Conversion Tracking",
        "A/B Testing & Performance Analysis"
      ],
      benefits: [
        "Average 400% ROI improvement",
        "50% reduction in cost-per-acquisition",
        "Advanced audience targeting",
        "Real-time campaign optimization"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      icon: Mail,
      title: "Email Marketing Automation",
      shortDescription: "Personalized email campaigns that nurture leads and drive conversions.",
      fullDescription: "Build stronger customer relationships with AI-powered email marketing automation that delivers the right message at the right time. Our sophisticated segmentation and personalization strategies ensure maximum engagement and conversion rates.",
      features: [
        "Automated Email Sequences",
        "Personalization & Segmentation",
        "A/B Testing & Optimization",
        "Advanced Analytics & Reporting",
        "Integration with CRM Systems"
      ],
      benefits: [
        "45% increase in email open rates",
        "200% improvement in click-through rates",
        "Automated lead nurturing",
        "Enhanced customer lifetime value"
      ],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
    },
    {
      icon: BarChart3,
      title: "Conversion Rate Optimization",
      shortDescription: "Increase your website's conversion rates through data-driven testing and optimization.",
      fullDescription: "Transform visitors into customers with our comprehensive CRO services, featuring advanced analytics and systematic testing. We identify conversion barriers and implement solutions that dramatically improve your website's performance.",
      features: [
        "Comprehensive Website Audits",
        "A/B & Multivariate Testing",
        "User Experience Optimization",
        "Landing Page Development",
        "Conversion Funnel Analysis"
      ],
      benefits: [
        "Average 35% increase in conversion rates",
        "Improved user experience",
        "Higher revenue per visitor",
        "Data-driven decision making"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
      icon: Video,
      title: "Video Marketing Excellence",
      shortDescription: "Engage your audience with compelling video content and strategic distribution.",
      fullDescription: "Leverage the power of video marketing with our comprehensive video production and distribution services. From concept to distribution, we create videos that tell your story and drive action.",
      features: [
        "Video Strategy Development",
        "Production & Post-Production",
        "YouTube Channel Optimization",
        "Video Advertising Campaigns",
        "Performance Analytics"
      ],
      benefits: [
        "Higher engagement rates",
        "Improved brand storytelling",
        "Better conversion rates",
        "Enhanced social media reach"
      ],
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop"
    }
  ];

  const handleLearnMore = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <>
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white pt-24 section-padding relative overflow-hidden">
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
              Comprehensive Marketing Solutions
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              AI-Powered <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Marketing Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transform your business with our comprehensive suite of AI-powered digital marketing services. 
              From strategy to execution, we deliver results that drive growth.
            </p>
            <Link to="/strategy-call">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 rounded-xl">
                  Get Custom Strategy <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden shadow-xl border-0 bg-white">
                  {/* Service Image */}
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

                  <CardHeader className="flex-grow">
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mb-4">
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2">
                            <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <Button 
                        onClick={() => handleLearnMore(service)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-purple-900 to-black text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Scale Your Business</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss which services are right for your business and create a custom 
              strategy that drives real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/strategy-call">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
                    Book Free Consultation <ArrowRight className="ml-2" size={20} />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-lg px-8 py-4">
                    Contact Us
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />

      <EnhancedFooter />
    </>
  );
};

export default Services;
