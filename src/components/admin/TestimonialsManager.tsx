
import { useState, useEffect } from 'react';
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
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<TestimonialInsert>(defaultTestimonial);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    const data = await fetchTestimonials({ orderBy: 'created_at' });
    setTestimonials(data);
    setLoading(false);
  };

  const handleOpenDialog = (testimonial?: Testimonial) => {
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
    setDialogOpen(false);
    setCurrentTestimonial(defaultTestimonial);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && testimonials.find(t => t.client_name === currentTestimonial.client_name)) {
        const testimonialToUpdate = testimonials.find(t => t.client_name === currentTestimonial.client_name);
        if (testimonialToUpdate) {
          await updateDataInTable('testimonials', testimonialToUpdate.id, currentTestimonial);
        }
      } else {
        await insertDataToTable('testimonials', currentTestimonial);
      }
      
      loadTestimonials();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      const success = await deleteDataFromTable('testimonials', id);
      if (success) {
        setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      }
    }
  };

  const toggleFeatured = async (testimonial: Testimonial) => {
    const updatedTestimonial = await updateDataInTable(
      'testimonials', 
      testimonial.id, 
      { is_featured: !testimonial.is_featured }
    ) as Testimonial;
    
    if (updatedTestimonial) {
      setTestimonials(testimonials.map(t => t.id === testimonial.id ? updatedTestimonial : t));
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
