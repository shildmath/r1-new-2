
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { TestimonialIndustry, CreateIndustryRequest, UpdateIndustryRequest } from '@/types/testimonial';

export const useTestimonialIndustries = () => {
  return useQuery({
    queryKey: ['testimonial-industries'],
    queryFn: async (): Promise<TestimonialIndustry[]> => {
      const { data, error } = await supabase
        .from('testimonial_industries')
        .select('*')
        .eq('is_active', true)
        .order('sequence_order', { ascending: true });
      
      if (error) throw error;
      return data || [];
    },
  });
};

export const useCreateIndustry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (industry: CreateIndustryRequest): Promise<TestimonialIndustry> => {
      const { data, error } = await supabase
        .from('testimonial_industries')
        .insert(industry)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonial-industries'] });
    },
  });
};

export const useUpdateIndustry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: UpdateIndustryRequest): Promise<TestimonialIndustry> => {
      const { data, error } = await supabase
        .from('testimonial_industries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonial-industries'] });
    },
  });
};

export const useDeleteIndustry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from('testimonial_industries')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonial-industries'] });
    },
  });
};
