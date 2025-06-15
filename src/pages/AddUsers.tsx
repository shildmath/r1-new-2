
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader, UserPlus, Edit } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminShadcnSidebar } from "@/components/AdminShadcnSidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AddUserModal from "@/components/AddUserModal";
import EditUserModal from "@/components/EditUserModal";
import { supabase } from "@/integrations/supabase/client";

type User = {
  id: string;
  email: string;
  full_name?: string;
  created_at?: string;
  role?: "admin" | "closer";
};

const AddUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    // profiles + user_roles join
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, created_at, user_roles:user_roles(role)")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setUsers(
        (data as any[]).map((user) => ({
          id: user.id,
          email: user.email,
          full_name: user.full_name,
          created_at: user.created_at,
          role: user.user_roles?.[0]?.role ?? undefined,
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: User) => setEditingUser(user);

  const handleUserAdded = () => {
    setShowAddModal(false);
    fetchUsers();
    toast({ title: "User added successfully" });
  };

  const handleUserUpdated = () => {
    setEditingUser(null);
    fetchUsers();
    toast({ title: "User updated successfully" });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 to-indigo-50">
        <AdminShadcnSidebar />
        <main className="flex-1 flex flex-col items-center px-1 pt-3 pb-7 md:py-8">
          <SidebarTrigger />
          <Card className="w-full max-w-3xl shadow-xl rounded-2xl p-0 border-0">
            <div className="flex flex-col md:flex-row items-center justify-between px-4 py-6 md:px-8 md:py-8 border-b bg-white rounded-t-2xl gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-primary">User Directory</h2>
                <p className="text-gray-500 text-sm max-w-md">
                  Browse, add or edit user accounts. Table is scrollable and fully responsive.
                </p>
              </div>
              <Button onClick={() => setShowAddModal(true)} className="flex gap-2">
                <UserPlus className="w-5 h-5" /> Add User
              </Button>
            </div>
            <div className="relative bg-white rounded-b-2xl">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader className="animate-spin w-6 h-6 mr-2 text-indigo-500" />
                  <span className="text-gray-600">Loading users...</span>
                </div>
              ) : (
                <ScrollArea className="max-h-[60vh] min-w-full md:min-w-[650px] px-2">
                  <div className="overflow-x-auto">
                    <Table className="min-w-[650px]">
                      <TableHeader>
                        <TableRow className="sticky top-0 bg-gradient-to-r from-gray-50 to-indigo-100 z-10">
                          <TableHead className="text-left">ID</TableHead>
                          <TableHead className="text-left">Email</TableHead>
                          <TableHead className="text-left">Full Name</TableHead>
                          <TableHead className="text-left">Role</TableHead>
                          <TableHead className="text-left">Created At</TableHead>
                          <TableHead className="text-left">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500">
                              No users found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-indigo-50/60 transition">
                              <TableCell className="truncate max-w-[120px] text-xs sm:text-sm">{user.id}</TableCell>
                              <TableCell className="text-sm">{user.email}</TableCell>
                              <TableCell className="text-sm">{user.full_name || "-"}</TableCell>
                              <TableCell className="text-sm capitalize">{user.role || "-"}</TableCell>
                              <TableCell className="text-xs sm:text-sm text-gray-500">
                                {user.created_at ? new Date(user.created_at).toLocaleString() : "-"}
                              </TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                                  <Edit className="w-4 h-4 mr-1" /> Edit
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              )}
            </div>
          </Card>
        </main>
      </div>
      <AddUserModal open={showAddModal} onOpenChange={setShowAddModal} onUserAdded={handleUserAdded} />
      <EditUserModal user={editingUser} open={!!editingUser} onOpenChange={() => setEditingUser(null)} onUserUpdated={handleUserUpdated} />
    </SidebarProvider>
  );
};

export default AddUsers;
