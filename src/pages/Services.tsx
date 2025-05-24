
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  const services = [
    {
      icon: Brain,
      title: "AI-Powered Social Media Marketing",
      shortDescription: "Intelligent content creation and audience targeting using advanced AI algorithms.",
      fullDescription: "Transform your social media presence with AI-driven content creation, smart audience targeting, and automated engagement strategies that drive real results.",
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
      pricing: "Starting at $2,500/month"
    },
    {
      icon: Search,
      title: "SEO & Content Strategy",
      shortDescription: "Data-driven SEO strategies that boost your organic visibility and traffic.",
      fullDescription: "Dominate search results with our comprehensive SEO and content strategy services, powered by AI insights and industry expertise.",
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
      pricing: "Starting at $3,000/month"
    },
    {
      icon: Target,
      title: "Data-Driven PPC Advertising",
      shortDescription: "Maximize ROI with precision-targeted advertising campaigns across all platforms.",
      fullDescription: "Drive immediate results with our advanced PPC management services, featuring AI-powered bid optimization and conversion tracking.",
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
      pricing: "Starting at $2,000/month + ad spend"
    },
    {
      icon: Mail,
      title: "Email Marketing Automation",
      shortDescription: "Personalized email campaigns that nurture leads and drive conversions.",
      fullDescription: "Build stronger customer relationships with AI-powered email marketing automation that delivers the right message at the right time.",
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
      pricing: "Starting at $1,500/month"
    },
    {
      icon: BarChart3,
      title: "Conversion Rate Optimization",
      shortDescription: "Increase your website's conversion rates through data-driven testing and optimization.",
      fullDescription: "Transform visitors into customers with our comprehensive CRO services, featuring advanced analytics and systematic testing.",
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
      pricing: "Starting at $2,500/month"
    },
    {
      icon: Palette,
      title: "Brand Strategy & Development",
      shortDescription: "Create a compelling brand identity that resonates with your target audience.",
      fullDescription: "Develop a powerful brand strategy that differentiates your business and drives customer loyalty through strategic positioning and visual identity.",
      features: [
        "Brand Strategy Development",
        "Visual Identity Design",
        "Brand Guidelines Creation",
        "Marketing Collateral Design",
        "Brand Messaging & Positioning"
      ],
      benefits: [
        "Stronger brand recognition",
        "Increased customer loyalty",
        "Premium pricing opportunities",
        "Consistent brand experience"
      ],
      pricing: "Project-based: $5,000 - $25,000"
    },
    {
      icon: TrendingUp,
      title: "Marketing Analytics & Reporting",
      shortDescription: "Comprehensive analytics and reporting to measure and improve marketing performance.",
      fullDescription: "Make data-driven decisions with our advanced marketing analytics and reporting services, featuring custom dashboards and actionable insights.",
      features: [
        "Custom Analytics Dashboards",
        "Performance Tracking & Reporting",
        "ROI Analysis & Attribution",
        "Competitor Benchmarking",
        "Data Visualization & Insights"
      ],
      benefits: [
        "Clear ROI visibility",
        "Improved decision making",
        "Optimized marketing spend",
        "Actionable growth insights"
      ],
      pricing: "Starting at $1,000/month"
    },
    {
      icon: FileText,
      title: "AI Content Creation",
      shortDescription: "Scale your content production with AI-powered content creation and optimization.",
      fullDescription: "Produce high-quality, engaging content at scale with our AI content creation services, featuring human oversight and brand consistency.",
      features: [
        "AI-Generated Blog Posts & Articles",
        "Social Media Content Creation",
        "Video Script Writing",
        "Email Copy & Landing Pages",
        "SEO-Optimized Content"
      ],
      benefits: [
        "10x faster content production",
        "Consistent brand voice",
        "SEO-optimized content",
        "Cost-effective scaling"
      ],
      pricing: "Starting at $1,200/month"
    },
    {
      icon: Video,
      title: "Video Marketing",
      shortDescription: "Engage your audience with compelling video content and strategic distribution.",
      fullDescription: "Leverage the power of video marketing with our comprehensive video production and distribution services.",
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
      pricing: "Project-based: $3,000 - $15,000"
    },
    {
      icon: Users,
      title: "Influencer Marketing",
      shortDescription: "Connect with your audience through strategic influencer partnerships and campaigns.",
      fullDescription: "Expand your reach and build trust through authentic influencer partnerships that drive engagement and conversions.",
      features: [
        "Influencer Discovery & Vetting",
        "Campaign Strategy & Management",
        "Content Creation Oversight",
        "Performance Tracking",
        "ROI Analysis & Reporting"
      ],
      benefits: [
        "Increased brand awareness",
        "Higher engagement rates",
        "Authentic brand endorsements",
        "Expanded audience reach"
      ],
      pricing: "Starting at $2,000/month + influencer fees"
    },
    {
      icon: MapPin,
      title: "Local SEO & Marketing",
      shortDescription: "Dominate local search results and attract more customers in your area.",
      fullDescription: "Increase your local visibility and attract more customers with our comprehensive local SEO and marketing services.",
      features: [
        "Google Business Profile Optimization",
        "Local Citation Building",
        "Review Management",
        "Local Content Creation",
        "Location-Based Advertising"
      ],
      benefits: [
        "Higher local search rankings",
        "Increased foot traffic",
        "Better online reputation",
        "More qualified local leads"
      ],
      pricing: "Starting at $1,800/month"
    },
    {
      icon: Zap,
      title: "Marketing Automation",
      shortDescription: "Streamline your marketing processes with intelligent automation workflows.",
      fullDescription: "Increase efficiency and effectiveness with our marketing automation services that nurture leads and drive conversions automatically.",
      features: [
        "Lead Scoring & Nurturing",
        "Automated Workflow Creation",
        "CRM Integration & Management",
        "Behavioral Trigger Campaigns",
        "Performance Optimization"
      ],
      benefits: [
        "50% increase in lead conversion",
        "Reduced manual workload",
        "Better lead qualification",
        "Improved sales alignment"
      ],
      pricing: "Starting at $2,200/month"
    }
  ];

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
              Comprehensive Marketing Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              AI-Powered <span className="gradient-text">Marketing Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Transform your business with our comprehensive suite of AI-powered digital marketing services. 
              From strategy to execution, we deliver results that drive growth.
            </p>
            <Link to="/strategy-call">
              <Button className="agency-btn text-lg px-8 py-4">
                Get Custom Strategy <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="agency-card h-full flex flex-col">
                  <CardHeader className="flex-grow">
                    <service.icon size={48} className="text-accent mb-4" />
                    <CardTitle className="text-xl font-bold text-primary mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 mb-4">
                      {service.shortDescription}
                    </CardDescription>
                    <p className="text-gray-700 mb-4">
                      {service.fullDescription}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="mb-6">
                      <h4 className="font-semibold text-primary mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-2">
                            <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-primary mb-3">Benefits:</h4>
                      <ul className="space-y-2">
                        {service.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="flex items-start space-x-2">
                            <TrendingUp size={16} className="text-teal mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-4 mt-auto">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-primary">Investment:</span>
                        <Badge variant="outline" className="text-accent border-accent">
                          {service.pricing}
                        </Badge>
                      </div>
                      <Link to="/strategy-call">
                        <Button className="agency-btn w-full">
                          Learn More <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Ready to <span className="gradient-text">Scale Your Business</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss which services are right for your business and create a custom 
              strategy that drives real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/strategy-call">
                <Button className="agency-btn text-lg px-8 py-4">
                  Book Free Consultation <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="agency-btn-outline text-lg px-8 py-4">
                  Contact Us
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

export default Services;
