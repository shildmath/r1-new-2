
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import { 
  ArrowRight, 
  Award, 
  Users, 
  Target, 
  Globe,
  Brain,
  TrendingUp,
  Zap
} from 'lucide-react';

const About = () => {
  const stats = [
    { value: "500+", label: "Clients Served", icon: Users },
    { value: "97%", label: "Success Rate", icon: Target },
    { value: "15+", label: "Industries", icon: Globe },
    { value: "$50M+", label: "Revenue Generated", icon: TrendingUp }
  ];

  const teamMembers = [
    {
      name: "Alex Rodriguez",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "10+ years of digital marketing expertise with a focus on AI-driven strategies. Former Google marketing lead with a passion for transforming businesses.",
      expertise: ["AI Marketing", "Strategy", "Leadership"]
    },
    {
      name: "Sarah Johnson",
      position: "Head of AI Strategy",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "AI researcher and marketing strategist with a PhD in Machine Learning. Specializes in developing cutting-edge AI solutions for marketing automation.",
      expertise: ["Machine Learning", "AI Automation", "Data Science"]
    },
    {
      name: "Michael Chen",
      position: "Creative Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "Award-winning creative director with 8+ years of experience in brand storytelling and visual design. Expert in creating compelling campaigns.",
      expertise: ["Brand Design", "Creative Strategy", "Content Creation"]
    },
    {
      name: "Emily Davis",
      position: "Performance Marketing Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Performance marketing expert with proven track record of scaling campaigns to 7-figure revenues. Google Ads and Facebook Blueprint certified.",
      expertise: ["PPC Advertising", "Analytics", "ROI Optimization"]
    },
    {
      name: "David Park",
      position: "SEO & Content Strategist",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
      bio: "SEO specialist with expertise in technical SEO and content marketing. Has helped 200+ businesses achieve first-page Google rankings.",
      expertise: ["SEO", "Content Marketing", "Technical Optimization"]
    },
    {
      name: "Lisa Thompson",
      position: "Social Media Director",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face",
      bio: "Social media strategist with 6+ years of experience building communities and driving engagement across all major platforms.",
      expertise: ["Social Media", "Community Building", "Influencer Marketing"]
    },
    {
      name: "James Wilson",
      position: "Data Analytics Manager",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
      bio: "Data scientist and analytics expert specializing in marketing attribution and predictive modeling. Former Amazon data analyst.",
      expertise: ["Data Analytics", "Predictive Modeling", "Attribution"]
    },
    {
      name: "Maria Garcia",
      position: "Client Success Manager",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      bio: "Client relationship expert with 7+ years of experience ensuring client satisfaction and driving account growth. Certified in customer success.",
      expertise: ["Client Relations", "Account Management", "Growth Strategy"]
    },
    {
      name: "Robert Kim",
      position: "Video Marketing Specialist",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=300&h=300&fit=crop&crop=face",
      bio: "Video production and marketing expert with Emmy Award recognition. Specializes in creating viral video content and YouTube growth strategies.",
      expertise: ["Video Production", "YouTube Marketing", "Viral Content"]
    },
    {
      name: "Jennifer Lee",
      position: "Email Marketing Specialist",
      image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop&crop=face",
      bio: "Email marketing expert with proven track record of achieving 40%+ open rates and 8%+ CTR. Certified in marketing automation platforms.",
      expertise: ["Email Marketing", "Automation", "List Building"]
    },
    {
      name: "Daniel Brown",
      position: "Conversion Rate Optimization Expert",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      bio: "CRO specialist with expertise in A/B testing and user experience optimization. Has improved conversion rates for 300+ websites.",
      expertise: ["A/B Testing", "UX Optimization", "Funnel Analysis"]
    },
    {
      name: "Grace Wong",
      position: "Brand Strategist",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      bio: "Brand strategy consultant with 9+ years of experience helping companies build strong brand identities and market positioning.",
      expertise: ["Brand Strategy", "Market Research", "Positioning"]
    }
  ];

  const values = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "We leverage cutting-edge AI technology to stay ahead of the curve and deliver unprecedented results for our clients."
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Every strategy is tailored to our clients' unique needs and goals. Your success is our success."
    },
    {
      icon: TrendingUp,
      title: "Results-Driven",
      description: "We focus on measurable outcomes and ROI. Every campaign is optimized for maximum performance."
    },
    {
      icon: Zap,
      title: "Agile Execution",
      description: "We move fast and adapt quickly to market changes, ensuring our clients stay competitive."
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
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
            <Badge className="bg-blue-600 text-white mb-4 sm:mb-6 text-base sm:text-lg px-3 sm:px-4 py-1 sm:py-2 pulse-glow">
              Meet Our Team
            </Badge>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bounce-in">
              The <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Minds Behind</span> the Magic
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 fade-in">
              We're a team of passionate marketers, data scientists, and AI experts dedicated to 
              transforming businesses through innovative digital marketing strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg pulse-glow"
              >
                <stat.icon size={32} className="sm:w-10 sm:h-10 text-purple-600 mx-auto mb-2 sm:mb-4" />
                <div className="text-2xl sm:text-4xl lg:text-6xl font-bold text-purple-600 mb-1 sm:mb-2 bounce-in">{stat.value}</div>
                <div className="text-xs sm:text-base text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 float-animation"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 bounce-in">
              Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Core Values</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto slide-up">
              The principles that guide everything we do and drive our commitment to excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="scale-on-hover"
              >
                <Card className="h-full text-center p-4 sm:p-6 shadow-xl border-0 bg-white glow-border">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 rotate-on-hover"
                  >
                    <value.icon size={24} className="sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 bounce-in">{value.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 slide-up">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 float-animation"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 bounce-in">
              Meet Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Expert Team</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto slide-up">
              Industry experts and innovators working together to drive your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers && teamMembers.map((member, index) => (
              member ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="scale-on-hover"
                >
                  <Card className="h-full shadow-xl border-0 bg-white overflow-hidden glow-border">
                    <div className="relative">
                      <motion.img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-48 sm:h-64 object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 bounce-in">{member.name}</h3>
                      <p className="text-purple-600 font-medium mb-2 sm:mb-3 slide-up text-sm sm:text-base">{member.position}</p>
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 fade-in">{member.bio}</p>
                      
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {member.expertise && member.expertise.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: skillIndex * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium shimmer"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : null
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="float-animation"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bounce-in">
              Ready to Work with <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">the Best</span>?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 slide-up">
              Our expert team is ready to transform your business with cutting-edge AI marketing strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/strategy-call">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shimmer">
                    Book Free Consultation <ArrowRight className="ml-2" size={18} />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="w-full sm:w-auto border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 glow-border">
                    Contact Our Team
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

export default About;
