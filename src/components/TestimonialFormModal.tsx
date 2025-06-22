
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Testimonial, CreateTestimonialRequest, UpdateTestimonialRequest } from '@/types/testimonial';
import { Star } from 'lucide-react';

interface TestimonialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (testimonial: CreateTestimonialRequest | UpdateTestimonialRequest) => Promise<{ success: boolean; error?: string }>;
  testimonial?: Testimonial;
  maxSequence: number;
}

const industries = [
  'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education',
  'Real Estate', 'Manufacturing', 'Retail', 'Hospitality', 'Consulting',
  'Marketing', 'Legal', 'Non-profit', 'Automotive', 'Food & Beverage'
];

const TestimonialFormModal: React.FC<TestimonialFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  testimonial,
  maxSequence
}) => {
  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    rating: 5,
    description: '',
    industry: 'Technology',
    results: '',
    profile_photo: '',
    sequence_order: maxSequence + 1,
    is_active: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        client_name: testimonial.client_name,
        company_name: testimonial.company_name,
        rating: testimonial.rating,
        description: testimonial.description,
        industry: testimonial.industry,
        results: testimonial.results || '',
        profile_photo: testimonial.profile_photo || '',
        sequence_order: testimonial.sequence_order,
        is_active: testimonial.is_active
      });
    } else {
      setFormData({
        client_name: '',
        company_name: '',
        rating: 5,
        description: '',
        industry: 'Technology',
        results: '',
        profile_photo: '',
        sequence_order: maxSequence + 1,
        is_active: true
      });
    }
  }, [testimonial, maxSequence, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = testimonial 
        ? { ...formData, id: testimonial.id } as UpdateTestimonialRequest
        : formData as CreateTestimonialRequest;

      const result = await onSubmit(submitData);
      
      if (result.success) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client_name">Client Name *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Rating *</Label>
              {renderStars(formData.rating, (rating) => setFormData({ ...formData, rating }))}
            </div>

            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div>
            <Label htmlFor="results">Results</Label>
            <Input
              id="results"
              value={formData.results}
              onChange={(e) => setFormData({ ...formData, results: e.target.value })}
              placeholder="e.g., 300% ROI increase"
            />
          </div>

          <div>
            <Label htmlFor="profile_photo">Profile Photo URL</Label>
            <Input
              id="profile_photo"
              value={formData.profile_photo}
              onChange={(e) => setFormData({ ...formData, profile_photo: e.target.value })}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sequence_order">Sequence Order</Label>
              <Input
                id="sequence_order"
                type="number"
                value={formData.sequence_order}
                onChange={(e) => setFormData({ ...formData, sequence_order: parseInt(e.target.value) || 0 })}
                min="0"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : testimonial ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialFormModal;
