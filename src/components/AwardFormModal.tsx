
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award } from "@/types/about";

interface AwardFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  award?: Award | null;
  maxSequence: number;
}

const AwardFormModal: React.FC<AwardFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  award,
  maxSequence,
}) => {
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    organization: "",
    icon: "trophy",
    color: "from-yellow-400 to-orange-500",
    sequence_order: maxSequence + 1,
  });

  const iconOptions = [
    { value: "trophy", label: "Trophy" },
    { value: "star", label: "Star" },
    { value: "award", label: "Award" },
    { value: "medal", label: "Medal" },
    { value: "lightbulb", label: "Lightbulb" },
    { value: "globe", label: "Globe" },
    { value: "target", label: "Target" },
    { value: "zap", label: "Zap" },
  ];

  const colorOptions = [
    { value: "from-yellow-400 to-orange-500", label: "Gold" },
    { value: "from-blue-400 to-purple-500", label: "Blue Purple" },
    { value: "from-green-400 to-blue-500", label: "Green Blue" },
    { value: "from-pink-400 to-red-500", label: "Pink Red" },
    { value: "from-purple-400 to-pink-500", label: "Purple Pink" },
    { value: "from-indigo-400 to-blue-500", label: "Indigo Blue" },
  ];

  useEffect(() => {
    if (award) {
      setFormData({
        year: award.year,
        title: award.title,
        organization: award.organization,
        icon: award.icon,
        color: award.color,
        sequence_order: award.sequence_order,
      });
    } else {
      setFormData({
        year: "",
        title: "",
        organization: "",
        icon: "trophy",
        color: "from-yellow-400 to-orange-500",
        sequence_order: maxSequence + 1,
      });
    }
  }, [award, maxSequence]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {award ? "Edit Award" : "Add Award"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="year">Year *</Label>
            <Input
              id="year"
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="organization">Organization *</Label>
            <Input
              id="organization"
              value={formData.organization}
              onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="icon">Icon</Label>
            <Select value={formData.icon} onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="color">Color</Label>
            <Select value={formData.color} onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              {award ? "Update" : "Add"} Award
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AwardFormModal;
