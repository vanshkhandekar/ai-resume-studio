import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Award, Briefcase, FolderKanban, GraduationCap, Plus, Trash2, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { EmptyStateCard } from "@/components/resume/EmptyStateCard";
import { StepProgressHeader } from "@/components/resume/StepProgressHeader";

type Education = { school: string; degree: string; year: string };
type Experience = { company: string; role: string; bullets: string };
type Project = { name: string; bullets: string };
type Certification = { name: string; org: string; year: string };

type StepId = "profile" | "education" | "projects" | "skills" | "experience" | "certs" | "preview";

export default function ResumeBuilder() {
  const { toast } = useToast();

  const [step, setStep] = useState<StepId>("profile");
  const [unlocked, setUnlocked] = useState<Record<StepId, boolean>>({
    profile: true,
    education: false,
    projects: false,
    skills: false,
    experience: false,
    certs: false,
    preview: false,
  });

  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string>("");
  const [skills, setSkills] = useState<string>("");

  const [aiBusy, setAiBusy] = useState<string | null>(null);

  const [showEducation, setShowEducation] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [showExperience, setShowExperience] = useState(true);
  const [showCerts, setShowCerts] = useState(true);

  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [certs, setCerts] = useState<Certification[]>([]);

  const [order, setOrder] = useState<Array<"education" | "projects" | "skills" | "experience" | "certs">>([
    "education",
    "projects",
    "skills",
    "experience",
    "certs",
  ]);

  const sectionEnabled = useMemo(
    () => ({
      education: showEducation,
      projects: showProjects,
      skills: showSkills,
      experience: showExperience,
      certs: showCerts,
    }),
    [showEducation, showProjects, showSkills, showExperience, showCerts],
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

  const steps = useMemo(
    () =>
      [
        { id: "profile" as const, label: "Profile" },
        { id: "education" as const, label: "Education" },
        { id: "projects" as const, label: "Projects" },
        { id: "skills" as const, label: "Skills" },
        { id: "experience" as const, label: "Experience" },
        { id: "certs" as const, label: "Certifications" },
        { id: "preview" as const, label: "Preview" },
      ],
    [],
  );

  const currentIndex = steps.findIndex((s) => s.id === step);
  const goTo = (id: StepId) => {
    if (!unlocked[id]) return;
    setStep(id);
  };
  const unlockAndGoNext = () => {
    const next = steps[currentIndex + 1]?.id;
    if (!next) return;
    setUnlocked((p) => ({ ...p, [next]: true }));
    setStep(next);
  };
  const goBack = () => {
    const prev = steps[currentIndex - 1]?.id;
    if (!prev) return;
    setStep(prev);
  };

  const handlePhoto = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ variant: "destructive", title: "Invalid file", description: "Please select an image." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoDataUrl(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const aiGenerate = async ({
    key,
    prompt,
    onApply,
  }: {
    key: string;
    prompt: string;
    onApply: (text: string) => void;
  }) => {
    setAiBusy(key);
    try {
      const { data, error } = await supabase.functions.invoke("ai-resume-assistant", {
        body: { prompt, context: "Resume writing" },
      });
      if (error) throw error;
      const content = String(data?.content || "").trim();
      if (!content) {
        toast({ variant: "destructive", title: "No response", description: "AI did not return any content." });
        return;
      }
      onApply(content);
      toast({ title: "AI generated", description: "You can edit it manually too." });
    } catch (e) {
      console.error(e);
      toast({ variant: "destructive", title: "AI error", description: "Failed to generate. Please try again." });
    } finally {
      setAiBusy(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <StepProgressHeader
        title="Resume Builder"
        stepLabel={`Step ${currentIndex + 1} of ${steps.length}`}
        stepText={steps[currentIndex]?.label ?? ""}
        progress={(currentIndex + 1) / steps.length}
      />

      {/* Optional quick jump chips (hidden on mobile to match reference UI) */}
      <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
        {steps.map((s, i) => {
          const active = s.id === step;
          const canOpen = unlocked[s.id];
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(s.id)}
              disabled={!canOpen}
              className={
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition " +
                (active
                  ? "bg-muted text-foreground"
                  : canOpen
                    ? "bg-background/40 text-muted-foreground hover:bg-muted/50"
                    : "bg-background/30 text-muted-foreground/60 opacity-60")
              }
            >
              <span className="text-xs font-semibold">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-medium">{s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Editor */}
        <div className="grid gap-6">
          {step === "profile" ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-sm text-muted-foreground">Let's start with your basic details. This information appears at the top of your resume.</p>

                <div className="rounded-xl border border-dashed bg-muted/20 p-5">
                  <div className="grid place-items-center gap-3 text-center">
                    <div className="grid h-16 w-16 place-items-center rounded-full border bg-background">
                      {photoDataUrl ? (
                        <img src={photoDataUrl} alt="Profile" className="h-16 w-16 rounded-full object-cover" />
                      ) : (
                        <UserRound className="h-7 w-7 text-muted-foreground" />
                      )}
                    </div>
                    <div className="grid gap-1">
                      <Button variant="outline" asChild>
                        <label className="cursor-pointer">
                          Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePhoto(e.target.files?.[0])}
                            className="sr-only"
                          />
                        </label>
                      </Button>
                      <p className="text-xs text-muted-foreground">Optional · Max 5MB (JPG, PNG)</p>
                    </div>
                  </div>
                </div>

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

                <div className="grid gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium">Professional Summary</p>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={aiBusy === "summary"}
                      onClick={() =>
                        aiGenerate({
                          key: "summary",
                          prompt: `Write a professional resume summary in 6–8 lines for: ${name || "a candidate"}. Headline: ${headline}.`,
                          onApply: (t) => setSummary(t),
                        })
                      }
                    >
                      {aiBusy === "summary" ? "Generating..." : "AI Generate"}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Professional Summary (2–4 lines)"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="min-h-[110px]"
                  />
                  <p className="text-xs text-muted-foreground">You can always edit manually after AI generates.</p>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {step === "education" ? (
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
                {education.length === 0 ? (
                  <EmptyStateCard
                    title="No education added yet"
                    description="Add your educational qualifications to strengthen your resume."
                    icon={<GraduationCap className="h-7 w-7 text-muted-foreground" />}
                    actionLabel="Add Education"
                    onAction={() => setEducation([{ school: "", degree: "", year: "" }])}
                  />
                ) : (
                  <>
                    {education.map((ed, idx) => (
                      <div key={idx} className="rounded-xl border bg-card p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium">Education {idx + 1}</p>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEducation((p) => p.filter((_, i) => i !== idx))}
                            aria-label="Remove education"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-3 grid gap-3">
                          <Input
                            placeholder="Institution Name"
                            value={ed.school}
                            onChange={(e) =>
                              setEducation((p) => p.map((x, i) => (i === idx ? { ...x, school: e.target.value } : x)))
                            }
                          />
                          <Input
                            placeholder="Degree"
                            value={ed.degree}
                            onChange={(e) =>
                              setEducation((p) => p.map((x, i) => (i === idx ? { ...x, degree: e.target.value } : x)))
                            }
                          />
                          <div className="grid gap-3 sm:grid-cols-2">
                            <Input
                              placeholder="Start / End Year"
                              value={ed.year}
                              onChange={(e) =>
                                setEducation((p) => p.map((x, i) => (i === idx ? { ...x, year: e.target.value } : x)))
                              }
                            />
                            <Input placeholder="GPA (Optional)" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setEducation((p) => [...p, { school: "", degree: "", year: "" }])}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Another Education
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ) : null}

          {step === "projects" ? (
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
                {projects.length === 0 ? (
                  <EmptyStateCard
                    title="No projects added yet"
                    description="Add projects to demonstrate your practical skills."
                    icon={<FolderKanban className="h-7 w-7 text-muted-foreground" />}
                    actionLabel="Add Project"
                    onAction={() => setProjects([{ name: "", bullets: "" }])}
                  />
                ) : (
                  <>
                    {projects.map((p, idx) => (
                      <div key={idx} className="rounded-xl border bg-card p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium">Project {idx + 1}</p>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setProjects((pp) => pp.filter((_, i) => i !== idx))}
                            aria-label="Remove project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="mt-3 grid gap-3">
                          <Input
                            placeholder="Project Name"
                            value={p.name}
                            onChange={(e) =>
                              setProjects((pp) => pp.map((x, i) => (i === idx ? { ...x, name: e.target.value } : x)))
                            }
                          />

                          <div className="grid gap-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="text-sm font-medium">Description</p>
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={aiBusy === `project_${idx}`}
                                onClick={() =>
                                  aiGenerate({
                                    key: `project_${idx}`,
                                    prompt: `Write 6–8 lines (no special symbols) as ATS-friendly bullet points (one per line) for a resume project named: ${p.name || "My Project"}.`,
                                    onApply: (t) =>
                                      setProjects((pp) => pp.map((x, i) => (i === idx ? { ...x, bullets: t } : x))),
                                  })
                                }
                              >
                                {aiBusy === `project_${idx}` ? "Generating..." : "AI Generate"}
                              </Button>
                            </div>
                            <Textarea
                              placeholder="Describe your project, its purpose, and your contributions..."
                              value={p.bullets}
                              onChange={(e) =>
                                setProjects((pp) => pp.map((x, i) => (i === idx ? { ...x, bullets: e.target.value } : x)))
                              }
                              className="min-h-[130px]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => setProjects((p) => [...p, { name: "", bullets: "" }])}>
                      <Plus className="mr-2 h-4 w-4" /> Add Another Project
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ) : null}

          {step === "skills" ? (
            <Card>
              <CardHeader>
                <SectionHeader
                  title="Skills"
                  enabled={showSkills}
                  onEnabledChange={setShowSkills}
                  onMoveUp={() => move("skills", -1)}
                  onMoveDown={() => move("skills", 1)}
                />
              </CardHeader>
              <CardContent className="grid gap-3">
                <Textarea
                  placeholder="Skills (comma separated or one per line)\nExample: HTML, CSS, JavaScript, React"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="min-h-[140px]"
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">Tip: Use comma separated for clean formatting.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={aiBusy === "skills"}
                    onClick={() =>
                      aiGenerate({
                        key: "skills",
                        prompt: `Suggest a strong skills list for a fresher resume in 6–8 lines. Candidate: ${headline || "student"}. Return skills comma separated.`,
                        onApply: (t) => setSkills(t),
                      })
                    }
                  >
                    {aiBusy === "skills" ? "Generating..." : "AI Suggest"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {step === "experience" ? (
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
                {experience.length === 0 ? (
                  <EmptyStateCard
                    title="No experience added yet"
                    description="Add internships, jobs, or freelancing work to strengthen your resume."
                    icon={<Briefcase className="h-7 w-7 text-muted-foreground" />}
                    actionLabel="Add Experience"
                    onAction={() => setExperience([{ company: "", role: "", bullets: "" }])}
                  />
                ) : (
                  <>
                    {experience.map((ex, idx) => (
                      <div key={idx} className="rounded-xl border bg-card p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium">Experience {idx + 1}</p>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setExperience((p) => p.filter((_, i) => i !== idx))}
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

                      <div className="grid gap-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-medium">Description / Bullets</p>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={aiBusy === `exp_${idx}`}
                            onClick={() =>
                              aiGenerate({
                                key: `exp_${idx}`,
                                prompt: `Write ATS-friendly resume bullets (one per line) in 6–8 lines for role: ${ex.role || "Role"} at ${ex.company || "Company"}.`,
                                onApply: (t) =>
                                  setExperience((p) => p.map((x, i) => (i === idx ? { ...x, bullets: t } : x))),
                              })
                            }
                          >
                            {aiBusy === `exp_${idx}` ? "Generating..." : "AI Generate"}
                          </Button>
                        </div>
                        <Textarea
                          placeholder="Bullets (one per line)"
                          value={ex.bullets}
                          onChange={(e) =>
                            setExperience((p) => p.map((x, i) => (i === idx ? { ...x, bullets: e.target.value } : x)))
                          }
                          className="min-h-[110px]"
                        />
                        <p className="text-xs text-muted-foreground">Manual or AI — both supported.</p>
                      </div>
                    </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => setExperience((p) => [...p, { company: "", role: "", bullets: "" }])}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Another Experience
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ) : null}

          {step === "certs" ? (
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
                {certs.length === 0 ? (
                  <EmptyStateCard
                    title="No certifications added yet"
                    description="Add certifications to show verified skills and achievements."
                    icon={<Award className="h-7 w-7 text-muted-foreground" />}
                    actionLabel="Add Certification"
                    onAction={() => setCerts([{ name: "", org: "", year: "" }])}
                  />
                ) : (
                  <>
                    {certs.map((c, idx) => (
                      <div key={idx} className="rounded-xl border bg-card p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium">Certification {idx + 1}</p>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCerts((p) => p.filter((_, i) => i !== idx))}
                        aria-label="Remove certification"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <Input
                        placeholder="Certification"
                        value={c.name}
                        onChange={(e) =>
                          setCerts((p) => p.map((x, i) => (i === idx ? { ...x, name: e.target.value } : x)))
                        }
                        className="sm:col-span-2"
                      />
                      <Input
                        placeholder="Year"
                        value={c.year}
                        onChange={(e) =>
                          setCerts((p) => p.map((x, i) => (i === idx ? { ...x, year: e.target.value } : x)))
                        }
                      />
                      <Input
                        placeholder="Organization"
                        value={c.org}
                        onChange={(e) =>
                          setCerts((p) => p.map((x, i) => (i === idx ? { ...x, org: e.target.value } : x)))
                        }
                        className="sm:col-span-3"
                      />
                    </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => setCerts((p) => [...p, { name: "", org: "", year: "" }])}>
                      <Plus className="mr-2 h-4 w-4" /> Add Another Certification
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ) : null}

          {step === "preview" ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Final Check</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <p className="text-sm text-muted-foreground">Your resume preview is on the right. You can still jump back and edit.</p>
                <Button asChild className="mt-2">
                  <Link to="/export">Go to Export</Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}

          {/* Mobile-like bottom bar navigation */}
          <div className="sticky bottom-0 z-10 -mx-1 mt-2 border-t bg-background/80 px-1 py-3 backdrop-blur lg:static lg:mx-0 lg:border-t-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-0">
            <div className="flex items-center justify-between gap-3">
              <Button variant="outline" className="h-12 flex-1" onClick={goBack} disabled={currentIndex === 0}>
                Previous
              </Button>
              <Button className="h-12 flex-1" onClick={unlockAndGoNext} disabled={currentIndex === steps.length - 1}>
                Next
              </Button>
            </div>
          </div>
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
                  <div className="flex items-start gap-3">
                    {photoDataUrl ? (
                      <img src={photoDataUrl} alt="Profile photo" className="h-12 w-12 rounded-full object-cover" />
                    ) : null}
                    <div>
                      <p className="text-xl font-semibold">{name || "Your Name"}</p>
                      {headline ? <p className="text-sm text-muted-foreground">{headline}</p> : null}
                      <p className="mt-2 text-sm text-muted-foreground">
                        {[email, phone].filter(Boolean).join("  •  ") || "Email • Phone"}
                      </p>
                    </div>
                  </div>
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
                  if (id === "skills") {
                    const list = skills
                      .split(/\n|,/)
                      .map((s) => s.trim())
                      .filter(Boolean);
                    if (!list.length) return null;
                    return (
                      <div key={id}>
                        <Separator className="my-4" />
                        <p className="text-sm font-semibold">Skills</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {list.map((s, i) => (
                            <span key={i} className="rounded-full border bg-background/50 px-2.5 py-1 text-xs text-muted-foreground">
                              {s}
                            </span>
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
