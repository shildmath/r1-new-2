
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminShadcnSidebar } from "@/components/AdminShadcnSidebar";

type User = {
  id: string;
  email: string;
  full_name?: string;
  created_at?: string;
};

const AddUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const { data, error } = await import("@/integrations/supabase/client")
        .then(mod => mod.supabase)
        .then(supabase =>
          supabase
            .from("profiles")
            .select("id, email, full_name, created_at")
            .order("created_at", { ascending: false })
        );
      if (!error && data) {
        setUsers(data);
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-slate-50 to-indigo-50">
        <AdminShadcnSidebar />
        <main className="flex-1 flex flex-col items-center px-1 pt-3 pb-7 md:py-8">
          <SidebarTrigger />
          <Card className="w-full max-w-3xl shadow-xl rounded-2xl p-0 border-0">
            <div className="px-4 py-6 md:px-8 md:py-8 border-b bg-white rounded-t-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-center text-primary">User Directory</h2>
              <p className="text-gray-500 text-center text-sm max-w-md mx-auto">
                Browse all user accounts registered in the system. Table is scrollable and fully responsive.
              </p>
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
                    <Table className="min-w-[600px]">
                      <TableHeader>
                        <TableRow className="sticky top-0 bg-gradient-to-r from-gray-50 to-indigo-100 z-10">
                          <TableHead className="text-left">ID</TableHead>
                          <TableHead className="text-left">Email</TableHead>
                          <TableHead className="text-left">Full Name</TableHead>
                          <TableHead className="text-left">Created At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500">
                              No users found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          users.map((user) => (
                            <TableRow key={user.id} className="hover:bg-indigo-50/60 transition">
                              <TableCell className="truncate max-w-[140px] text-xs sm:text-sm">{user.id}</TableCell>
                              <TableCell className="text-sm">{user.email}</TableCell>
                              <TableCell className="text-sm">{user.full_name || "-"}</TableCell>
                              <TableCell className="text-xs sm:text-sm text-gray-500">
                                {user.created_at ? new Date(user.created_at).toLocaleString() : "-"}
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
    </SidebarProvider>
  );
};

export default AddUsers;
