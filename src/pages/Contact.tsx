
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Shield, Award, Star, CheckCircle, Zap, Users, Send, MessageSquare, Calendar, HeadphonesIcon } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { storage } from '@/utils/localStorage';
import Navbar from '@/components/Navbar';
import EnhancedFooter from '@/components/EnhancedFooter';

const Contact = () => {
  const contactInfo = storage.getContactInfo();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security for all your data",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized industry leader in AI marketing",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Star,
      title: "5-Star Support",
      description: "24/7 dedicated customer success team",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "300% average ROI across all campaigns",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      primary: "info@aiadmaxify.com",
      secondary: "support@aiadmaxify.com",
      description: "Get a response within 2 hours",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      primary: "+1 (555) 123-4567",
      secondary: "+1 (555) 987-6543",
      description: "Speak with our experts directly",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      primary: "123 Business Street",
      secondary: "New York, NY 10001",
      description: "Our headquarters location",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      primary: "Mon - Fri: 9AM - 6PM EST",
      secondary: "Sat: 10AM - 4PM EST",
      description: "We're here when you need us",
      color: "from-orange-500 to-red-500"
    }
  ];

  const quickActions = [
    {
      icon: MessageSquare,
      title: "Start a Chat",
      description: "Get instant answers",
      action: "Chat Now",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Calendar,
      title: "Book a Call",
      description: "Schedule free consultation",
      action: "Book Now",
      color: "from-green-500 to-blue-500"
    },
    {
      icon: Send,
      title: "Send Message",
      description: "Detailed inquiry form",
      action: "Send Now",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background animations */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          opacity: [0.05, 0.02, 0.05]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 right-0 w-80 h-80 bg-purple-400 rounded-full"
      />
      
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <motion.div 
                  className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-2xl"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <HeadphonesIcon className="text-white" size={36} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-blue-300"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0, 0.8]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8"
            >
              Get in Touch
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Ready to transform your business with AI-powered marketing? Let's discuss your goals and create a strategy that delivers extraordinary results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer"
                >
                  <Card className="p-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-0 text-center">
                      <motion.div 
                        className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <action.icon className="text-white" size={20} />
                      </motion.div>
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{action.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{action.description}</p>
                      <span className="text-xs font-medium text-blue-600">{action.action}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                className="text-center group"
              >
                <Card className="p-6 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <motion.div 
                      className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="text-white" size={22} />
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Contact Form - Takes 2 columns */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"
                />
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    animate={{ 
                      x: [-100, 400],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="relative z-10"
                  >
                    <CardTitle className="text-2xl md:text-3xl text-center flex items-center justify-center space-x-3">
                      <Send size={28} />
                      <span>Send Us a Message</span>
                    </CardTitle>
                    <p className="text-blue-100 text-center mt-3 text-lg">We'll get back to you within 24 hours</p>
                  </motion.div>
                </CardHeader>
                <CardContent className="p-8 md:p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <ContactForm />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group"
                  >
                    <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <div className="flex items-start space-x-4">
                          <motion.div 
                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                          >
                            <method.icon className="text-white" size={20} />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{method.title}</h4>
                            <p className="text-gray-700 font-medium text-sm mb-1">{method.primary}</p>
                            <p className="text-gray-600 text-sm mb-2">{method.secondary}</p>
                            <p className="text-xs text-gray-500">{method.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Why Choose Us Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-hidden relative">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-white"
                  />
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.4 }}
                    >
                      <div className="flex items-center space-x-3 mb-6">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Users size={28} />
                        </motion.div>
                        <h3 className="text-xl font-bold">Why Choose AIAdMaxify?</h3>
                      </div>
                      <ul className="space-y-4">
                        {[
                          "Proven track record with 500+ successful campaigns",
                          "AI-powered strategies that adapt and optimize",
                          "Dedicated account management and support",
                          "Transparent reporting and real-time analytics",
                          "24/7 customer success team availability"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                            className="flex items-center space-x-3 group"
                          >
                            <motion.div
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                              className="w-2 h-2 bg-white rounded-full flex-shrink-0 group-hover:bg-yellow-300"
                            />
                            <span className="leading-relaxed">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.3, 1, 1.3]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full"
        />
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-white opacity-5 rounded-full"
        />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
            >
              Ready to Scale Your Business?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Join hundreds of businesses that have transformed their growth with our AI-powered marketing solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.a
                href="/strategy-call"
                className="bg-white text-blue-600 px-10 py-5 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-block shadow-2xl text-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Strategy Call
              </motion.a>
              <motion.a
                href="/services"
                className="border-2 border-white text-white px-10 py-5 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 inline-block text-lg"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "white",
                  color: "#2563eb",
                  boxShadow: "0 25px 50px rgba(255,255,255,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Services
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
};

export default Contact;
