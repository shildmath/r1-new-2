
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader } from "lucide-react";

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
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, created_at")
        .order("created_at", { ascending: false });
      if (!error && data) {
        setUsers(data);
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 bg-gray-50">
      <Card className="w-full max-w-3xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">All Users</h2>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin w-6 h-6 mr-2" />
            Loading users...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Created At</TableHead>
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
                    <TableRow key={user.id}>
                      <TableCell className="truncate max-w-[160px]">{user.id}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.full_name || "-"}</TableCell>
                      <TableCell>{user.created_at ? new Date(user.created_at).toLocaleString() : "-"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AddUsers;
