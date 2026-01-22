import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Templates() {
  const templates = useMemo(
    () =>
      [
        // Normal (neutral)
        { id: "classic", name: "Classic", kind: "normal" as const, note: "Traditional, ATS-safe" },
        { id: "minimal", name: "Minimal", kind: "normal" as const, note: "Clean spacing, simple type" },
        { id: "modern", name: "Modern", kind: "normal" as const, note: "Balanced headings + sections" },
        { id: "executive", name: "Executive", kind: "normal" as const, note: "Strong hierarchy" },
        { id: "twocol", name: "Two-Column", kind: "normal" as const, note: "Skills sidebar layout" },
        { id: "compact", name: "Compact", kind: "normal" as const, note: "Fits more on one page" },
        { id: "atspro", name: "ATS Pro", kind: "normal" as const, note: "Extra readable + scannable" },
        { id: "slate", name: "Slate", kind: "normal" as const, note: "Soft contrast, calm look" },
        { id: "nimbus", name: "Nimbus", kind: "normal" as const, note: "Light separators" },
        { id: "vertex", name: "Vertex", kind: "normal" as const, note: "Sharp section blocks" },

        // Color (accent)
        { id: "aurora", name: "Aurora", kind: "color" as const, note: "Accent header bar" },
        { id: "metro", name: "Metro", kind: "color" as const, note: "Color section markers" },
        { id: "nova", name: "Nova", kind: "color" as const, note: "Accent sidebar" },
        { id: "pulse", name: "Pulse", kind: "color" as const, note: "Highlight skills chips" },
        { id: "orbit", name: "Orbit", kind: "color" as const, note: "Subtle accent dividers" },
        { id: "colorpop", name: "Color Pop", kind: "color" as const, note: "Bold but professional" },
        { id: "elegant", name: "Elegant", kind: "color" as const, note: "Accent lines + spacing" },
        { id: "creative", name: "Creative", kind: "color" as const, note: "Modern accent layout" },
        { id: "bold", name: "Bold", kind: "color" as const, note: "High-contrast headings" },
        { id: "professional", name: "Professional", kind: "color" as const, note: "Accent tags + header" },
      ],
    []
  );

  const [selected, setSelected] = useState<string>(templates[0]?.id ?? "classic");

  const selectedTemplate = templates.find((t) => t.id === selected) ?? templates[0];

  const TemplateMiniPreview = ({ kind }: { kind: "normal" | "color" }) => {
    // A tiny visual hint only (UI-only scope).
    return (
      <div className="relative overflow-hidden rounded-md border bg-card">
        {/* header */}
        <div className={kind === "color" ? "h-3 bg-primary" : "h-3 bg-muted"} />
        <div className="p-3">
          <div className="h-2 w-2/3 rounded bg-muted" />
          <div className="mt-2 grid grid-cols-12 gap-2">
            <div className={kind === "color" ? "col-span-4 space-y-2" : "col-span-12 space-y-2"}>
              <div className="h-2 w-full rounded bg-muted" />
              <div className="h-2 w-4/5 rounded bg-muted" />
              <div className="h-2 w-3/5 rounded bg-muted" />
            </div>
            {kind === "color" && (
              <div className="col-span-8 space-y-2">
                <div className="h-2 w-full rounded bg-muted" />
                <div className="h-2 w-11/12 rounded bg-muted" />
                <div className="h-2 w-9/12 rounded bg-muted" />
              </div>
            )}
          </div>
          {kind === "color" && (
            <div className="mt-3 flex gap-2">
              <div className="h-5 w-14 rounded bg-primary/15" />
              <div className="h-5 w-10 rounded bg-primary/10" />
              <div className="h-5 w-12 rounded bg-primary/15" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
      <p className="mt-1 text-muted-foreground">All templates are free. Choose one for your resume.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Selected Template</CardTitle>
          <CardDescription>
            Current: {selectedTemplate?.name} · {selectedTemplate?.kind === "color" ? "Color" : "Normal"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => setSelected(templates[0]?.id ?? "classic")}>Reset</Button>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {templates.map((t) => {
          const active = selected === t.id;
          return (
            <Card key={t.id} className={active ? "ring-2 ring-ring" : ""}>
              <CardHeader>
                <div className="space-y-3">
                  <TemplateMiniPreview kind={t.kind} />
                  <div>
                    <CardTitle className="text-lg">{t.name}</CardTitle>
                    <CardDescription>{t.note}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  variant={active ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setSelected(t.id)}
                >
                  {active ? "Selected" : "Select"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
