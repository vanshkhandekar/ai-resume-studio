import { useEffect, useState } from "react";
import { addMonths } from "date-fns";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateLicenseKey, getLicenseSecrets, setLicenseSecrets } from "@/lib/license";
import { useToast } from "@/hooks/use-toast";
import { AdminAuthCard } from "@/components/admin/AdminAuthCard";
import { AdminSettingsCard } from "@/components/admin/AdminSettingsCard";
import { GeminiKeysCard } from "@/components/admin/GeminiKeysCard";

export default function Admin() {
  const { toast } = useToast();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [session, setSession] = useState<Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]>(
    null,
  );
  const [authBusy, setAuthBusy] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [bootBusy, setBootBusy] = useState(false);

  const [version, setVersion] = useState(getLicenseSecrets().version);
  const [secret, setSecret] = useState(getLicenseSecrets().secret);
  const [generated, setGenerated] = useState("");

  const refreshAdmin = async () => {
    const { data, error } = await supabase.rpc("is_admin");
    if (error) {
      setIsAdmin(false);
      return;
    }
    setIsAdmin(Boolean(data));
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session);
      setSessionChecked(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session) {
      setIsAdmin(null);
      return;
    }
    void refreshAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  const login = async (email: string, password: string) => {
    setAuthBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setAuthBusy(false);
    if (error) toast({ variant: "destructive", title: "Login failed", description: error.message });
  };

  const signup = async (email: string, password: string) => {
    setAuthBusy(true);
    const { error } = await supabase.auth.signUp({ email: email.trim(), password });
    setAuthBusy(false);
    if (error) {
      toast({ variant: "destructive", title: "Signup failed", description: error.message });
      return;
    }
    toast({ title: "Account created", description: "Now login using the same email and password." });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(null);
  };

  const bootstrapMe = async () => {
    if (!session) return;
    setBootBusy(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-bootstrap", { body: {} });
      if (error) throw error;
      if (data?.error) {
        toast({ variant: "destructive", title: "Bootstrap failed", description: data.message || data.error });
        return;
      }
      toast({ title: "Admin enabled", description: "This account is now admin." });
      await refreshAdmin();
    } catch (e) {
      toast({ variant: "destructive", title: "Bootstrap failed", description: e instanceof Error ? e.message : "" });
    } finally {
      setBootBusy(false);
    }
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

  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Admin</CardTitle>
              <CardDescription>Loading…</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto w-full max-w-md">
          <AdminAuthCard onLogin={login} onSignup={signup} busy={authBusy} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Admin Panel</h1>
            <p className="mt-1 text-muted-foreground">Yahin se baadme API keys bhi add kar sakte ho.</p>
          </div>
          <Button variant="outline" onClick={() => void logout()}>
            Logout
          </Button>
        </div>

        {isAdmin === false && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Access Required</CardTitle>
                <CardDescription>
                  Agar abhi tak koi admin nahi bana hai, toh one-time bootstrap se yeh account admin ban jayega.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => void bootstrapMe()} disabled={bootBusy}>
                  {bootBusy ? "Enabling…" : "Make me Admin"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {isAdmin && (
          <div className="mt-6">
            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ai">AI Settings</TabsTrigger>
                <TabsTrigger value="keys">API Keys</TabsTrigger>
                <TabsTrigger value="license">License (Demo)</TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="mt-6">
                <AdminSettingsCard />
              </TabsContent>

              <TabsContent value="keys" className="mt-6">
                <GeminiKeysCard />
              </TabsContent>

              <TabsContent value="license" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>License Secret Rotation</CardTitle>
                      <CardDescription>Local-only demo (device storage).</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      <Input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Version (e.g., V1)" />
                      <Input value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Secret" />
                      <Button onClick={rotate}>Save / Rotate</Button>
                      <p className="text-xs text-muted-foreground">
                        Note: Real production me yeh server-managed hota; yahan demo-only.
                      </p>
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
                      <Textarea
                        value={generated}
                        readOnly
                        placeholder="Generated key will appear here"
                        className="min-h-[120px]"
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
