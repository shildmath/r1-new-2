
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { fetchSettings, updateSettings } from '@/utils/supabaseHelpers';

interface GroupedSettings {
  [group: string]: Record<string, string>;
}

const SiteSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<GroupedSettings>({
    contact: {},
    social: {},
    company: {},
    statistics: {}
  });
  const [loading, setLoading] = useState(true);
  const [savingGroup, setSavingGroup] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const data = await fetchSettings();
    setSettings(data);
    setLoading(false);
  };

  const handleInputChange = (group: string, key: string, value: string) => {
    setSettings({
      ...settings,
      [group]: {
        ...settings[group],
        [key]: value
      }
    });
  };

  const handleSave = async (group: string) => {
    if (!settings[group]) return;
    
    setSavingGroup(group);
    
    const updatesArray = Object.entries(settings[group]).map(([key, value]) => ({
      group,
      key,
      value
    }));
    
    const success = await updateSettings(updatesArray);
    
    setSavingGroup(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                  value={settings.contact?.email || ''}
                  onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                  placeholder="contact@company.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
                <Input
                  value={settings.contact?.phone || ''}
                  onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Business Address</label>
                <Textarea
                  value={settings.contact?.address || ''}
                  onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
                  placeholder="123 Business St, City, State 12345"
                  rows={3}
                />
              </div>
              <Button 
                onClick={() => handleSave('contact')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                disabled={savingGroup === 'contact'}
              >
                {savingGroup === 'contact' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Contact Info
                  </>
                )}
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
                  value={settings.social?.facebook || ''}
                  onChange={(e) => handleInputChange('social', 'facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </label>
                <Input
                  value={settings.social?.twitter || ''}
                  onChange={(e) => handleInputChange('social', 'twitter', e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </label>
                <Input
                  value={settings.social?.linkedin || ''}
                  onChange={(e) => handleInputChange('social', 'linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center">
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </label>
                <Input
                  value={settings.social?.instagram || ''}
                  onChange={(e) => handleInputChange('social', 'instagram', e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              <Button 
                onClick={() => handleSave('social')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                disabled={savingGroup === 'social'}
              >
                {savingGroup === 'social' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Social Links
                  </>
                )}
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
                  value={settings.company?.companyName || ''}
                  onChange={(e) => handleInputChange('company', 'companyName', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Tagline</label>
                <Input
                  value={settings.company?.tagline || ''}
                  onChange={(e) => handleInputChange('company', 'tagline', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Hero Description</label>
                <Textarea
                  value={settings.company?.heroDescription || ''}
                  onChange={(e) => handleInputChange('company', 'heroDescription', e.target.value)}
                  rows={4}
                />
              </div>
              <Button 
                onClick={() => handleSave('company')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                disabled={savingGroup === 'company'}
              >
                {savingGroup === 'company' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Company Info
                  </>
                )}
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
                    value={settings.statistics?.clientSatisfaction || ''}
                    onChange={(e) => handleInputChange('statistics', 'clientSatisfaction', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Average ROI</label>
                  <Input
                    value={settings.statistics?.averageROI || ''}
                    onChange={(e) => handleInputChange('statistics', 'averageROI', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Happy Clients</label>
                  <Input
                    value={settings.statistics?.happyClients || ''}
                    onChange={(e) => handleInputChange('statistics', 'happyClients', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Revenue Generated</label>
                  <Input
                    value={settings.statistics?.revenueGenerated || ''}
                    onChange={(e) => handleInputChange('statistics', 'revenueGenerated', e.target.value)}
                  />
                </div>
              </div>
              <Button 
                onClick={() => handleSave('statistics')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                disabled={savingGroup === 'statistics'}
              >
                {savingGroup === 'statistics' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Statistics
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteSettings;
