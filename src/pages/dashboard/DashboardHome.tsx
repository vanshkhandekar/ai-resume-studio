import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Start with the guided builder, then pick a template and export.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Create Resume</CardTitle>
            <CardDescription>Step-by-step form + live preview.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/dashboard/create">Open Builder</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Templates</CardTitle>
            <CardDescription>Free + Premium (locked) designs.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard/templates">Browse Templates</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Export</CardTitle>
            <CardDescription>Manual vs AI-enhanced preview cards.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard/export">Go to Export</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
