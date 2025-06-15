
import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client"; // <-- added import

const AddUsers = () => {
  const { users, loading, error, addUser, fetchUsers } = useAdminUsers();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "closer" as "admin" | "closer",
  });
  const [success, setSuccess] = useState<string | null>(null);

  // Editing state
  const [editUser, setEditUser] = useState<any>(null); // user object for editing
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "closer" as "admin" | "closer" });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  // Handlers for adding users
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    const ok = await addUser(form);
    if (ok) {
      setForm({ name: "", email: "", password: "", role: "closer" });
      setSuccess("User added successfully! If you enabled email confirmation, ask the user to check their inbox.");
    }
  };

  // Edit logic
  const startEdit = (user: any) => {
    setEditForm({
      name: user.full_name || "",
      email: user.email || "",
      role: user.role || "closer",
    });
    setEditError(null);
    setEditUser(user);
  };

  // Save edit
  const handleEditSave = async () => {
    setEditLoading(true);
    setEditError(null);

    // Step 1: Update profiles table
    const { error: updateProfileErr } = await supabase // <-- replaced window.supabase
      .from("profiles")
      .update({
        full_name: editForm.name,
        email: editForm.email,
      })
      .eq("id", editUser.id);

    if (updateProfileErr) {
      setEditError("Could not update profile: " + updateProfileErr.message);
      setEditLoading(false);
      return;
    }

    // Step 2: Update user_roles
    const { error: updateRoleErr } = await supabase // <-- replaced window.supabase
      .from("user_roles")
      .update({
        role: editForm.role,
      })
      .eq("user_id", editUser.id);

    if (updateRoleErr) {
      setEditError("Could not update role: " + updateRoleErr.message);
      setEditLoading(false);
      return;
    }

    setEditLoading(false);
    setEditUser(null);
    await fetchUsers();
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <div className="flex-1">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Add Users (Admin Only)</h1>
          <form
            className="bg-white rounded-lg shadow-lg p-6 space-y-5 mb-10 border"
            onSubmit={handleSubmit}
          >
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                autoComplete="new-password"
                onChange={handleChange}
                minLength={6}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-background"
                required
              >
                <option value="admin">Admin</option>
                <option value="closer">Closer</option>
              </select>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </Button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {success && <div className="text-green-500 text-sm">{success}</div>}
          </form>
          <h2 className="text-xl font-semibold mb-3">Users List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left font-semibold">Name</th>
                  <th className="py-2 px-3 text-left font-semibold">Email</th>
                  <th className="py-2 px-3 text-left font-semibold">Role</th>
                  <th className="py-2 px-3 text-left font-semibold">Created At</th>
                  <th className="py-2 px-3 text-left font-semibold">Edit</th>
                </tr>
              </thead>
              <tbody>
                {users?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-4">
                      No users found.
                    </td>
                  </tr>
                )}
                {users?.map((u) => (
                  <tr key={u.id}>
                    <td className="py-2 px-3">{u.full_name || "-"}</td>
                    <td className="py-2 px-3">{u.email}</td>
                    <td className="py-2 px-3 capitalize">{u.role ?? "N/A"}</td>
                    <td className="py-2 px-3 text-xs">
                      {u.created_at ? new Date(u.created_at).toLocaleString() : "-"}
                    </td>
                    <td className="py-2 px-3">
                      <Dialog open={editUser?.id === u.id} onOpenChange={open => open ? startEdit(u) : setEditUser(null)}>
                        <DialogTrigger asChild>
                          <Button type="button" variant="outline" onClick={() => startEdit(u)}>
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-name">Full Name</Label>
                              <Input
                                id="edit-name"
                                name="name"
                                type="text"
                                required
                                value={editForm.name}
                                onChange={handleEditFormChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-email">Email</Label>
                              <Input
                                id="edit-email"
                                name="email"
                                type="email"
                                required
                                value={editForm.email}
                                onChange={handleEditFormChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-role">Role</Label>
                              <select
                                id="edit-role"
                                name="role"
                                value={editForm.role}
                                onChange={handleEditFormChange}
                                className="w-full border rounded px-3 py-2 bg-background"
                                required
                              >
                                <option value="admin">Admin</option>
                                <option value="closer">Closer</option>
                              </select>
                            </div>
                            {editError && <div className="text-red-500 text-sm">{editError}</div>}
                          </div>
                          <DialogFooter className="mt-4">
                            <Button type="button" onClick={handleEditSave} disabled={editLoading}>
                              {editLoading ? "Saving..." : "Save"}
                            </Button>
                            <DialogClose asChild>
                              <Button type="button" variant="outline">
                                Cancel
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;

