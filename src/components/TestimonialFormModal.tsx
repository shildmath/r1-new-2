
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Testimonial, TestimonialIndustry } from "@/types/testimonial";

interface TestimonialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<any>;
  testimonial?: Testimonial | null;
  maxSequence: number;
  industries: TestimonialIndustry[];
}

const TestimonialFormModal: React.FC<TestimonialFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  testimonial,
  maxSequence,
  industries,
}) => {
  const [formData, setFormData] = useState({
    client_name: "",
    company_name: "",
    description: "",
    rating: 5,
    industry: "",
    profile_photo: "",
    results: "",
    sequence_order: maxSequence + 1,
    is_active: true,
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        client_name: testimonial.client_name,
        company_name: testimonial.company_name,
        description: testimonial.description,
        rating: testimonial.rating,
        industry: testimonial.industry,
        profile_photo: testimonial.profile_photo || "",
        results: testimonial.results || "",
        sequence_order: testimonial.sequence_order,
        is_active: testimonial.is_active,
      });
    } else {
      setFormData({
        client_name: "",
        company_name: "",
        description: "",
        rating: 5,
        industry: "",
        profile_photo: "",
        results: "",
        sequence_order: maxSequence + 1,
        is_active: true,
      });
    }
  }, [testimonial, maxSequence, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client_name">Client Name *</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => handleInputChange('client_name', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => handleInputChange('company_name', e.target.value)}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Select 
                value={formData.rating.toString()} 
                onValueChange={(value) => handleInputChange('rating', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} Star{rating !== 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <Select 
                value={formData.industry} 
                onValueChange={(value) => handleInputChange('industry', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-48">
                    {industries.filter(industry => industry.is_active).map((industry) => (
                      <SelectItem key={industry.id} value={industry.name}>
                        {industry.name}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="profile_photo">Profile Photo URL</Label>
            <Input
              id="profile_photo"
              value={formData.profile_photo}
              onChange={(e) => handleInputChange('profile_photo', e.target.value)}
              placeholder="/lovable-uploads/your-image.png"
            />
          </div>
          
          <div>
            <Label htmlFor="results">Results/Achievements</Label>
            <Input
              id="results"
              value={formData.results}
              onChange={(e) => handleInputChange('results', e.target.value)}
              placeholder="e.g., 300% ROI increase"
            />
          </div>
          
          <div>
            <Label htmlFor="sequence_order">Sequence Order</Label>
            <Input
              id="sequence_order"
              type="number"
              value={formData.sequence_order}
              onChange={(e) => handleInputChange('sequence_order', parseInt(e.target.value))}
              min={0}
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
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : (testimonial ? "Update" : "Add")} Testimonial
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialFormModal;
