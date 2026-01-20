import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

type Education = { school: string; degree: string; year: string };
type Experience = { company: string; role: string; bullets: string };
type Project = { name: string; bullets: string };
type Certification = { name: string; org: string; year: string };

export default function ResumeBuilder() {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");

  const [showEducation, setShowEducation] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showExperience, setShowExperience] = useState(true);
  const [showCerts, setShowCerts] = useState(true);

  const [education, setEducation] = useState<Education[]>([{ school: "", degree: "", year: "" }]);
  const [projects, setProjects] = useState<Project[]>([{ name: "", bullets: "" }]);
  const [experience, setExperience] = useState<Experience[]>([{ company: "", role: "", bullets: "" }]);
  const [certs, setCerts] = useState<Certification[]>([{ name: "", org: "", year: "" }]);

  const [order, setOrder] = useState<Array<"education" | "projects" | "experience" | "certs">>([
    "education",
    "projects",
    "experience",
    "certs",
  ]);

  const sectionEnabled = useMemo(
    () => ({
      education: showEducation,
      projects: showProjects,
      experience: showExperience,
      certs: showCerts,
    }),
    [showEducation, showProjects, showExperience, showCerts],
  );

  const move = (id: (typeof order)[number], dir: -1 | 1) => {
    setOrder((prev) => {
      const i = prev.indexOf(id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const SectionHeader = ({
    title,
    enabled,
    onEnabledChange,
    onMoveUp,
    onMoveDown,
  }: {
    title: string;
    enabled: boolean;
    onEnabledChange: (v: boolean) => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
  }) => (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">Toggle on/off and reorder for preview.</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-md border px-3 py-2">
          <p className="text-sm text-muted-foreground">Show</p>
          <Switch checked={enabled} onCheckedChange={onEnabledChange} />
        </div>
        <Button variant="outline" size="icon" onClick={onMoveUp} aria-label="Move section up">
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onMoveDown} aria-label="Move section down">
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create Resume</h1>
          <p className="mt-1 text-muted-foreground">Fill details on the left. Preview updates instantly on the right.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Editor */}
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input
                placeholder="Headline (e.g., BCA Student | Frontend Developer)"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <Textarea
                placeholder="Professional Summary (2–4 lines)"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="min-h-[110px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionHeader
                title="Education"
                enabled={showEducation}
                onEnabledChange={setShowEducation}
                onMoveUp={() => move("education", -1)}
                onMoveDown={() => move("education", 1)}
              />
            </CardHeader>
            <CardContent className="grid gap-4">
              {education.map((ed, idx) => (
                <div key={idx} className="rounded-md border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">Entry {idx + 1}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setEducation((p) => p.filter((_, i) => i !== idx))}
                      disabled={education.length === 1}
                      aria-label="Remove education"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 grid gap-3">
                    <Input
                      placeholder="College / School"
                      value={ed.school}
                      onChange={(e) =>
                        setEducation((p) => p.map((x, i) => (i === idx ? { ...x, school: e.target.value } : x)))
                      }
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        placeholder="Degree"
                        value={ed.degree}
                        onChange={(e) =>
                          setEducation((p) => p.map((x, i) => (i === idx ? { ...x, degree: e.target.value } : x)))
                        }
                      />
                      <Input
                        placeholder="Year"
                        value={ed.year}
                        onChange={(e) =>
                          setEducation((p) => p.map((x, i) => (i === idx ? { ...x, year: e.target.value } : x)))
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setEducation((p) => [...p, { school: "", degree: "", year: "" }])}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Education
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionHeader
                title="Projects"
                enabled={showProjects}
                onEnabledChange={setShowProjects}
                onMoveUp={() => move("projects", -1)}
                onMoveDown={() => move("projects", 1)}
              />
            </CardHeader>
            <CardContent className="grid gap-4">
              {projects.map((p, idx) => (
                <div key={idx} className="rounded-md border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">Entry {idx + 1}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setProjects((pp) => pp.filter((_, i) => i !== idx))}
                      disabled={projects.length === 1}
                      aria-label="Remove project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 grid gap-3">
                    <Input
                      placeholder="Project Name"
                      value={p.name}
                      onChange={(e) => setProjects((pp) => pp.map((x, i) => (i === idx ? { ...x, name: e.target.value } : x)))}
                    />
                    <Textarea
                      placeholder="Bullets (one per line)"
                      value={p.bullets}
                      onChange={(e) =>
                        setProjects((pp) => pp.map((x, i) => (i === idx ? { ...x, bullets: e.target.value } : x)))
                      }
                      className="min-h-[110px]"
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => setProjects((p) => [...p, { name: "", bullets: "" }])}>
                <Plus className="mr-2 h-4 w-4" /> Add Project
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionHeader
                title="Experience"
                enabled={showExperience}
                onEnabledChange={setShowExperience}
                onMoveUp={() => move("experience", -1)}
                onMoveDown={() => move("experience", 1)}
              />
            </CardHeader>
            <CardContent className="grid gap-4">
              {experience.map((ex, idx) => (
                <div key={idx} className="rounded-md border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">Entry {idx + 1}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setExperience((p) => p.filter((_, i) => i !== idx))}
                      disabled={experience.length === 1}
                      aria-label="Remove experience"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 grid gap-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        placeholder="Company"
                        value={ex.company}
                        onChange={(e) =>
                          setExperience((p) => p.map((x, i) => (i === idx ? { ...x, company: e.target.value } : x)))
                        }
                      />
                      <Input
                        placeholder="Role"
                        value={ex.role}
                        onChange={(e) =>
                          setExperience((p) => p.map((x, i) => (i === idx ? { ...x, role: e.target.value } : x)))
                        }
                      />
                    </div>
                    <Textarea
                      placeholder="Bullets (one per line)"
                      value={ex.bullets}
                      onChange={(e) =>
                        setExperience((p) => p.map((x, i) => (i === idx ? { ...x, bullets: e.target.value } : x)))
                      }
                      className="min-h-[110px]"
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => setExperience((p) => [...p, { company: "", role: "", bullets: "" }])}>
                <Plus className="mr-2 h-4 w-4" /> Add Experience
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <SectionHeader
                title="Certifications"
                enabled={showCerts}
                onEnabledChange={setShowCerts}
                onMoveUp={() => move("certs", -1)}
                onMoveDown={() => move("certs", 1)}
              />
            </CardHeader>
            <CardContent className="grid gap-4">
              {certs.map((c, idx) => (
                <div key={idx} className="rounded-md border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">Entry {idx + 1}</p>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCerts((p) => p.filter((_, i) => i !== idx))}
                      disabled={certs.length === 1}
                      aria-label="Remove certification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <Input
                      placeholder="Certification"
                      value={c.name}
                      onChange={(e) => setCerts((p) => p.map((x, i) => (i === idx ? { ...x, name: e.target.value } : x)))}
                      className="sm:col-span-2"
                    />
                    <Input
                      placeholder="Year"
                      value={c.year}
                      onChange={(e) => setCerts((p) => p.map((x, i) => (i === idx ? { ...x, year: e.target.value } : x)))}
                    />
                    <Input
                      placeholder="Organization"
                      value={c.org}
                      onChange={(e) => setCerts((p) => p.map((x, i) => (i === idx ? { ...x, org: e.target.value } : x)))}
                      className="sm:col-span-3"
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={() => setCerts((p) => [...p, { name: "", org: "", year: "" }])}>
                <Plus className="mr-2 h-4 w-4" /> Add Certification
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-16 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-card p-5">
                <div>
                  <p className="text-xl font-semibold">{name || "Your Name"}</p>
                  {headline ? <p className="text-sm text-muted-foreground">{headline}</p> : null}
                  <p className="mt-2 text-sm text-muted-foreground">
                    {[email, phone].filter(Boolean).join("  •  ") || "Email • Phone"}
                  </p>
                </div>

                {summary ? (
                  <>
                    <Separator className="my-4" />
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{summary}</p>
                  </>
                ) : null}

                {order.map((id) => {
                  if (!sectionEnabled[id]) return null;
                  if (id === "education") {
                    return (
                      <div key={id}>
                        <Separator className="my-4" />
                        <p className="text-sm font-semibold">Education</p>
                        <div className="mt-2 grid gap-2">
                          {education
                            .filter((e) => e.school || e.degree || e.year)
                            .map((e, i) => (
                              <div key={i} className="text-sm text-muted-foreground">
                                <p className="font-medium text-foreground">{e.school || "College / School"}</p>
                                <p>{[e.degree, e.year].filter(Boolean).join(" — ")}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                  }
                  if (id === "projects") {
                    return (
                      <div key={id}>
                        <Separator className="my-4" />
                        <p className="text-sm font-semibold">Projects</p>
                        <div className="mt-2 grid gap-3">
                          {projects
                            .filter((p) => p.name || p.bullets)
                            .map((p, i) => (
                              <div key={i}>
                                <p className="text-sm font-medium">{p.name || "Project"}</p>
                                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                  {p.bullets
                                    .split("\n")
                                    .map((b) => b.trim())
                                    .filter(Boolean)
                                    .map((b, j) => (
                                      <li key={j}>{b}</li>
                                    ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                  }
                  if (id === "experience") {
                    return (
                      <div key={id}>
                        <Separator className="my-4" />
                        <p className="text-sm font-semibold">Experience</p>
                        <div className="mt-2 grid gap-3">
                          {experience
                            .filter((e) => e.company || e.role || e.bullets)
                            .map((e, i) => (
                              <div key={i}>
                                <p className="text-sm font-medium">{[e.role, e.company].filter(Boolean).join(" — ") || "Role — Company"}</p>
                                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                                  {e.bullets
                                    .split("\n")
                                    .map((b) => b.trim())
                                    .filter(Boolean)
                                    .map((b, j) => (
                                      <li key={j}>{b}</li>
                                    ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={id}>
                      <Separator className="my-4" />
                      <p className="text-sm font-semibold">Certifications</p>
                      <div className="mt-2 grid gap-2">
                        {certs
                          .filter((c) => c.name || c.org || c.year)
                          .map((c, i) => (
                            <div key={i} className="text-sm text-muted-foreground">
                              <p className="font-medium text-foreground">{c.name || "Certification"}</p>
                              <p>{[c.org, c.year].filter(Boolean).join(" — ")}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
