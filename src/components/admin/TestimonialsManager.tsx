
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Star, StarOff, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchDataFromTable, insertDataToTable, updateDataInTable, deleteDataFromTable } from '@/utils/supabaseHelpers';

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  client_company: string | null;
  avatar_url: string | null;
  review_text: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

const defaultTestimonial = {
  client_name: '',
  client_title: '',
  client_company: '',
  avatar_url: '',
  review_text: '',
  rating: 5,
  is_featured: false
};

const TestimonialsManager = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>(defaultTestimonial);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    const data = await fetchDataFromTable<Testimonial>('testimonials', { orderBy: 'created_at' });
    setTestimonials(data);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentTestimonial({ ...currentTestimonial, [name]: value });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTestimonial({ ...currentTestimonial, rating: parseInt(e.target.value) });
  };

  const handleSwitchChange = (checked: boolean) => {
    setCurrentTestimonial({ ...currentTestimonial, is_featured: checked });
  };

  const handleOpenDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setCurrentTestimonial(testimonial);
      setIsEditing(true);
    } else {
      setCurrentTestimonial(defaultTestimonial);
      setIsEditing(false);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentTestimonial(defaultTestimonial);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && currentTestimonial.id) {
        await updateDataInTable('testimonials', currentTestimonial.id, currentTestimonial);
      } else {
        await insertDataToTable('testimonials', currentTestimonial);
      }
      
      loadTestimonials();
      handleCloseDialog();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      const success = await deleteDataFromTable('testimonials', id);
      if (success) {
        setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      }
    }
  };

  const toggleFeatured = async (testimonial: Testimonial) => {
    const updatedTestimonial = await updateDataInTable<Testimonial>(
      'testimonials', 
      testimonial.id, 
      { is_featured: !testimonial.is_featured }
    );
    
    if (updatedTestimonial) {
      setTestimonials(testimonials.map(t => t.id === testimonial.id ? updatedTestimonial : t));
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Testimonial Management</h2>
          <p className="text-gray-600">Add, edit, and delete client testimonials</p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()} 
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Testimonial
        </Button>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>Manage client reviews and testimonials</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Review</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No testimonials found. Add your first testimonial!
                      </TableCell>
                    </TableRow>
                  ) : (
                    testimonials.map((testimonial, index) => (
                      <motion.tr
                        key={testimonial.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10 border border-gray-200">
                              <AvatarImage src={testimonial.avatar_url || undefined} />
                              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                                {getInitials(testimonial.client_name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{testimonial.client_name}</div>
                              <div className="text-sm text-gray-500">
                                {testimonial.client_title}
                                {testimonial.client_company && `, ${testimonial.client_company}`}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{testimonial.review_text}</TableCell>
                        <TableCell>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                          ))}
                          {[...Array(5 - testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-gray-300">★</span>
                          ))}
                        </TableCell>
                        <TableCell>
                          {testimonial.is_featured ? (
                            <Badge className="bg-green-100 text-green-800">Featured</Badge>
                          ) : (
                            <Badge variant="outline">Standard</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => toggleFeatured(testimonial)}
                            >
                              {testimonial.is_featured ? (
                                <StarOff className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <Star className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleOpenDialog(testimonial)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => handleDelete(testimonial.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the testimonial details below.' : 'Enter testimonial details below to create a new client review.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="client_name">Client Name</Label>
                <Input
                  id="client_name"
                  name="client_name"
                  value={currentTestimonial.client_name}
                  onChange={handleChange}
                  placeholder="e.g., John Smith"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client_title">Client Title</Label>
                  <Input
                    id="client_title"
                    name="client_title"
                    value={currentTestimonial.client_title}
                    onChange={handleChange}
                    placeholder="e.g., Marketing Director"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client_company">Client Company (Optional)</Label>
                  <Input
                    id="client_company"
                    name="client_company"
                    value={currentTestimonial.client_company || ''}
                    onChange={handleChange}
                    placeholder="e.g., Acme Inc."
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avatar_url">Avatar URL (Optional)</Label>
                <Input
                  id="avatar_url"
                  name="avatar_url"
                  value={currentTestimonial.avatar_url || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="review_text">Testimonial</Label>
                <Textarea
                  id="review_text"
                  name="review_text"
                  value={currentTestimonial.review_text}
                  onChange={handleChange}
                  placeholder="What did the client say about your services?"
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="range"
                  min="1"
                  max="5"
                  value={currentTestimonial.rating}
                  onChange={handleRatingChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span key={num}>{num}</span>
                  ))}
                </div>
                <div className="text-center mt-2">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-xl">★</span>
                  ))}
                  {[...Array(5 - (currentTestimonial.rating || 0))].map((_, i) => (
                    <span key={i} className="text-gray-300 text-xl">★</span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="is_featured"
                  checked={!!currentTestimonial.is_featured}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="is_featured" className="cursor-pointer">Featured Testimonial</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                {isEditing ? 'Update Testimonial' : 'Create Testimonial'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsManager;
