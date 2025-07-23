
import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { useAboutStats } from "@/hooks/useAboutStats";
import { useJourneyMilestones, useCreateJourneyMilestone, useUpdateJourneyMilestone, useDeleteJourneyMilestone } from "@/hooks/useAboutData";
import { useAwards, useCreateAward, useUpdateAward, useDeleteAward } from "@/hooks/useAboutData";
import { useTeamMembers, useCreateTeamMember, useUpdateTeamMember, useDeleteTeamMember } from "@/hooks/useAboutData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Plus, Edit2, Trash2, Users, Award, TrendingUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EditAboutPage = () => {
  const { stats, isLoading, updateStats } = useAboutStats();
  const { data: milestones } = useJourneyMilestones();
  const { data: awards } = useAwards();
  const { data: teamMembers } = useTeamMembers();
  const createMilestone = useCreateJourneyMilestone();
  const updateMilestone = useUpdateJourneyMilestone();
  const deleteMilestone = useDeleteJourneyMilestone();
  const createAward = useCreateAward();
  const updateAward = useUpdateAward();
  const deleteAward = useDeleteAward();
  const createTeamMember = useCreateTeamMember();
  const updateTeamMember = useUpdateTeamMember();
  const deleteTeamMember = useDeleteTeamMember();

  const [formData, setFormData] = useState({
    happy_clients: '',
    success_rate: '',
    awards_won: '',
    growth_rate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState(null);
  const [editingAward, setEditingAward] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [showMilestoneDialog, setShowMilestoneDialog] = useState(false);
  const [showAwardDialog, setShowAwardDialog] = useState(false);
  const [showTeamMemberDialog, setShowTeamMemberDialog] = useState(false);

  const [milestoneForm, setMilestoneForm] = useState({
    year: '',
    title: '',
    description: '',
    metrics: '',
    highlight: '',
    icon: 'zap',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    sequence_order: 0,
    is_active: true
  });

  const [awardForm, setAwardForm] = useState({
    year: '',
    title: '',
    organization: '',
    icon: 'trophy',
    color: 'from-yellow-400 to-orange-500',
    sequence_order: 0,
    is_active: true
  });

  const [teamMemberForm, setTeamMemberForm] = useState({
    name: '',
    role: '',
    bio: '',
    profile_photo: '',
    sequence_order: 0,
    is_active: true
  });

  React.useEffect(() => {
    if (stats) {
      setFormData({
        happy_clients: stats.happy_clients,
        success_rate: stats.success_rate,
        awards_won: stats.awards_won,
        growth_rate: stats.growth_rate,
      });
    }
  }, [stats]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStatsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await updateStats(formData);
    } catch (error) {
      console.error('Error updating stats:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMilestoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMilestone) {
        await updateMilestone.mutateAsync({ ...milestoneForm, id: editingMilestone.id });
      } else {
        await createMilestone.mutateAsync(milestoneForm);
      }
      setShowMilestoneDialog(false);
      setEditingMilestone(null);
      setMilestoneForm({
        year: '',
        title: '',
        description: '',
        metrics: '',
        highlight: '',
        icon: 'zap',
        color: 'bg-gradient-to-br from-blue-500 to-blue-600',
        sequence_order: 0,
        is_active: true
      });
    } catch (error) {
      console.error('Error saving milestone:', error);
    }
  };

  const handleAwardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingAward) {
        await updateAward.mutateAsync({ ...awardForm, id: editingAward.id });
      } else {
        await createAward.mutateAsync(awardForm);
      }
      setShowAwardDialog(false);
      setEditingAward(null);
      setAwardForm({
        year: '',
        title: '',
        organization: '',
        icon: 'trophy',
        color: 'from-yellow-400 to-orange-500',
        sequence_order: 0,
        is_active: true
      });
    } catch (error) {
      console.error('Error saving award:', error);
    }
  };

  const handleTeamMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTeamMember) {
        await updateTeamMember.mutateAsync({ ...teamMemberForm, id: editingTeamMember.id });
      } else {
        await createTeamMember.mutateAsync(teamMemberForm);
      }
      setShowTeamMemberDialog(false);
      setEditingTeamMember(null);
      setTeamMemberForm({
        name: '',
        role: '',
        bio: '',
        profile_photo: '',
        sequence_order: 0,
        is_active: true
      });
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleEditMilestone = (milestone) => {
    setEditingMilestone(milestone);
    setMilestoneForm({
      year: milestone.year,
      title: milestone.title,
      description: milestone.description,
      metrics: milestone.metrics,
      highlight: milestone.highlight,
      icon: milestone.icon,
      color: milestone.color,
      sequence_order: milestone.sequence_order,
      is_active: milestone.is_active
    });
    setShowMilestoneDialog(true);
  };

  const handleEditAward = (award) => {
    setEditingAward(award);
    setAwardForm({
      year: award.year,
      title: award.title,
      organization: award.organization,
      icon: award.icon,
      color: award.color,
      sequence_order: award.sequence_order,
      is_active: award.is_active
    });
    setShowAwardDialog(true);
  };

  const handleEditTeamMember = (member) => {
    setEditingTeamMember(member);
    setTeamMemberForm({
      name: member.name,
      role: member.role,
      bio: member.bio || '',
      profile_photo: member.profile_photo || '',
      sequence_order: member.sequence_order,
      is_active: member.is_active
    });
    setShowTeamMemberDialog(true);
  };

  const iconOptions = [
    { value: 'zap', label: '⚡ Zap' },
    { value: 'rocket', label: '🚀 Rocket' },
    { value: 'star', label: '⭐ Star' },
    { value: 'trophy', label: '🏆 Trophy' },
    { value: 'target', label: '🎯 Target' },
    { value: 'chart', label: '📊 Chart' },
    { value: 'growth', label: '📈 Growth' },
    { value: 'users', label: '👥 Users' },
    { value: 'award', label: '🏅 Award' },
    { value: 'crown', label: '👑 Crown' }
  ];

  const colorOptions = [
    { value: 'bg-gradient-to-br from-blue-500 to-blue-600', label: 'Blue' },
    { value: 'bg-gradient-to-br from-purple-500 to-purple-600', label: 'Purple' },
    { value: 'bg-gradient-to-br from-green-500 to-green-600', label: 'Green' },
    { value: 'bg-gradient-to-br from-red-500 to-red-600', label: 'Red' },
    { value: 'bg-gradient-to-br from-orange-500 to-orange-600', label: 'Orange' },
    { value: 'from-yellow-400 to-orange-500', label: 'Gold' },
    { value: 'from-pink-500 to-rose-500', label: 'Pink' },
    { value: 'from-cyan-500 to-blue-500', label: 'Cyan' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex">
        <AdminSidebar />
        <main className="flex-1 p-8 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Edit About Page</h1>
          </div>

          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="journey">Journey</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>About Page Statistics</CardTitle>
                    <Button 
                      onClick={handleStatsSubmit}
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="happy_clients">Happy Clients</Label>
                      <Input
                        id="happy_clients"
                        value={formData.happy_clients}
                        onChange={(e) => handleInputChange('happy_clients', e.target.value)}
                        placeholder="500+"
                      />
                    </div>
                    <div>
                      <Label htmlFor="success_rate">Success Rate</Label>
                      <Input
                        id="success_rate"
                        value={formData.success_rate}
                        onChange={(e) => handleInputChange('success_rate', e.target.value)}
                        placeholder="95%"
                      />
                    </div>
                    <div>
                      <Label htmlFor="awards_won">Awards Won</Label>
                      <Input
                        id="awards_won"
                        value={formData.awards_won}
                        onChange={(e) => handleInputChange('awards_won', e.target.value)}
                        placeholder="15"
                      />
                    </div>
                    <div>
                      <Label htmlFor="growth_rate">Growth Rate</Label>
                      <Input
                        id="growth_rate"
                        value={formData.growth_rate}
                        onChange={(e) => handleInputChange('growth_rate', e.target.value)}
                        placeholder="300%"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="journey">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Journey Milestones
                    </CardTitle>
                    <Dialog open={showMilestoneDialog} onOpenChange={setShowMilestoneDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Milestone
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>
                            {editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}
                          </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleMilestoneSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="year">Year</Label>
                              <Input
                                id="year"
                                value={milestoneForm.year}
                                onChange={(e) => setMilestoneForm(prev => ({ ...prev, year: e.target.value }))}
                                placeholder="2024"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="sequence_order">Order</Label>
                              <Input
                                id="sequence_order"
                                type="number"
                                value={milestoneForm.sequence_order}
                                onChange={(e) => setMilestoneForm(prev => ({ ...prev, sequence_order: parseInt(e.target.value) || 0 }))}
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={milestoneForm.title}
                              onChange={(e) => setMilestoneForm(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Major Achievement"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                              id="description"
                              value={milestoneForm.description}
                              onChange={(e) => setMilestoneForm(prev => ({ ...prev, description: e.target.value }))}
                              placeholder="Describe this milestone..."
                              rows={3}
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="metrics">Metrics</Label>
                              <Input
                                id="metrics"
                                value={milestoneForm.metrics}
                                onChange={(e) => setMilestoneForm(prev => ({ ...prev, metrics: e.target.value }))}
                                placeholder="500+ clients"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="highlight">Highlight</Label>
                              <Input
                                id="highlight"
                                value={milestoneForm.highlight}
                                onChange={(e) => setMilestoneForm(prev => ({ ...prev, highlight: e.target.value }))}
                                placeholder="Key achievement"
                                required
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="icon">Icon</Label>
                              <Select value={milestoneForm.icon} onValueChange={(value) => setMilestoneForm(prev => ({ ...prev, icon: value }))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select icon" />
                                </SelectTrigger>
                                <SelectContent>
                                  {iconOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="color">Color</Label>
                              <Select value={milestoneForm.color} onValueChange={(value) => setMilestoneForm(prev => ({ ...prev, color: value }))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                  {colorOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setShowMilestoneDialog(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">
                              {editingMilestone ? 'Update' : 'Create'} Milestone
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {milestones?.map((milestone) => (
                      <div key={milestone.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{milestone.year}</Badge>
                          <div>
                            <h3 className="font-semibold">{milestone.title}</h3>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary">{milestone.metrics}</Badge>
                              <Badge variant="secondary">{milestone.highlight}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditMilestone(milestone)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteMilestone.mutate(milestone.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="awards">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Awards & Recognition
                    </CardTitle>
                    <Dialog open={showAwardDialog} onOpenChange={setShowAwardDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Award
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>
                            {editingAward ? 'Edit Award' : 'Add New Award'}
                          </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleAwardSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="award_year">Year</Label>
                              <Input
                                id="award_year"
                                value={awardForm.year}
                                onChange={(e) => setAwardForm(prev => ({ ...prev, year: e.target.value }))}
                                placeholder="2024"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="award_sequence">Order</Label>
                              <Input
                                id="award_sequence"
                                type="number"
                                value={awardForm.sequence_order}
                                onChange={(e) => setAwardForm(prev => ({ ...prev, sequence_order: parseInt(e.target.value) || 0 }))}
                                placeholder="0"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="award_title">Title</Label>
                            <Input
                              id="award_title"
                              value={awardForm.title}
                              onChange={(e) => setAwardForm(prev => ({ ...prev, title: e.target.value }))}
                              placeholder="Best Marketing Agency"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="award_organization">Organization</Label>
                            <Input
                              id="award_organization"
                              value={awardForm.organization}
                              onChange={(e) => setAwardForm(prev => ({ ...prev, organization: e.target.value }))}
                              placeholder="Marketing Excellence Awards"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="award_icon">Icon</Label>
                              <Select value={awardForm.icon} onValueChange={(value) => setAwardForm(prev => ({ ...prev, icon: value }))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select icon" />
                                </SelectTrigger>
                                <SelectContent>
                                  {iconOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="award_color">Color</Label>
                              <Select value={awardForm.color} onValueChange={(value) => setAwardForm(prev => ({ ...prev, color: value }))}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                  {colorOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setShowAwardDialog(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">
                              {editingAward ? 'Update' : 'Create'} Award
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {awards?.map((award) => (
                      <div key={award.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{award.year}</Badge>
                          <div>
                            <h3 className="font-semibold">{award.title}</h3>
                            <p className="text-sm text-gray-600">{award.organization}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditAward(award)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteAward.mutate(award.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Team Members
                    </CardTitle>
                    <Dialog open={showTeamMemberDialog} onOpenChange={setShowTeamMemberDialog}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Team Member
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>
                            {editingTeamMember ? 'Edit Team Member' : 'Add New Team Member'}
                          </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleTeamMemberSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="member_name">Name</Label>
                              <Input
                                id="member_name"
                                value={teamMemberForm.name}
                                onChange={(e) => setTeamMemberForm(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="John Doe"
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="member_role">Role</Label>
                              <Input
                                id="member_role"
                                value={teamMemberForm.role}
                                onChange={(e) => setTeamMemberForm(prev => ({ ...prev, role: e.target.value }))}
                                placeholder="CEO & Founder"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="member_bio">Bio</Label>
                            <Textarea
                              id="member_bio"
                              value={teamMemberForm.bio}
                              onChange={(e) => setTeamMemberForm(prev => ({ ...prev, bio: e.target.value }))}
                              placeholder="Brief bio about the team member..."
                              rows={3}
                            />
                          </div>
                          <div>
                            <Label htmlFor="member_photo">Profile Photo URL</Label>
                            <Input
                              id="member_photo"
                              value={teamMemberForm.profile_photo}
                              onChange={(e) => setTeamMemberForm(prev => ({ ...prev, profile_photo: e.target.value }))}
                              placeholder="https://example.com/photo.jpg"
                            />
                          </div>
                          <div>
                            <Label htmlFor="member_sequence">Display Order</Label>
                            <Input
                              id="member_sequence"
                              type="number"
                              value={teamMemberForm.sequence_order}
                              onChange={(e) => setTeamMemberForm(prev => ({ ...prev, sequence_order: parseInt(e.target.value) || 0 }))}
                              placeholder="0"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setShowTeamMemberDialog(false)}>
                              Cancel
                            </Button>
                            <Button type="submit">
                              {editingTeamMember ? 'Update' : 'Create'} Team Member
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teamMembers?.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          {member.profile_photo && (
                            <img 
                              src={member.profile_photo} 
                              alt={member.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                            {member.bio && (
                              <p className="text-xs text-gray-500 mt-1">{member.bio.substring(0, 100)}...</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTeamMember(member)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteTeamMember.mutate(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default EditAboutPage;
