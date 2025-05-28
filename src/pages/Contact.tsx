import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import { ArrowRight, CheckCircle } from 'lucide-react';
const Contact = () => {
  const reasons = [{
    icon: CheckCircle,
    title: "Free Consultation",
    description: "Get expert advice on your marketing strategy at no cost"
  }, {
    icon: CheckCircle,
    title: "Custom Strategy",
    description: "Receive a tailored marketing plan for your business"
  }, {
    icon: CheckCircle,
    title: "Quick Response",
    description: "We respond to all inquiries within 24 hours"
  }, {
    icon: CheckCircle,
    title: "No Obligation",
    description: "No pressure, just valuable insights and recommendations"
  }];
  return <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white page-with-navbar section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <Badge className="bg-accent text-white mb-6 text-lg px-4 py-2">
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Let's discuss how our AI-powered marketing solutions can help you achieve 
              extraordinary growth. Get your free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/strategy-call">
                <Button className="agency-btn text-lg px-8 py-4">
                  Book Strategy Call <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Button variant="outline" onClick={() => document.getElementById('contact-form')?.scrollIntoView({
              behavior: 'smooth'
            })} className="agency-btn-outline text-lg px-8 py-4 text-green-600">
                Send Message
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us. Choose the method that works best for you.
            </p>
          </motion.div>

          <ContactInfo />
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="bg-secondary section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactForm />

            {/* Why Contact Us */}
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8
          }} className="space-y-8">
              <div>
                <h3 className="text-3xl font-serif font-bold text-primary mb-6">
                  Why <span className="gradient-text">Contact Us</span>?
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  When you reach out to AIAdMaxify, you're not just getting another marketing agency. 
                  You're getting a strategic partner committed to your success.
                </p>
              </div>

              <div className="space-y-6">
                {reasons.map((reason, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: index * 0.1
              }} className="flex items-start space-x-4 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <reason.icon size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">{reason.title}</h4>
                      <p className="text-gray-600">{reason.description}</p>
                    </div>
                  </motion.div>)}
              </div>

              <Card className="bg-gradient-to-br from-accent to-primary text-white border-0">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-2">🚀 Special Offer</h4>
                  <p className="mb-4">
                    Book a strategy call this week and receive a free competitor analysis 
                    worth $500!
                  </p>
                  <Link to="/strategy-call">
                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
                      Claim Free Analysis
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>;
};
export default Contact;