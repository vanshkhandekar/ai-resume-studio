 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Progress } from "@/components/ui/progress";
 import { Badge } from "@/components/ui/badge";
 import { Lock, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
 import { usePremium } from "@/hooks/usePremium";
 import { Link } from "react-router-dom";
 import { useResumeStore } from "@/hooks/useResumeStore";
 
 export default function ResumeScore() {
   const { isPremium } = usePremium();
   const { resumeData } = useResumeStore();
   const hasPremium = isPremium();
 
   // Calculate mock scores
   const calculateScore = () => {
     let score = 0;
     if (resumeData.personalInfo.fullName) score += 10;
     if (resumeData.personalInfo.email) score += 10;
     if (resumeData.personalInfo.phone) score += 10;
     if (resumeData.personalInfo.summary) score += 15;
     if (resumeData.experience.length > 0) score += 20;
     if (resumeData.education.length > 0) score += 15;
     if (resumeData.projects.length > 0) score += 10;
     if (resumeData.certifications.length > 0) score += 10;
     return score;
   };
 
   const overallScore = calculateScore();
   const atsScore = Math.min(100, overallScore + 15);
 
   const sections = [
     { name: 'Contact Information', score: resumeData.personalInfo.email ? 100 : 50, icon: resumeData.personalInfo.email ? CheckCircle : AlertTriangle },
     { name: 'Professional Summary', score: resumeData.personalInfo.summary ? 100 : 0, icon: resumeData.personalInfo.summary ? CheckCircle : XCircle },
     { name: 'Work Experience', score: resumeData.experience.length > 0 ? 90 : 0, icon: resumeData.experience.length > 0 ? CheckCircle : XCircle },
     { name: 'Education', score: resumeData.education.length > 0 ? 95 : 0, icon: resumeData.education.length > 0 ? CheckCircle : XCircle },
     { name: 'Projects', score: resumeData.projects.length > 0 ? 85 : 0, icon: resumeData.projects.length > 0 ? CheckCircle : AlertTriangle },
     { name: 'Certifications', score: resumeData.certifications.length > 0 ? 90 : 0, icon: resumeData.certifications.length > 0 ? CheckCircle : AlertTriangle },
   ];
 
   if (!hasPremium) {
     return (
       <div className="min-h-screen bg-background p-8 flex items-center justify-center">
         <Card className="max-w-md">
           <CardHeader className="text-center">
             <div className="mx-auto mb-4">
               <Lock className="h-16 w-16 text-primary" />
             </div>
             <CardTitle>Premium Feature</CardTitle>
             <CardDescription>
               Resume Score and ATS Analysis is available with a premium license
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <p className="text-sm text-center">
               Activate a premium license to access detailed resume scoring, ATS compatibility analysis, and improvement suggestions.
             </p>
             <Link to="/dashboard">
               <Button className="w-full">Back to Dashboard</Button>
             </Link>
           </CardContent>
         </Card>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-background p-8">
       <div className="max-w-4xl mx-auto space-y-6">
         <div className="flex justify-between items-center">
           <div>
             <h1 className="text-3xl font-bold">Resume Score</h1>
             <p className="text-muted-foreground">ATS Compatibility & Quality Analysis</p>
           </div>
           <Link to="/dashboard">
             <Button variant="outline">Back to Dashboard</Button>
           </Link>
         </div>
 
         {/* Overall Score */}
         <div className="grid md:grid-cols-2 gap-6">
           <Card>
             <CardHeader>
               <CardTitle>Overall Resume Score</CardTitle>
               <CardDescription>Based on completeness and quality</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="text-center">
                 <div className="text-6xl font-bold text-primary mb-2">{overallScore}</div>
                 <p className="text-sm text-muted-foreground mb-4">out of 100</p>
                 <Progress value={overallScore} className="h-3" />
                 <Badge className="mt-4" variant={overallScore > 70 ? "default" : "secondary"}>
                   {overallScore > 80 ? "Excellent" : overallScore > 60 ? "Good" : "Needs Improvement"}
                 </Badge>
               </div>
             </CardContent>
           </Card>
 
           <Card>
             <CardHeader>
               <CardTitle>ATS Compatibility Score</CardTitle>
               <CardDescription>Applicant Tracking System friendliness</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="text-center">
                 <div className="text-6xl font-bold text-green-600 mb-2">{atsScore}</div>
                 <p className="text-sm text-muted-foreground mb-4">out of 100</p>
                 <Progress value={atsScore} className="h-3" />
                 <Badge className="mt-4" variant={atsScore > 70 ? "default" : "secondary"}>
                   {atsScore > 80 ? "ATS Optimized" : atsScore > 60 ? "ATS Friendly" : "Needs Work"}
                 </Badge>
               </div>
             </CardContent>
           </Card>
         </div>
 
         {/* Section Breakdown */}
         <Card>
           <CardHeader>
             <CardTitle>Section Strength</CardTitle>
             <CardDescription>Individual section analysis</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             {sections.map((section) => {
               const Icon = section.icon;
               return (
                 <div key={section.name}>
                   <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-2">
                       <Icon className={`h-4 w-4 ${section.score > 70 ? 'text-green-600' : section.score > 0 ? 'text-yellow-600' : 'text-red-600'}`} />
                       <span className="font-medium">{section.name}</span>
                     </div>
                     <span className="text-sm text-muted-foreground">{section.score}%</span>
                   </div>
                   <Progress value={section.score} className="h-2" />
                 </div>
               );
             })}
           </CardContent>
         </Card>
       </div>
     </div>
   );
 }