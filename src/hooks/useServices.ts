
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Service, CreateServiceRequest, UpdateServiceRequest } from '@/types/service';
import { useToast } from '@/hooks/use-toast';

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sequence_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({
        title: "Error",
        description: "Failed to fetch services",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createService = async (serviceData: CreateServiceRequest) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()
        .single();

      if (error) throw error;
      
      setServices(prev => [...prev, data].sort((a, b) => a.sequence_order - b.sequence_order));
      toast({
        title: "Success",
        description: "Service created successfully",
      });
      return data;
    } catch (error) {
      console.error('Error creating service:', error);
      toast({
        title: "Error",
        description: "Failed to create service",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateService = async (serviceData: UpdateServiceRequest) => {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', serviceData.id)
        .select()
        .single();

      if (error) throw error;
      
      setServices(prev => 
        prev.map(service => 
          service.id === serviceData.id ? data : service
        ).sort((a, b) => a.sequence_order - b.sequence_order)
      );
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
      return data;
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setServices(prev => prev.filter(service => service.id !== id));
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateSequenceOrder = async (id: string, newOrder: number) => {
    try {
      await updateService({ id, sequence_order: newOrder });
    } catch (error) {
      console.error('Error updating sequence order:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return {
    services,
    loading,
    createService,
    updateService,
    deleteService,
    updateSequenceOrder,
    refetch: fetchServices
  };
};
