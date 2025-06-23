
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Target, Award, TrendingUp, Calendar, CheckCircle, Zap, Users2, Medal, Star, Trophy, Globe, Lightbulb } from 'lucide-react';
import Navbar from '@/components/Navbar';
import EnhancedFooter from '@/components/EnhancedFooter';
import { useTeamMembers, useAboutStats, useAwards, useJourneyMilestones } from '@/hooks/useAboutData';

const iconMap = {
  users: Users,
  target: Target,
  award: Award,
  'trending-up': TrendingUp,
  calendar: Calendar,
  'check-circle': CheckCircle,
  zap: Zap,
  'users-2': Users2,
  medal: Medal,
  star: Star,
  trophy: Trophy,
  globe: Globe,
  lightbulb: Lightbulb,
};

const About = () => {
  const { data: teamMembers = [] } = useTeamMembers();
  const { data: aboutStats } = useAboutStats();
  const { data: awards = [] } = useAwards();
  const { data: journeyMilestones = [] } = useJourneyMilestones();

  const stats = aboutStats ? [
    { icon: Users, label: 'Happy Clients', value: aboutStats.happy_clients },
    { icon: Target, label: 'Success Rate', value: aboutStats.success_rate },
    { icon: Award, label: 'Awards Won', value: aboutStats.awards_won },
    { icon: TrendingUp, label: 'Growth Rate', value: aboutStats.growth_rate }
  ] : [];

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
                Established 2017 • {aboutStats?.happy_clients || '500+'} Success Stories
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
            {awards.map((award, index) => {
              const IconComponent = iconMap[award.icon] || Trophy;
              return (
                <motion.div
                  key={award.id}
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
                        <IconComponent className="text-white" size={24} />
                      </motion.div>
                      <Badge className="mb-3">{award.year}</Badge>
                      <h3 className="text-lg font-bold text-primary mb-2">{award.title}</h3>
                      <p className="text-sm text-gray-600">{award.organization}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Journey Section with Flip-Flop Layout */}
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
              From a visionary startup in 2017 to the industry-leading AI marketing powerhouse of today
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
              
              {journeyMilestones.map((milestone, index) => {
                const IconComponent = iconMap[milestone.icon] || Zap;
                return (
                  <motion.div
                    key={milestone.id}
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
                      className={`hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-20 h-20 ${milestone.color.replace('bg-gradient-to-br', 'bg-gradient-to-r')} rounded-full border-4 border-white shadow-2xl z-10 flex items-center justify-center group`}
                      variants={journeyItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      whileHover={{ 
                        scale: 1.3,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                      }}
                    >
                      <IconComponent className="text-white group-hover:scale-110 transition-transform duration-300" size={28} />
                      
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
                                <IconComponent className="text-white" size={24} />
                              </motion.div>
                              <div className="flex-1">
                                <motion.div
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.2 + 0.8 }}
                                >
                                  <Badge className={`${milestone.color.replace('bg-gradient-to-br', 'bg-gradient-to-r')} text-white mb-3 text-sm px-3 py-1`}>
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
                );
              })}
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
                key={member.id}
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
                      {member.profile_photo ? (
                        <img src={member.profile_photo} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Users className="text-gray-400" size={28} />
                        </div>
                      )}
                    </motion.div>
                    <h3 className="text-lg font-bold text-primary mb-1">{member.name}</h3>
                    <p className="text-purple-600 font-medium mb-2 text-sm">{member.role}</p>
                    {member.bio && <p className="text-gray-600 text-xs leading-relaxed">{member.bio}</p>}
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
