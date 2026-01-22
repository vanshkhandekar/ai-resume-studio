import { Outlet } from "react-router-dom";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app/AppSidebar";
import { FloatingAiAssistant } from "@/components/ai/FloatingAiAssistant";
import { ModeToggle } from "@/components/theme/ModeToggle";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <div className="relative flex min-w-0 flex-1 flex-col">
          {/* Neon ambient background */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <header className="sticky top-0 z-10 flex h-12 items-center gap-2 border-b bg-background/70 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/50">
            <SidebarTrigger className="ml-1" />
            <Separator orientation="vertical" className="h-6" />
            <p className="text-sm font-medium">Resume GPT</p>
            <p className="hidden text-sm text-muted-foreground sm:inline">AI Resume Builder</p>
            <div className="ml-auto">
              <ModeToggle />
            </div>
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
