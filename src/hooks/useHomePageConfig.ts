
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface HomePageConfig {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  hero_cta_text: string;
  hero_cta_secondary_text: string;
  hero_background_image: string;
  hero_video_url: string;
  hero_rotating_images: string[];
  stats_title: string;
  stats_subtitle: string;
  stats_is_visible: boolean;
  stats_data: Array<{
    value: string;
    label: string;
    icon: string;
  }>;
  services_title: string;
  services_subtitle: string;
  services_is_visible: boolean;
  services_display_limit: number;
  services_selected_ids: string[];
  testimonials_title: string;
  testimonials_subtitle: string;
  testimonials_is_visible: boolean;
  testimonials_display_limit: number;
  testimonials_selected_ids: string[];
  testimonials_selected_industry: string;
  features_title: string;
  features_is_visible: boolean;
  features_data: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    isActive: boolean;
  }>;
  cta_title: string;
  cta_subtitle: string;
  cta_primary_text: string;
  cta_secondary_text: string;
  cta_is_visible: boolean;
  cta_background_image: string;
}

export const useHomePageConfig = () => {
  const queryClient = useQueryClient();

  const { data: config, isLoading } = useQuery({
    queryKey: ['home-page-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('home_page_config')
        .select('*')
        .single();

      if (error) throw error;
      return data as HomePageConfig;
    },
  });

  const updateConfig = useMutation({
    mutationFn: async (updates: Partial<HomePageConfig>) => {
      const { data, error } = await supabase
        .from('home_page_config')
        .update(updates)
        .eq('id', config?.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home-page-config'] });
      toast.success('Home page configuration updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update home page configuration');
      console.error('Error updating home page config:', error);
    },
  });

  return {
    config,
    isLoading,
    updateConfig: updateConfig.mutateAsync,
  };
};
