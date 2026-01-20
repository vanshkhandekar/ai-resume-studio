import { useMemo, useState } from "react";
import { MessageCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type FloatingAiAssistantProps = {
  context: string;
  enabled?: boolean;
};

export function FloatingAiAssistant({ context, enabled = true }: FloatingAiAssistantProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const placeholder = useMemo(
    () =>
      "Example: Improve my project description for a fresher resume. Make it ATS-friendly and 6–8 lines.",
    [],
  );

  const handleAsk = async () => {
    if (!enabled) return;
    if (!input.trim()) return;

    setLoading(true);
    setResponse("");
    try {
      const { data, error } = await supabase.functions.invoke("ai-resume-assistant", {
        body: { prompt: input, context },
      });
      if (error) throw error;

      if (data?.error === "rate_limit") {
        toast({ variant: "destructive", title: "Rate Limit", description: data.message });
        return;
      }
      if (data?.error === "quota_exceeded") {
        toast({ variant: "destructive", title: "AI Quota Exhausted", description: data.message });
        setOpen(false);
        return;
      }
      setResponse(data?.content || "No response generated.");
    } catch (err) {
      console.error("AI error:", err);
      toast({
        variant: "destructive",
        title: "AI Error",
        description: "Failed to get AI assistance. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {open && (
        <Card className="fixed bottom-24 right-6 w-[22rem] shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">AI Resume Assistant</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Textarea
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[110px]"
            />
            <Button onClick={handleAsk} disabled={!enabled || loading}>
              {loading ? "Generating..." : "Get AI Suggestion"}
            </Button>
            {response ? (
              <div className="rounded-md border bg-muted p-3 text-sm">
                <p className="mb-1 font-medium">Suggestion</p>
                <p className="whitespace-pre-line text-muted-foreground">{response}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}
    </>
  );
}
