
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
import Footer from '@/components/Footer';
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
  Zap
} from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({
    satisfaction: 0,
    campaigns: 0,
    growth: 0,
    clients: 0
  });

  // Animate counters on mount
  useEffect(() => {
    const animateCounters = () => {
      const duration = 2000;
      const frameRate = 60;
      const totalFrames = (duration / 1000) * frameRate;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setStats({
          satisfaction: Math.round(easeOut * 97),
          campaigns: Math.round(easeOut * 2750),
          growth: Math.round(easeOut * 156),
          clients: Math.round(easeOut * 450)
        });

        if (frame >= totalFrames) {
          clearInterval(timer);
        }
      }, 1000 / frameRate);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

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
      description: "Intelligent content creation and audience targeting using advanced AI algorithms.",
      features: ["AI Content Generation", "Smart Audience Targeting", "Automated Posting"],
    },
    {
      icon: TrendingUp,
      title: "SEO & Content Strategy",
      description: "Data-driven SEO strategies that boost your organic visibility and traffic.",
      features: ["Keyword Research", "Content Optimization", "Technical SEO"],
    },
    {
      icon: Target,
      title: "Data-Driven PPC Advertising",
      description: "Maximize ROI with precision-targeted advertising campaigns across all platforms.",
      features: ["Google Ads", "Facebook Ads", "Conversion Tracking"],
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStartup Inc.",
      role: "CEO",
      content: "AIAdMaxify transformed our digital presence completely. Our leads increased by 300% in just 3 months!",
      rating: 5,
      result: "+300% leads"
    },
    {
      name: "Mike Chen",
      company: "E-commerce Pro",
      role: "Marketing Director",
      content: "The AI-powered campaigns generated the highest ROI we've ever seen. Absolutely incredible results.",
      rating: 5,
      result: "+450% ROI"
    },
    {
      name: "Emily Rodriguez",
      company: "Local Business Co.",
      role: "Owner",
      content: "Professional, results-driven, and incredibly knowledgeable. They exceeded every expectation.",
      rating: 5,
      result: "+280% revenue"
    }
  ];

  const whyChooseUs = [
    {
      icon: Brain,
      title: "AI-Driven Insights",
      description: "Leverage cutting-edge AI technology for data-driven marketing decisions that deliver results."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our certified marketing professionals have 10+ years of experience across all industries."
    },
    {
      icon: Award,
      title: "Results Guaranteed",
      description: "We're so confident in our approach, we guarantee measurable results within 90 days."
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-accent text-white mb-4">AI-Powered Marketing Solutions</Badge>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                Transform Your Business with 
                <span className="gradient-text"> AI Marketing</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Boost your revenue by 300%+ with our proven AI-driven digital marketing strategies. 
                Expert team, guaranteed results, 97% client satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/strategy-call">
                  <Button className="agency-btn text-lg px-8 py-4">
                    Get Free Strategy Call <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link to="/testimonials">
                  <Button variant="outline" className="agency-btn-outline text-lg px-8 py-4">
                    View Results
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <BarChart3 size={200} className="text-accent mx-auto mb-4" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Real Client Growth</h3>
                  <p className="text-gray-300">Average results in 90 days</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">
                {stats.satisfaction}%
              </div>
              <div className="text-gray-600">Client Satisfaction</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">
                {stats.campaigns.toLocaleString()}+
              </div>
              <div className="text-gray-600">Successful Campaigns</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">
                {stats.growth}%
              </div>
              <div className="text-gray-600">Average Growth</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">
                {stats.clients}+
              </div>
              <div className="text-gray-600">Happy Clients</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Why Choose <span className="gradient-text">AIAdMaxify</span>?
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
              >
                <Card className="agency-card h-full">
                  <CardHeader className="text-center">
                    <item.icon size={64} className="text-accent mx-auto mb-4" />
                    <CardTitle className="text-xl font-bold text-primary">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Our <span className="gradient-text">AI-Powered Services</span>
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
              >
                <Card className="agency-card h-full">
                  <CardHeader>
                    <service.icon size={48} className="text-accent mb-4" />
                    <CardTitle className="text-xl font-bold text-primary">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle size={16} className="text-accent" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
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
            <Link to="/services">
              <Button className="agency-btn text-lg px-8 py-4">
                View All Services <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Client <span className="gradient-text">Success Stories</span>
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
              >
                <Card className="agency-card h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <CardDescription className="text-gray-600 italic text-lg">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="font-bold text-primary">{testimonial.name}</div>
                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                        <div className="text-sm text-gray-500">{testimonial.company}</div>
                      </div>
                      <Badge className="bg-accent text-white">
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
              <Button className="agency-btn text-lg px-8 py-4">
                View All Results <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-primary text-white section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                Ready to <span className="gradient-text">Transform</span> Your Business?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get a free strategy consultation and discover how our AI-powered marketing 
                solutions can drive unprecedented growth for your business.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-accent" />
                  <span>Free 30-minute strategy session</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-accent" />
                  <span>Custom marketing plan proposal</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle size={20} className="text-accent" />
                  <span>ROI projections for your business</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
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
                    <Button type="submit" className="agency-btn w-full text-lg py-3">
                      Get Free Strategy Call <Zap className="ml-2" size={20} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
