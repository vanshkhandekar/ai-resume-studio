import { useMemo, useState } from "react";
import { addMonths } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateLicenseKey, getLicenseSecrets, setLicenseSecrets } from "@/lib/license";
import { useToast } from "@/hooks/use-toast";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";
const SESSION_KEY = "arb_admin_logged_in";

export default function Admin() {
  const { toast } = useToast();
  const loggedIn = useMemo(() => sessionStorage.getItem(SESSION_KEY) === "1", []);
  const [isAuthed, setIsAuthed] = useState(loggedIn);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const [version, setVersion] = useState(getLicenseSecrets().version);
  const [secret, setSecret] = useState(getLicenseSecrets().secret);
  const [generated, setGenerated] = useState("");

  const login = () => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setIsAuthed(true);
      toast({ title: "Admin login", description: "Logged in successfully." });
      return;
    }
    toast({ variant: "destructive", title: "Login failed", description: "Invalid credentials." });
  };

  const rotate = () => {
    setLicenseSecrets({ version: version.trim() || "V1", secret: secret.trim() || "" });
    toast({ title: "Secrets updated", description: "License secret rotated on this device." });
  };

  const makeKey = async (months: 1 | 2 | 3) => {
    const expiry = addMonths(new Date(), months).getTime();
    const key = await generateLicenseKey(expiry, { version: version.trim() || "V1", secret: secret.trim() || "" });
    setGenerated(key);
    toast({ title: "Key generated", description: `${months} month license created.` });
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Frontend-only demo login for college viva.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Username" />
              <Input value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" type="password" />
              <Button onClick={login}>Login</Button>
              <p className="text-xs text-muted-foreground">Demo: admin / admin123</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-2xl font-semibold tracking-tight">Admin Panel</h1>
        <p className="mt-1 text-muted-foreground">Generate license keys, rotate secrets (client-only demo).</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>License Secret Rotation</CardTitle>
              <CardDescription>Versioned secret (V1, V2...) stored locally for validation.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Version (e.g., V1)" />
              <Input value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Secret" />
              <Button onClick={rotate}>Save / Rotate</Button>
              <p className="text-xs text-muted-foreground">Note: In a real SaaS this would be server-managed; for this project it is demo-only.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generate License Keys</CardTitle>
              <CardDescription>Time-based keys: 1 / 2 / 3 months</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => void makeKey(1)}>
                  1 Month
                </Button>
                <Button variant="outline" onClick={() => void makeKey(2)}>
                  2 Months
                </Button>
                <Button variant="outline" onClick={() => void makeKey(3)}>
                  3 Months
                </Button>
              </div>
              <Textarea value={generated} readOnly placeholder="Generated key will appear here" className="min-h-[120px]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
