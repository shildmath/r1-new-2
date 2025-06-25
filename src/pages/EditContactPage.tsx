
import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useContactPageConfig, useUpdateContactPageConfig } from "@/hooks/useContactPageConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Mail, Phone, MapPin, Clock, MessageCircle, Users } from "lucide-react";

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

  const contactSections = [
    {
      icon: Mail,
      title: 'Email Us',
      titleField: 'email_us_title',
      valueField: 'email_us_value',
      descriptionField: 'email_us_description',
      placeholder: 'info@company.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      titleField: 'call_us_title',
      valueField: 'call_us_value',
      descriptionField: 'call_us_description',
      placeholder: '+1 (555) 123-4567'
    },
    {
      icon: MapPin,
      title: 'Visit Office',
      titleField: 'visit_office_title',
      valueField: 'visit_office_value',
      descriptionField: 'visit_office_description',
      placeholder: '123 Main St, City, State'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      titleField: 'business_hours_title',
      valueField: 'business_hours_value',
      descriptionField: 'business_hours_description',
      placeholder: 'Mon-Fri: 9AM-6PM EST'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Message',
      titleField: 'whatsapp_title',
      valueField: 'whatsapp_value',
      descriptionField: 'whatsapp_description',
      placeholder: '+1 (555) 123-4567'
    }
  ];

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {contactSections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <section.icon className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={section.titleField}>Title</Label>
                    <Input
                      id={section.titleField}
                      value={formData[section.titleField as keyof typeof formData]}
                      onChange={(e) => handleInputChange(section.titleField, e.target.value)}
                      placeholder={section.title}
                    />
                  </div>
                  <div>
                    <Label htmlFor={section.valueField}>Value</Label>
                    <Input
                      id={section.valueField}
                      value={formData[section.valueField as keyof typeof formData]}
                      onChange={(e) => handleInputChange(section.valueField, e.target.value)}
                      placeholder={section.placeholder}
                    />
                  </div>
                  <div>
                    <Label htmlFor={section.descriptionField}>Description</Label>
                    <Textarea
                      id={section.descriptionField}
                      value={formData[section.descriptionField as keyof typeof formData]}
                      onChange={(e) => handleInputChange(section.descriptionField, e.target.value)}
                      placeholder="Enter description"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Contact Directly Section
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact_directly_title">Section Title</Label>
                <Input
                  id="contact_directly_title"
                  value={formData.contact_directly_title}
                  onChange={(e) => handleInputChange('contact_directly_title', e.target.value)}
                  placeholder="Prefer to contact us directly?"
                />
              </div>
              <div>
                <Label htmlFor="contact_directly_description">Section Description</Label>
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
        </div>
      </main>
    </div>
  );
};

export default EditContactPage;
