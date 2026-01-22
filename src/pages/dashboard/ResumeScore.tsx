import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ResumeScore() {
  const score = 72;
  const ats = 68;

  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="text-2xl font-semibold tracking-tight">Resume Score</h1>
      <p className="mt-1 text-muted-foreground">ATS-style analysis (demo scoring).</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
            <CardDescription>Out of 100</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{score}</p>
            <Progress className="mt-4" value={score} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ATS Compatibility</CardTitle>
            <CardDescription>Keyword + structure readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold">{ats}</p>
            <Progress className="mt-4" value={ats} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
