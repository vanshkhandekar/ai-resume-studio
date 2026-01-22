import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Templates() {
  const templates = useMemo(
    () =>
      [
        "Classic",
        "Minimal",
        "Modern",
        "Executive",
        "Two-Column",
        "Compact",
        "Professional",
        "Elegant",
        "Creative",
        "Bold",
        "Color Pop",
        "ATS Pro",
        "Nimbus",
        "Aurora",
        "Metro",
        "Slate",
        "Nova",
        "Pulse",
        "Orbit",
        "Vertex",
      ],
    []
  );

  const [selected, setSelected] = useState<string>(templates[0] ?? "Classic");

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
      <p className="mt-1 text-muted-foreground">All templates are free. Choose one for your resume.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Selected Template</CardTitle>
          <CardDescription>Current: {selected}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={() => setSelected(templates[0] ?? "Classic")}>Reset</Button>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {templates.map((t) => {
          const active = selected === t;
          return (
            <Card key={t} className={active ? "ring-2 ring-ring" : ""}>
              <CardHeader>
                <CardTitle className="text-lg">{t}</CardTitle>
                <CardDescription>Clean, ATS-friendly layout.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant={active ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setSelected(t)}
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
