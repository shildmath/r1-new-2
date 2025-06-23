
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AboutStats } from "@/types/about";

interface AboutStatsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<AboutStats>) => void;
  stats?: AboutStats | null;
}

const AboutStatsFormModal: React.FC<AboutStatsFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  stats,
}) => {
  const [formData, setFormData] = useState({
    happy_clients: "500+",
    success_rate: "95%",
    awards_won: "15",
    growth_rate: "300%",
  });

  useEffect(() => {
    if (stats) {
      setFormData({
        happy_clients: stats.happy_clients,
        success_rate: stats.success_rate,
        awards_won: stats.awards_won,
        growth_rate: stats.growth_rate,
      });
    }
  }, [stats]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit About Stats</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="happy_clients">Happy Clients</Label>
            <Input
              id="happy_clients"
              value={formData.happy_clients}
              onChange={(e) => setFormData(prev => ({ ...prev, happy_clients: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="success_rate">Success Rate</Label>
            <Input
              id="success_rate"
              value={formData.success_rate}
              onChange={(e) => setFormData(prev => ({ ...prev, success_rate: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="awards_won">Awards Won</Label>
            <Input
              id="awards_won"
              value={formData.awards_won}
              onChange={(e) => setFormData(prev => ({ ...prev, awards_won: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="growth_rate">Growth Rate</Label>
            <Input
              id="growth_rate"
              value={formData.growth_rate}
              onChange={(e) => setFormData(prev => ({ ...prev, growth_rate: e.target.value }))}
              required
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Stats</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AboutStatsFormModal;
