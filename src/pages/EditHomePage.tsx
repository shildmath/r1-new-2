import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
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
  EyeOff
} from "lucide-react";

const EditHomePage = () => {
  const { toast } = useToast();
  
  // State for managing different sections
  const [heroSection, setHeroSection] = useState({
    title: "AI-Powered Marketing Solutions",
    subtitle: "Transform Your Business with Advanced AI Technology",
    description: "Drive exceptional growth with our cutting-edge AI marketing platform. Increase conversions, optimize campaigns, and maximize ROI with intelligent automation.",
    ctaText: "Get Started Today",
    ctaSecondaryText: "Learn More",
    backgroundImage: "/hero-bg.jpg",
    videoUrl: "",
    rotatingImages: [
      "/rotating-1.jpg",
      "/rotating-2.jpg", 
      "/rotating-3.jpg"
    ]
  });

  const [statsSection, setStatsSection] = useState({
    isVisible: true,
    title: "Numbers That Speak Volumes",
    subtitle: "Our commitment to excellence is reflected in our outstanding results",
    stats: [
      { value: "500+", label: "Happy Clients", icon: "👥" },
      { value: "95%", label: "Success Rate", icon: "📈" },
      { value: "15", label: "Awards Won", icon: "🏆" },
      { value: "300%", label: "Growth Rate", icon: "🚀" }
    ]
  });

  const [servicesSection, setServicesSection] = useState({
    isVisible: true,
    title: "Our Premium Services",
    subtitle: "Comprehensive AI-powered solutions for your business growth",
    selectedServices: [], // Will be populated from services table
    displayLimit: 6
  });

  const [testimonialsSection, setTestimonialsSection] = useState({
    isVisible: true,
    title: "What Our Clients Say",
    subtitle: "Real results from real businesses",
    selectedTestimonials: [], // Will be populated from testimonials table
    displayLimit: 3,
    selectedIndustry: "All Industries"
  });

  const [featuresSection, setFeaturesSection] = useState({
    isVisible: true,
    title: "Why Choose AIAdMaxify",
    features: [
      {
        id: 1,
        title: "AI-Powered Analytics",
        description: "Advanced machine learning algorithms analyze your data to provide actionable insights",
        icon: "🧠",
        isActive: true
      },
      {
        id: 2,
        title: "Real-Time Optimization",
        description: "Continuous campaign optimization based on performance data and market trends",
        icon: "⚡",
        isActive: true
      },
      {
        id: 3,
        title: "24/7 Monitoring",
        description: "Round-the-clock monitoring ensures your campaigns perform at their peak",
        icon: "👁️",
        isActive: true
      }
    ]
  });

  const [ctaSection, setCTASection] = useState({
    isVisible: true,
    title: "Ready to Transform Your Business?",
    subtitle: "Join thousands of successful businesses using our AI platform",
    primaryCTAText: "Start Free Trial",
    secondaryCTAText: "Schedule Demo",
    backgroundImage: "/cta-bg.jpg"
  });

  // Handler functions
  const handleHeroUpdate = (field: string, value: any) => {
    setHeroSection(prev => ({ ...prev, [field]: value }));
    toast({ title: "Hero section updated", description: "Changes saved successfully" });
  };

  const handleStatsUpdate = (stats: any) => {
    setStatsSection(prev => ({ ...prev, stats }));
    toast({ title: "Stats section updated", description: "Changes saved successfully" });
  };

  const handleServicesUpdate = (selectedServices: any) => {
    setServicesSection(prev => ({ ...prev, selectedServices }));
    toast({ title: "Services section updated", description: "Changes saved successfully" });
  };

  const handleTestimonialsUpdate = (selectedTestimonials: any) => {
    setTestimonialsSection(prev => ({ ...prev, selectedTestimonials }));
    toast({ title: "Testimonials section updated", description: "Changes saved successfully" });
  };

  const handleFeatureToggle = (featureId: number) => {
    setFeaturesSection(prev => ({
      ...prev,
      features: prev.features.map(feature =>
        feature.id === featureId 
          ? { ...feature, isActive: !feature.isActive }
          : feature
      )
    }));
    toast({ title: "Feature updated", description: "Feature visibility toggled" });
  };

  const handleSectionVisibilityToggle = (section: string) => {
    switch (section) {
      case 'stats':
        setStatsSection(prev => ({ ...prev, isVisible: !prev.isVisible }));
        break;
      case 'services':
        setServicesSection(prev => ({ ...prev, isVisible: !prev.isVisible }));
        break;
      case 'testimonials':
        setTestimonialsSection(prev => ({ ...prev, isVisible: !prev.isVisible }));
        break;
      case 'features':
        setFeaturesSection(prev => ({ ...prev, isVisible: !prev.isVisible }));
        break;
      case 'cta':
        setCTASection(prev => ({ ...prev, isVisible: !prev.isVisible }));
        break;
    }
    toast({ title: "Section visibility updated", description: "Changes saved successfully" });
  };

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
            <Button className="bg-green-600 hover:bg-green-700">
              <Eye className="w-4 h-4 mr-2" />
              Preview Changes
            </Button>
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
                  <label className="block text-sm font-medium mb-2">Main Title</label>
                  <input
                    type="text"
                    value={heroSection.title}
                    onChange={(e) => handleHeroUpdate('title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={heroSection.subtitle}
                    onChange={(e) => handleHeroUpdate('subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={heroSection.description}
                  onChange={(e) => handleHeroUpdate('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary CTA Text</label>
                  <input
                    type="text"
                    value={heroSection.ctaText}
                    onChange={(e) => handleHeroUpdate('ctaText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary CTA Text</label>
                  <input
                    type="text"
                    value={heroSection.ctaSecondaryText}
                    onChange={(e) => handleHeroUpdate('ctaSecondaryText', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Background Image URL</label>
                  <input
                    type="text"
                    value={heroSection.backgroundImage}
                    onChange={(e) => handleHeroUpdate('backgroundImage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Video URL (Optional)</label>
                  <input
                    type="text"
                    value={heroSection.videoUrl}
                    onChange={(e) => handleHeroUpdate('videoUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rotating Images (One per line)</label>
                <textarea
                  value={heroSection.rotatingImages.join('\n')}
                  onChange={(e) => handleHeroUpdate('rotatingImages', e.target.value.split('\n').filter(url => url.trim()))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  {statsSection.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {statsSection.isVisible ? 'Hide' : 'Show'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <input
                    type="text"
                    value={statsSection.title}
                    onChange={(e) => setStatsSection(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Section Subtitle</label>
                  <input
                    type="text"
                    value={statsSection.subtitle}
                    onChange={(e) => setStatsSection(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsSection.stats.map((stat, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium mb-1">Value</label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...statsSection.stats];
                            newStats[index] = { ...stat, value: e.target.value };
                            handleStatsUpdate(newStats);
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Label</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...statsSection.stats];
                            newStats[index] = { ...stat, label: e.target.value };
                            handleStatsUpdate(newStats);
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">Icon (Emoji)</label>
                        <input
                          type="text"
                          value={stat.icon}
                          onChange={(e) => {
                            const newStats = [...statsSection.stats];
                            newStats[index] = { ...stat, icon: e.target.value };
                            handleStatsUpdate(newStats);
                          }}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
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
                    {servicesSection.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {servicesSection.isVisible ? 'Hide' : 'Show'}
                  </Button>
                  <Button size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Select Services
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Click "Select Services" to choose which services to display on the home page</p>
                <p className="text-sm mt-2">Currently showing: {servicesSection.selectedServices.length} services</p>
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
                    {testimonialsSection.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {testimonialsSection.isVisible ? 'Hide' : 'Show'}
                  </Button>
                  <Button size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Select Testimonials
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Click "Select Testimonials" to choose which testimonials to display on the home page</p>
                <p className="text-sm mt-2">Currently showing: {testimonialsSection.selectedTestimonials.length} testimonials</p>
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
                  {featuresSection.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {featuresSection.isVisible ? 'Hide' : 'Show'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuresSection.features.map((feature) => (
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
                  {ctaSection.isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {ctaSection.isVisible ? 'Hide' : 'Show'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">CTA Title</label>
                  <input
                    type="text"
                    value={ctaSection.title}
                    onChange={(e) => setCTASection(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CTA Subtitle</label>
                  <input
                    type="text"
                    value={ctaSection.subtitle}
                    onChange={(e) => setCTASection(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Button Text</label>
                  <input
                    type="text"
                    value={ctaSection.primaryCTAText}
                    onChange={(e) => setCTASection(prev => ({ ...prev, primaryCTAText: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
                  <input
                    type="text"
                    value={ctaSection.secondaryCTAText}
                    onChange={(e) => setCTASection(prev => ({ ...prev, secondaryCTAText: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Background Image URL</label>
                  <input
                    type="text"
                    value={ctaSection.backgroundImage}
                    onChange={(e) => setCTASection(prev => ({ ...prev, backgroundImage: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save All Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditHomePage;