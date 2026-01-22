import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="relative overflow-hidden rounded-2xl border bg-background/40 px-6 py-10 backdrop-blur supports-[backdrop-filter]:bg-background/30">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/18 via-accent/12 to-secondary/18" />
          <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -right-28 top-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
        </div>

        <div className="relative">
          <p className="text-sm font-medium text-muted-foreground">AI Resume Builder • 100% Free</p>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Build a recruiter-ready resume in minutes.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Clean editing, smart AI suggestions, live A4 preview, and instant PDF export — all inside Resume GPT.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="h-12 px-6 text-base shadow-[0_0_0_1px_hsl(var(--border)),0_18px_60px_-18px_hsl(var(--primary)/0.55)]"
            >
              <Link to="/create">Start Building Resume</Link>
            </Button>

            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" className="h-10 rounded-full">
                <Link to="/templates">Templates</Link>
              </Button>
              <Button asChild variant="outline" className="h-10 rounded-full">
                <Link to="/score">Resume Score</Link>
              </Button>
              <Button asChild variant="outline" className="h-10 rounded-full">
                <Link to="/export">Export</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              Live preview while typing
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-secondary" />
              AI help in 6–8 lines
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Print-ready A4 PDF
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
