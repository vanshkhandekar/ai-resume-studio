import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app/AppSidebar";
import { FloatingAiAssistant } from "@/components/ai/FloatingAiAssistant";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-12 items-center gap-2 border-b bg-background px-3">
            <SidebarTrigger className="ml-1" />
            <Separator orientation="vertical" className="h-6" />
            <p className="text-sm text-muted-foreground">AI Resume Builder</p>
          </header>

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>

        {/* AI assistant (only inside dashboard) */}
        <FloatingAiAssistant context="Resume building" enabled />
      </div>
    </SidebarProvider>
  );
}
