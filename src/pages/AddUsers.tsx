
import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { Label } from "@/components/ui/label";

const AddUsers = () => {
  const { users, loading, error, addUser } = useAdminUsers();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "closer" as "admin" | "closer",
  });
  const [success, setSuccess] = useState<string | null>(null);

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
                </tr>
              </thead>
              <tbody>
                {users?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-4">
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
