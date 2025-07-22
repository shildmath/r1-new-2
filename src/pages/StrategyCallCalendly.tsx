
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, Video, CheckCircle, Target, TrendingUp, Users, Zap, ExternalLink } from 'lucide-react';
import { useSalesRepresentatives } from '@/hooks/useSalesRepresentatives';

const StrategyCallCalendly = () => {
  const { data: salesReps, isLoading } = useSalesRepresentatives();

  const benefits = [
    {
      icon: Target,
      title: "Custom Strategy Development",
      description: "Receive a personalized marketing strategy tailored to your business goals and industry."
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunity Analysis",
      description: "Identify untapped opportunities and quick wins to accelerate your business growth."
    },
    {
      icon: Users,
      title: "Competitor Insights",
      description: "Learn what your competitors are doing and how to outperform them in the market."
    },
    {
      icon: Zap,
      title: "ROI Projections",
      description: "Get realistic projections of potential returns on your marketing investment."
    }
  ];

  const handleCalendlyClick = (calendlyLink: string) => {
    window.open(calendlyLink, '_blank');
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section - Enhanced Premium Design */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white page-with-navbar section-padding overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white mb-8 text-lg px-6 py-3 rounded-full shadow-2xl border border-cyan-400/30">
                ✨ Free 30-Minute Premium Consultation
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-serif font-bold mb-8 bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Book Your Free <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text">Strategy Call</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Discover how AI-powered marketing can transform your business. Get a custom strategy, 
              competitor analysis, and ROI projections - completely free.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div 
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <Calendar className="text-cyan-400" size={24} />
                <span className="font-semibold">30-minute session</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <Video className="text-cyan-400" size={24} />
                <span className="font-semibold">Via Zoom or phone</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                transition={{ duration: 0.3 }}
              >
                <Clock className="text-cyan-400" size={24} />
                <span className="font-semibold">Available 7 days a week</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Get Section - Enhanced Premium Design */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              What You'll <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text">Receive</span>
            </motion.h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              This isn't just another sales call. We'll provide genuine value and actionable 
              insights you can implement immediately.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  bounce: 0.4
                }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className="bg-white/70 backdrop-blur-lg h-full text-center border border-gray-200/50 shadow-xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="relative z-10">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl relative"
                      animate={{ 
                        y: [0, -3, 0],
                        rotate: [0, 1, -1, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 10,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <benefit.icon size={36} className="text-white" />
                      
                      {/* Sparkle Effect */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
                    </motion.div>
                    
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-4 -bottom-4 -left-4 -right-4 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sales Representatives Selection Section - Enhanced */}
      <section className="bg-white section-padding relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-8"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              Choose Your <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text">Expert</span>
            </motion.h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              Select the strategy expert you'd like to book a consultation with.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center">
              <motion.div 
                className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {salesReps?.map((rep, index) => (
                <motion.div
                  key={rep.id}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    bounce: 0.4
                  }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.03,
                    transition: { duration: 0.3 }
                  }}
                  className="group"
                >
                  <Card className="bg-white/80 backdrop-blur-lg h-full text-center border border-gray-200/50 shadow-xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden">
                    {/* Hover Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <CardHeader className="relative z-10 pb-4">
                      {rep.profile_photo && (
                        <motion.div 
                          className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img 
                            src={rep.profile_photo} 
                            alt={rep.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}
                      
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                        {rep.name}
                      </CardTitle>
                      <CardDescription className="text-blue-600 font-semibold text-lg">
                        {rep.title}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 relative z-10">
                      {rep.bio && (
                        <p className="text-gray-600 text-base leading-relaxed">
                          {rep.bio}
                        </p>
                      )}
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          onClick={() => handleCalendlyClick(rep.calendly_link)}
                          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group/button"
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            Book with {rep.name.split(' ')[0]}
                            <ExternalLink className="ml-2 h-5 w-5" />
                          </span>
                          
                          {/* Button Shimmer Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover/button:translate-x-full transition-transform duration-700"></div>
                        </Button>
                      </motion.div>
                    </CardContent>
                    
                    {/* Card Shimmer Effect */}
                    <div className="absolute inset-0 -top-4 -bottom-4 -left-4 -right-4 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-gradient-primary text-white section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Our <span className="gradient-text">Guarantee</span>
            </h2>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <CheckCircle size={64} className="text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">100% Value Guarantee</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                If you don't walk away from our strategy call with at least 3 actionable insights 
                that could improve your marketing results, we'll send you a $100 Amazon gift card. 
                That's how confident we are in the value we provide.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default StrategyCallCalendly;
