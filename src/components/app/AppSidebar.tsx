import { LayoutDashboard, FileText, LayoutTemplate, Sparkles, Download } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Create Resume", url: "/dashboard/create", icon: FileText },
  { title: "Templates", url: "/dashboard/templates", icon: LayoutTemplate },
  { title: "Resume Score", url: "/dashboard/score", icon: Sparkles },
  { title: "Export", url: "/dashboard/export", icon: Download },
];

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const { pathname } = useLocation();

  const isActive = (path: string) => pathname === path;
  const keepOpen = items.some((i) => isActive(i.url) || pathname.startsWith(i.url + "/"));

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible>
      <SidebarContent>
        <SidebarGroup open={keepOpen}>
          <SidebarGroupLabel>Resume Builder</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted/50"
                      activeClassName="bg-muted text-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
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
