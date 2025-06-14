
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { supabase } from "@/integrations/supabase/client";
import UserStats from "@/components/admin/UserStats";
import UserForm from "@/components/admin/UserForm";
import UsersTable from "@/components/admin/UsersTable";
import { UserProfile } from "@/types/admin";

// Main Users Page
export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const { toast } = useToast();
  const { signup } = useSupabaseAuth();

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select(
          `
          user_id,
          role,
          profiles:profiles (
            id,
            email,
            full_name,
            created_at
          )
        `
        );
      if (error) throw error;

      const formatted: UserProfile[] =
        data?.map((item: any) => ({
          id: item.user_id,
          email: item.profiles?.email ?? "",
          full_name: item.profiles?.full_name ?? "Unknown",
          role: item.role,
          created_at: item.profiles?.created_at ?? "",
        })) ?? [];
      setUsers(formatted);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load users.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Add or update user
  const handleSubmit = async (formData: { email: string; password: string; fullName: string; role: 'admin' | 'closer' }) => {
    setIsSubmitting(true);
    try {
      if (editingUser) {
        // Update role in user_roles
        const { error: roleError } = await supabase
          .from("user_roles")
          .update({ role: formData.role })
          .eq("user_id", editingUser.id);
        if (roleError) throw roleError;

        // Update user profile in profiles
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            full_name: formData.fullName,
            email: formData.email,
          })
          .eq("id", editingUser.id);
        if (profileError) throw profileError;

        toast({
          title: "User Updated",
          description: "User has been updated.",
        });
      } else {
        // Create new user via signup
        const { error } = await signup(formData.email, formData.password, formData.fullName, formData.role);
        if (error) {
          toast({
            title: "Signup Error",
            description: error.message || String(error),
            variant: "destructive",
          });
          throw error;
        }
        toast({
          title: "User Added",
          description: "User created successfully!",
        });
      }
      await loadUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save user.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setEditingUser(null);
      setShowAddForm(false);
    }
  };

  const handleEdit = (user: UserProfile) => {
    setEditingUser(user);
    setShowAddForm(true);
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      // Remove from user_roles and profiles (cannot remove Auth user directly)
      const { error: roleError } = await supabase.from("user_roles").delete().eq("user_id", userId);
      if (roleError) throw roleError;
      const { error: profileError } = await supabase.from("profiles").delete().eq("id", userId);
      if (profileError) throw profileError;

      toast({
        title: "User Deleted",
        description: "User has been removed.",
      });
      await loadUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user.",
        variant: "destructive",
      });
    }
  };

  const initialFormData =
    editingUser && users.find((u) => u.id === editingUser.id)
      ? {
          email: editingUser.email,
          fullName: editingUser.full_name,
          role: editingUser.role,
        }
      : undefined;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Users Management
            </h1>
            <p className="text-gray-600 mt-2">Manage system users and their roles</p>
          </div>
          <Button
            onClick={() => {
              setEditingUser(null);
              setShowAddForm(true);
            }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
          >
            <Plus size={16} className="mr-2" />
            Add User
          </Button>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading users...</p>
          </div>
        ) : (
          <>
            <UserStats users={users} />
            <UserForm
              isOpen={showAddForm}
              onCancel={() => {
                setShowAddForm(false);
                setEditingUser(null);
              }}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              editingUser={editingUser}
              initialData={initialFormData}
            />
            <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
          </>
        )}
      </motion.div>
    </div>
  );
}
