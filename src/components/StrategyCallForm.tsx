
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from 'lucide-react';

const StrategyCallForm = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: Replace with Supabase integration
      console.log('Strategy call form submitted:', {
        ...formData,
        type: 'strategy_call',
        submittedAt: new Date().toISOString()
      });
      
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book strategy call. Please try again.",
        variant: "destructive"
      });
    }
  };

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
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
    </motion.div>
  );
};

export default StrategyCallForm;
