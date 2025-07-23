
import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useContactPageConfig, useUpdateContactPageConfig } from "@/hooks/useContactPageConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Mail, Phone, MapPin, Clock, MessageSquare, Globe, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const EditContactPage = () => {
  const { data: config, isLoading } = useContactPageConfig();
  const updateContactPageConfig = useUpdateContactPageConfig();

  const [formData, setFormData] = useState({
    // Main contact section
    contact_directly_title: '',
    contact_directly_description: '',
    
    // Email Us
    email_us_title: '',
    email_us_value: '',
    email_us_description: '',
    
    // Call Us
    call_us_title: '',
    call_us_value: '',
    call_us_description: '',
    
    // Visit Office
    visit_office_title: '',
    visit_office_value: '',
    visit_office_description: '',
    
    // Business Hours
    business_hours_title: '',
    business_hours_value: '',
    business_hours_description: '',
    
    // WhatsApp
    whatsapp_title: '',
    whatsapp_value: '',
    whatsapp_description: '',
    
    // Form settings
    form_title: 'Send Us a Message',
    form_subtitle: 'Fill out the form below and we\'ll get back to you within 24 hours',
    form_button_text: 'Send Message',
    form_success_message: 'Thank you for your message. We\'ll get back to you within 24 hours.',
    
    // Page settings
    page_title: 'Get in Touch',
    page_subtitle: 'Ready to transform your business with AI-powered marketing? Let\'s start the conversation.',
    hero_background_color: 'bg-gradient-to-br from-gray-50 to-gray-100',
    
    // CTA Section
    cta_title: 'Ready to Get Started?',
    cta_subtitle: 'Join hundreds of businesses already transforming their marketing with AI',
    cta_primary_button: 'Book a Free Consultation',
    cta_secondary_button: 'View Our Portfolio',
    
    // Contact method colors
    email_color: 'from-blue-500 to-blue-600',
    phone_color: 'from-green-500 to-green-600',
    office_color: 'from-purple-500 to-purple-600',
    hours_color: 'from-orange-500 to-orange-600',
    whatsapp_color: 'from-emerald-500 to-emerald-600'
  });

  useEffect(() => {
    if (config) {
      setFormData({
        contact_directly_title: config.contact_directly_title || '',
        contact_directly_description: config.contact_directly_description || '',
        email_us_title: config.email_us_title || '',
        email_us_value: config.email_us_value || '',
        email_us_description: config.email_us_description || '',
        call_us_title: config.call_us_title || '',
        call_us_value: config.call_us_value || '',
        call_us_description: config.call_us_description || '',
        visit_office_title: config.visit_office_title || '',
        visit_office_value: config.visit_office_value || '',
        visit_office_description: config.visit_office_description || '',
        business_hours_title: config.business_hours_title || '',
        business_hours_value: config.business_hours_value || '',
        business_hours_description: config.business_hours_description || '',
        whatsapp_title: config.whatsapp_title || '',
        whatsapp_value: config.whatsapp_value || '',
        whatsapp_description: config.whatsapp_description || '',
        
        // Extended fields with defaults
        form_title: config.form_title || 'Send Us a Message',
        form_subtitle: config.form_subtitle || 'Fill out the form below and we\'ll get back to you within 24 hours',
        form_button_text: config.form_button_text || 'Send Message',
        form_success_message: config.form_success_message || 'Thank you for your message. We\'ll get back to you within 24 hours.',
        page_title: config.page_title || 'Get in Touch',
        page_subtitle: config.page_subtitle || 'Ready to transform your business with AI-powered marketing? Let\'s start the conversation.',
        hero_background_color: config.hero_background_color || 'bg-gradient-to-br from-gray-50 to-gray-100',
        cta_title: config.cta_title || 'Ready to Get Started?',
        cta_subtitle: config.cta_subtitle || 'Join hundreds of businesses already transforming their marketing with AI',
        cta_primary_button: config.cta_primary_button || 'Book a Free Consultation',
        cta_secondary_button: config.cta_secondary_button || 'View Our Portfolio',
        email_color: config.email_color || 'from-blue-500 to-blue-600',
        phone_color: config.phone_color || 'from-green-500 to-green-600',
        office_color: config.office_color || 'from-purple-500 to-purple-600',
        hours_color: config.hours_color || 'from-orange-500 to-orange-600',
        whatsapp_color: config.whatsapp_color || 'from-emerald-500 to-emerald-600'
      });
    }
  }, [config]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config) {
      updateContactPageConfig.mutate({
        id: config.id,
        ...formData
      });
    }
  };

  const colorOptions = [
    { value: 'from-blue-500 to-blue-600', label: 'Blue' },
    { value: 'from-green-500 to-green-600', label: 'Green' },
    { value: 'from-purple-500 to-purple-600', label: 'Purple' },
    { value: 'from-red-500 to-red-600', label: 'Red' },
    { value: 'from-orange-500 to-orange-600', label: 'Orange' },
    { value: 'from-yellow-500 to-yellow-600', label: 'Yellow' },
    { value: 'from-pink-500 to-pink-600', label: 'Pink' },
    { value: 'from-emerald-500 to-emerald-600', label: 'Emerald' },
    { value: 'from-cyan-500 to-cyan-600', label: 'Cyan' },
    { value: 'from-indigo-500 to-indigo-600', label: 'Indigo' }
  ];

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
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Edit Contact Page</h1>
            <Button 
              onClick={handleSubmit}
              disabled={updateContactPageConfig.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {updateContactPageConfig.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save All Changes
                </>
              )}
            </Button>
          </div>

          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="contact">Contact Methods</TabsTrigger>
              <TabsTrigger value="form">Contact Form</TabsTrigger>
              <TabsTrigger value="cta">CTA Section</TabsTrigger>
              <TabsTrigger value="design">Design & Colors</TabsTrigger>
            </TabsList>

            <TabsContent value="hero">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Hero Section Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="page_title">Page Title</Label>
                    <Input
                      id="page_title"
                      value={formData.page_title}
                      onChange={(e) => handleInputChange('page_title', e.target.value)}
                      placeholder="Get in Touch"
                    />
                  </div>
                  <div>
                    <Label htmlFor="page_subtitle">Page Subtitle</Label>
                    <Textarea
                      id="page_subtitle"
                      value={formData.page_subtitle}
                      onChange={(e) => handleInputChange('page_subtitle', e.target.value)}
                      placeholder="Ready to transform your business with AI-powered marketing? Let's start the conversation."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_directly_title">Contact Methods Title</Label>
                    <Input
                      id="contact_directly_title"
                      value={formData.contact_directly_title}
                      onChange={(e) => handleInputChange('contact_directly_title', e.target.value)}
                      placeholder="Prefer to contact us directly?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_directly_description">Contact Methods Description</Label>
                    <Textarea
                      id="contact_directly_description"
                      value={formData.contact_directly_description}
                      onChange={(e) => handleInputChange('contact_directly_description', e.target.value)}
                      placeholder="Choose your preferred method"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <div className="grid gap-6">
                {/* Email Us */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="email_us_title">Title</Label>
                        <Input
                          id="email_us_title"
                          value={formData.email_us_title}
                          onChange={(e) => handleInputChange('email_us_title', e.target.value)}
                          placeholder="Email Us"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email_us_value">Email Address</Label>
                        <Input
                          id="email_us_value"
                          value={formData.email_us_value}
                          onChange={(e) => handleInputChange('email_us_value', e.target.value)}
                          placeholder="info@company.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email_us_description">Description</Label>
                        <Input
                          id="email_us_description"
                          value={formData.email_us_description}
                          onChange={(e) => handleInputChange('email_us_description', e.target.value)}
                          placeholder="Send us an email anytime"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Call Us */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Call Us
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="call_us_title">Title</Label>
                        <Input
                          id="call_us_title"
                          value={formData.call_us_title}
                          onChange={(e) => handleInputChange('call_us_title', e.target.value)}
                          placeholder="Call Us"
                        />
                      </div>
                      <div>
                        <Label htmlFor="call_us_value">Phone Number</Label>
                        <Input
                          id="call_us_value"
                          value={formData.call_us_value}
                          onChange={(e) => handleInputChange('call_us_value', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="call_us_description">Description</Label>
                        <Input
                          id="call_us_description"
                          value={formData.call_us_description}
                          onChange={(e) => handleInputChange('call_us_description', e.target.value)}
                          placeholder="Available 24/7 for support"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Visit Office */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Visit Office
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="visit_office_title">Title</Label>
                        <Input
                          id="visit_office_title"
                          value={formData.visit_office_title}
                          onChange={(e) => handleInputChange('visit_office_title', e.target.value)}
                          placeholder="Visit Office"
                        />
                      </div>
                      <div>
                        <Label htmlFor="visit_office_value">Address</Label>
                        <Input
                          id="visit_office_value"
                          value={formData.visit_office_value}
                          onChange={(e) => handleInputChange('visit_office_value', e.target.value)}
                          placeholder="123 Innovation Drive, Tech City"
                        />
                      </div>
                      <div>
                        <Label htmlFor="visit_office_description">Description</Label>
                        <Input
                          id="visit_office_description"
                          value={formData.visit_office_description}
                          onChange={(e) => handleInputChange('visit_office_description', e.target.value)}
                          placeholder="Come visit our headquarters"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="business_hours_title">Title</Label>
                        <Input
                          id="business_hours_title"
                          value={formData.business_hours_title}
                          onChange={(e) => handleInputChange('business_hours_title', e.target.value)}
                          placeholder="Business Hours"
                        />
                      </div>
                      <div>
                        <Label htmlFor="business_hours_value">Hours</Label>
                        <Input
                          id="business_hours_value"
                          value={formData.business_hours_value}
                          onChange={(e) => handleInputChange('business_hours_value', e.target.value)}
                          placeholder="Mon-Fri: 9AM-6PM EST"
                        />
                      </div>
                      <div>
                        <Label htmlFor="business_hours_description">Description</Label>
                        <Input
                          id="business_hours_description"
                          value={formData.business_hours_description}
                          onChange={(e) => handleInputChange('business_hours_description', e.target.value)}
                          placeholder="We are here to help"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* WhatsApp */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      WhatsApp
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="whatsapp_title">Title</Label>
                        <Input
                          id="whatsapp_title"
                          value={formData.whatsapp_title}
                          onChange={(e) => handleInputChange('whatsapp_title', e.target.value)}
                          placeholder="WhatsApp Message"
                        />
                      </div>
                      <div>
                        <Label htmlFor="whatsapp_value">WhatsApp Number</Label>
                        <Input
                          id="whatsapp_value"
                          value={formData.whatsapp_value}
                          onChange={(e) => handleInputChange('whatsapp_value', e.target.value)}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="whatsapp_description">Description</Label>
                        <Input
                          id="whatsapp_description"
                          value={formData.whatsapp_description}
                          onChange={(e) => handleInputChange('whatsapp_description', e.target.value)}
                          placeholder="Quick chat via WhatsApp"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="form">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Form Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="form_title">Form Title</Label>
                      <Input
                        id="form_title"
                        value={formData.form_title}
                        onChange={(e) => handleInputChange('form_title', e.target.value)}
                        placeholder="Send Us a Message"
                      />
                    </div>
                    <div>
                      <Label htmlFor="form_button_text">Button Text</Label>
                      <Input
                        id="form_button_text"
                        value={formData.form_button_text}
                        onChange={(e) => handleInputChange('form_button_text', e.target.value)}
                        placeholder="Send Message"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="form_subtitle">Form Subtitle</Label>
                    <Textarea
                      id="form_subtitle"
                      value={formData.form_subtitle}
                      onChange={(e) => handleInputChange('form_subtitle', e.target.value)}
                      placeholder="Fill out the form below and we'll get back to you within 24 hours"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="form_success_message">Success Message</Label>
                    <Textarea
                      id="form_success_message"
                      value={formData.form_success_message}
                      onChange={(e) => handleInputChange('form_success_message', e.target.value)}
                      placeholder="Thank you for your message. We'll get back to you within 24 hours."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cta">
              <Card>
                <CardHeader>
                  <CardTitle>Call-to-Action Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="cta_title">CTA Title</Label>
                    <Input
                      id="cta_title"
                      value={formData.cta_title}
                      onChange={(e) => handleInputChange('cta_title', e.target.value)}
                      placeholder="Ready to Get Started?"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta_subtitle">CTA Subtitle</Label>
                    <Textarea
                      id="cta_subtitle"
                      value={formData.cta_subtitle}
                      onChange={(e) => handleInputChange('cta_subtitle', e.target.value)}
                      placeholder="Join hundreds of businesses already transforming their marketing with AI"
                      rows={2}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cta_primary_button">Primary Button Text</Label>
                      <Input
                        id="cta_primary_button"
                        value={formData.cta_primary_button}
                        onChange={(e) => handleInputChange('cta_primary_button', e.target.value)}
                        placeholder="Book a Free Consultation"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cta_secondary_button">Secondary Button Text</Label>
                      <Input
                        id="cta_secondary_button"
                        value={formData.cta_secondary_button}
                        onChange={(e) => handleInputChange('cta_secondary_button', e.target.value)}
                        placeholder="View Our Portfolio"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="design">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Design & Color Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="hero_background_color">Hero Background Color</Label>
                    <Input
                      id="hero_background_color"
                      value={formData.hero_background_color}
                      onChange={(e) => handleInputChange('hero_background_color', e.target.value)}
                      placeholder="bg-gradient-to-br from-gray-50 to-gray-100"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Method Colors</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email_color">Email Color</Label>
                        <Select value={formData.email_color} onValueChange={(value) => handleInputChange('email_color', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select email color" />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="phone_color">Phone Color</Label>
                        <Select value={formData.phone_color} onValueChange={(value) => handleInputChange('phone_color', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select phone color" />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="office_color">Office Color</Label>
                        <Select value={formData.office_color} onValueChange={(value) => handleInputChange('office_color', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select office color" />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="hours_color">Business Hours Color</Label>
                        <Select value={formData.hours_color} onValueChange={(value) => handleInputChange('hours_color', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select hours color" />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="whatsapp_color">WhatsApp Color</Label>
                        <Select value={formData.whatsapp_color} onValueChange={(value) => handleInputChange('whatsapp_color', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select WhatsApp color" />
                          </SelectTrigger>
                          <SelectContent>
                            {colorOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default EditContactPage;
