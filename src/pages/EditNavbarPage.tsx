
import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useNavbarConfig, useUpdateNavbarConfig } from "@/hooks/useNavbarConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, Save, Loader2 } from "lucide-react";

const EditNavbarPage = () => {
  const { data: config, isLoading } = useNavbarConfig();
  const updateNavbarConfig = useUpdateNavbarConfig();

  const [formData, setFormData] = useState({
    brand: '',
    nav_items: [] as Array<{name: string; path: string}>,
  });

  useEffect(() => {
    if (config) {
      setFormData({
        brand: config.brand,
        nav_items: config.nav_items,
      });
    }
  }, [config]);

  const handleNavItemChange = (index: number, field: 'name' | 'path', value: string) => {
    const newNavItems = [...formData.nav_items];
    newNavItems[index] = { ...newNavItems[index], [field]: value };
    setFormData(prev => ({ ...prev, nav_items: newNavItems }));
  };

  const addNavItem = () => {
    setFormData(prev => ({
      ...prev,
      nav_items: [...prev.nav_items, { name: '', path: '' }]
    }));
  };

  const removeNavItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      nav_items: prev.nav_items.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config) {
      updateNavbarConfig.mutate({
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
            <h1 className="text-3xl font-bold">Edit Navbar</h1>
            <Button 
              onClick={handleSubmit}
              disabled={updateNavbarConfig.isPending}
              className="bg-primary hover:bg-primary/90"
            >
              {updateNavbarConfig.isPending ? (
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
              <CardTitle>Navbar Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="brand">Brand Name</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Navigation Items</Label>
                  <Button onClick={addNavItem} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                <div className="space-y-4">
                  {formData.nav_items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Label htmlFor={`name_${index}`}>Name</Label>
                        <Input
                          id={`name_${index}`}
                          value={item.name}
                          onChange={(e) => handleNavItemChange(index, 'name', e.target.value)}
                          placeholder="Home"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={`path_${index}`}>Path</Label>
                        <Input
                          id={`path_${index}`}
                          value={item.path}
                          onChange={(e) => handleNavItemChange(index, 'path', e.target.value)}
                          placeholder="/"
                        />
                      </div>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeNavItem(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EditNavbarPage;
