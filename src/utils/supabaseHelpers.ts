
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

// Define a type for table names
type TableName = keyof Database['public']['Tables'];

// Generic fetch function
export const fetchDataFromTable = async (
  tableName: TableName,
  options: { orderBy?: string; ascending?: boolean } = {}
) => {
  try {
    let query = supabase.from(tableName).select('*');
    
    if (options.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? false });
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error: any) {
    console.error(`Error fetching ${String(tableName)}:`, error.message);
    toast({
      title: `Error fetching ${String(tableName)}`,
      description: error.message,
      variant: "destructive"
    });
    return [];
  }
};

// Specific fetch functions for type safety
export const fetchTestimonials = async (options: { orderBy?: string; ascending?: boolean } = {}) => {
  return fetchDataFromTable('testimonials', options) as Promise<Database['public']['Tables']['testimonials']['Row'][]>;
};

export const fetchServices = async (options: { orderBy?: string; ascending?: boolean } = {}) => {
  return fetchDataFromTable('services', options) as Promise<Database['public']['Tables']['services']['Row'][]>;
};

// Generic insert function
export const insertDataToTable = async (
  tableName: TableName,
  data: any
) => {
  try {
    const { data: insertedData, error } = await supabase
      .from(tableName)
      .insert(data)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Created Successfully",
      description: `New entry added to ${String(tableName)}`,
    });
    
    return insertedData;
  } catch (error: any) {
    console.error(`Error inserting into ${String(tableName)}:`, error.message);
    toast({
      title: `Error creating entry`,
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

// Generic update function
export const updateDataInTable = async (
  tableName: TableName,
  id: string,
  data: any
) => {
  try {
    const { data: updatedData, error } = await supabase
      .from(tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Updated Successfully",
      description: `Entry in ${String(tableName)} has been updated`,
    });
    
    return updatedData;
  } catch (error: any) {
    console.error(`Error updating ${String(tableName)}:`, error.message);
    toast({
      title: `Error updating entry`,
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

// Generic delete function
export const deleteDataFromTable = async (
  tableName: TableName,
  id: string
): Promise<boolean> => {
  try {
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Deleted Successfully",
      description: `Entry from ${String(tableName)} has been removed`,
    });
    
    return true;
  } catch (error: any) {
    console.error(`Error deleting from ${String(tableName)}:`, error.message);
    toast({
      title: `Error deleting entry`,
      description: error.message,
      variant: "destructive"
    });
    return false;
  }
};

// Fetch settings grouped by category
export const fetchSettings = async () => {
  try {
    const { data, error } = await supabase.from('site_settings').select('*');
    
    if (error) {
      throw error;
    }
    
    const groupedSettings: Record<string, Record<string, string>> = {};
    
    data.forEach(setting => {
      if (!groupedSettings[setting.setting_group]) {
        groupedSettings[setting.setting_group] = {};
      }
      groupedSettings[setting.setting_group][setting.setting_key] = setting.setting_value;
    });
    
    return groupedSettings;
  } catch (error: any) {
    console.error('Error fetching settings:', error.message);
    toast({
      title: 'Error fetching settings',
      description: error.message,
      variant: "destructive"
    });
    return {};
  }
};

// Update multiple settings
export const updateSettings = async (settings: { group: string; key: string; value: string }[]) => {
  try {
    const promises = settings.map(async ({ group, key, value }) => {
      const { data, error } = await supabase
        .from('site_settings')
        .update({ setting_value: value })
        .eq('setting_group', group)
        .eq('setting_key', key);
        
      if (error) {
        throw error;
      }
      
      return data;
    });
    
    await Promise.all(promises);
    
    toast({
      title: "Settings Updated",
      description: "Your changes have been saved",
    });
    
    return true;
  } catch (error: any) {
    console.error('Error updating settings:', error.message);
    toast({
      title: 'Error updating settings',
      description: error.message,
      variant: "destructive"
    });
    return false;
  }
};
