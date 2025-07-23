
import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useAboutStats } from "@/hooks/useAboutStats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2 } from "lucide-react";

const EditAboutPage = () => {
  const { stats, isLoading, updateStats } = useAboutStats();

  const [formData, setFormData] = useState({
    happy_clients: '',
    success_rate: '',
    awards_won: '',
    growth_rate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (stats) {
      setFormData({
        happy_clients: stats.happy_clients,
        success_rate: stats.success_rate,
        awards_won: stats.awards_won,
        growth_rate: stats.growth_rate,
      });
    }
  }, [stats]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateStats(formData);
    } catch (error) {
      console.error('Error updating stats:', error);
    } finally {
      setIsSubmitting(false);
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
            <h1 className="text-3xl font-bold">Edit About Page</h1>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
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

          <Card>
            <CardHeader>
              <CardTitle>About Page Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="happy_clients">Happy Clients</Label>
                  <Input
                    id="happy_clients"
                    value={formData.happy_clients}
                    onChange={(e) => handleInputChange('happy_clients', e.target.value)}
                    placeholder="500+"
                  />
                </div>
                <div>
                  <Label htmlFor="success_rate">Success Rate</Label>
                  <Input
                    id="success_rate"
                    value={formData.success_rate}
                    onChange={(e) => handleInputChange('success_rate', e.target.value)}
                    placeholder="95%"
                  />
                </div>
                <div>
                  <Label htmlFor="awards_won">Awards Won</Label>
                  <Input
                    id="awards_won"
                    value={formData.awards_won}
                    onChange={(e) => handleInputChange('awards_won', e.target.value)}
                    placeholder="15"
                  />
                </div>
                <div>
                  <Label htmlFor="growth_rate">Growth Rate</Label>
                  <Input
                    id="growth_rate"
                    value={formData.growth_rate}
                    onChange={(e) => handleInputChange('growth_rate', e.target.value)}
                    placeholder="300%"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EditAboutPage;
