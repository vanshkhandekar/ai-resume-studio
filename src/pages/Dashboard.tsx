 import { useState, useEffect } from "react";
 import { Button } from "@/components/ui/button";
 import { Card } from "@/components/ui/card";
 import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Input } from "@/components/ui/input";
 import { Switch } from "@/components/ui/switch";
 import { MessageCircle, X, Crown } from "lucide-react";
 import { supabase } from "@/integrations/supabase/client";
 import { useToast } from "@/hooks/use-toast";
 import { Link } from "react-router-dom";
 import { PersonalInfoForm } from "@/components/resume/PersonalInfoForm";
 import { EducationForm } from "@/components/resume/EducationForm";
 import { ExperienceForm } from "@/components/resume/ExperienceForm";
 import { ProjectsForm } from "@/components/resume/ProjectsForm";
 import { CertificationsForm } from "@/components/resume/CertificationsForm";
 import { ResumePreview } from "@/components/resume/ResumePreview";
 import { useResumeStore } from "@/hooks/useResumeStore";
 import { usePremium } from "@/hooks/usePremium";
 
 export default function Dashboard() {
   const [activeTab, setActiveTab] = useState("create");
   const [aiOpen, setAiOpen] = useState(false);
   const [aiInput, setAiInput] = useState("");
   const [aiResponse, setAiResponse] = useState("");
   const [aiLoading, setAiLoading] = useState(false);
   const [licenseInput, setLicenseInput] = useState("");
   const { toast } = useToast();
   const { resumeData, toggleSection } = useResumeStore();
   const { license, activateLicense, isPremium, isExpired } = usePremium();
   const hasPremium = isPremium();
 
   useEffect(() => {
     if (license && isExpired()) {
       toast({
         variant: "destructive",
         title: "License Expired",
         description: "Your premium license has expired.",
       });
     }
   }, [license, isExpired, toast]);
 
   const handleActivateLicense = () => {
     const success = activateLicense(licenseInput);
     if (success) {
       toast({ title: "Premium Activated", description: "Premium activated!" });
       setLicenseInput("");
     } else {
       toast({ variant: "destructive", title: "Invalid Key" });
     }
   };
 
   const handleAiAssist = async () => {
     if (!aiInput.trim()) return;
 
     setAiLoading(true);
     try {
       const { data, error } = await supabase.functions.invoke("ai-resume-assistant", {
         body: { prompt: aiInput, context: "Resume content generation" },
       });
 
       if (error) throw error;
 
       if (data?.error === "rate_limit") {
         toast({
           variant: "destructive",
           title: "Rate Limit",
           description: data.message,
         });
         return;
       }
 
       if (data?.error === "quota_exceeded") {
         toast({
           variant: "destructive",
           title: "AI Quota Exhausted",
           description: data.message,
         });
         setAiOpen(false);
         return;
       }
 
       setAiResponse(data.content || "No response generated.");
     } catch (err) {
       console.error("AI error:", err);
       toast({
         variant: "destructive",
         title: "AI Error",
         description: "Failed to get AI assistance. Please try again.",
       });
     } finally {
       setAiLoading(false);
     }
   };
 
   return (
     <div className="min-h-screen bg-background p-8">
       <div className="max-w-6xl mx-auto">
         <div className="flex justify-between items-center mb-6">
           <h1 className="text-3xl font-bold">Dashboard</h1>
           <div className="flex items-center gap-2">
             {hasPremium ? (
               <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg">
                 <Crown className="h-5 w-5 text-yellow-600" />
                 <span className="font-semibold">Premium</span>
               </div>
             ) : (
               <>
                 <Input
                   placeholder="License key"
                   value={licenseInput}
                   onChange={(e) => setLicenseInput(e.target.value)}
                   className="w-48"
                 />
                 <Button onClick={handleActivateLicense} size="sm">Activate</Button>
               </>
             )}
             <Link to="/"><Button variant="outline">Home</Button></Link>
           </div>
         </div>
 
         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
           <TabsList className="grid w-full grid-cols-5">
             <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
             <TabsTrigger value="create">Create Resume</TabsTrigger>
             <TabsTrigger value="templates">Templates</TabsTrigger>
             <TabsTrigger value="score">Resume Score</TabsTrigger>
             <TabsTrigger value="export">Export</TabsTrigger>
           </TabsList>
 
           <TabsContent value="dashboard">
             <Card className="p-6">
               <h2 className="text-2xl font-semibold mb-4">Welcome to AI Resume Builder</h2>
               <p className="text-muted-foreground">Start building your professional resume with AI assistance.</p>
             </Card>
           </TabsContent>
 
           <TabsContent value="create">
             <div className="grid lg:grid-cols-2 gap-6">
               <div className="space-y-6">
                 <Card className="p-6">
                   <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
                   <PersonalInfoForm />
                 </Card>
                 <Card className="p-6">
                   <div className="flex justify-between mb-4">
                     <h2 className="text-xl font-semibold">Education</h2>
                     <Switch checked={resumeData.sections.education.enabled} onCheckedChange={() => toggleSection('education')} />
                   </div>
                   <EducationForm />
                 </Card>
                 <Card className="p-6">
                   <div className="flex justify-between mb-4">
                     <h2 className="text-xl font-semibold">Experience</h2>
                     <Switch checked={resumeData.sections.experience.enabled} onCheckedChange={() => toggleSection('experience')} />
                   </div>
                   <ExperienceForm />
                 </Card>
                 <Card className="p-6">
                   <div className="flex justify-between mb-4">
                     <h2 className="text-xl font-semibold">Projects</h2>
                     <Switch checked={resumeData.sections.projects.enabled} onCheckedChange={() => toggleSection('projects')} />
                   </div>
                   <ProjectsForm />
                 </Card>
                 <Card className="p-6">
                   <div className="flex justify-between mb-4">
                     <h2 className="text-xl font-semibold">Certifications</h2>
                     <Switch checked={resumeData.sections.certifications.enabled} onCheckedChange={() => toggleSection('certifications')} />
                   </div>
                   <CertificationsForm />
                 </Card>
               </div>
               <div className="lg:sticky lg:top-8 h-fit">
                 <Card className="p-4">
                   <h3 className="font-semibold mb-4">Live Preview</h3>
                   <div className="overflow-auto max-h-[800px]">
                     <ResumePreview />
                   </div>
                 </Card>
               </div>
             </div>
           </TabsContent>
 
           <TabsContent value="templates">
             <Card className="p-6">
               <h2 className="text-2xl font-semibold mb-4">Resume Templates</h2>
               <Link to="/templates"><Button>Browse Templates</Button></Link>
             </Card>
           </TabsContent>
 
           <TabsContent value="score">
             <Card className="p-6">
               <h2 className="text-2xl font-semibold mb-4">Resume Score (Premium)</h2>
               <Link to="/resume-score"><Button disabled={!hasPremium}>View Score</Button></Link>
             </Card>
           </TabsContent>
 
           <TabsContent value="export">
             <Card className="p-6">
               <h2 className="text-2xl font-semibold mb-4">Export Resume</h2>
               <Link to="/export"><Button>Go to Export</Button></Link>
             </Card>
           </TabsContent>
         </Tabs>
       </div>
 
       {/* Floating AI Assistant Button */}
       <Button
         onClick={() => setAiOpen(!aiOpen)}
         className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
         size="icon"
       >
         {aiOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
       </Button>
 
       {/* AI Chat Panel */}
       {aiOpen && (
         <Card className="fixed bottom-24 right-6 w-96 p-4 shadow-xl">
           <h3 className="font-semibold mb-2">AI Resume Assistant</h3>
           <textarea
             className="w-full border rounded p-2 mb-2 min-h-[100px]"
             placeholder="Ask for help with your resume content..."
             value={aiInput}
             onChange={(e) => setAiInput(e.target.value)}
           />
           <Button onClick={handleAiAssist} disabled={aiLoading} className="w-full mb-2">
             {aiLoading ? "Generating..." : "Get AI Suggestion"}
           </Button>
           {aiResponse && (
             <div className="p-3 bg-muted rounded text-sm">
               <p className="font-semibold mb-1">AI Suggestion:</p>
               <p>{aiResponse}</p>
             </div>
           )}
         </Card>
       )}
     </div>
   );
 }