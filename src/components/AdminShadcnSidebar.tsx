
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutList, UserPlus, Users2, Home, Settings } from "lucide-react";

const adminLinks = [
  { name: "Dashboard", path: "/admin-panel", icon: Home },
  { name: "Add Users", path: "/add-users", icon: UserPlus },
  { name: "All Bookings", path: "/all-bookings", icon: LayoutList },
  { name: "Closed Clients", path: "/all-closed-clients", icon: Users2 },
  // Add more as needed
];

export function AdminShadcnSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminLinks.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton asChild isActive={window.location.pathname === link.path}>
                    <a href={link.path} className="flex items-center gap-2">
                      {link.icon && <link.icon className="w-4 h-4" />}
                      <span className="truncate">{link.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
