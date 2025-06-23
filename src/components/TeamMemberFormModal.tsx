
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TeamMember } from "@/types/about";

interface TeamMemberFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  teamMember?: TeamMember | null;
  maxSequence: number;
}

const TeamMemberFormModal: React.FC<TeamMemberFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  teamMember,
  maxSequence,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    profile_photo: "",
    sequence_order: maxSequence + 1,
  });

  useEffect(() => {
    if (teamMember) {
      setFormData({
        name: teamMember.name,
        role: teamMember.role,
        bio: teamMember.bio || "",
        profile_photo: teamMember.profile_photo || "",
        sequence_order: teamMember.sequence_order,
      });
    } else {
      setFormData({
        name: "",
        role: "",
        bio: "",
        profile_photo: "",
        sequence_order: maxSequence + 1,
      });
    }
  }, [teamMember, maxSequence]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {teamMember ? "Edit Team Member" : "Add Team Member"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="role">Role *</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="profile_photo">Profile Photo URL</Label>
            <Input
              id="profile_photo"
              value={formData.profile_photo}
              onChange={(e) => setFormData(prev => ({ ...prev, profile_photo: e.target.value }))}
              placeholder="/lovable-uploads/your-image.png"
            />
          </div>
          
          <div>
            <Label htmlFor="sequence_order">Sequence Order</Label>
            <Input
              id="sequence_order"
              type="number"
              value={formData.sequence_order}
              onChange={(e) => setFormData(prev => ({ ...prev, sequence_order: parseInt(e.target.value) }))}
              min={1}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {teamMember ? "Update" : "Add"} Team Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberFormModal;
