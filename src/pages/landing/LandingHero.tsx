import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  return (
    <header className="rounded-2xl border bg-card">
      <div className="p-6 md:p-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              AI Resume Studio
            </h1>
            <p className="mt-2 text-base font-medium text-muted-foreground">AI-Based Resume Maker</p>
            <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              AI Resume Studio is a web-based application that helps students and job seekers create professional resumes
              easily using AI assistance.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 px-6">
              <Link to="/create">Build Resume</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 px-6">
              <Link to="/dashboard">Project Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
