
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAboutStats } from "@/hooks/useAboutStats";
import { useAboutData } from "@/hooks/useAboutData";
import { toast } from "sonner";
import { 
  Save, 
  Users, 
  Award, 
  TrendingUp, 
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Star,
  Calendar,
  Trophy,
  Target,
  Zap
} from "lucide-react";

const EditAboutPage = () => {
  const { stats, isLoading: statsLoading, updateStats } = useAboutStats();
  const { 
    teamMembers, 
    journeyMilestones, 
    awards, 
    loading: aboutLoading,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    createJourneyMilestone,
    updateJourneyMilestone,
    deleteJourneyMilestone,
    createAward,
    updateAward,
    deleteAward
  } = useAboutData();

  const [statsData, setStatsData] = useState({
    happy_clients: '500+',
    success_rate: '95%',
    awards_won: '15',
    growth_rate: '300%'
  });

  useEffect(() => {
    if (stats) {
      setStatsData({
        happy_clients: stats.happy_clients,
        success_rate: stats.success_rate,
        awards_won: stats.awards_won,
        growth_rate: stats.growth_rate
      });
    }
  }, [stats]);

  const handleSaveStats = async () => {
    try {
      await updateStats(statsData);
      toast.success('About page stats updated successfully!');
    } catch (error) {
      toast.error('Failed to update stats');
      console.error('Error updating stats:', error);
    }
  };

  const handleStatsChange = (field: string, value: string) => {
    setStatsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (statsLoading || aboutLoading) {
    return (
      <div className="min-h-screen flex">
        <AdminSidebar />
        <main className="flex-1 p-8 flex justify-center items-center">
          <div className="text-lg">Loading about page data...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit About Page</h1>
              <p className="text-gray-600 mt-2">Manage all content on the About page</p>
            </div>
            <Button 
              onClick={handleSaveStats}
              className="flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Save Changes</span>
            </Button>
          </div>

          {/* Stats Cards Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Statistics Cards</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Happy Clients</p>
                        <p className="text-3xl font-bold">{statsData.happy_clients}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-200" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="happy_clients">Happy Clients</Label>
                    <Input
                      id="happy_clients"
                      value={statsData.happy_clients}
                      onChange={(e) => handleStatsChange('happy_clients', e.target.value)}
                      placeholder="500+"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Success Rate</p>
                        <p className="text-3xl font-bold">{statsData.success_rate}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-200" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="success_rate">Success Rate</Label>
                    <Input
                      id="success_rate"
                      value={statsData.success_rate}
                      onChange={(e) => handleStatsChange('success_rate', e.target.value)}
                      placeholder="95%"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Awards Won</p>
                        <p className="text-3xl font-bold">{statsData.awards_won}</p>
                      </div>
                      <Award className="h-8 w-8 text-purple-200" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="awards_won">Awards Won</Label>
                    <Input
                      id="awards_won"
                      value={statsData.awards_won}
                      onChange={(e) => handleStatsChange('awards_won', e.target.value)}
                      placeholder="15"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Growth Rate</p>
                        <p className="text-3xl font-bold">{statsData.growth_rate}</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-orange-200" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="growth_rate">Growth Rate</Label>
                    <Input
                      id="growth_rate"
                      value={statsData.growth_rate}
                      onChange={(e) => handleStatsChange('growth_rate', e.target.value)}
                      placeholder="300%"
                    />
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Team Members ({teamMembers.length})</span>
                </CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Team members management will be implemented here</p>
                <p className="text-sm mt-2">Current team members: {teamMembers.length}</p>
              </div>
            </CardContent>
          </Card>

          {/* Journey Milestones Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Journey Milestones ({journeyMilestones.length})</span>
                </CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Milestone
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Journey milestones management will be implemented here</p>
                <p className="text-sm mt-2">Current milestones: {journeyMilestones.length}</p>
              </div>
            </CardContent>
          </Card>

          {/* Awards Section */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Awards ({awards.length})</span>
                </CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Award
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Awards management will be implemented here</p>
                <p className="text-sm mt-2">Current awards: {awards.length}</p>
              </div>
            </CardContent>
          </Card>

          {/* Save Changes Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveStats}
              className="flex items-center space-x-2"
              size="lg"
            >
              <Save size={16} />
              <span>Save All Changes</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditAboutPage;
