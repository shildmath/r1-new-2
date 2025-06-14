
import React, { useState } from "react";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AddUsers: React.FC = () => {
  const { users, loading, addUser } = useAdminUsers();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "closer",
    password: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [feedback, setFeedback] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFeedback(null);

    const res = await addUser(form);
    if (res.success) {
      setFeedback("User added successfully!");
      setForm({ name: "", email: "", role: "closer", password: "" });
    } else {
      setFeedback("Error: " + (res.error || "Could not add user."));
    }
    setFormLoading(false);
  };

  return (
    <div className="p-8 flex flex-col items-center min-h-screen bg-muted">
      <Card className="w-full max-w-xl mb-10">
        <CardHeader>
          <CardTitle>Add User (Admin Only)</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <Input
                required
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Password</label>
              <Input
                required
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Set password"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Role</label>
              <Select
                value={form.role}
                onValueChange={v => setForm(f => ({ ...f, role: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="closer">Closer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 flex flex-row justify-end">
              <Button type="submit" className="agency-btn min-w-[120px]" disabled={formLoading}>
                {formLoading ? "Adding..." : "Add User"}
              </Button>
            </div>
            {feedback && (
              <div className="col-span-2 text-center mt-3 text-green-700">{feedback}</div>
            )}
          </form>
        </CardContent>
      </Card>
      {/* Users List */}
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading users...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border bg-white text-sm">
                <thead>
                  <tr>
                    <th className="px-2 py-2 border">Name</th>
                    <th className="px-2 py-2 border">Email</th>
                    <th className="px-2 py-2 border">Role</th>
                    <th className="px-2 py-2 border hidden md:table-cell">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="border p-1">{user.name}</td>
                      <td className="border p-1">{user.email}</td>
                      <td className="border p-1">{user.role || "-"}</td>
                      <td className="border p-1 hidden md:table-cell">{user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUsers;
