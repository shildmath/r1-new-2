
import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Users, BarChart3, Award, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  useTeamMembers, useCreateTeamMember, useUpdateTeamMember, useDeleteTeamMember,
  useAboutStats, useUpdateAboutStats,
  useAwards, useCreateAward, useUpdateAward, useDeleteAward,
  useJourneyMilestones, useCreateJourneyMilestone, useUpdateJourneyMilestone, useDeleteJourneyMilestone
} from "@/hooks/useAboutData";
import TeamMemberFormModal from "@/components/TeamMemberFormModal";
import AboutStatsFormModal from "@/components/AboutStatsFormModal";
import AwardFormModal from "@/components/AwardFormModal";
import JourneyMilestoneFormModal from "@/components/JourneyMilestoneFormModal";

const EditAboutPage = () => {
  const { toast } = useToast();
  
  // Modal states
  const [teamMemberModal, setTeamMemberModal] = useState({ open: false, member: null });
  const [statsModal, setStatsModal] = useState({ open: false });
  const [awardModal, setAwardModal] = useState({ open: false, award: null });
  const [milestoneModal, setMilestoneModal] = useState({ open: false, milestone: null });

  // Data hooks
  const { data: teamMembers = [], isLoading: teamLoading } = useTeamMembers();
  const { data: stats, isLoading: statsLoading } = useAboutStats();
  const { data: awards = [], isLoading: awardsLoading } = useAwards();
  const { data: milestones = [], isLoading: milestonesLoading } = useJourneyMilestones();

  // Mutation hooks
  const createTeamMember = useCreateTeamMember();
  const updateTeamMember = useUpdateTeamMember();
  const deleteTeamMember = useDeleteTeamMember();
  const updateStats = useUpdateAboutStats();
  const createAward = useCreateAward();
  const updateAward = useUpdateAward();
  const deleteAward = useDeleteAward();
  const createMilestone = useCreateJourneyMilestone();
  const updateMilestone = useUpdateJourneyMilestone();
  const deleteMilestone = useDeleteJourneyMilestone();

  // Team Members handlers
  const handleTeamMemberSubmit = async (data: any) => {
    try {
      if (teamMemberModal.member) {
        await updateTeamMember.mutateAsync({ id: teamMemberModal.member.id, ...data });
        toast({ title: "Team member updated successfully!" });
      } else {
        await createTeamMember.mutateAsync(data);
        toast({ title: "Team member added successfully!" });
      }
      setTeamMemberModal({ open: false, member: null });
    } catch (error) {
      toast({ title: "Error saving team member", variant: "destructive" });
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    try {
      await deleteTeamMember.mutateAsync(id);
      toast({ title: "Team member deleted successfully!" });
    } catch (error) {
      toast({ title: "Error deleting team member", variant: "destructive" });
    }
  };

  // Stats handlers
  const handleStatsSubmit = async (data: any) => {
    try {
      await updateStats.mutateAsync(data);
      toast({ title: "Stats updated successfully!" });
      setStatsModal({ open: false });
    } catch (error) {
      toast({ title: "Error updating stats", variant: "destructive" });
    }
  };

  // Awards handlers
  const handleAwardSubmit = async (data: any) => {
    try {
      if (awardModal.award) {
        await updateAward.mutateAsync({ id: awardModal.award.id, ...data });
        toast({ title: "Award updated successfully!" });
      } else {
        await createAward.mutateAsync(data);
        toast({ title: "Award added successfully!" });
      }
      setAwardModal({ open: false, award: null });
    } catch (error) {
      toast({ title: "Error saving award", variant: "destructive" });
    }
  };

  const handleDeleteAward = async (id: string) => {
    try {
      await deleteAward.mutateAsync(id);
      toast({ title: "Award deleted successfully!" });
    } catch (error) {
      toast({ title: "Error deleting award", variant: "destructive" });
    }
  };

  // Journey Milestones handlers
  const handleMilestoneSubmit = async (data: any) => {
    try {
      if (milestoneModal.milestone) {
        await updateMilestone.mutateAsync({ id: milestoneModal.milestone.id, ...data });
        toast({ title: "Milestone updated successfully!" });
      } else {
        await createMilestone.mutateAsync(data);
        toast({ title: "Milestone added successfully!" });
      }
      setMilestoneModal({ open: false, milestone: null });
    } catch (error) {
      toast({ title: "Error saving milestone", variant: "destructive" });
    }
  };

  const handleDeleteMilestone = async (id: string) => {
    try {
      await deleteMilestone.mutateAsync(id);
      toast({ title: "Milestone deleted successfully!" });
    } catch (error) {
      toast({ title: "Error deleting milestone", variant: "destructive" });
    }
  };

  const maxTeamSequence = Math.max(...teamMembers.map(m => m.sequence_order), 0);
  const maxAwardSequence = Math.max(...awards.map(a => a.sequence_order), 0);
  const maxMilestoneSequence = Math.max(...milestones.map(m => m.sequence_order), 0);

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Edit About Page</h1>

          {/* About Stats Section */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <CardTitle>About Page Stats</CardTitle>
              </div>
              <Button onClick={() => setStatsModal({ open: true })} disabled={statsLoading}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Stats
              </Button>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <p>Loading stats...</p>
              ) : stats ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.happy_clients}</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.success_rate}</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.awards_won}</div>
                    <div className="text-sm text-gray-600">Awards Won</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats.growth_rate}</div>
                    <div className="text-sm text-gray-600">Growth Rate</div>
                  </div>
                </div>
              ) : (
                <p>No stats available</p>
              )}
            </CardContent>
          </Card>

          {/* Team Members Section */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <CardTitle>Team Members ({teamMembers.length})</CardTitle>
              </div>
              <Button onClick={() => setTeamMemberModal({ open: true, member: null })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </CardHeader>
            <CardContent>
              {teamLoading ? (
                <p>Loading team members...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {member.profile_photo ? (
                            <img src={member.profile_photo} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                              <Users className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-purple-600">{member.role}</p>
                          </div>
                        </div>
                        <Badge variant="outline">#{member.sequence_order}</Badge>
                      </div>
                      {member.bio && <p className="text-sm text-gray-600 mb-3">{member.bio}</p>}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setTeamMemberModal({ open: true, member })}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteTeamMember(member.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Awards Section */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <CardTitle>Awards & Recognition ({awards.length})</CardTitle>
              </div>
              <Button onClick={() => setAwardModal({ open: true, award: null })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Award
              </Button>
            </CardHeader>
            <CardContent>
              {awardsLoading ? (
                <p>Loading awards...</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {awards.map((award) => (
                    <div key={award.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge className="mb-2">{award.year}</Badge>
                          <h3 className="font-semibold">{award.title}</h3>
                          <p className="text-sm text-gray-600">{award.organization}</p>
                        </div>
                        <Badge variant="outline">#{award.sequence_order}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">Icon: {award.icon}</span>
                        <div className={`w-4 h-4 rounded bg-gradient-to-r ${award.color}`}></div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setAwardModal({ open: true, award })}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteAward(award.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Journey Milestones Section */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <CardTitle>Journey Milestones ({milestones.length})</CardTitle>
              </div>
              <Button onClick={() => setMilestoneModal({ open: true, milestone: null })}>
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </CardHeader>
            <CardContent>
              {milestonesLoading ? (
                <p>Loading milestones...</p>
              ) : (
                <div className="space-y-4">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge>{milestone.year}</Badge>
                            <Badge variant="outline">{milestone.highlight}</Badge>
                            <Badge variant="secondary">#{milestone.sequence_order}</Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>
                          <p className="text-gray-600 mb-2">{milestone.description}</p>
                          <p className="text-sm font-medium text-blue-600">{milestone.metrics}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-sm">Icon: {milestone.icon}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setMilestoneModal({ open: true, milestone })}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteMilestone(milestone.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        <TeamMemberFormModal
          isOpen={teamMemberModal.open}
          onClose={() => setTeamMemberModal({ open: false, member: null })}
          onSubmit={handleTeamMemberSubmit}
          teamMember={teamMemberModal.member}
          maxSequence={maxTeamSequence}
        />

        <AboutStatsFormModal
          isOpen={statsModal.open}
          onClose={() => setStatsModal({ open: false })}
          onSubmit={handleStatsSubmit}
          stats={stats}
        />

        <AwardFormModal
          isOpen={awardModal.open}
          onClose={() => setAwardModal({ open: false, award: null })}
          onSubmit={handleAwardSubmit}
          award={awardModal.award}
          maxSequence={maxAwardSequence}
        />

        <JourneyMilestoneFormModal
          isOpen={milestoneModal.open}
          onClose={() => setMilestoneModal({ open: false, milestone: null })}
          onSubmit={handleMilestoneSubmit}
          milestone={milestoneModal.milestone}
          maxSequence={maxMilestoneSequence}
        />
      </main>
    </div>
  );
};

export default EditAboutPage;
