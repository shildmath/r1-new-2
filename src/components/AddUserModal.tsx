
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Closer", value: "closer" },
];

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserAdded: () => void;
};

const AddUserModal: React.FC<Props> = ({ open, onOpenChange, onUserAdded }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("closer");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || !fullName) {
      toast({ title: "Fill all fields", variant: "destructive" });
      setLoading(false);
      return;
    }

    const redirectUrl = window.location.origin + "/auth";
    // 1. Sign up the user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl },
    });

    if (signUpError) {
      toast({ title: "Error", description: signUpError.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    const userId = data.user?.id;
    if (!userId) {
      toast({ title: "Check your email for confirmation!" });
      setLoading(false);
      return;
    }

    // 2. Insert into profiles
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: userId,
      email,
      full_name: fullName,
    });
    if (profileError) {
      toast({ title: "Error", description: profileError.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    // 3. Insert or update user_roles
    const { error: roleError } = await supabase.from("user_roles").upsert({
      user_id: userId,
      role,
    });
    if (roleError) {
      toast({ title: "Error", description: roleError.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    toast({ title: "User added!" });
    setLoading(false);
    setEmail("");
    setPassword("");
    setFullName("");
    setRole("closer");
    onUserAdded();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
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
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <select className="w-full border rounded px-3 py-2" value={role} onChange={e => setRole(e.target.value)}>
            {roleOptions.map(opt => (
              <option value={opt.value} key={opt.value}>{opt.label}</option>
            ))}
          </select>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
