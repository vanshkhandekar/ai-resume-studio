import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
 
 export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Academic Header (always visible on home) */}
      <header className="px-4 pt-8">
        <Card className="mx-auto w-full max-w-5xl">
          <CardHeader className="text-left">
            <CardTitle className="text-2xl">Resume Maker (AI-Based Application)</CardTitle>
            <CardDescription>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="font-medium text-foreground">Group Members</p>
                  <p className="text-muted-foreground">1) Vansh Khandekar</p>
                  <p className="text-muted-foreground">2) Shubham Chandekar</p>
                  <p className="text-muted-foreground">3) Pranay Mende</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Class</p>
                  <p className="text-muted-foreground">BCA 3rd Year</p>
                  <p className="mt-3 font-medium text-foreground">College</p>
                  <p className="text-muted-foreground">Janaprabha College, Ramtek</p>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>
      </header>

      <main>
        {/* Hero */}
        <section className="px-4 py-14">
          <div className="mx-auto grid w-full max-w-5xl gap-10 md:grid-cols-2 md:items-center">
            <div className="text-left">
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">AI Resume Builder</h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Build a clean, recruiter-ready resume with manual editing + optional AI help—no sign-in, no tracking.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link to="/dashboard">Start Building Resume</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#premium">Premium Access & Support</a>
                </Button>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">Privacy-first: your resume stays in your browser until export.</p>
            </div>

            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-xl">What you get</CardTitle>
                <CardDescription>Professional SaaS-style builder for college demo + viva.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                <div className="rounded-md border bg-card p-3">
                  <p className="font-medium">Manual + AI Hybrid Editing</p>
                  <p className="text-sm text-muted-foreground">Write yourself or ask AI to refine sections in 6–8 lines.</p>
                </div>
                <div className="rounded-md border bg-card p-3">
                  <p className="font-medium">Live Preview</p>
                  <p className="text-sm text-muted-foreground">See your resume update in real time while editing.</p>
                </div>
                <div className="rounded-md border bg-card p-3">
                  <p className="font-medium">Export</p>
                  <p className="text-sm text-muted-foreground">A4 print-ready PDF. DOCX available for Premium.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 pb-14">
          <div className="mx-auto w-full max-w-5xl">
            <h2 className="text-2xl font-semibold tracking-tight">Features</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "AI Assisted Resume Writing",
                  desc: "Generate descriptions, improve bullets, and get rewrite suggestions.",
                },
                {
                  title: "Manual + AI Hybrid Editing",
                  desc: "You stay in control—AI is optional and never blocks manual writing.",
                },
                {
                  title: "Resume Score & ATS Analysis",
                  desc: "Premium scoring for ATS compatibility and section strength.",
                },
                {
                  title: "Premium Colored Templates",
                  desc: "Premium templates are visible but locked until license activation.",
                },
                {
                  title: "High-Quality PDF Export",
                  desc: "Print-ready layout for free and premium users.",
                },
                {
                  title: "Privacy First (No data saved)",
                  desc: "No user login. Your resume exists only until you export.",
                },
              ].map((f) => (
                <Card key={f.title}>
                  <CardHeader>
                    <CardTitle className="text-lg">{f.title}</CardTitle>
                    <CardDescription>{f.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Access */}
        <section id="premium" className="px-4 pb-14">
          <div className="mx-auto w-full max-w-5xl">
            <Card>
              <CardHeader>
                <CardTitle>Premium Access & Support</CardTitle>
                <CardDescription>Premium features are activated through manual support.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border bg-card p-4">
                  <p className="font-medium">How Premium works</p>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                    <li>Contact support on Telegram</li>
                    <li>Make payment manually</li>
                    <li>Receive a time-based license key</li>
                    <li>Enter the key inside the app</li>
                    <li>Premium features get activated</li>
                  </ol>
                </div>
                <div className="flex flex-col justify-between gap-3 rounded-md border bg-card p-4">
                  <div>
                    <p className="font-medium">Support</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Click below to open Telegram and chat with support.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">Telegram: @Cyberfranky_bio</p>
                  </div>
                  <Button asChild>
                    <a href="https://t.me/Cyberfranky_bio" target="_blank" rel="noreferrer">
                      Contact Support
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Project Details (modal) */}
        <section className="px-4 pb-20">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Project Details</h2>
              <p className="mt-1 text-muted-foreground">Presented as a clean, teacher-friendly showcase.</p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Project Details</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Resume Maker (AI-Based Application)</DialogTitle>
                  <DialogDescription>Academic project details (BCA 3rd Year).</DialogDescription>
                </DialogHeader>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    {
                      k: "introduction",
                      t: "Introduction",
                      c: "This project builds a premium-style resume builder that combines manual editing with AI assistance to help users craft recruiter-ready resumes faster.",
                    },
                    {
                      k: "abstract",
                      t: "Abstract",
                      c: "The system guides users through resume creation, offers AI content improvement, and supports templates and export. It emphasizes privacy-first design suitable for academic demonstration.",
                    },
                    {
                      k: "objectives",
                      t: "Objectives",
                      c: "To simplify resume writing, enable repeatable sections, provide optional AI assistance, show ATS-focused improvements, and deliver high-quality exports.",
                    },
                    {
                      k: "literature",
                      t: "Literature Review",
                      c: "We studied modern resume best practices, ATS screening concepts, and usability patterns from professional resume tools to build a clear, guided flow.",
                    },
                    {
                      k: "scope",
                      t: "Scope of the Project",
                      c: "Includes resume data entry, section management (add/remove/reorder), template selection, ATS scoring (premium), and export flow.",
                    },
                    {
                      k: "methodology",
                      t: "Process and Methodology",
                      c: "Component-based UI, step-by-step builder, live preview, and secure AI calls through backend functions (no AI key exposed to users).",
                    },
                    {
                      k: "tool",
                      t: "Developed Tool",
                      c: "A responsive web app with a sidebar dashboard, AI assistant, template gallery, scoring, and export views—built for practical demo and viva.",
                    },
                    {
                      k: "conclusion",
                      t: "Conclusion",
                      c: "The tool demonstrates how AI can enhance resume writing while keeping the user in control with a clean, professional interface.",
                    },
                  ].map((s) => (
                    <AccordionItem key={s.k} value={s.k}>
                      <AccordionTrigger>{s.t}</AccordionTrigger>
                      <AccordionContent>
                        <Card>
                          <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground">{s.c}</p>
                          </CardContent>
                        </Card>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
    </div>
  );
}
