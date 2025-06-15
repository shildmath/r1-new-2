
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type User = {
  id: string;
  email: string;
  full_name?: string;
  role?: "admin" | "closer";
};

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Closer", value: "closer" },
];

type Props = {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated: () => void;
};

const EditUserModal: React.FC<Props> = ({ user, open, onOpenChange, onUserUpdated }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"admin" | "closer">("closer");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFullName(user.full_name ?? "");
      setRole(user.role ?? "closer");
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // 1. Update profiles
    const { error: profileError } = await supabase.from("profiles").update({
      email,
      full_name: fullName,
    }).eq("id", user.id);

    if (profileError) {
      toast({ title: "Error", description: profileError.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    // 2. Upsert user_roles
    const { error: roleError } = await supabase.from("user_roles").upsert({
      user_id: user.id,
      role,
    });
    if (roleError) {
      toast({ title: "Error", description: roleError.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    toast({ title: "User updated!" });
    setLoading(false);
    onUserUpdated();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 mt-2" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
          <select className="w-full border rounded px-3 py-2" value={role} onChange={e => setRole(e.target.value as "admin" | "closer")}>
            {roleOptions.map(opt => (
              <option value={opt.value} key={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
