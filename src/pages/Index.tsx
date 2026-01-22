import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ModeToggle } from "@/components/theme/ModeToggle";
 
 export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">Resume GPT</p>
            <p className="truncate text-xs text-muted-foreground">AI Resume Maker • BCA Project</p>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link to="/dashboard">Open Builder</Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main>
        {/* Hero + Toggles */}
        <section className="px-4 py-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="relative overflow-hidden rounded-xl border bg-card">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15" />
              <div className="relative p-6 md:p-10">
                <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
                  <div>
                    <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                      Resume GPT
                    </h1>
                    <p className="mt-3 max-w-2xl text-pretty text-lg text-muted-foreground">
                      Premium-style resume builder for your college project + real-world use — manual editing with optional AI help.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button asChild size="lg">
                        <Link to="/dashboard">Start Building</Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <a href="#sections">See Sections</a>
                      </Button>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                      No login • Local-only save • Export PDF • Premium unlock via license key
                    </p>
                  </div>

                  <div className="rounded-lg border bg-background/60 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/50">
                    <p className="text-sm font-medium">Academic Info</p>
                    <div className="mt-3 grid gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Group Members</p>
                        <p className="mt-1">Vansh Khandekar • Shubham Chandekar • Pranay Mende</p>
                      </div>
                      <div className="grid gap-1">
                        <p className="text-muted-foreground">Class</p>
                        <p>BCA 3rd Year</p>
                        <p className="mt-1 text-muted-foreground">College</p>
                        <p>Janaprabha College, Ramtek</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All info inside toggles */}
            <div id="sections" className="mt-8 grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-xl border bg-card p-4 md:p-6">
                <h2 className="text-xl font-semibold tracking-tight">Everything in Toggles</h2>
                <p className="mt-1 text-sm text-muted-foreground">Open only what you want to read.</p>

                <Accordion type="multiple" className="mt-4 w-full">
                  <AccordionItem value="features">
                    <AccordionTrigger>Features</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-3 md:grid-cols-2">
                        {["AI Assisted Writing", "Manual + AI Hybrid", "ATS Score (Premium)", "Templates (Free + Premium)", "Export (PDF/DOCX)", "Privacy-first (local)"]
                          .map((t) => (
                            <div key={t} className="rounded-lg border bg-background/60 p-3">
                              <p className="text-sm font-medium">{t}</p>
                            </div>
                          ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="premium">
                    <AccordionTrigger>Premium Access (License Key)</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border bg-background/60 p-4">
                          <p className="text-sm font-medium">How it works</p>
                          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                            <li>Contact support on Telegram</li>
                            <li>Make payment manually</li>
                            <li>Receive a time-based license key</li>
                            <li>Enter the key inside the app</li>
                            <li>Premium features get activated</li>
                          </ol>
                        </div>
                        <div className="rounded-lg border bg-background/60 p-4">
                          <p className="text-sm font-medium">Support</p>
                          <p className="mt-2 text-sm text-muted-foreground">Telegram: @Cyberfranky_bio</p>
                          <Button asChild className="mt-4">
                            <a href="https://t.me/Cyberfranky_bio" target="_blank" rel="noreferrer">
                              Contact Support
                            </a>
                          </Button>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="project">
                    <AccordionTrigger>Project Details (Viva Ready)</AccordionTrigger>
                    <AccordionContent>
                      <Accordion type="single" collapsible className="w-full">
                        {[
                          {
                            k: "introduction",
                            t: "Introduction",
                            c: "Resume GPT is a premium-style resume builder that combines manual editing with optional AI assistance to help users craft recruiter-ready resumes faster.",
                          },
                          {
                            k: "abstract",
                            t: "Abstract",
                            c: "The system guides users through resume creation, offers AI content improvement, supports templates and export, and follows a privacy-first approach suitable for academic demonstration.",
                          },
                          {
                            k: "objectives",
                            t: "Objectives",
                            c: "Simplify resume writing, enable repeatable sections, provide optional AI help, demonstrate ATS-focused scoring, and deliver high-quality exports.",
                          },
                          {
                            k: "methodology",
                            t: "Process & Methodology",
                            c: "Component-based UI, step-by-step builder, live preview, and secure AI calls through backend functions (no AI key exposed to users).",
                          },
                          {
                            k: "conclusion",
                            t: "Conclusion",
                            c: "A clean, professional interface that demonstrates how AI can enhance resume writing while keeping the user fully in control.",
                          },
                        ].map((s) => (
                          <AccordionItem key={s.k} value={s.k}>
                            <AccordionTrigger>{s.t}</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-muted-foreground">{s.c}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="rounded-xl border bg-card p-4 md:p-6">
                <h2 className="text-xl font-semibold tracking-tight">Quick Start</h2>
                <p className="mt-1 text-sm text-muted-foreground">Go straight to the builder.</p>
                <div className="mt-4 grid gap-3">
                  <Button asChild size="lg">
                    <Link to="/dashboard">Open Resume Builder</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/dashboard/templates">Browse Templates</Link>
                  </Button>
                </div>
              </div>
            </div>

            <footer className="mt-10 border-t py-8">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} Resume GPT. All rights reserved.</p>
                <p>Made for BCA 3rd Year (Janaprabha College, Ramtek)</p>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
