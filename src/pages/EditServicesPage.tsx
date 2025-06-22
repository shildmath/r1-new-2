
import React, { useState, useRef } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ServiceFormModal from "@/components/ServiceFormModal";
import { useServices } from "@/hooks/useServices";
import { exportServicesToCSV, parseCSVToServices } from "@/utils/csvUtils";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff
} from "lucide-react";
import * as LucideIcons from "lucide-react";

const EditServicesPage = () => {
  const { services, loading, createService, updateService, deleteService, updateSequenceOrder } = useServices();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAddService = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
    }
  };

  const handleExportCSV = () => {
    exportServicesToCSV(services);
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvContent = e.target?.result as string;
        const importedServices = parseCSVToServices(csvContent);
        
        for (const serviceData of importedServices) {
          await createService(serviceData);
        }
        
        toast({
          title: "Success",
          description: `Imported ${importedServices.length} services successfully`,
        });
      } catch (error) {
        console.error('Error importing CSV:', error);
        toast({
          title: "Error",
          description: "Failed to import CSV file",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const moveService = async (service: any, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(s => s.id === service.id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= services.length) return;
    
    const targetService = services[targetIndex];
    
    // Swap sequence orders
    await updateSequenceOrder(service.id, targetService.sequence_order);
    await updateSequenceOrder(targetService.id, service.sequence_order);
  };

  const toggleServiceStatus = async (service: any) => {
    await updateService({
      id: service.id,
      is_active: !service.is_active
    });
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent size={24} /> : <LucideIcons.Star size={24} />;
  };

  const maxSequenceOrder = services.reduce((max, service) => Math.max(max, service.sequence_order), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex">
        <AdminSidebar />
        <main className="flex-1 p-8 flex items-center justify-center">
          <div className="text-lg">Loading services...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Edit Services</h1>
            <div className="flex gap-3">
              <Button onClick={handleExportCSV} variant="outline">
                <Download size={16} className="mr-2" />
                Export CSV
              </Button>
              <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                <Upload size={16} className="mr-2" />
                Import CSV
              </Button>
              <Button onClick={handleAddService}>
                <Plus size={16} className="mr-2" />
                Add Service
              </Button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleImportCSV}
            className="hidden"
          />

          <div className="grid gap-6">
            {services.map((service, index) => (
              <Card key={service.id} className={`relative ${!service.is_active ? 'opacity-60' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-primary">
                        {getIconComponent(service.icon)}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <Badge variant={service.is_active ? "default" : "secondary"} className="mt-1">
                          Order: {service.sequence_order}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveService(service, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveService(service, 'down')}
                        disabled={index === services.length - 1}
                      >
                        <ArrowDown size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleServiceStatus(service)}
                      >
                        {service.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditService(service)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteService(service.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Key Features ({service.key_features.length})</h4>
                      <ul className="space-y-1">
                        {service.key_features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                        {service.key_features.length > 3 && (
                          <li className="text-sm text-gray-500">
                            +{service.key_features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Expected Benefits ({service.expected_benefits.length})</h4>
                      <ul className="space-y-1">
                        {service.expected_benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                            {benefit}
                          </li>
                        ))}
                        {service.expected_benefits.length > 3 && (
                          <li className="text-sm text-gray-500">
                            +{service.expected_benefits.length - 3} more benefits
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No services found</p>
              <Button onClick={handleAddService}>
                <Plus size={16} className="mr-2" />
                Add Your First Service
              </Button>
            </div>
          )}
        </div>
      </main>

      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingService ? updateService : createService}
        service={editingService}
        maxSequenceOrder={maxSequenceOrder}
      />
    </div>
  );
};

export default EditServicesPage;
