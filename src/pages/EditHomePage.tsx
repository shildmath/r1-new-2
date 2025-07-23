
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useHomePageConfig } from "@/hooks/useHomePageConfig";
import { toast } from "sonner";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Image as ImageIcon,
  BarChart3,
  Settings,
  Star,
  Users,
  Eye,
  EyeOff,
  Save
} from "lucide-react";

const EditHomePage = () => {
  const { config, isLoading, updateConfig } = useHomePageConfig();
  
  const [heroData, setHeroData] = useState({
    hero_title: '',
    hero_subtitle: '',
    hero_description: '',
    hero_cta_text: '',
    hero_cta_secondary_text: '',
    hero_background_image: '',
    hero_video_url: '',
    hero_rotating_images: [] as string[]
  });

  const [statsData, setStatsData] = useState({
    stats_title: '',
    stats_subtitle: '',
    stats_is_visible: true,
    stats_data: [] as Array<{value: string; label: string; icon: string}>
  });

  const [servicesData, setServicesData] = useState({
    services_title: '',
    services_subtitle: '',
    services_is_visible: true,
    services_display_limit: 6,
    services_selected_ids: [] as string[]
  });

  const [testimonialsData, setTestimonialsData] = useState({
    testimonials_title: '',
    testimonials_subtitle: '',
    testimonials_is_visible: true,
    testimonials_display_limit: 3,
    testimonials_selected_ids: [] as string[],
    testimonials_selected_industry: ''
  });

  const [featuresData, setFeaturesData] = useState({
    features_title: '',
    features_is_visible: true,
    features_data: [] as Array<{id: number; title: string; description: string; icon: string; isActive: boolean}>
  });

  const [ctaData, setCTAData] = useState({
    cta_title: '',
    cta_subtitle: '',
    cta_primary_text: '',
    cta_secondary_text: '',
    cta_is_visible: true,
    cta_background_image: ''
  });

  useEffect(() => {
    if (config) {
      setHeroData({
        hero_title: config.hero_title,
        hero_subtitle: config.hero_subtitle,
        hero_description: config.hero_description,
        hero_cta_text: config.hero_cta_text,
        hero_cta_secondary_text: config.hero_cta_secondary_text,
        hero_background_image: config.hero_background_image,
        hero_video_url: config.hero_video_url,
        hero_rotating_images: config.hero_rotating_images
      });

      setStatsData({
        stats_title: config.stats_title,
        stats_subtitle: config.stats_subtitle,
        stats_is_visible: config.stats_is_visible,
        stats_data: config.stats_data
      });

      setServicesData({
        services_title: config.services_title,
        services_subtitle: config.services_subtitle,
        services_is_visible: config.services_is_visible,
        services_display_limit: config.services_display_limit,
        services_selected_ids: config.services_selected_ids
      });

      setTestimonialsData({
        testimonials_title: config.testimonials_title,
        testimonials_subtitle: config.testimonials_subtitle,
        testimonials_is_visible: config.testimonials_is_visible,
        testimonials_display_limit: config.testimonials_display_limit,
        testimonials_selected_ids: config.testimonials_selected_ids,
        testimonials_selected_industry: config.testimonials_selected_industry
      });

      setFeaturesData({
        features_title: config.features_title,
        features_is_visible: config.features_is_visible,
        features_data: config.features_data
      });

      setCTAData({
        cta_title: config.cta_title,
        cta_subtitle: config.cta_subtitle,
        cta_primary_text: config.cta_primary_text,
        cta_secondary_text: config.cta_secondary_text,
        cta_is_visible: config.cta_is_visible,
        cta_background_image: config.cta_background_image
      });
    }
  }, [config]);

  const handleSaveChanges = async () => {
    try {
      await updateConfig({
        ...heroData,
        ...statsData,
        ...servicesData,
        ...testimonialsData,
        ...featuresData,
        ...ctaData
      });
      toast.success('Home page configuration updated successfully!');
    } catch (error) {
      toast.error('Failed to update home page configuration');
      console.error('Error updating home page config:', error);
    }
  };

  const handleSectionVisibilityToggle = (section: string) => {
    switch (section) {
      case 'stats':
        setStatsData(prev => ({ ...prev, stats_is_visible: !prev.stats_is_visible }));
        break;
      case 'services':
        setServicesData(prev => ({ ...prev, services_is_visible: !prev.services_is_visible }));
        break;
      case 'testimonials':
        setTestimonialsData(prev => ({ ...prev, testimonials_is_visible: !prev.testimonials_is_visible }));
        break;
      case 'features':
        setFeaturesData(prev => ({ ...prev, features_is_visible: !prev.features_is_visible }));
        break;
      case 'cta':
        setCTAData(prev => ({ ...prev, cta_is_visible: !prev.cta_is_visible }));
        break;
    }
  };

  const handleFeatureToggle = (featureId: number) => {
    setFeaturesData(prev => ({
      ...prev,
      features_data: prev.features_data.map(feature =>
        feature.id === featureId 
          ? { ...feature, isActive: !feature.isActive }
          : feature
      )
    }));
  };

  const handleStatsUpdate = (newStats: Array<{value: string; label: string; icon: string}>) => {
    setStatsData(prev => ({ ...prev, stats_data: newStats }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex">
        <AdminSidebar />
        <main className="flex-1 p-8 flex justify-center items-center">
          <div className="text-lg">Loading home page configuration...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Home Page</h1>
              <p className="text-gray-600 mt-2">Customize all elements of your home page</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white">
                <Eye className="w-4 h-4 mr-2" />
                Preview Changes
              </Button>
              <Button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </div>

          {/* Hero Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ImageIcon className="h-5 w-5" />
                <span>Hero Section</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hero_title">Main Title</Label>
                  <Input
                    id="hero_title"
                    value={heroData.hero_title}
                    onChange={(e) => setHeroData(prev => ({ ...prev, hero_title: e.target.value }))}
                    placeholder="AI-Powered Marketing Solutions"
                  />
                </div>
                <div>
                  <Label htmlFor="hero_subtitle">Subtitle</Label>
                  <Input
                    id="hero_subtitle"
                    value={heroData.hero_subtitle}
                    onChange={(e) => setHeroData(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                    placeholder="Transform Your Business with Advanced AI Technology"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="hero_description">Description</Label>
                <Textarea
                  id="hero_description"
                  value={heroData.hero_description}
                  onChange={(e) => setHeroData(prev => ({ ...prev, hero_description: e.target.value }))}
                  rows={3}
                  placeholder="Drive exceptional growth with our cutting-edge AI marketing platform..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hero_cta_text">Primary CTA Text</Label>
                  <Input
                    id="hero_cta_text"
                    value={heroData.hero_cta_text}
                    onChange={(e) => setHeroData(prev => ({ ...prev, hero_cta_text: e.target.value }))}
                    placeholder="Get Started Today"
                  />
                </div>
                <div>
                  <Label htmlFor="hero_cta_secondary_text">Secondary CTA Text</Label>
                  <Input
                    id="hero_cta_secondary_text"
                    value={heroData.hero_cta_secondary_text}
                    onChange={(e) => setHeroData(prev => ({ ...prev, hero_cta_secondary_text: e.target.value }))}
                    placeholder="Learn More"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hero_background_image">Background Image URL</Label>
                  <Input
                    id="hero_background_image"
                    value={heroData.hero_background_image}
                    onChange={(e) => setHeroData(prev => ({ ...prev, hero_background_image: e.target.value }))}
                    placeholder="/hero-bg.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="hero_video_url">Video URL (Optional)</Label>
                  <Input
                    id="hero_video_url"
                    value={heroData.hero_video_url}
                    onChange={(e) => setHeroData(prev => ({ ...prev, hero_video_url: e.target.value }))}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="hero_rotating_images">Rotating Images (One per line)</Label>
                <Textarea
                  id="hero_rotating_images"
                  value={heroData.hero_rotating_images.join('\n')}
                  onChange={(e) => setHeroData(prev => ({ 
                    ...prev, 
                    hero_rotating_images: e.target.value.split('\n').filter(url => url.trim())
                  }))}
                  rows={3}
                  placeholder="/image1.jpg&#10;/image2.jpg&#10;/image3.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Stats Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Statistics Section</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSectionVisibilityToggle('stats')}
                >
                  {statsData.stats_is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {statsData.stats_is_visible ? 'Hide' : 'Show'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stats_title">Section Title</Label>
                  <Input
                    id="stats_title"
                    value={statsData.stats_title}
                    onChange={(e) => setStatsData(prev => ({ ...prev, stats_title: e.target.value }))}
                    placeholder="Numbers That Speak Volumes"
                  />
                </div>
                <div>
                  <Label htmlFor="stats_subtitle">Section Subtitle</Label>
                  <Input
                    id="stats_subtitle"
                    value={statsData.stats_subtitle}
                    onChange={(e) => setStatsData(prev => ({ ...prev, stats_subtitle: e.target.value }))}
                    placeholder="Our commitment to excellence is reflected in our outstanding results"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData.stats_data.map((stat, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="space-y-2">
                      <div>
                        <Label className="text-xs font-medium">Value</Label>
                        <Input
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...statsData.stats_data];
                            newStats[index] = { ...stat, value: e.target.value };
                            handleStatsUpdate(newStats);
                          }}
                          className="text-sm"
                          placeholder="500+"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Label</Label>
                        <Input
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...statsData.stats_data];
                            newStats[index] = { ...stat, label: e.target.value };
                            handleStatsUpdate(newStats);
                          }}
                          className="text-sm"
                          placeholder="Happy Clients"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium">Icon (Emoji)</Label>
                        <Input
                          value={stat.icon}
                          onChange={(e) => {
                            const newStats = [...statsData.stats_data];
                            newStats[index] = { ...stat, icon: e.target.value };
                            handleStatsUpdate(newStats);
                          }}
                          className="text-sm"
                          placeholder="👥"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Services Section</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSectionVisibilityToggle('services')}
                  >
                    {servicesData.services_is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {servicesData.services_is_visible ? 'Hide' : 'Show'}
                  </Button>
                  <Button size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Select Services
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="services_title">Section Title</Label>
                  <Input
                    id="services_title"
                    value={servicesData.services_title}
                    onChange={(e) => setServicesData(prev => ({ ...prev, services_title: e.target.value }))}
                    placeholder="Our Premium Services"
                  />
                </div>
                <div>
                  <Label htmlFor="services_subtitle">Section Subtitle</Label>
                  <Input
                    id="services_subtitle"
                    value={servicesData.services_subtitle}
                    onChange={(e) => setServicesData(prev => ({ ...prev, services_subtitle: e.target.value }))}
                    placeholder="Comprehensive AI-powered solutions for your business growth"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="services_display_limit">Display Limit</Label>
                <Input
                  id="services_display_limit"
                  type="number"
                  value={servicesData.services_display_limit}
                  onChange={(e) => setServicesData(prev => ({ ...prev, services_display_limit: parseInt(e.target.value) }))}
                  placeholder="6"
                />
              </div>
            </CardContent>
          </Card>

          {/* Testimonials Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Testimonials Section</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSectionVisibilityToggle('testimonials')}
                  >
                    {testimonialsData.testimonials_is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {testimonialsData.testimonials_is_visible ? 'Hide' : 'Show'}
                  </Button>
                  <Button size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Select Testimonials
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="testimonials_title">Section Title</Label>
                  <Input
                    id="testimonials_title"
                    value={testimonialsData.testimonials_title}
                    onChange={(e) => setTestimonialsData(prev => ({ ...prev, testimonials_title: e.target.value }))}
                    placeholder="What Our Clients Say"
                  />
                </div>
                <div>
                  <Label htmlFor="testimonials_subtitle">Section Subtitle</Label>
                  <Input
                    id="testimonials_subtitle"
                    value={testimonialsData.testimonials_subtitle}
                    onChange={(e) => setTestimonialsData(prev => ({ ...prev, testimonials_subtitle: e.target.value }))}
                    placeholder="Real results from real businesses"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="testimonials_display_limit">Display Limit</Label>
                <Input
                  id="testimonials_display_limit"
                  type="number"
                  value={testimonialsData.testimonials_display_limit}
                  onChange={(e) => setTestimonialsData(prev => ({ ...prev, testimonials_display_limit: parseInt(e.target.value) }))}
                  placeholder="3"
                />
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Features Section</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSectionVisibilityToggle('features')}
                >
                  {featuresData.features_is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {featuresData.features_is_visible ? 'Hide' : 'Show'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="features_title">Section Title</Label>
                <Input
                  id="features_title"
                  value={featuresData.features_title}
                  onChange={(e) => setFeaturesData(prev => ({ ...prev, features_title: e.target.value }))}
                  placeholder="Why Choose AIAdMaxify"
                />
              </div>
              <div className="space-y-4">
                {featuresData.features_data.map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={feature.isActive ? "default" : "secondary"}>
                        {feature.isActive ? "Active" : "Hidden"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFeatureToggle(feature.id)}
                      >
                        {feature.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Feature
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Call-to-Action Section</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSectionVisibilityToggle('cta')}
                >
                  {ctaData.cta_is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {ctaData.cta_is_visible ? 'Hide' : 'Show'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta_title">CTA Title</Label>
                  <Input
                    id="cta_title"
                    value={ctaData.cta_title}
                    onChange={(e) => setCTAData(prev => ({ ...prev, cta_title: e.target.value }))}
                    placeholder="Ready to Transform Your Business?"
                  />
                </div>
                <div>
                  <Label htmlFor="cta_subtitle">CTA Subtitle</Label>
                  <Input
                    id="cta_subtitle"
                    value={ctaData.cta_subtitle}
                    onChange={(e) => setCTAData(prev => ({ ...prev, cta_subtitle: e.target.value }))}
                    placeholder="Join thousands of successful businesses using our AI platform"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cta_primary_text">Primary Button Text</Label>
                  <Input
                    id="cta_primary_text"
                    value={ctaData.cta_primary_text}
                    onChange={(e) => setCTAData(prev => ({ ...prev, cta_primary_text: e.target.value }))}
                    placeholder="Start Free Trial"
                  />
                </div>
                <div>
                  <Label htmlFor="cta_secondary_text">Secondary Button Text</Label>
                  <Input
                    id="cta_secondary_text"
                    value={ctaData.cta_secondary_text}
                    onChange={(e) => setCTAData(prev => ({ ...prev, cta_secondary_text: e.target.value }))}
                    placeholder="Schedule Demo"
                  />
                </div>
                <div>
                  <Label htmlFor="cta_background_image">Background Image URL</Label>
                  <Input
                    id="cta_background_image"
                    value={ctaData.cta_background_image}
                    onChange={(e) => setCTAData(prev => ({ ...prev, cta_background_image: e.target.value }))}
                    placeholder="/cta-bg.jpg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Changes */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline">
              Cancel Changes
            </Button>
            <Button onClick={handleSaveChanges} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditHomePage;
