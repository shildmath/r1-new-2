
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface NavbarConfig {
  id: string;
  brand: string;
  nav_items: Array<{name: string; path: string}>;
  created_at: string;
  updated_at: string;
}

export const useNavbarConfig = () => {
  return useQuery({
    queryKey: ['navbar-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('navbar_config')
        .select('*')
        .single();
      
      if (error) throw error;
      return data as NavbarConfig;
    },
  });
};

export const useUpdateNavbarConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (config: Partial<NavbarConfig>) => {
      const { data, error } = await supabase
        .from('navbar_config')
        .update(config)
        .eq('id', config.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['navbar-config'] });
      toast({
        title: "Success",
        description: "Navbar configuration updated successfully",
      });
      // Notify other components to reload navbar
      window.dispatchEvent(new Event("navbarConfigUpdated"));
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update navbar configuration",
        variant: "destructive",
      });
    },
  });
};
