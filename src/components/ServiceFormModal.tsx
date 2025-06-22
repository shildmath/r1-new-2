
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Service, CreateServiceRequest, UpdateServiceRequest } from '@/types/service';
import { X, Plus } from 'lucide-react';

interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateServiceRequest | UpdateServiceRequest) => Promise<void>;
  service?: Service | null;
  maxSequenceOrder: number;
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  service,
  maxSequenceOrder
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    key_features: [''],
    expected_benefits: [''],
    sequence_order: maxSequenceOrder + 1,
    is_active: true
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        key_features: service.key_features.length ? service.key_features : [''],
        expected_benefits: service.expected_benefits.length ? service.expected_benefits : [''],
        sequence_order: service.sequence_order,
        is_active: service.is_active
      });
    } else {
      setFormData({
        title: '',
        description: '',
        icon: '',
        key_features: [''],
        expected_benefits: [''],
        sequence_order: maxSequenceOrder + 1,
        is_active: true
      });
    }
  }, [service, maxSequenceOrder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanedData = {
        ...formData,
        key_features: formData.key_features.filter(f => f.trim()),
        expected_benefits: formData.expected_benefits.filter(b => b.trim())
      };

      if (service) {
        await onSubmit({ ...cleanedData, id: service.id } as UpdateServiceRequest);
      } else {
        await onSubmit(cleanedData as CreateServiceRequest);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      key_features: [...prev.key_features, '']
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      key_features: prev.key_features.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      key_features: prev.key_features.map((feature, i) => i === index ? value : feature)
    }));
  };

  const addBenefit = () => {
    setFormData(prev => ({
      ...prev,
      expected_benefits: [...prev.expected_benefits, '']
    }));
  };

  const removeBenefit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      expected_benefits: prev.expected_benefits.filter((_, i) => i !== index)
    }));
  };

  const updateBenefit = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      expected_benefits: prev.expected_benefits.map((benefit, i) => i === index ? value : benefit)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="icon">Icon (Lucide React Icon Name)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                placeholder="e.g., Brain, Search, Target"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              required
            />
          </div>

          <div>
            <Label>Key Features</Label>
            {formData.key_features.map((feature, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Enter feature"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  disabled={formData.key_features.length === 1}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature} className="w-full">
              <Plus size={16} className="mr-2" /> Add Feature
            </Button>
          </div>

          <div>
            <Label>Expected Benefits</Label>
            {formData.expected_benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  placeholder="Enter benefit"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeBenefit(index)}
                  disabled={formData.expected_benefits.length === 1}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addBenefit} className="w-full">
              <Plus size={16} className="mr-2" /> Add Benefit
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sequence">Sequence Order</Label>
              <Input
                id="sequence"
                type="number"
                value={formData.sequence_order}
                onChange={(e) => setFormData(prev => ({ ...prev, sequence_order: parseInt(e.target.value) || 0 }))}
                min="1"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="active">Active</Label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : service ? 'Update Service' : 'Create Service'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormModal;
