import { ModeToggle } from "@/components/theme/ModeToggle";
import { LandingHero } from "@/pages/landing/LandingHero";
import { LandingReportAccordion } from "@/pages/landing/LandingReportAccordion";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">ResumeGPT</p>
            <p className="truncate text-xs text-muted-foreground">BCA 3rd Year • Janaprabha College, Ramtek</p>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="px-4 py-10">
        <div className="mx-auto w-full max-w-5xl">
          <LandingHero />

          <section aria-label="Project Report" className="mt-10">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">Project Report</h2>
              <p className="mt-1 text-sm text-muted-foreground">Click a section to view details (only one opens at a time).</p>
            </div>

            <LandingReportAccordion />
          </section>

          <footer className="mt-12 border-t py-10">
            <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                AI Resume Studio • Janaprabha College, Ramtek • {new Date().getFullYear()}
              </p>
              <p>Academic project (for educational purposes only).</p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
