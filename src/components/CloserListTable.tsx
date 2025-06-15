
import React from "react";
import { useAllClosers } from "@/hooks/useAllClosers";

export default function CloserListTable() {
  const { closers, loading } = useAllClosers();

  if (loading) return <div className="py-4 text-center text-accent animate-pulse">Loading closers...</div>;
  if (!closers.length) return <div className="py-4 text-center text-red-600">No closers found.</div>;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 mb-4">
      <h3 className="font-bold text-lg mb-2 text-primary">All Closers</h3>
      <div className="rounded-lg border border-accent/20 shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gradient-to-r from-accent-light to-accent text-accent-foreground font-semibold">
              <th className="p-3 text-left">Closer Name</th>
              <th className="p-3 text-left">Closer Email</th>
            </tr>
          </thead>
          <tbody>
            {closers.map(c => (
              <tr key={c.id} className="border-b hover:bg-accent/10">
                <td className="p-3 font-medium">{c.full_name || <span className="text-red-500">No Name</span>}</td>
                <td className="p-3">{c.email || <span className="text-red-500">No Email</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
