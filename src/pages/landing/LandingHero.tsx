import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function LandingHero() {
  return (
    <header className="rounded-2xl border bg-card">
      <div className="p-6 md:p-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
              ResumeGPT
            </h1>
            <p className="mt-2 text-base font-medium text-muted-foreground">AI Resume Builder (Academic Project)</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">BCA 3rd Year</Badge>
              <Badge variant="secondary">Janaprabha College, Ramtek</Badge>
              <Badge variant="outline">Vansh Khandekar</Badge>
              <Badge variant="outline">Shubham Chandekar</Badge>
              <Badge variant="outline">Pranay Mende</Badge>
            </div>
            <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              ResumeGPT is a web-based application that helps students and job seekers create professional resumes easily with
              optional AI assistance.
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
