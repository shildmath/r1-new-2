import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StrategyCallForm from '@/components/StrategyCallForm';
import { Calendar, Clock, Video, CheckCircle, Target, TrendingUp, Users, Zap } from 'lucide-react';

const StrategyCall = () => {
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

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white page-with-navbar section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="bg-accent text-white mb-6 text-lg px-4 py-2">
              Free 30-Minute Consultation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Book Your Free <span className="gradient-text">Strategy Call</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Discover how AI-powered marketing can transform your business. Get a custom strategy, 
              competitor analysis, and ROI projections - completely free.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="text-accent" size={20} />
                <span>30-minute session</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Video className="text-accent" size={20} />
                <span>Via Zoom or phone</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="text-accent" size={20} />
                <span>Available 7 days a week</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              What You'll <span className="gradient-text">Receive</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This isn't just another sales call. We'll provide genuine value and actionable 
              insights you can implement immediately.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="agency-card h-full text-center group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-primary">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form Section - Calendly style */}
      <section className="bg-secondary section-padding">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Book Your <span className="gradient-text">Free Consultation</span>
            </h2>
            <p className="text-xl text-gray-600">
              Choose a time that works for you, then enter your info to reserve your spot.
            </p>
          </motion.div>
          {/* Step-by-step calendly-like booking ux */}
          <StrategyCallForm />
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

export default StrategyCall;
