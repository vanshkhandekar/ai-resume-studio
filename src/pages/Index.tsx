import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/theme/ModeToggle";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">AI Resume Studio</p>
            <p className="truncate text-xs text-muted-foreground">AI-Based Resume Maker</p>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link to="/dashboard">Project Dashboard</Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="px-4 py-10">
        <div className="mx-auto w-full max-w-5xl">
          {/* HERO */}
          <section aria-labelledby="hero-title" className="rounded-2xl border bg-card">
            <div className="p-6 md:p-10">
              <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
                <div>
                  <h1 id="hero-title" className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                    AI Resume Studio
                  </h1>
                  <p className="mt-2 text-base font-medium text-muted-foreground">AI-Based Resume Maker</p>
                  <p className="mt-4 max-w-2xl text-pretty text-base text-muted-foreground">
                    AI Resume Studio is a web-based application that helps students and job seekers create professional resumes
                    easily using AI assistance.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button asChild size="lg" className="h-11 px-6">
                      <Link to="/create">Build Resume</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="h-11 px-6">
                      <a href="#project-details">View Project Details</a>
                    </Button>
                  </div>
                </div>

                <Card className="h-fit">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <dl className="grid gap-3 text-sm">
                      <div>
                        <dt className="text-muted-foreground">Project Name</dt>
                        <dd className="mt-1">Resume Maker (AI-Based Application)</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Class</dt>
                        <dd className="mt-1">BCA 3rd Year</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">College Name</dt>
                        <dd className="mt-1">Janaprabha College, Ramtek</dd>
                      </div>
                      <div>
                        <dt className="text-muted-foreground">Group Members</dt>
                        <dd className="mt-2 grid gap-2">
                          {["Vansh Khandekar", "Shubham Chandekar", "Pranay Mende"].map((name) => (
                            <div key={name} className="rounded-md border bg-background p-3">
                              <p className="text-sm font-medium">{name}</p>
                            </div>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* PROJECT DETAILS */}
          <section id="project-details" className="mt-10">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">Project Report</h2>
              <p className="mt-1 text-sm text-muted-foreground">All project report information is displayed directly on this page.</p>
            </div>

            <div className="grid gap-6">
              {/* ABSTRACT */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Abstract</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This project focuses on the development of an AI-based Resume Maker that helps users create professional resumes
                    in a simple and efficient manner. The system collects user details such as education, skills, and experience and
                    generates a structured resume. AI assistance improves content quality and saves time for students and job seekers.
                  </p>
                </CardContent>
              </Card>

              {/* INTRODUCTION / OVERVIEW */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Introduction / Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A resume is one of the most important documents for internships, placements, and job applications. Many students
                    struggle to write resumes because they are unsure about formatting, what to include, and how to describe their
                    work clearly. AI Resume Studio solves this problem by guiding users to enter their details in a structured way and
                    using AI assistance to improve the quality of content. This makes resume creation faster, simpler, and more
                    professional for students and job seekers.
                  </p>
                </CardContent>
              </Card>

              {/* OBJECTIVES */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Easy resume creation",
                      "AI-assisted content improvement",
                      "Professional resume formatting",
                      "Time-saving solution",
                      "User-friendly interface",
                    ].map((item) => (
                      <div key={item} className="rounded-md border bg-background p-4">
                        <p className="text-sm font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* PROCESS / WORKFLOW */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Process / Workflow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-5">
                    {[
                      { n: "1", t: "User enters details" },
                      { n: "2", t: "System structures sections" },
                      { n: "3", t: "AI enhances content" },
                      { n: "4", t: "User reviews and edits" },
                      { n: "5", t: "Resume generated" },
                    ].map((s) => (
                      <div key={s.n} className="rounded-md border bg-background p-4">
                        <p className="text-xs font-semibold text-muted-foreground">Step {s.n}</p>
                        <p className="mt-2 text-sm font-medium">{s.t}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Note: The resume can be exported after review. The workflow is designed to be simple and easy to understand.
                  </p>
                </CardContent>
              </Card>

              {/* DEVELOPMENT TOOLS */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Development Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {["HTML (Structure)", "CSS (Design & Layout)", "AI Integration (Content Assistance)", "Code Editor", "Web Browser"].map(
                      (tool) => (
                        <div key={tool} className="rounded-md border bg-background p-4">
                          <p className="text-sm font-medium">{tool}</p>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* CONCLUSION */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Conclusion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AI Resume Studio demonstrates how AI can simplify resume building. The system helps students and job seekers create
                    professional resumes quickly and efficiently. Future enhancements may include multiple templates and job-based
                    suggestions.
                  </p>
                </CardContent>
              </Card>
            </div>
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
