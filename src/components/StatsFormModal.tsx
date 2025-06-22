
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TestimonialStats } from '@/types/testimonial';

interface StatsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (stats: Partial<TestimonialStats>) => Promise<{ success: boolean; error?: string }>;
  currentStats?: TestimonialStats;
}

const StatsFormModal: React.FC<StatsFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentStats
}) => {
  const [formData, setFormData] = useState({
    happy_clients: '500+',
    average_roi: '342%',
    success_rate: '97%',
    client_rating: '4.9/5'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentStats) {
      setFormData({
        happy_clients: currentStats.happy_clients,
        average_roi: currentStats.average_roi,
        success_rate: currentStats.success_rate,
        client_rating: currentStats.client_rating
      });
    }
  }, [currentStats, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await onSubmit(formData);
      if (result.success) {
        onClose();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Statistics</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="happy_clients">Happy Clients</Label>
            <Input
              id="happy_clients"
              value={formData.happy_clients}
              onChange={(e) => setFormData({ ...formData, happy_clients: e.target.value })}
              placeholder="500+"
              required
            />
          </div>

          <div>
            <Label htmlFor="average_roi">Average ROI</Label>
            <Input
              id="average_roi"
              value={formData.average_roi}
              onChange={(e) => setFormData({ ...formData, average_roi: e.target.value })}
              placeholder="342%"
              required
            />
          </div>

          <div>
            <Label htmlFor="success_rate">Success Rate</Label>
            <Input
              id="success_rate"
              value={formData.success_rate}
              onChange={(e) => setFormData({ ...formData, success_rate: e.target.value })}
              placeholder="97%"
              required
            />
          </div>

          <div>
            <Label htmlFor="client_rating">Client Rating</Label>
            <Input
              id="client_rating"
              value={formData.client_rating}
              onChange={(e) => setFormData({ ...formData, client_rating: e.target.value })}
              placeholder="4.9/5"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Stats'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StatsFormModal;
