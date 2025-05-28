
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { fetchTestimonials, insertDataToTable, updateDataInTable, deleteDataFromTable } from '@/utils/supabaseHelpers';
import { Database } from '@/integrations/supabase/types';
import TestimonialForm from './testimonials/TestimonialForm';
import TestimonialTable from './testimonials/TestimonialTable';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert'];

const defaultTestimonial: TestimonialInsert = {
  client_name: '',
  client_title: '',
  client_company: '',
  avatar_url: '',
  review_text: '',
  rating: 5,
  is_featured: false
};

const TestimonialsManager = () => {
  console.log('TestimonialsManager component rendering');
  
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialInsert>(defaultTestimonial);

  useEffect(() => {
    console.log('TestimonialsManager useEffect triggered');
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    console.log('Loading testimonials...');
    setLoading(true);
    try {
      const data = await fetchTestimonials({ orderBy: 'created_at' });
      console.log('Testimonials loaded:', data);
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (testimonial?: Testimonial) => {
    console.log('Opening dialog for testimonial:', testimonial);
    if (testimonial) {
      setCurrentTestimonial({
        client_name: testimonial.client_name,
        client_title: testimonial.client_title,
        client_company: testimonial.client_company,
        avatar_url: testimonial.avatar_url,
        review_text: testimonial.review_text,
        rating: testimonial.rating,
        is_featured: testimonial.is_featured
      });
      setIsEditing(true);
    } else {
      setCurrentTestimonial(defaultTestimonial);
      setIsEditing(false);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    console.log('Closing dialog');
    setDialogOpen(false);
    setCurrentTestimonial(defaultTestimonial);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting testimonial:', currentTestimonial);
    
    try {
      if (isEditing && testimonials.find(t => t.client_name === currentTestimonial.client_name)) {
        const testimonialToUpdate = testimonials.find(t => t.client_name === currentTestimonial.client_name);
        if (testimonialToUpdate) {
          await updateDataInTable('testimonials', testimonialToUpdate.id, currentTestimonial);
          toast({
            title: "Success",
            description: "Testimonial updated successfully",
          });
        }
      } else {
        await insertDataToTable('testimonials', currentTestimonial);
        toast({
          title: "Success",
          description: "Testimonial created successfully",
        });
      }
      
      loadTestimonials();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to save testimonial",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    console.log('Deleting testimonial with id:', id);
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const success = await deleteDataFromTable('testimonials', id);
        if (success) {
          setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
          toast({
            title: "Success",
            description: "Testimonial deleted successfully",
          });
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast({
          title: "Error",
          description: "Failed to delete testimonial",
          variant: "destructive",
        });
      }
    }
  };

  const toggleFeatured = async (testimonial: Testimonial) => {
    console.log('Toggling featured status for testimonial:', testimonial.id);
    try {
      const updatedTestimonial = await updateDataInTable(
        'testimonials', 
        testimonial.id, 
        { is_featured: !testimonial.is_featured }
      ) as Testimonial;
      
      if (updatedTestimonial) {
        setTestimonials(testimonials.map(t => t.id === testimonial.id ? updatedTestimonial : t));
        toast({
          title: "Success",
          description: `Testimonial ${updatedTestimonial.is_featured ? 'featured' : 'unfeatured'}`,
        });
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 h-full overflow-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Testimonial Management</h2>
          <p className="text-gray-600">Add, edit, and delete client testimonials</p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Testimonial
        </Button>
      </div>

      <Card className="border-0 shadow-lg h-full overflow-hidden">
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>Manage client reviews and testimonials</CardDescription>
        </CardHeader>
        <CardContent className="h-full overflow-hidden">
          <TestimonialTable
            testimonials={testimonials}
            loading={loading}
            onEdit={handleOpenDialog}
            onDelete={handleDelete}
            onToggleFeatured={toggleFeatured}
          />
        </CardContent>
      </Card>

      <TestimonialForm
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        isEditing={isEditing}
        testimonial={currentTestimonial}
        onTestimonialChange={setCurrentTestimonial}
        onSubmit={handleSubmit}
        onCancel={handleCloseDialog}
      />
    </div>
  );
};

export default TestimonialsManager;
