
import React from "react";
import AdminSidebar from "@/components/AdminSidebar";

const EditHomePage = () => (
  <div className="min-h-screen flex">
    <AdminSidebar />
    <main className="flex-1 p-8 flex justify-center items-center">
      <h1 className="text-3xl font-bold">Edit Home Page (Admin)</h1>
    </main>
  </div>
);

export default EditHomePage;
