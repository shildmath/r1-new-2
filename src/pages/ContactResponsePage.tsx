
import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { useContactResponses } from '@/hooks/useContactResponses';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const statusOptions = ['new', 'contacted', 'closed'];

const ContactResponsePage = () => {
  const { toast } = useToast();
  const {
    responses,
    loading,
    error,
    updateSubmission,
    deleteSubmission,
    refetch,
    updatingId,
    deletingId,
  } = useContactResponses();

  const handleStatusChange = async (id: string, status: string) => {
    await updateSubmission(id, { status });
    toast({ title: "Status Updated" });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      await deleteSubmission(id);
      toast({ title: "Deleted" });
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-accent-light to-white">
      <AdminSidebar />
      <main className="flex-1 p-0 lg:p-8 flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 pt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">Contact Responses</h1>
            <Button variant="outline" onClick={refetch}>
              <RefreshCw size={18} className="mr-2" /> Refresh
            </Button>
          </div>

          <div className="rounded-2xl shadow-lg bg-white p-4 md:p-6 mt-2 w-full">
            {loading && (
              <div className="text-gray-600 flex items-center gap-2 py-8 justify-center">
                <Loader2 className="animate-spin" /> Loading submissions...
              </div>
            )}
            {error && (
              <div className="text-red-600">Error: {error.message}</div>
            )}
            {!loading && responses.length === 0 && (
              <div className="text-gray-500 text-center py-16">No contact form submissions found.</div>
            )}
            {!loading && responses.length > 0 && (
              <ScrollArea className="w-full max-w-full h-[65vh]">
                <div className="min-w-[900px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {responses.map(sub => (
                        <TableRow key={sub.id} className="hover:bg-accent/30 transition">
                          <TableCell className="font-medium">{sub.name}</TableCell>
                          <TableCell className="text-blue-700">{sub.email}</TableCell>
                          <TableCell className="whitespace-nowrap">{sub.phone}</TableCell>
                          <TableCell className="max-w-xs break-all text-gray-700">{sub.message}</TableCell>
                          <TableCell className="capitalize">{sub.source}</TableCell>
                          <TableCell>
                            <select
                              className="border rounded px-2 py-1 bg-accent-light text-gray-800"
                              value={sub.status}
                              onChange={e => handleStatusChange(sub.id, e.target.value)}
                              disabled={updatingId === sub.id}
                            >
                              {statusOptions.map(status => (
                                <option value={status} key={status}>{status}</option>
                              ))}
                            </select>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-gray-500">{new Date(sub.created_at).toLocaleString()}</TableCell>
                          <TableCell className="whitespace-nowrap text-gray-500">{new Date(sub.updated_at).toLocaleString()}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDelete(sub.id)}
                              disabled={deletingId === sub.id}
                              aria-label="Delete"
                            >
                              <Trash2 className="text-red-500" size={18} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactResponsePage;
