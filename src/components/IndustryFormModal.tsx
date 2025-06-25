
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TestimonialIndustry } from "@/types/testimonial";

interface IndustryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  industry?: TestimonialIndustry | null;
  maxSequence: number;
}

const IndustryFormModal: React.FC<IndustryFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  industry,
  maxSequence,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    sequence_order: maxSequence + 1,
  });

  useEffect(() => {
    if (industry) {
      setFormData({
        name: industry.name,
        sequence_order: industry.sequence_order,
      });
    } else {
      setFormData({
        name: "",
        sequence_order: maxSequence + 1,
      });
    }
  }, [industry, maxSequence]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>
            {industry ? "Edit Industry" : "Add Industry"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Industry Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
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
              {industry ? "Update" : "Add"} Industry
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IndustryFormModal;
