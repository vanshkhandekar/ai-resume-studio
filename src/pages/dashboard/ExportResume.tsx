import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { jsPDF } from "jspdf";

export default function ExportResume() {
  const [choice, setChoice] = useState<"manual" | "ai">("manual");

  const handleDownloadPdf = () => {
    // NOTE: Current app does not yet render the resume content on this page.
    // This generates a clean PDF file directly (no browser print dialog).
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AI Resume Studio", 20, 22);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Export Type: ${choice === "manual" ? "Manual" : "AI Enhanced"}`, 20, 32);
    doc.text("(Resume content download will be added in the next step)", 20, 40);

    const filename = `ai-resume-studio-${choice === "manual" ? "manual" : "ai-enhanced"}.pdf`;
    doc.save(filename);
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="text-2xl font-semibold tracking-tight">Export</h1>
      <p className="mt-1 text-muted-foreground">Choose what to export: Manual or AI Enhanced.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className={choice === "manual" ? "ring-2 ring-ring" : ""}>
          <CardHeader>
            <CardTitle>Manual Resume Preview</CardTitle>
            <CardDescription>Your content as written.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant={choice === "manual" ? "default" : "outline"} onClick={() => setChoice("manual")}>
              Select Manual
            </Button>
          </CardContent>
        </Card>

        <Card className={choice === "ai" ? "ring-2 ring-ring" : ""}>
          <CardHeader>
            <CardTitle>AI Enhanced Resume Preview</CardTitle>
            <CardDescription>Improved bullets and summary suggestions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant={choice === "ai" ? "default" : "outline"} onClick={() => setChoice("ai")}>
              Select AI Enhanced
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Download</CardTitle>
          <CardDescription>PDF export is available for everyone.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={handleDownloadPdf}>Download PDF (A4)</Button>
          <p className="text-sm text-muted-foreground sm:self-center">Selected: {choice === "manual" ? "Manual" : "AI Enhanced"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
