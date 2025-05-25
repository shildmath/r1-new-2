
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Database } from '@/integrations/supabase/types';

type TestimonialInsert = Database['public']['Tables']['testimonials']['Insert'];

interface TestimonialFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  testimonial: TestimonialInsert;
  onTestimonialChange: (testimonial: TestimonialInsert) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const TestimonialForm = ({
  open,
  onOpenChange,
  isEditing,
  testimonial,
  onTestimonialChange,
  onSubmit,
  onCancel
}: TestimonialFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onTestimonialChange({ ...testimonial, [name]: value });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTestimonialChange({ ...testimonial, rating: parseInt(e.target.value) });
  };

  const handleSwitchChange = (checked: boolean) => {
    onTestimonialChange({ ...testimonial, is_featured: checked });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the testimonial details below.' : 'Enter testimonial details below to create a new client review.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 pt-4">
          <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                name="client_name"
                value={testimonial.client_name}
                onChange={handleChange}
                placeholder="e.g., John Smith"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client_title">Client Title</Label>
                <Input
                  id="client_title"
                  name="client_title"
                  value={testimonial.client_title}
                  onChange={handleChange}
                  placeholder="e.g., Marketing Director"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="client_company">Client Company (Optional)</Label>
                <Input
                  id="client_company"
                  name="client_company"
                  value={testimonial.client_company || ''}
                  onChange={handleChange}
                  placeholder="e.g., Acme Inc."
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="avatar_url">Avatar URL (Optional)</Label>
              <Input
                id="avatar_url"
                name="avatar_url"
                value={testimonial.avatar_url || ''}
                onChange={handleChange}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="review_text">Testimonial</Label>
              <Textarea
                id="review_text"
                name="review_text"
                value={testimonial.review_text}
                onChange={handleChange}
                placeholder="What did the client say about your services?"
                rows={4}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-5)</Label>
              <Input
                id="rating"
                name="rating"
                type="range"
                min="1"
                max="5"
                value={testimonial.rating}
                onChange={handleRatingChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                {[1, 2, 3, 4, 5].map((num) => (
                  <span key={num}>{num}</span>
                ))}
              </div>
              <div className="text-center mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xl">★</span>
                ))}
                {[...Array(5 - (testimonial.rating || 0))].map((_, i) => (
                  <span key={i} className="text-gray-300 text-xl">★</span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="is_featured"
                checked={!!testimonial.is_featured}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="is_featured" className="cursor-pointer">Featured Testimonial</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
              {isEditing ? 'Update Testimonial' : 'Create Testimonial'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;
