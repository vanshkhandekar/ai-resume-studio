import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { DashboardLayout } from "./components/app/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ResumeBuilder from "./pages/dashboard/ResumeBuilder";
import Templates from "./pages/dashboard/Templates";
import ResumeScore from "./pages/dashboard/ResumeScore";
import ExportResume from "./pages/dashboard/ExportResume";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="create" element={<ResumeBuilder />} />
            <Route path="templates" element={<Templates />} />
            <Route path="score" element={<ResumeScore />} />
            <Route path="export" element={<ExportResume />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
