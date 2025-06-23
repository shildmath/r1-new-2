
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JourneyMilestone } from "@/types/about";

interface JourneyMilestoneFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  milestone?: JourneyMilestone | null;
  maxSequence: number;
}

const JourneyMilestoneFormModal: React.FC<JourneyMilestoneFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  milestone,
  maxSequence,
}) => {
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    description: "",
    icon: "zap",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    metrics: "",
    highlight: "",
    sequence_order: maxSequence + 1,
  });

  const iconOptions = [
    { value: "zap", label: "Zap" },
    { value: "target", label: "Target" },
    { value: "users-2", label: "Users" },
    { value: "award", label: "Award" },
    { value: "medal", label: "Medal" },
    { value: "trending-up", label: "Trending Up" },
    { value: "check-circle", label: "Check Circle" },
    { value: "lightbulb", label: "Lightbulb" },
    { value: "globe", label: "Globe" },
    { value: "star", label: "Star" },
  ];

  const colorOptions = [
    { value: "bg-gradient-to-br from-blue-500 to-blue-600", label: "Blue" },
    { value: "bg-gradient-to-br from-purple-500 to-purple-600", label: "Purple" },
    { value: "bg-gradient-to-br from-pink-500 to-pink-600", label: "Pink" },
    { value: "bg-gradient-to-br from-red-500 to-red-600", label: "Red" },
    { value: "bg-gradient-to-br from-orange-500 to-orange-600", label: "Orange" },
    { value: "bg-gradient-to-br from-green-500 to-green-600", label: "Green" },
    { value: "bg-gradient-to-br from-emerald-500 to-emerald-600", label: "Emerald" },
    { value: "bg-gradient-to-br from-cyan-500 to-cyan-600", label: "Cyan" },
    { value: "bg-gradient-to-br from-blue-600 to-indigo-600", label: "Blue Indigo" },
  ];

  useEffect(() => {
    if (milestone) {
      setFormData({
        year: milestone.year,
        title: milestone.title,
        description: milestone.description,
        icon: milestone.icon,
        color: milestone.color,
        metrics: milestone.metrics,
        highlight: milestone.highlight,
        sequence_order: milestone.sequence_order,
      });
    } else {
      setFormData({
        year: "",
        title: "",
        description: "",
        icon: "zap",
        color: "bg-gradient-to-br from-blue-500 to-blue-600",
        metrics: "",
        highlight: "",
        sequence_order: maxSequence + 1,
      });
    }
  }, [milestone, maxSequence]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {milestone ? "Edit Journey Milestone" : "Add Journey Milestone"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="highlight">Highlight *</Label>
              <Input
                id="highlight"
                value={formData.highlight}
                onChange={(e) => setFormData(prev => ({ ...prev, highlight: e.target.value }))}
                required
              />
            </div>
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
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="metrics">Metrics *</Label>
            <Input
              id="metrics"
              value={formData.metrics}
              onChange={(e) => setFormData(prev => ({ ...prev, metrics: e.target.value }))}
              placeholder="e.g., Initial Investment: $50K"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
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
              {milestone ? "Update" : "Add"} Milestone
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JourneyMilestoneFormModal;
