
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Testimonial, TestimonialIndustry } from "@/types/testimonial";

interface TestimonialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
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
  });

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
      });
    }
  }, [testimonial, maxSequence]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
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
                onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="company_name">Company Name *</Label>
              <Input
                id="company_name"
                value={formData.company_name}
                onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rating">Rating</Label>
              <Select value={formData.rating.toString()} onValueChange={(value) => setFormData(prev => ({ ...prev, rating: parseInt(value) }))}>
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
              <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-48">
                    {industries.map((industry) => (
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
              onChange={(e) => setFormData(prev => ({ ...prev, profile_photo: e.target.value }))}
              placeholder="/lovable-uploads/your-image.png"
            />
          </div>
          
          <div>
            <Label htmlFor="results">Results/Achievements</Label>
            <Input
              id="results"
              value={formData.results}
              onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))}
              placeholder="e.g., 300% ROI increase"
            />
          </div>
          
          <div>
            <Label htmlFor="sequence_order">Sequence Order</Label>
            <Input
              id="sequence_order"
              type="number"
              value={formData.sequence_order}
              onChange={(e) => setFormData(prev => ({ ...prev, sequence_order: parseInt(e.target.value) }))}
              min={1}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {testimonial ? "Update" : "Add"} Testimonial
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialFormModal;
