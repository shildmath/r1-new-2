
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Shield, Award, Star, CheckCircle, Zap, Users } from 'lucide-react';
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
      description: "Bank-level security for all your data"
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized industry leader in AI marketing"
    },
    {
      icon: Star,
      title: "5-Star Support",
      description: "24/7 dedicated customer success team"
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "300% average ROI across all campaigns"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-white" size={32} />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
            >
              Get in Touch
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Ready to transform your business with AI-powered marketing? Let's discuss your goals and create a strategy that delivers extraordinary results.
            </motion.p>

            {/* Floating animation elements */}
            <motion.div
              animate={{ 
                y: [-10, 10, -10],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-32 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20"
            />
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-48 right-16 w-20 h-20 bg-purple-200 rounded-full opacity-20"
            />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
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
                className="text-center"
              >
                <Card className="p-6 h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <motion.div 
                      className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="text-white" size={20} />
                    </motion.div>
                    <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"
                />
                <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <CardTitle className="text-2xl text-center flex items-center justify-center space-x-2">
                      <Zap size={24} />
                      <span>Send Us a Message</span>
                    </CardTitle>
                    <p className="text-blue-100 text-center mt-2">We'll get back to you within 24 hours</p>
                  </motion.div>
                </CardHeader>
                <CardContent className="p-8">
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

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Let's Start a Conversation</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Whether you're looking to scale your existing business or launch something new, our team of experts is here to help you navigate the digital landscape and achieve extraordinary growth.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden relative">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-white"
                  />
                  <CardContent className="p-8 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                    >
                      <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                        <Users size={24} />
                        <span>Why Choose AIAdMaxify?</span>
                      </h3>
                      <ul className="space-y-4">
                        {[
                          "Proven track record with 500+ successful campaigns",
                          "AI-powered strategies that adapt and optimize",
                          "Dedicated account management and support",
                          "Transparent reporting and real-time analytics"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                            className="flex items-center space-x-3"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                              className="w-2 h-2 bg-white rounded-full flex-shrink-0"
                            />
                            <span>{item}</span>
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

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full"
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Scale Your Business?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Join hundreds of businesses that have transformed their growth with our AI-powered marketing solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="/strategy-call"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 inline-block shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Strategy Call
              </motion.a>
              <motion.a
                href="/services"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 inline-block"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "white",
                  color: "#2563eb"
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
