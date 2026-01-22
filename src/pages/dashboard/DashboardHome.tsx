import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative overflow-hidden rounded-xl border bg-card">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-accent/10 to-secondary/12" />
        <div className="relative p-6">
          <h1 className="text-3xl font-semibold tracking-tight">Resume GPT</h1>
          <p className="mt-1 text-muted-foreground">
            Neon, premium UI — start building, choose a template, then export a clean A4 PDF.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create Resume</CardTitle>
            <CardDescription>Step-by-step form + live preview.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/create">Open Builder</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Templates</CardTitle>
            <CardDescription>All templates are free.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/templates">Browse Templates</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Export</CardTitle>
            <CardDescription>Choose manual vs AI-enhanced preview.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/export">Go to Export</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
