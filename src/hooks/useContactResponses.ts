
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export function useContactResponses() {
  const [responses, setResponses] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setResponses(data || []);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = fetchData;

  const updateSubmission = async (id: string, updateObj: Partial<ContactSubmission>) => {
    setUpdatingId(id);
    try {
      const { error, data } = await supabase
        .from("contact_submissions")
        .update({ ...updateObj, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
      // Optimistic update:
      setResponses(prev =>
        prev.map(sub => sub.id === id ? { ...sub, ...updateObj, updated_at: new Date().toISOString() } : sub)
      );
    } catch (err) {
      setError(err);
    }
    setUpdatingId(null);
  };

  const deleteSubmission = async (id: string) => {
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setResponses(prev => prev.filter(sub => sub.id !== id));
    } catch (err) {
      setError(err);
    }
    setDeletingId(null);
  };

  return {
    responses,
    loading,
    error,
    updateSubmission,
    deleteSubmission,
    refetch,
    updatingId,
    deletingId,
  };
}
