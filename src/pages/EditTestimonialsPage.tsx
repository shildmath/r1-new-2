
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTestimonials } from "@/hooks/useTestimonials";
import TestimonialFormModal from "@/components/TestimonialFormModal";
import StatsFormModal from "@/components/StatsFormModal";
import { exportTestimonialsToCSV, parseCSVToTestimonials } from "@/utils/testimonialCsvUtils";
import { toast } from "sonner";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  TrendingUp, 
  Users, 
  Award, 
  BarChart3,
  Upload,
  Download,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const EditTestimonialsPage = () => {
  const {
    testimonials,
    stats,
    loading,
    fetchAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    updateStats,
    updateSequence,
    refetch
  } = useTestimonials();

  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateTestimonial = async (testimonialData: any) => {
    const result = await createTestimonial(testimonialData);
    if (result.success) {
      toast.success("Testimonial created successfully!");
      refetch();
    } else {
      toast.error(result.error || "Failed to create testimonial");
    }
    return result;
  };

  const handleUpdateTestimonial = async (testimonialData: any) => {
    const result = await updateTestimonial(testimonialData);
    if (result.success) {
      toast.success("Testimonial updated successfully!");
      refetch();
    } else {
      toast.error(result.error || "Failed to update testimonial");
    }
    return result;
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const result = await deleteTestimonial(id);
      if (result.success) {
        toast.success("Testimonial deleted successfully!");
        refetch();
      } else {
        toast.error(result.error || "Failed to delete testimonial");
      }
    }
  };

  const handleUpdateStats = async (statsData: any) => {
    const result = await updateStats(statsData);
    if (result.success) {
      toast.success("Statistics updated successfully!");
    } else {
      toast.error(result.error || "Failed to update statistics");
    }
    return result;
  };

  const handleExportCSV = async () => {
    const allTestimonials = await fetchAllTestimonials();
    exportTestimonialsToCSV(allTestimonials);
    toast.success("Testimonials exported successfully!");
  };

  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csvContent = e.target?.result as string;
        const parsedTestimonials = parseCSVToTestimonials(csvContent);
        
        for (const testimonial of parsedTestimonials) {
          await createTestimonial(testimonial);
        }
        
        toast.success(`Successfully imported ${parsedTestimonials.length} testimonials!`);
        refetch();
      } catch (error) {
        toast.error("Failed to import CSV file");
        console.error("CSV import error:", error);
      }
    };
    reader.readAsText(file);
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSequenceChange = async (testimonialId: string, direction: 'up' | 'down') => {
    const testimonial = testimonials.find(t => t.id === testimonialId);
    if (!testimonial) return;

    const newSequence = direction === 'up' 
      ? testimonial.sequence_order - 1 
      : testimonial.sequence_order + 1;

    if (newSequence < 0) return;

    const result = await updateSequence(testimonialId, newSequence);
    if (result.success) {
      toast.success("Sequence updated successfully!");
      refetch();
    } else {
      toast.error(result.error || "Failed to update sequence");
    }
  };

  const maxSequence = testimonials.reduce((max, t) => Math.max(max, t.sequence_order), 0);

  if (loading) {
    return (
      <div className="min-h-screen flex">
        <AdminSidebar />
        <main className="flex-1 p-8 flex justify-center items-center">
          <div className="text-lg">Loading testimonials...</div>
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
              <h1 className="text-3xl font-bold text-gray-900">Manage Testimonials</h1>
              <p className="text-gray-600 mt-2">Add, edit, and manage client testimonials</p>
            </div>
            <div className="flex space-x-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleImportCSV}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2"
              >
                <Upload size={16} />
                <span>Import CSV</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleExportCSV}
                className="flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Export CSV</span>
              </Button>
              <Button
                onClick={() => {
                  setSelectedTestimonial(null);
                  setIsTestimonialModalOpen(true);
                }}
                className="flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Testimonial</span>
              </Button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Happy Clients</p>
                      <p className="text-3xl font-bold">{stats?.happy_clients}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Average ROI</p>
                      <p className="text-3xl font-bold">{stats?.average_roi}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Success Rate</p>
                      <p className="text-3xl font-bold">{stats?.success_rate}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Client Rating</p>
                      <p className="text-3xl font-bold">{stats?.client_rating}</p>
                    </div>
                    <Award className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">All Testimonials ({testimonials.length})</h2>
            <Button
              variant="outline"
              onClick={() => setIsStatsModalOpen(true)}
              className="flex items-center space-x-2"
            >
              <Edit size={16} />
              <span>Edit Statistics</span>
            </Button>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {testimonial.profile_photo ? (
                          <img
                            src={testimonial.profile_photo}
                            alt={testimonial.client_name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <Users className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-lg">{testimonial.client_name}</h3>
                          <p className="text-sm text-gray-600">{testimonial.company_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSequenceChange(testimonial.id, 'up')}
                          disabled={testimonial.sequence_order === 0}
                        >
                          <ArrowUp size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSequenceChange(testimonial.id, 'down')}
                        >
                          <ArrowDown size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <Badge variant="secondary">{testimonial.industry}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {testimonial.description}
                      </p>
                      {testimonial.results && (
                        <div className="mt-2">
                          <Badge variant="outline" className="text-green-600">
                            {testimonial.results}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant={testimonial.is_active ? "default" : "secondary"}>
                          {testimonial.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Order: {testimonial.sequence_order}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setIsTestimonialModalOpen(true);
                          }}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {testimonials.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No testimonials yet</h3>
                <p className="text-gray-500 mb-4">
                  Start by adding your first client testimonial
                </p>
                <Button
                  onClick={() => {
                    setSelectedTestimonial(null);
                    setIsTestimonialModalOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Testimonial
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Modals */}
        <TestimonialFormModal
          isOpen={isTestimonialModalOpen}
          onClose={() => {
            setIsTestimonialModalOpen(false);
            setSelectedTestimonial(null);
          }}
          onSubmit={selectedTestimonial ? handleUpdateTestimonial : handleCreateTestimonial}
          testimonial={selectedTestimonial}
          maxSequence={maxSequence}
        />

        <StatsFormModal
          isOpen={isStatsModalOpen}
          onClose={() => setIsStatsModalOpen(false)}
          onSubmit={handleUpdateStats}
          currentStats={stats}
        />
      </main>
    </div>
  );
};

export default EditTestimonialsPage;
