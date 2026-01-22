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

      {/* Scrollable content below (to feel like a complete professional app) */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">What you can do</h2>
            <p className="mt-1 text-muted-foreground">Everything works from the left menu — no locked features.</p>
          </div>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/create">Create Resume</Link>
          </Button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Create Resume",
              desc: "Unlimited sections + live preview while typing.",
              cta: "Open Builder",
              href: "/create",
            },
            {
              title: "Templates",
              desc: "Pick a professional template for ATS + design.",
              cta: "Browse",
              href: "/templates",
            },
            {
              title: "Export",
              desc: "Choose Manual vs AI version, then export A4 PDF.",
              cta: "Export",
              href: "/export",
            },
          ].map((x) => (
            <div key={x.title} className="rounded-xl border bg-background/35 p-5 backdrop-blur">
              <p className="text-sm font-medium">{x.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{x.desc}</p>
              <div className="mt-4">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to={x.href}>{x.cta}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t pt-10">
        <h2 className="text-2xl font-semibold tracking-tight">How it works</h2>
        <p className="mt-1 text-muted-foreground">A simple flow that feels like a real SaaS product.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-4">
          {[
            { n: "01", t: "Fill details", d: "Profile, education, projects, experience." },
            { n: "02", t: "Use AI (optional)", d: "Get polished content in 6–8 lines." },
            { n: "03", t: "Pick template", d: "Clean, ATS-friendly formats." },
            { n: "04", t: "Export PDF", d: "Print-ready A4 resume." },
          ].map((s) => (
            <div key={s.n} className="rounded-xl border bg-background/25 p-5">
              <p className="text-sm font-semibold text-muted-foreground">{s.n}</p>
              <p className="mt-2 font-medium">{s.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t pt-10">
        <h2 className="text-2xl font-semibold tracking-tight">Why Resume GPT</h2>
        <p className="mt-1 text-muted-foreground">Designed to look premium, built to stay simple.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-background/25 p-6">
            <h3 className="font-medium">Professional output</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your resume preview stays clean and formal, so it’s ready for internships, placements, and job applications.
            </p>
          </div>
          <div className="rounded-xl border bg-background/25 p-6">
            <h3 className="font-medium">Fast editing</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Add/remove unlimited entries, reorder sections, and keep a live A4 preview while you type.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border bg-background/35 p-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-medium">Ready to build your resume?</p>
            <p className="mt-1 text-sm text-muted-foreground">Click the button below or use the left menu → Create Resume.</p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-12 px-7 text-base shadow-[0_0_0_1px_hsl(var(--border)),0_18px_60px_-18px_hsl(var(--primary)/0.55)]"
          >
            <Link to="/create">Start Building Resume</Link>
          </Button>
        </div>
      </section>

      <footer className="mt-12 border-t py-10">
        <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Resume GPT — AI Resume Builder</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
