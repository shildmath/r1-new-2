
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
      title: 'Company Founded',
      description: 'Started with a vision to revolutionize digital marketing through AI',
      icon: Zap,
      color: 'bg-blue-500'
    },
    {
      year: '2018',
      title: 'First AI Implementation', 
      description: 'Developed proprietary AI algorithms for customer targeting',
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      year: '2019',
      title: '100+ Clients Milestone',
      description: 'Reached our first major client milestone with 300% average ROI',
      icon: Users2,
      color: 'bg-pink-500'
    },
    {
      year: '2020',
      title: 'AI Marketing Platform',
      description: 'Launched comprehensive AI-powered marketing platform',
      icon: Award,
      color: 'bg-red-500'
    },
    {
      year: '2021',
      title: 'Industry Recognition',
      description: 'Won "Best AI Marketing Agency" award from Digital Marketing Institute',
      icon: Medal,
      color: 'bg-orange-500'
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded operations to serve clients across 15 countries',
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      year: '2023',
      title: '500+ Success Stories',
      description: 'Helped over 500 businesses achieve remarkable growth',
      icon: CheckCircle,
      color: 'bg-emerald-500'
    },
    {
      year: '2024',
      title: 'AI Innovation Lab',
      description: 'Established dedicated R&D lab for next-gen marketing AI',
      icon: Zap,
      color: 'bg-cyan-500'
    },
    {
      year: '2025',
      title: 'Future Vision',
      description: 'Leading the next wave of AI-powered marketing transformation',
      icon: Target,
      color: 'bg-blue-600'
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

      {/* Journey Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup in 2017 to an industry-leading AI marketing agency in 2025
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <motion.div 
                className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary to-accent"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 2, delay: 0.5 }}
              ></motion.div>
              
              {journey.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div 
                    className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 ${milestone.color} rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <milestone.icon className="text-white" size={20} />
                  </motion.div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-l-primary">
                        <CardContent className="p-0">
                          <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 rounded-full ${milestone.color} flex items-center justify-center mr-4 md:hidden`}>
                              <milestone.icon className="text-white" size={20} />
                            </div>
                            <div>
                              <Badge className={`${milestone.color} text-white mb-2`}>{milestone.year}</Badge>
                              <h4 className="text-lg font-semibold text-gray-800">{milestone.title}</h4>
                            </div>
                          </div>
                          <p className="text-gray-600">{milestone.description}</p>
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
