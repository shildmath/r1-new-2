
import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Save, Loader2 } from "lucide-react";
import { 
  useAllSalesRepresentatives, 
  useCreateSalesRepresentative, 
  useUpdateSalesRepresentative, 
  useDeleteSalesRepresentative,
  SalesRepresentative 
} from "@/hooks/useSalesRepresentatives";

const EditStrategyCallCalendlyPage = () => {
  const { data: salesReps, isLoading } = useAllSalesRepresentatives();
  const createSalesRep = useCreateSalesRepresentative();
  const updateSalesRep = useUpdateSalesRepresentative();
  const deleteSalesRep = useDeleteSalesRepresentative();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRep, setEditingRep] = useState<SalesRepresentative | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    calendly_link: '',
    profile_photo: '',
    is_active: true,
    sequence_order: 0,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      bio: '',
      calendly_link: '',
      profile_photo: '',
      is_active: true,
      sequence_order: 0,
    });
  };

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await createSalesRep.mutateAsync(formData);
    if (success) {
      resetForm();
      setIsCreateModalOpen(false);
    }
  };

  const handleEdit = (rep: SalesRepresentative) => {
    setEditingRep(rep);
    setFormData({
      name: rep.name,
      title: rep.title,
      bio: rep.bio || '',
      calendly_link: rep.calendly_link,
      profile_photo: rep.profile_photo || '',
      is_active: rep.is_active,
      sequence_order: rep.sequence_order,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRep) {
      const success = await updateSalesRep.mutateAsync({
        id: editingRep.id,
        ...formData
      });
      if (success) {
        resetForm();
        setIsEditModalOpen(false);
        setEditingRep(null);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this sales representative?')) {
      await deleteSalesRep.mutateAsync(id);
    }
  };

  const handleToggleActive = async (rep: SalesRepresentative) => {
    await updateSalesRep.mutateAsync({
      id: rep.id,
      is_active: !rep.is_active
    });
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
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Manage Sales Representatives</h1>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Sales Rep
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Sales Representative</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Sales Representative"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Brief description of experience"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="calendly_link">Calendly Link *</Label>
                    <Input
                      id="calendly_link"
                      value={formData.calendly_link}
                      onChange={(e) => handleInputChange('calendly_link', e.target.value)}
                      placeholder="https://calendly.com/username"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="profile_photo">Profile Photo URL</Label>
                    <Input
                      id="profile_photo"
                      value={formData.profile_photo}
                      onChange={(e) => handleInputChange('profile_photo', e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sequence_order">Display Order</Label>
                    <Input
                      id="sequence_order"
                      type="number"
                      value={formData.sequence_order}
                      onChange={(e) => handleInputChange('sequence_order', parseInt(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={createSalesRep.isPending}
                  >
                    {createSalesRep.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Sales Rep
                      </>
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sales Representatives</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Calendly Link</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesReps?.map((rep) => (
                    <TableRow key={rep.id}>
                      <TableCell className="font-medium">{rep.name}</TableCell>
                      <TableCell>{rep.title}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        <a 
                          href={rep.calendly_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {rep.calendly_link}
                        </a>
                      </TableCell>
                      <TableCell>{rep.sequence_order}</TableCell>
                      <TableCell>
                        <Switch
                          checked={rep.is_active}
                          onCheckedChange={() => handleToggleActive(rep)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(rep)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(rep.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Edit Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Sales Representative</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="edit_name">Name *</Label>
                  <Input
                    id="edit_name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit_title">Title *</Label>
                  <Input
                    id="edit_title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Sales Representative"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit_bio">Bio</Label>
                  <Textarea
                    id="edit_bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Brief description of experience"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_calendly_link">Calendly Link *</Label>
                  <Input
                    id="edit_calendly_link"
                    value={formData.calendly_link}
                    onChange={(e) => handleInputChange('calendly_link', e.target.value)}
                    placeholder="https://calendly.com/username"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit_profile_photo">Profile Photo URL</Label>
                  <Input
                    id="edit_profile_photo"
                    value={formData.profile_photo}
                    onChange={(e) => handleInputChange('profile_photo', e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="edit_sequence_order">Display Order</Label>
                  <Input
                    id="edit_sequence_order"
                    type="number"
                    value={formData.sequence_order}
                    onChange={(e) => handleInputChange('sequence_order', parseInt(e.target.value))}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit_is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                  />
                  <Label htmlFor="edit_is_active">Active</Label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={updateSalesRep.isPending}
                >
                  {updateSalesRep.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Sales Rep
                    </>
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default EditStrategyCallCalendlyPage;
