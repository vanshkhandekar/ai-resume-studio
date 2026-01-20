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
 
 STRICT RULES:
 - Generate EXACTLY 6–8 lines (sentences) only
 - Use professional, human-written tone
 - NO special symbols, NO emojis, NO bullet points
 - Be friendly but concise
 - Write in paragraph form
 - Focus on achievements and impact
 
 User context: ${context || "General resume assistance"}`;
 
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
     const content = data.choices?.[0]?.message?.content || "";
 
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