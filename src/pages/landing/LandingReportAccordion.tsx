import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-5 md:p-6">{children}</CardContent>
    </Card>
  );
}

export function LandingReportAccordion() {
  return (
    <section aria-label="Project report sections" className="mt-8">
      <Accordion type="single" collapsible className="space-y-3">
        <AccordionItem value="project-details" className="rounded-2xl border bg-card px-4">
          <AccordionTrigger className="py-4 text-left">Project Details</AccordionTrigger>
          <AccordionContent>
            <SectionCard>
              <dl className="grid gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Project Name</dt>
                  <dd className="mt-1 font-medium">Resume Maker (AI-Based Application)</dd>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-muted-foreground">Class</dt>
                    <dd className="mt-1 font-medium">BCA 3rd Year</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">College Name</dt>
                    <dd className="mt-1 font-medium">Janaprabha College, Ramtek</dd>
                  </div>
                </div>
                <div>
                  <dt className="text-muted-foreground">Group Members</dt>
                  <dd className="mt-2 grid gap-2 sm:grid-cols-3">
                    {["Vansh Khandekar", "Shubham Chandekar", "Pranay Mende"].map((name) => (
                      <div key={name} className="rounded-md border bg-background p-3">
                        <p className="text-sm font-medium">{name}</p>
                      </div>
                    ))}
                  </dd>
                </div>
              </dl>
            </SectionCard>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="abstract" className="rounded-2xl border bg-card px-4">
          <AccordionTrigger className="py-4 text-left">Abstract</AccordionTrigger>
          <AccordionContent>
            <SectionCard>
              <p className="text-sm leading-relaxed text-muted-foreground">
                This project focuses on the development of an AI-based Resume Maker that helps users create professional resumes
                efficiently. The system collects user details and generates structured resumes with AI-assisted content
                improvement.
              </p>
            </SectionCard>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="introduction" className="rounded-2xl border bg-card px-4">
          <AccordionTrigger className="py-4 text-left">Introduction</AccordionTrigger>
          <AccordionContent>
            <SectionCard>
              <p className="text-sm leading-relaxed text-muted-foreground">
                A resume is a key document for internships, placements, and job applications. Many students find it difficult to
                create a strong resume because they are unsure about the right format, what to include, and how to describe their
                skills and work clearly. AI Resume Studio solves this by guiding users to enter details step-by-step and using AI
                assistance to improve the wording and structure. This makes resume creation faster, simpler, and more
                professional.
              </p>
            </SectionCard>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="objectives" className="rounded-2xl border bg-card px-4">
          <AccordionTrigger className="py-4 text-left">Objectives</AccordionTrigger>
          <AccordionContent>
            <SectionCard>
              <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {[
                  "Easy resume creation",
                  "AI-assisted content improvement",
                  "Professional formatting",
                  "Time-saving solution",
                  "User-friendly interface",
                ].map((item) => (
                  <li key={item} className="rounded-md border bg-background px-3 py-2 text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="workflow" className="rounded-2xl border bg-card px-4">
          <AccordionTrigger className="py-4 text-left">Process / Workflow</AccordionTrigger>
          <AccordionContent>
            <SectionCard>
              <ol className="grid gap-3 text-sm md:grid-cols-5">
                {[
                  { n: "1", t: "User enters details" },
                  { n: "2", t: "System structures resume" },
                  { n: "3", t: "AI enhances content" },
                  { n: "4", t: "User reviews and edits" },
                  { n: "5", t: "Resume is generated" },
                ].map((s) => (
                  <li key={s.n} className="rounded-md border bg-background p-3">
                    <p className="text-xs font-semibold text-muted-foreground">Step {s.n}</p>
                    <p className="mt-2 text-sm font-medium text-foreground">{s.t}</p>
                  </li>
                ))}
              </ol>
            </SectionCard>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tools" className="rounded-2xl border bg-card px-4">
          <AccordionTrigger className="py-4 text-left">Development Tools</AccordionTrigger>
          <AccordionContent>
            <SectionCard>
              <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "HTML – Structure",
                  "CSS – Design & Layout",
                  "AI Integration – Content Assistance",
                  "Code Editor",
                  "Web Browser",
                ].map((tool) => (
                  <li key={tool} className="rounded-md border bg-background px-3 py-2 text-foreground">
                    {tool}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="conclusion" className="rounded-2xl border bg-card px-4">
          <AccordionTrigger className="py-4 text-left">Conclusion</AccordionTrigger>
          <AccordionContent>
            <SectionCard>
              <p className="text-sm leading-relaxed text-muted-foreground">
                AI Resume Studio demonstrates how AI can simplify resume building. The system helps students and job seekers
                create professional resumes quickly and efficiently. Future enhancements may include multiple templates and
                job-based suggestions.
              </p>
            </SectionCard>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
