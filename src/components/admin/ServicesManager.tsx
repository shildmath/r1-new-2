import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Star, StarOff } from 'lucide-react';
import { fetchDataFromTable, insertDataToTable, updateDataInTable, deleteDataFromTable } from '@/utils/supabaseHelpers';
import { Database } from '@/integrations/supabase/types';

type Service = Database['public']['Tables']['services']['Row'];
type ServiceInsert = Database['public']['Tables']['services']['Insert'];
type ServiceUpdate = Database['public']['Tables']['services']['Update'];

const defaultService: ServiceInsert = {
  title: '',
  description: '',
  icon_name: 'sparkles',
  price: null,
  is_featured: false
};

const ServicesManager = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState<ServiceInsert>(defaultService);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    const data = await fetchDataFromTable('services', { orderBy: 'created_at' });
    setServices(data as Service[]);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentService({ ...currentService, [name]: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    setCurrentService({ ...currentService, is_featured: checked });
  };

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setCurrentService({
        title: service.title,
        description: service.description,
        icon_name: service.icon_name,
        price: service.price,
        is_featured: service.is_featured
      });
      setIsEditing(true);
    } else {
      setCurrentService(defaultService);
      setIsEditing(false);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentService(defaultService);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && services.find(s => s.title === currentService.title)) {
        const serviceToUpdate = services.find(s => s.title === currentService.title);
        if (serviceToUpdate) {
          await updateDataInTable('services', serviceToUpdate.id, currentService as ServiceUpdate);
        }
      } else {
        await insertDataToTable('services', currentService);
      }
      
      loadServices();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const success = await deleteDataFromTable('services', id);
      if (success) {
        setServices(services.filter(service => service.id !== id));
      }
    }
  };

  const toggleFeatured = async (service: Service) => {
    const updatedService = await updateDataInTable(
      'services', 
      service.id, 
      { is_featured: !service.is_featured }
    );
    
    if (updatedService) {
      setServices(services.map(s => s.id === service.id ? updatedService as Service : s));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Service Management</h2>
          <p className="text-gray-600">Add, edit, and delete service offerings</p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Service
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>Manage your company's service offerings</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No services found. Add your first service!
                      </TableCell>
                    </TableRow>
                  ) : (
                    services.map((service, index) => (
                      <motion.tr
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell className="max-w-xs truncate">{service.description}</TableCell>
                        <TableCell>{service.price ? `$${service.price}` : 'N/A'}</TableCell>
                        <TableCell>
                          {service.is_featured ? (
                            <Badge className="bg-green-100 text-green-800">Featured</Badge>
                          ) : (
                            <Badge variant="outline">Standard</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => toggleFeatured(service)}
                            >
                              {service.is_featured ? (
                                <StarOff className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <Star className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleOpenDialog(service)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => handleDelete(service.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Service' : 'Add New Service'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the service details below.' : 'Enter service details below to create a new service.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={currentService.title}
                  onChange={handleChange}
                  placeholder="e.g., AI Marketing Strategy"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentService.description}
                  onChange={handleChange}
                  placeholder="Describe this service..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon_name">Icon Name</Label>
                  <Input
                    id="icon_name"
                    name="icon_name"
                    value={currentService.icon_name}
                    onChange={handleChange}
                    placeholder="e.g., sparkles"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price (optional)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={currentService.price || ''}
                    onChange={handleChange}
                    placeholder="e.g., 999.99"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="is_featured"
                  checked={!!currentService.is_featured}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="is_featured" className="cursor-pointer">Featured Service</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                {isEditing ? 'Update Service' : 'Create Service'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesManager;
