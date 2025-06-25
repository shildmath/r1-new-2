
import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useFooterConfig, useUpdateFooterConfig } from "@/hooks/useFooterConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Save, Loader2 } from "lucide-react";

const EditFooterPage = () => {
  const { data: config, isLoading } = useFooterConfig();
  const updateFooterConfig = useUpdateFooterConfig();

  const [formData, setFormData] = useState({
    company_name: '',
    company_description: '',
    contact_email: '',
    contact_phone: '',
    contact_address: '',
    copyright_text: '',
    newsletter_title: '',
    newsletter_placeholder: '',
    privacy_policy_link: '',
    terms_of_service_link: '',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    twitter_url: '',
    youtube_url: '',
    quick_links: [] as Array<{name: string; href: string}>,
    services_list: [] as string[],
  });

  useEffect(() => {
    if (config) {
      setFormData({
        company_name: config.company_name,
        company_description: config.company_description,
        contact_email: config.contact_email,
        contact_phone: config.contact_phone,
        contact_address: config.contact_address,
        copyright_text: config.copyright_text,
        newsletter_title: config.newsletter_title,
        newsletter_placeholder: config.newsletter_placeholder,
        privacy_policy_link: config.privacy_policy_link,
        terms_of_service_link: config.terms_of_service_link,
        facebook_url: config.facebook_url,
        instagram_url: config.instagram_url,
        linkedin_url: config.linkedin_url,
        twitter_url: config.twitter_url,
        youtube_url: config.youtube_url,
        quick_links: config.quick_links,
        services_list: config.services_list,
      });
    }
  }, [config]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickLinkChange = (index: number, field: 'name' | 'href', value: string) => {
    const newQuickLinks = [...formData.quick_links];
    newQuickLinks[index] = { ...newQuickLinks[index], [field]: value };
    setFormData(prev => ({ ...prev, quick_links: newQuickLinks }));
  };

  const addQuickLink = () => {
    setFormData(prev => ({
      ...prev,
      quick_links: [...prev.quick_links, { name: '', href: '' }]
    }));
  };

  const removeQuickLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      quick_links: prev.quick_links.filter((_, i) => i !== index)
    }));
  };

  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...formData.services_list];
    newServices[index] = value;
    setFormData(prev => ({ ...prev, services_list: newServices }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services_list: [...prev.services_list, '']
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services_list: prev.services_list.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config) {
      updateFooterConfig.mutate({
        id: config.id,
        ...formData
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex">
        <AdminSidebar />
        <main className="flex-1 p-8 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Edit Footer</h1>
            <Button 
              onClick={handleSubmit}
              disabled={updateFooterConfig.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {updateFooterConfig.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>

          <Tabs defaultValue="company" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="company">Company Info</TabsTrigger>
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => handleInputChange('company_name', e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company_description">Company Description</Label>
                    <Textarea
                      id="company_description"
                      value={formData.company_description}
                      onChange={(e) => handleInputChange('company_description', e.target.value)}
                      placeholder="Enter company description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="copyright_text">Copyright Text</Label>
                    <Input
                      id="copyright_text"
                      value={formData.copyright_text}
                      onChange={(e) => handleInputChange('copyright_text', e.target.value)}
                      placeholder="© 2024 Company Name. All rights reserved."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="newsletter_title">Newsletter Title</Label>
                      <Input
                        id="newsletter_title"
                        value={formData.newsletter_title}
                        onChange={(e) => handleInputChange('newsletter_title', e.target.value)}
                        placeholder="Newsletter"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newsletter_placeholder">Newsletter Placeholder</Label>
                      <Input
                        id="newsletter_placeholder"
                        value={formData.newsletter_placeholder}
                        onChange={(e) => handleInputChange('newsletter_placeholder', e.target.value)}
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contact_email">Email Address</Label>
                    <Input
                      id="contact_email"
                      value={formData.contact_email}
                      onChange={(e) => handleInputChange('contact_email', e.target.value)}
                      placeholder="hello@company.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_phone">Phone Number</Label>
                    <Input
                      id="contact_phone"
                      value={formData.contact_phone}
                      onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_address">Address</Label>
                    <Textarea
                      id="contact_address"
                      value={formData.contact_address}
                      onChange={(e) => handleInputChange('contact_address', e.target.value)}
                      placeholder="123 Main St, City, State 12345"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facebook_url">Facebook URL</Label>
                      <Input
                        id="facebook_url"
                        value={formData.facebook_url}
                        onChange={(e) => handleInputChange('facebook_url', e.target.value)}
                        placeholder="https://facebook.com/company"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram_url">Instagram URL</Label>
                      <Input
                        id="instagram_url"
                        value={formData.instagram_url}
                        onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                        placeholder="https://instagram.com/company"
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                      <Input
                        id="linkedin_url"
                        value={formData.linkedin_url}
                        onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                        placeholder="https://linkedin.com/company/company"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter_url">Twitter URL</Label>
                      <Input
                        id="twitter_url"
                        value={formData.twitter_url}
                        onChange={(e) => handleInputChange('twitter_url', e.target.value)}
                        placeholder="https://twitter.com/company"
                      />
                    </div>
                    <div>
                      <Label htmlFor="youtube_url">YouTube URL</Label>
                      <Input
                        id="youtube_url"
                        value={formData.youtube_url}
                        onChange={(e) => handleInputChange('youtube_url', e.target.value)}
                        placeholder="https://youtube.com/company"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="privacy_policy_link">Privacy Policy Link</Label>
                      <Input
                        id="privacy_policy_link"
                        value={formData.privacy_policy_link}
                        onChange={(e) => handleInputChange('privacy_policy_link', e.target.value)}
                        placeholder="/privacy"
                      />
                    </div>
                    <div>
                      <Label htmlFor="terms_of_service_link">Terms of Service Link</Label>
                      <Input
                        id="terms_of_service_link"
                        value={formData.terms_of_service_link}
                        onChange={(e) => handleInputChange('terms_of_service_link', e.target.value)}
                        placeholder="/terms"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="navigation" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Quick Links
                      <Button onClick={addQuickLink} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Link
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.quick_links.map((link, index) => (
                      <div key={index} className="flex gap-2 items-end">
                        <div className="flex-1">
                          <Label htmlFor={`link_name_${index}`}>Name</Label>
                          <Input
                            id={`link_name_${index}`}
                            value={link.name}
                            onChange={(e) => handleQuickLinkChange(index, 'name', e.target.value)}
                            placeholder="Home"
                          />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={`link_href_${index}`}>URL</Label>
                          <Input
                            id={`link_href_${index}`}
                            value={link.href}
                            onChange={(e) => handleQuickLinkChange(index, 'href', e.target.value)}
                            placeholder="/"
                          />
                        </div>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => removeQuickLink(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Services List
                      <Button onClick={addService} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.services_list.map((service, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          value={service}
                          onChange={(e) => handleServiceChange(index, e.target.value)}
                          placeholder="Service name"
                          className="flex-1"
                        />
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => removeService(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default EditFooterPage;
