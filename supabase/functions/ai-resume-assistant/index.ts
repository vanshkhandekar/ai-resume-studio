 import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
 
 const corsHeaders = {
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
 };
 
 serve(async (req) => {
   if (req.method === "OPTIONS") {
     return new Response(null, { headers: corsHeaders });
   }
 
    try {
     const { prompt, context } = await req.json();
     const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
 
     if (!LOVABLE_API_KEY) {
       throw new Error("LOVABLE_API_KEY is not configured");
     }
 
      const systemPrompt = `You are a professional resume writing assistant.

STRICT OUTPUT RULES:
- Write BETWEEN 6 and 10 short lines max (each line = one short sentence)
- Keep it simple, natural, and human-written (do not sound like AI)
- Easy English, resume-ready, ATS-friendly
- No bullet points, no numbering, no emojis
- Do NOT use these characters: * " ' : !
- Avoid filler and repetition; keep it concise

CONTENT RULES:
- Focus on achievements, responsibilities, impact, and skills
- Prefer action verbs and measurable outcomes when possible
- If the user is a fresher/student, keep it realistic and not exaggerated

User context: ${context || "General resume assistance"}`;

      const sanitize = (raw: string) => {
        const banned = /[\*"':!]/g;
        const cleaned = String(raw || "")
          .replace(/\r/g, "")
          .replace(banned, "")
          .replace(/\s+\n/g, "\n")
          .replace(/\n\s+/g, "\n")
          .replace(/[ \t]+/g, " ")
          .trim();

        // Try to keep "lines" behavior even if model returned a paragraph
        let lines = cleaned
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean);

        if (lines.length <= 1) {
          const sentences = cleaned
            .split(/(?<=[.!?])\s+/)
            .map((s) => s.replace(/[.!?]+$/g, "").trim())
            .filter(Boolean);
          lines = sentences.length ? sentences : lines;
        }

        // Hard cap: 10 lines
        if (lines.length > 10) lines = lines.slice(0, 10);

        // Soft minimum: if model produced too many tiny fragments, merge small lines
        const merged: string[] = [];
        for (const l of lines) {
          if (!merged.length) {
            merged.push(l);
            continue;
          }
          const prev = merged[merged.length - 1] || "";
          if (prev.length < 35 && l.length < 35 && merged.length < 10) {
            merged[merged.length - 1] = `${prev} ${l}`.trim();
          } else {
            merged.push(l);
          }
        }

        return merged.slice(0, 10).join("\n");
      };
 
     const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
       method: "POST",
       headers: {
         Authorization: `Bearer ${LOVABLE_API_KEY}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         model: "google/gemini-3-flash-preview",
         messages: [
           { role: "system", content: systemPrompt },
           { role: "user", content: prompt },
         ],
       }),
     });
 
     if (!response.ok) {
       const errorText = await response.text();
       console.error("AI gateway error:", response.status, errorText);
 
       // Handle rate limits and quota exhaustion
       if (response.status === 429) {
         return new Response(
           JSON.stringify({ 
             error: "rate_limit", 
             message: "AI assistant is temporarily unavailable due to high usage. Please try again in a moment." 
           }),
           { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
         );
       }
 
       if (response.status === 402) {
         return new Response(
           JSON.stringify({ 
             error: "quota_exceeded", 
             message: "AI assistant quota has been exhausted. The feature is now disabled. You can still write manually." 
           }),
           { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
         );
       }
 
       return new Response(
         JSON.stringify({ error: "ai_error", message: "AI assistant is currently unavailable." }),
         { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     const data = await response.json();
      const content = sanitize(data.choices?.[0]?.message?.content || "");
 
     return new Response(
       JSON.stringify({ content }),
       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   } catch (e) {
     console.error("AI assistant error:", e);
     return new Response(
       JSON.stringify({ 
         error: "server_error", 
         message: e instanceof Error ? e.message : "Unknown error" 
       }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 });