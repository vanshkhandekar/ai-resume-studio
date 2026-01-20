import { useMemo, useState } from "react";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { isPremiumActive, validateAndActivateLicenseKey } from "@/lib/license";
import { useToast } from "@/hooks/use-toast";

export default function Templates() {
  const [key, setKey] = useState("");
  const { toast } = useToast();

  const premium = useMemo(() => isPremiumActive(), []);

  const activate = async () => {
    const res = await validateAndActivateLicenseKey(key);
    toast({ variant: res.ok ? "default" : "destructive", title: res.ok ? "Success" : "Invalid Key", description: res.message });
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="text-2xl font-semibold tracking-tight">Templates</h1>
      <p className="mt-1 text-muted-foreground">Free templates are available. Premium templates are visible but locked.</p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Activate Premium (License Key)</CardTitle>
          <CardDescription>Enter your time-based license key received from Telegram support.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Input value={key} onChange={(e) => setKey(e.target.value)} placeholder="V1.1735689600000.signature" />
          <Button onClick={activate}>Activate</Button>
          {premium ? <p className="text-sm text-muted-foreground sm:self-center">Premium is active on this device.</p> : null}
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {["Classic (Free)", "Minimal (Free)", "Modern (Free)"].map((t) => (
          <Card key={t}>
            <CardHeader>
              <CardTitle className="text-lg">{t}</CardTitle>
              <CardDescription>Clean ATS-friendly layout.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Select
              </Button>
            </CardContent>
          </Card>
        ))}

        {["Premium Color (Locked)", "Executive Pro (Locked)", "Creative Pro (Locked)"].map((t) => (
          <Card key={t} className="opacity-90">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="h-4 w-4" /> {t}
              </CardTitle>
              <CardDescription>This template requires Premium access.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Locked
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
