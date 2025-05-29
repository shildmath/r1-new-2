
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { storage } from '@/utils/localStorage';
import { ContactSubmission } from '@/types/admin';
import { MessageSquare, Mail, Phone, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSubmissionsPage = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>(storage.getContactSubmissions());
  const { toast } = useToast();

  const handleDelete = (submissionId: string) => {
    const updatedSubmissions = submissions.filter(sub => sub.id !== submissionId);
    setSubmissions(updatedSubmissions);
    storage.setContactSubmissions(updatedSubmissions);
    toast({
      title: "Submission Deleted",
      description: "Contact submission has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-primary mb-6">Contact Submissions</h1>

        {submissions.length > 0 ? (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center">
                          <MessageSquare className="text-white" size={20} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{submission.name}</CardTitle>
                          <p className="text-sm text-gray-600 flex items-center space-x-2">
                            <Mail size={14} />
                            <span>{submission.email}</span>
                          </p>
                          {submission.phone && (
                            <p className="text-sm text-gray-600 flex items-center space-x-2">
                              <Phone size={14} />
                              <span>{submission.phone}</span>
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge variant={submission.source === 'home' ? 'default' : 'secondary'}>
                          {submission.source} page
                        </Badge>
                        <p className="text-xs text-gray-500">
                          {new Date(submission.createdAt).toLocaleString()}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(submission.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Message:</h4>
                      <p className="text-gray-700">{submission.message}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Contact Submissions</h3>
              <p className="text-gray-600">Contact submissions will appear here when visitors fill out the contact forms.</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default ContactSubmissionsPage;
