
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, TrendingUp, Calendar, CheckCircle, Zap, Users2, Medal, Star, Trophy, Globe, Lightbulb } from 'lucide-react';
import Navbar from '@/components/Navbar';
import EnhancedFooter from '@/components/EnhancedFooter';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Target, label: 'Success Rate', value: '95%' },
    { icon: Award, label: 'Awards Won', value: '15' },
    { icon: TrendingUp, label: 'Growth Rate', value: '300%' }
  ];

  const awards = [
    {
      year: '2024',
      title: 'Best AI Marketing Agency',
      organization: 'Digital Marketing Institute',
      icon: Trophy,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      year: '2023',
      title: 'Innovation Excellence Award',
      organization: 'Tech Innovation Council',
      icon: Lightbulb,
      color: 'from-blue-400 to-purple-500'
    },
    {
      year: '2023',
      title: 'Top Marketing Agency',
      organization: 'Business Excellence Awards',
      icon: Star,
      color: 'from-green-400 to-blue-500'
    },
    {
      year: '2022',
      title: 'Global Marketing Leader',
      organization: 'International Marketing Federation',
      icon: Globe,
      color: 'from-pink-400 to-red-500'
    }
  ];

  const journey = [
    {
      year: '2017',
      title: 'The Vision Begins',
      description: 'Founded AIAdMaxify with a revolutionary vision to transform digital marketing through cutting-edge AI technology',
      icon: Zap,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      metrics: 'Initial Investment: $50K',
      highlight: 'Founding Moment'
    },
    {
      year: '2018',
      title: 'AI Breakthrough', 
      description: 'Developed proprietary machine learning algorithms for intelligent customer targeting and campaign optimization',
      icon: Target,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      metrics: 'First 10 Clients',
      highlight: 'Technical Innovation'
    },
    {
      year: '2019',
      title: 'Market Validation',
      description: 'Achieved remarkable milestone of 100+ clients with an unprecedented 300% average ROI across all campaigns',
      icon: Users2,
      color: 'bg-gradient-to-br from-pink-500 to-pink-600',
      metrics: '100+ Clients, 300% ROI',
      highlight: 'Growth Milestone'
    },
    {
      year: '2020',
      title: 'Platform Evolution',
      description: 'Launched comprehensive AI-powered marketing platform integrating SEO, PPC, social media, and analytics',
      icon: Award,
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      metrics: '$1M+ Ad Spend Managed',
      highlight: 'Product Launch'
    },
    {
      year: '2021',
      title: 'Industry Recognition',
      description: 'Received prestigious "Best AI Marketing Agency" award and established ourselves as thought leaders',
      icon: Medal,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      metrics: '15+ Industry Awards',
      highlight: 'Recognition'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded operations internationally, now serving clients across 15 countries with localized strategies',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      metrics: '15 Countries, 250+ Clients',
      highlight: 'International Growth'
    },
    {
      year: '2023',
      title: 'Success Stories',
      description: 'Reached 500+ successful business transformations with AI-powered marketing solutions',
      icon: CheckCircle,
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      metrics: '500+ Success Stories',
      highlight: 'Client Success'
    },
    {
      year: '2024',
      title: 'Innovation Lab',
      description: 'Established dedicated R&D lab for next-generation marketing AI and predictive analytics',
      icon: Zap,
      color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
      metrics: '$2M R&D Investment',
      highlight: 'Future Focus'
    },
    {
      year: '2025',
      title: 'Leading Tomorrow',
      description: 'Pioneering the next wave of AI marketing transformation with advanced machine learning capabilities',
      icon: Target,
      color: 'bg-gradient-to-br from-blue-600 to-indigo-600',
      metrics: 'Next-Gen AI Platform',
      highlight: 'Vision 2025'
    }
  ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We leverage cutting-edge AI technology to deliver unprecedented marketing results.',
      icon: Zap
    },
    {
      title: 'Client Success',
      description: 'Your success is our success. We\'re committed to delivering measurable results.',
      icon: Users2
    },
    {
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from strategy to execution.',
      icon: Award
    },
    {
      title: 'Results-Driven',
      description: 'Every campaign is optimized for maximum ROI and business growth.',
      icon: Target
    }
  ];

  const teamMembers = [
    { name: 'Alex Johnson', role: 'CEO & Founder', bio: '10+ years in digital marketing and AI strategy', image: '/lovable-uploads/f28d1397-f087-49e3-b66b-6f8a17346fdc.png' },
    { name: 'Sarah Chen', role: 'Head of AI Marketing', bio: 'Former Google AI researcher with 8 years experience', image: '/lovable-uploads/80bafa31-117d-4d13-ac9f-23a08b241713.png' },
    { name: 'Mike Rodriguez', role: 'Creative Director', bio: 'Award-winning designer with 12 years in digital', image: '/lovable-uploads/80380992-ea0d-49be-9c56-569a7baa5096.png' },
    { name: 'Emily Davis', role: 'Data Scientist', bio: 'PhD in Machine Learning, AI optimization expert', image: null },
    { name: 'James Wilson', role: 'Marketing Strategist', bio: 'Growth hacking specialist, 300+ campaigns', image: null },
    { name: 'Lisa Thompson', role: 'Account Manager', bio: 'Client success expert, 95% retention rate', image: null },
    { name: 'David Kim', role: 'SEO Director', bio: 'Technical SEO master, 7 years experience', image: null },
    { name: 'Anna Garcia', role: 'Social Media Lead', bio: 'Viral content creator, millions of engagements', image: null },
    { name: 'Tom Brown', role: 'PPC Specialist', bio: 'Google Ads certified, $50M+ ad spend managed', image: null },
    { name: 'Rachel Lee', role: 'Content Manager', bio: 'Brand storytelling expert, 500+ articles published', image: null },
    { name: 'Kevin Zhang', role: 'Tech Lead', bio: 'Full-stack developer, marketing automation expert', image: null },
    { name: 'Sophie Martin', role: 'Analytics Manager', bio: 'Data visualization specialist, actionable insights', image: null },
    { name: 'Carlos Silva', role: 'Email Marketing Director', bio: 'Email automation expert, 45% avg open rates', image: null },
    { name: 'Maya Patel', role: 'Conversion Optimizer', bio: 'CRO specialist, doubled client conversions', image: null },
    { name: 'Ryan Murphy', role: 'Brand Strategist', bio: 'Brand positioning expert, Fortune 500 experience', image: null },
    { name: 'Jessica Wang', role: 'Video Marketing Lead', bio: 'Video content creator, 100M+ views generated', image: null },
    { name: 'Mark Taylor', role: 'Mobile Marketing Expert', bio: 'App marketing specialist, 10M+ downloads', image: null },
    { name: 'Olivia Johnson', role: 'Influencer Relations', bio: 'Influencer partnership expert, 1000+ collaborations', image: null },
    { name: 'Daniel Lee', role: 'E-commerce Specialist', bio: 'Online store optimization, 400% revenue growth', image: null },
    { name: 'Grace Chen', role: 'Customer Success Manager', bio: 'Client onboarding expert, seamless transitions', image: null }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const journeyItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 pt-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto relative"
          >
            {/* Floating elements */}
            <motion.div
              animate={{ 
                y: [-20, 20, -20],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-16 -left-16 w-32 h-32 bg-blue-200 rounded-full opacity-20"
            />
            <motion.div
              animate={{ 
                y: [20, -20, 20],
                rotate: [0, -15, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute -top-8 -right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20"
            />

            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-primary mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AIAdMaxify</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We're a team of passionate digital marketing experts and AI specialists 
              dedicated to transforming businesses through intelligent marketing solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Badge className="text-lg py-2 px-6 bg-gradient-to-r from-primary to-accent">
                Established 2017 • 500+ Success Stories
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <motion.div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="text-white" size={32} />
                </motion.div>
                <motion.h3 
                  className="text-3xl font-bold text-primary mb-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                >
                  {stat.value}
                </motion.h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Awards & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Recognition</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry recognition for our innovative AI-powered marketing solutions
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {awards.map((award, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="text-center"
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <CardContent className="p-0">
                    <motion.div 
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${award.color} flex items-center justify-center`}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <award.icon className="text-white" size={24} />
                    </motion.div>
                    <Badge className="mb-3">{award.year}</Badge>
                    <h3 className="text-lg font-bold text-primary mb-2">{award.title}</h3>
                    <p className="text-sm text-gray-600">{award.organization}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Journey Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-primary mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From a visionary startup in 2017 to the industry-leading AI marketing powerhouse of 2025
            </motion.p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* Enhanced Timeline line with gradient */}
              <motion.div 
                className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-600 rounded-full shadow-lg"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "100%", opacity: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              
              {journey.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`relative flex items-center mb-16 lg:mb-20 ${
                    index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Enhanced Timeline dot with pulsing effect */}
                  <motion.div 
                    className={`hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-20 h-20 ${milestone.color} rounded-full border-4 border-white shadow-2xl z-10 flex items-center justify-center group`}
                    variants={journeyItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    whileHover={{ 
                      scale: 1.3,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }}
                  >
                    <milestone.icon className="text-white group-hover:scale-110 transition-transform duration-300" size={28} />
                    
                    {/* Pulsing ring effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/30"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </motion.div>
                  
                  {/* Enhanced Content card */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <motion.div
                      whileHover={{ 
                        scale: 1.03, 
                        y: -8,
                        boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                      }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                      className="group"
                    >
                      <Card className="p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm relative overflow-hidden">
                        {/* Gradient overlay on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                        />
                        
                        <CardContent className="p-0 relative z-10">
                          <div className="flex items-center mb-6">
                            <motion.div 
                              className={`w-16 h-16 rounded-2xl ${milestone.color} flex items-center justify-center mr-6 lg:hidden shadow-lg`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              <milestone.icon className="text-white" size={24} />
                            </motion.div>
                            <div className="flex-1">
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 + 0.8 }}
                              >
                                <Badge className={`${milestone.color} text-white mb-3 text-sm px-3 py-1`}>
                                  {milestone.year}
                                </Badge>
                                <Badge variant="outline" className="ml-2 text-xs">
                                  {milestone.highlight}
                                </Badge>
                              </motion.div>
                              <motion.h4 
                                className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 + 1.0 }}
                              >
                                {milestone.title}
                              </motion.h4>
                            </div>
                          </div>
                          
                          <motion.p 
                            className="text-gray-600 leading-relaxed mb-4 text-lg"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 + 1.2 }}
                          >
                            {milestone.description}
                          </motion.p>
                          
                          <motion.div
                            className="flex items-center justify-between pt-4 border-t border-gray-100"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 + 1.4 }}
                          >
                            <div className="text-sm font-semibold text-blue-600">
                              {milestone.metrics}
                            </div>
                            <motion.div
                              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ 
                                duration: 2,
                                repeat: Infinity,
                                delay: index * 0.5
                              }}
                            />
                          </motion.div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center"
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 border-t-4 border-t-primary">
                  <CardContent className="p-0">
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <value.icon className="text-white" size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-primary mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The brilliant minds behind our AI-powered marketing success
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center"
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  <CardContent className="p-0">
                    <motion.div 
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-accent overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Users className="text-gray-400" size={28} />
                        </div>
                      )}
                    </motion.div>
                    <h3 className="text-lg font-bold text-primary mb-1">{member.name}</h3>
                    <p className="text-purple-600 font-medium mb-2 text-sm">{member.role}</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
        {/* Animated background */}
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
          className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full"
        />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Be Part of Our Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses who have transformed their growth with our AI-powered marketing solutions.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Today
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
};

export default About;
