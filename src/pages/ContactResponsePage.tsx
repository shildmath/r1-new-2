
import React from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { useContactResponses } from '@/hooks/useContactResponses';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    <div className="min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Contact Responses</h1>
          <Button variant="outline" onClick={refetch}>
            <RefreshCw size={18} className="mr-2" /> Refresh
          </Button>
        </div>
        {loading && (
          <div className="text-gray-600 flex items-center gap-2">
            <Loader2 className="animate-spin" /> Loading submissions...
          </div>
        )}
        {error && (
          <div className="text-red-600">Error: {error.message}</div>
        )}
        {!loading && responses.length === 0 && (
          <div className="text-gray-500">No contact form submissions found.</div>
        )}
        {!loading && responses.length > 0 && (
          <div className="w-full overflow-x-auto rounded-lg bg-white shadow mt-4">
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
                  <TableRow key={sub.id}>
                    <TableCell>{sub.name}</TableCell>
                    <TableCell>{sub.email}</TableCell>
                    <TableCell>{sub.phone}</TableCell>
                    <TableCell className="max-w-xs break-all">{sub.message}</TableCell>
                    <TableCell>{sub.source}</TableCell>
                    <TableCell>
                      <select
                        className="border rounded px-2 py-1"
                        value={sub.status}
                        onChange={e => handleStatusChange(sub.id, e.target.value)}
                        disabled={updatingId === sub.id}
                      >
                        {statusOptions.map(status => (
                          <option value={status} key={status}>{status}</option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>{new Date(sub.created_at).toLocaleString()}</TableCell>
                    <TableCell>{new Date(sub.updated_at).toLocaleString()}</TableCell>
                    <TableCell>
                      {/* No edit modal at this step, but you can add it later */}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(sub.id)}
                        disabled={deletingId === sub.id}
                      >
                        <Trash2 className="text-red-500" size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContactResponsePage;
