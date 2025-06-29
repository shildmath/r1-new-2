
import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useContactPageConfig, useUpdateContactPageConfig } from "@/hooks/useContactPageConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2 } from "lucide-react";

const EditContactPage = () => {
  const { data: config, isLoading } = useContactPageConfig();
  const updateContactPageConfig = useUpdateContactPageConfig();

  const [formData, setFormData] = useState({
    email_us_title: '',
    email_us_value: '',
    email_us_description: '',
    call_us_title: '',
    call_us_value: '',
    call_us_description: '',
    visit_office_title: '',
    visit_office_value: '',
    visit_office_description: '',
    business_hours_title: '',
    business_hours_value: '',
    business_hours_description: '',
    whatsapp_title: '',
    whatsapp_value: '',
    whatsapp_description: '',
    contact_directly_title: '',
    contact_directly_description: '',
  });

  useEffect(() => {
    if (config) {
      setFormData({
        email_us_title: config.email_us_title,
        email_us_value: config.email_us_value,
        email_us_description: config.email_us_description,
        call_us_title: config.call_us_title,
        call_us_value: config.call_us_value,
        call_us_description: config.call_us_description,
        visit_office_title: config.visit_office_title,
        visit_office_value: config.visit_office_value,
        visit_office_description: config.visit_office_description,
        business_hours_title: config.business_hours_title,
        business_hours_value: config.business_hours_value,
        business_hours_description: config.business_hours_description,
        whatsapp_title: config.whatsapp_title,
        whatsapp_value: config.whatsapp_value,
        whatsapp_description: config.whatsapp_description,
        contact_directly_title: config.contact_directly_title,
        contact_directly_description: config.contact_directly_description,
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
                  Save Changes
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Contact Directly Section */}
            <Card>
              <CardHeader>
                <CardTitle>Main Contact Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contact_directly_title">Title</Label>
                  <Input
                    id="contact_directly_title"
                    value={formData.contact_directly_title}
                    onChange={(e) => handleInputChange('contact_directly_title', e.target.value)}
                    placeholder="Prefer to contact us directly?"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_directly_description">Description</Label>
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

            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email Us */}
              <Card>
                <CardHeader>
                  <CardTitle>Email Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Textarea
                      id="email_us_description"
                      value={formData.email_us_description}
                      onChange={(e) => handleInputChange('email_us_description', e.target.value)}
                      placeholder="Send us an email anytime"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Call Us */}
              <Card>
                <CardHeader>
                  <CardTitle>Call Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Textarea
                      id="call_us_description"
                      value={formData.call_us_description}
                      onChange={(e) => handleInputChange('call_us_description', e.target.value)}
                      placeholder="Available 24/7 for support"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Visit Office */}
              <Card>
                <CardHeader>
                  <CardTitle>Visit Office</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Textarea
                      id="visit_office_value"
                      value={formData.visit_office_value}
                      onChange={(e) => handleInputChange('visit_office_value', e.target.value)}
                      placeholder="123 Innovation Drive, Tech City"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="visit_office_description">Description</Label>
                    <Textarea
                      id="visit_office_description"
                      value={formData.visit_office_description}
                      onChange={(e) => handleInputChange('visit_office_description', e.target.value)}
                      placeholder="Come visit our headquarters"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card>
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                    <Textarea
                      id="business_hours_description"
                      value={formData.business_hours_description}
                      onChange={(e) => handleInputChange('business_hours_description', e.target.value)}
                      placeholder="We are here to help"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>WhatsApp</CardTitle>
                </CardHeader>
                <CardContent>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditContactPage;
