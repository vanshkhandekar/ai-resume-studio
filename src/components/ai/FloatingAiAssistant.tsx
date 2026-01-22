import { useEffect, useMemo, useRef, useState } from "react";
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

  const btnSize = 48;
  const margin = 20;
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [pos, setPos] = useState<{ x: number; y: number }>(() => {
    try {
      const raw = localStorage.getItem("rgpt_ai_pos");
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return { x: 0, y: 0 };
  });

  useEffect(() => {
    // Place at bottom-right on first mount if not set
    if (pos.x === 0 && pos.y === 0) {
      setPos({ x: window.innerWidth - btnSize - margin, y: window.innerHeight - btnSize - margin });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("rgpt_ai_pos", JSON.stringify(pos));
    } catch {
      // ignore
    }
  }, [pos]);

  const clamp = (next: { x: number; y: number }) => {
    const maxX = Math.max(margin, window.innerWidth - btnSize - margin);
    const maxY = Math.max(margin, window.innerHeight - btnSize - margin);
    return {
      x: Math.min(maxX, Math.max(margin, next.x)),
      y: Math.min(maxY, Math.max(margin, next.y)),
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    dragOffsetRef.current = { x: startX - pos.x, y: startY - pos.y };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const next = clamp({ x: e.clientX - dragOffsetRef.current.x, y: e.clientY - dragOffsetRef.current.y });
    setPos(next);
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

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
      <div
        className="fixed z-50"
        style={{ left: pos.x, top: pos.y }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Button
          onPointerDown={onPointerDown}
          onClick={() => setOpen((v) => !v)}
          className="h-12 w-12 rounded-full shadow-[0_0_0_1px_hsl(var(--border)),0_20px_60px_-20px_hsl(var(--primary)/0.55)]"
          size="icon"
          aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        >
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <Card
          className="fixed w-[22rem] shadow-xl"
          style={{ left: Math.min(pos.x, window.innerWidth - 22 * 16 - margin), top: Math.max(margin, pos.y - 320) }}
        >
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
