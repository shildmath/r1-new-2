
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, Video, CheckCircle, Target, TrendingUp, Users, Zap } from 'lucide-react';

const StrategyCall = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    industry: '',
    teamSize: '',
    revenue: '',
    currentMarketing: [],
    challenges: '',
    goals: '',
    timeline: '',
    budget: '',
    preferredTime: '',
    additionalInfo: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        currentMarketing: [...formData.currentMarketing, value]
      });
    } else {
      setFormData({
        ...formData,
        currentMarketing: formData.currentMarketing.filter(item => item !== value)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Strategy call form submitted:', formData);
    toast({
      title: "Strategy Call Booked!",
      description: "Thank you! We'll send you a calendar link within 30 minutes to schedule your free consultation.",
    });
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      industry: '',
      teamSize: '',
      revenue: '',
      currentMarketing: [],
      challenges: '',
      goals: '',
      timeline: '',
      budget: '',
      preferredTime: '',
      additionalInfo: ''
    });
  };

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

  const marketingChannels = [
    'Social Media Marketing',
    'Google Ads (PPC)',
    'SEO & Content Marketing',
    'Email Marketing',
    'Facebook/Instagram Ads',
    'LinkedIn Marketing',
    'YouTube Marketing',
    'Influencer Marketing',
    'Traditional Advertising',
    'No current marketing'
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white pt-24 section-padding">
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
              <div className="flex items-center space-x-2">
                <Calendar className="text-accent" size={20} />
                <span>30-minute session</span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="text-accent" size={20} />
                <span>Via Zoom or phone</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-accent" size={20} />
                <span>Available 7 days a week</span>
              </div>
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
              >
                <Card className="agency-card h-full text-center">
                  <CardHeader>
                    <benefit.icon size={48} className="text-accent mx-auto mb-4" />
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

      {/* Booking Form Section */}
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
              Fill out the form below to help us prepare a customized strategy for your business.
            </p>
          </motion.div>

          <Card className="agency-card">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Business Information */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Business Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input
                      name="company"
                      placeholder="Company Name *"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      name="website"
                      placeholder="Website URL"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={formData.industry} onValueChange={(value) => handleSelectChange('industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Industry *" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="real-estate">Real Estate</SelectItem>
                        <SelectItem value="professional-services">Professional Services</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={formData.teamSize} onValueChange={(value) => handleSelectChange('teamSize', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Team Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 employees</SelectItem>
                        <SelectItem value="6-20">6-20 employees</SelectItem>
                        <SelectItem value="21-50">21-50 employees</SelectItem>
                        <SelectItem value="51-100">51-100 employees</SelectItem>
                        <SelectItem value="100+">100+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={formData.revenue} onValueChange={(value) => handleSelectChange('revenue', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Annual Revenue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-100k">Under $100K</SelectItem>
                        <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                        <SelectItem value="over-10m">Over $10M</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Current Marketing */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Current Marketing Activities</h3>
                  <p className="text-gray-600 mb-4">Select all that apply:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {marketingChannels.map((channel) => (
                      <div key={channel} className="flex items-center space-x-2">
                        <Checkbox
                          id={channel}
                          checked={formData.currentMarketing.includes(channel)}
                          onCheckedChange={(checked) => handleCheckboxChange(channel, checked as boolean)}
                        />
                        <label htmlFor={channel} className="text-sm text-gray-700">
                          {channel}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goals and Challenges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Main Business Goals *
                    </label>
                    <Textarea
                      name="goals"
                      placeholder="What are your main business and marketing goals for the next 12 months?"
                      value={formData.goals}
                      onChange={handleInputChange}
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-primary mb-2 block">
                      Current Challenges *
                    </label>
                    <Textarea
                      name="challenges"
                      placeholder="What are your biggest marketing challenges right now?"
                      value={formData.challenges}
                      onChange={handleInputChange}
                      className="min-h-[100px]"
                      required
                    />
                  </div>
                </div>

                {/* Budget and Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select value={formData.budget} onValueChange={(value) => handleSelectChange('budget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Marketing Budget *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-2k">Under $2,000/month</SelectItem>
                      <SelectItem value="2k-5k">$2,000 - $5,000/month</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000/month</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000/month</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000/month</SelectItem>
                      <SelectItem value="over-50k">Over $50,000/month</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={formData.timeline} onValueChange={(value) => handleSelectChange('timeline', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Timeline to Start *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={formData.preferredTime} onValueChange={(value) => handleSelectChange('preferredTime', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred Call Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8am-12pm EST)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12pm-5pm EST)</SelectItem>
                      <SelectItem value="evening">Evening (5pm-8pm EST)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Information */}
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">
                    Additional Information
                  </label>
                  <Textarea
                    name="additionalInfo"
                    placeholder="Anything else you'd like us to know before our call?"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="text-center pt-6">
                  <Button type="submit" className="agency-btn text-lg px-12 py-4">
                    Book My Free Strategy Call <Calendar className="ml-2" size={20} />
                  </Button>
                  <p className="text-sm text-gray-600 mt-4">
                    No spam, no obligations. We'll send you a calendar link within 30 minutes.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
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
