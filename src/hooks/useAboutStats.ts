
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AboutStats {
  id: string;
  happy_clients: string;
  success_rate: string;
  awards_won: string;
  growth_rate: string;
}

export const useAboutStats = () => {
  const queryClient = useQueryClient();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['about-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_stats')
        .select('*')
        .single();

      if (error) throw error;
      return data as AboutStats;
    },
  });

  const updateStats = useMutation({
    mutationFn: async (updates: Partial<AboutStats>) => {
      const { data, error } = await supabase
        .from('about_stats')
        .update(updates)
        .eq('id', stats?.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-stats'] });
      toast.success('About stats updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update about stats');
      console.error('Error updating about stats:', error);
    },
  });

  return {
    stats,
    isLoading,
    updateStats: updateStats.mutateAsync,
  };
};
