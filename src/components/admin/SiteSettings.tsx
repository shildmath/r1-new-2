
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const SiteSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    // Contact Information
    email: "hello@aiadmaxify.com",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Drive, Tech City, TC 12345",
    
    // Social Media Links
    facebook: "https://facebook.com/aiadmaxify",
    twitter: "https://twitter.com/aiadmaxify",
    linkedin: "https://linkedin.com/company/aiadmaxify",
    instagram: "https://instagram.com/aiadmaxify",
    
    // Company Information
    companyName: "AIAdMaxify",
    tagline: "AI-Powered Marketing Solutions",
    heroDescription: "Transform your business with cutting-edge AI marketing strategies that deliver measurable results and drive sustainable growth.",
    
    // Statistics
    clientSatisfaction: "97%",
    averageROI: "17X",
    happyClients: "2500+",
    revenueGenerated: "$250M+"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (section: string) => {
    // TODO: Save to Supabase
    console.log(`Saving ${section} settings:`, settings);
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
        <p className="text-gray-600">Manage your website content and contact information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-purple-600" />
                Contact Information
              </CardTitle>
              <CardDescription>Update your business contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  placeholder="contact@company.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
                <Input
                  name="phone"
                  value={settings.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Business Address</label>
                <Textarea
                  name="address"
                  value={settings.address}
                  onChange={handleInputChange}
                  placeholder="123 Business St, City, State 12345"
                  rows={3}
                />
              </div>
              <Button 
                onClick={() => handleSave('Contact Information')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Contact Info
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Facebook className="w-5 h-5 mr-2 text-purple-600" />
                Social Media Links
              </CardTitle>
              <CardDescription>Manage your social media presence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </label>
                <Input
                  name="facebook"
                  value={settings.facebook}
                  onChange={handleInputChange}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </label>
                <Input
                  name="twitter"
                  value={settings.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </label>
                <Input
                  name="linkedin"
                  value={settings.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </label>
                <Input
                  name="instagram"
                  value={settings.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              <Button 
                onClick={() => handleSave('Social Media')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Social Links
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Company Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details and messaging</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Company Name</label>
                <Input
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tagline</label>
                <Input
                  name="tagline"
                  value={settings.tagline}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Hero Description</label>
                <Textarea
                  name="heroDescription"
                  value={settings.heroDescription}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <Button 
                onClick={() => handleSave('Company Information')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Company Info
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Homepage Statistics</CardTitle>
              <CardDescription>Update the key metrics displayed on your homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Client Satisfaction</label>
                  <Input
                    name="clientSatisfaction"
                    value={settings.clientSatisfaction}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Average ROI</label>
                  <Input
                    name="averageROI"
                    value={settings.averageROI}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Happy Clients</label>
                  <Input
                    name="happyClients"
                    value={settings.happyClients}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Revenue Generated</label>
                  <Input
                    name="revenueGenerated"
                    value={settings.revenueGenerated}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button 
                onClick={() => handleSave('Statistics')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Statistics
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteSettings;
