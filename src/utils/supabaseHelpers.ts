
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Generic fetch function
export const fetchDataFromTable = async <T>(tableName: string, options: any = {}) => {
  try {
    let query = supabase.from(tableName).select('*');
    
    if (options.orderBy) {
      query = query.order(options.orderBy, { ascending: options.ascending ?? false });
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data as T[];
  } catch (error: any) {
    console.error(`Error fetching ${tableName}:`, error.message);
    toast({
      title: `Error fetching ${tableName}`,
      description: error.message,
      variant: "destructive"
    });
    return [];
  }
};

// Generic insert function
export const insertDataToTable = async <T>(tableName: string, data: any): Promise<T | null> => {
  try {
    const { data: insertedData, error } = await supabase.from(tableName).insert(data).select().single();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Created Successfully",
      description: `New entry added to ${tableName}`,
    });
    
    return insertedData as T;
  } catch (error: any) {
    console.error(`Error inserting into ${tableName}:`, error.message);
    toast({
      title: `Error creating entry`,
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

// Generic update function
export const updateDataInTable = async <T>(tableName: string, id: string, data: any): Promise<T | null> => {
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
      description: `Entry in ${tableName} has been updated`,
    });
    
    return updatedData as T;
  } catch (error: any) {
    console.error(`Error updating ${tableName}:`, error.message);
    toast({
      title: `Error updating entry`,
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};

// Generic delete function
export const deleteDataFromTable = async (tableName: string, id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from(tableName).delete().eq('id', id);
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Deleted Successfully",
      description: `Entry from ${tableName} has been removed`,
    });
    
    return true;
  } catch (error: any) {
    console.error(`Error deleting from ${tableName}:`, error.message);
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
