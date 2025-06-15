
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";

const AddTeamMemberPage = () => (
  <div className="min-h-screen flex">
    <AdminSidebar />
    <main className="flex-1 p-8 flex justify-center items-center">
      <h1 className="text-3xl font-bold">Add Team Member (Admin)</h1>
    </main>
  </div>
);

export default AddTeamMemberPage;
