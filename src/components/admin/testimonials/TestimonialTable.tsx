
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Star, StarOff } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Database } from '@/integrations/supabase/types';

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

interface TestimonialTableProps {
  testimonials: Testimonial[];
  loading: boolean;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (testimonial: Testimonial) => void;
}

const TestimonialTable = ({
  testimonials,
  loading,
  onEdit,
  onDelete,
  onToggleFeatured
}: TestimonialTableProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
      <Table>
        <TableHeader className="sticky top-0 bg-white z-10">
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
                      onClick={() => onToggleFeatured(testimonial)}
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
                      onClick={() => onEdit(testimonial)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-red-500"
                      onClick={() => onDelete(testimonial.id)}
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
  );
};

export default TestimonialTable;
