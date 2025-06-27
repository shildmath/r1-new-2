
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SalesRepresentative {
  id: string;
  name: string;
  title: string;
  bio?: string;
  calendly_link: string;
  profile_photo?: string;
  is_active: boolean;
  sequence_order: number;
  created_at: string;
  updated_at: string;
}

export const useSalesRepresentatives = () => {
  return useQuery({
    queryKey: ['sales-representatives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_representatives')
        .select('*')
        .eq('is_active', true)
        .order('sequence_order');
      
      if (error) throw error;
      return data as SalesRepresentative[];
    },
  });
};

export const useAllSalesRepresentatives = () => {
  return useQuery({
    queryKey: ['all-sales-representatives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales_representatives')
        .select('*')
        .order('sequence_order');
      
      if (error) throw error;
      return data as SalesRepresentative[];
    },
  });
};

export const useCreateSalesRepresentative = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (rep: Omit<SalesRepresentative, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('sales_representatives')
        .insert([rep])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-representatives'] });
      queryClient.invalidateQueries({ queryKey: ['all-sales-representatives'] });
      toast({
        title: "Success",
        description: "Sales representative created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create sales representative",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateSalesRepresentative = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (rep: Partial<SalesRepresentative>) => {
      const { data, error } = await supabase
        .from('sales_representatives')
        .update(rep)
        .eq('id', rep.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-representatives'] });
      queryClient.invalidateQueries({ queryKey: ['all-sales-representatives'] });
      toast({
        title: "Success",
        description: "Sales representative updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update sales representative",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteSalesRepresentative = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('sales_representatives')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales-representatives'] });
      queryClient.invalidateQueries({ queryKey: ['all-sales-representatives'] });
      toast({
        title: "Success",
        description: "Sales representative deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete sales representative",
        variant: "destructive",
      });
    },
  });
};
