
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { UserProfile } from "@/types/admin";

interface UserFormProps {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (formData: { email: string; password: string; fullName: string; role: 'admin' | 'closer' }) => void;
  isSubmitting: boolean;
  editingUser: UserProfile | null;
  initialData?: { email: string; fullName: string; role: 'admin' | 'closer' };
}

export default function UserForm({
  isOpen, onCancel, onSubmit, isSubmitting, editingUser, initialData
}: UserFormProps) {
  const [formData, setFormData] = useState({
    email: initialData?.email || "",
    password: "",
    fullName: initialData?.fullName || "",
    role: initialData?.role || "closer",
  });

  if (!isOpen) return null;

  return (
    <Card className="mb-6 shadow-lg border border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus size={20} className="text-blue-600" />
          <span>{editingUser ? 'Edit User' : 'Add New User'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-6"
          onSubmit={e => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Full Name *
              </label>
              <Input
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Email Address *
              </label>
              <Input
                type="email"
                placeholder="user@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={!!editingUser}
              />
            </div>
          </div>
          {!editingUser && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Password *
              </label>
              <Input
                type="password"
                placeholder="Enter password (min 6 characters)"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
              />
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Role *
            </label>
            <Select
              value={formData.role}
              onValueChange={val => setFormData({ ...formData, role: val as 'admin' | 'closer' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="closer">Closer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
              {isSubmitting ? "Saving..." : editingUser ? "Update User" : "Create User"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
