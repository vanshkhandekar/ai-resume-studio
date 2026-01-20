 import { Link} from "react-router-dom";
 import { useState } from "react";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
 import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
 import { Sparkles, FileText, Award, Lock, Download, Users } from "lucide-react";
 
 export default function Index() {
   const [projectModalOpen, setProjectModalOpen] = useState(false);
 
  return (
     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
       {/* Academic Header */}
       <Card className="max-w-4xl mx-auto mt-8 mb-6 border-2 border-purple-200 shadow-xl bg-white/80 backdrop-blur-sm">
         <CardHeader>
           <CardTitle className="text-3xl text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
             AI Resume Builder
           </CardTitle>
           <CardDescription className="text-center">
             <div className="space-y-3 mt-4">
               <div className="flex items-center justify-center gap-2">
                 <Users className="h-5 w-5 text-purple-600" />
                 <p className="font-semibold text-lg text-gray-800">Group Members</p>
               </div>
               <div className="grid grid-cols-3 gap-4 mt-2">
                 <div className="bg-purple-100 px-3 py-2 rounded-lg">
                   <p className="font-medium text-purple-900">Vansh Khandekar</p>
                 </div>
                 <div className="bg-blue-100 px-3 py-2 rounded-lg">
                   <p className="font-medium text-blue-900">Shubham Chandekar</p>
                 </div>
                 <div className="bg-indigo-100 px-3 py-2 rounded-lg">
                   <p className="font-medium text-indigo-900">Pranay Mende</p>
                 </div>
               </div>
               <div className="mt-4 space-y-1">
                 <p className="font-semibold text-gray-800">📚 Class: <span className="text-purple-600">BCA 3rd Year</span></p>
                 <p className="font-semibold text-gray-800">🏛️ College: <span className="text-blue-600">Janaprabha College, Ramtek</span></p>
                 <p className="font-semibold text-gray-800">🎯 Topic: <span className="text-indigo-600">Resume Maker (AI-Based Application)</span></p>
               </div>
             </div>
           </CardDescription>
         </CardHeader>
       </Card>
 
       {/* Hero Section */}
       <div className="max-w-5xl mx-auto text-center py-16 px-4">
         <div className="inline-block mb-4">
           <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
             ✨ AI-Powered Resume Builder
           </span>
         </div>
         <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
           Build Your Dream Resume
         </h1>
         <p className="text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
           Create professional, ATS-optimized resumes with AI assistance in minutes
         </p>
         <div className="flex gap-4 justify-center flex-wrap">
             <Link to="/dashboard">
             <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl hover:shadow-purple-500/50 transition-all">
               <Sparkles className="mr-2 h-5 w-5" />
               Start Building Free
               </Button>
             </Link>
           
           <Dialog open={projectModalOpen} onOpenChange={setProjectModalOpen}>
             <DialogTrigger asChild>
               <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 shadow-lg">
                 <FileText className="mr-2 h-5 w-5" />
                 View Project Details
               </Button>
             </DialogTrigger>
             <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
               <DialogHeader>
                 <DialogTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                   Project Documentation
                 </DialogTitle>
                 <DialogDescription>
                   Complete technical documentation for AI Resume Builder project
                 </DialogDescription>
               </DialogHeader>
               
               <Accordion type="single" collapsible className="w-full">
                 <AccordionItem value="introduction">
                   <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                     📖 Introduction
                   </AccordionTrigger>
                   <AccordionContent className="text-base leading-relaxed bg-purple-50 p-4 rounded-lg">
                     This AI Resume Builder is a modern web application designed to help users create professional resumes with the assistance of artificial intelligence. The project demonstrates the integration of frontend technologies with AI capabilities to streamline the resume creation process.
                   </AccordionContent>
                 </AccordionItem>
                 
                 <AccordionItem value="abstract">
                   <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                     📝 Abstract
                   </AccordionTrigger>
                   <AccordionContent className="text-base leading-relaxed bg-blue-50 p-4 rounded-lg">
                     The AI Resume Builder leverages cutting-edge AI technology to provide intelligent suggestions and improvements for resume content. It combines user input with AI-generated recommendations to create compelling, professional resumes that stand out to recruiters and pass ATS screening.
                   </AccordionContent>
                 </AccordionItem>
 
                 <AccordionItem value="objectives">
                   <AccordionTrigger className="text-lg font-semibold hover:text-indigo-600">
                     🎯 Objectives
                   </AccordionTrigger>
                   <AccordionContent className="text-base leading-relaxed bg-indigo-50 p-4 rounded-lg">
                     <ul className="list-disc list-inside space-y-2">
                       <li>Simplify the resume creation process for users</li>
                       <li>Provide AI-powered content suggestions and improvements</li>
                       <li>Offer multiple professional templates</li>
                       <li>Enable ATS compatibility analysis</li>
                       <li>Support both manual and AI-assisted editing</li>
                     </ul>
                   </AccordionContent>
                 </AccordionItem>
 
                 <AccordionItem value="scope">
                   <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                     🔍 Scope of the Project
                   </AccordionTrigger>
                   <AccordionContent className="text-base leading-relaxed bg-purple-50 p-4 rounded-lg">
                     The project covers the complete resume building lifecycle including data entry, AI content enhancement, template selection, ATS scoring, and export functionality. It is designed as a frontend-only application with AI integration for intelligent assistance.
                   </AccordionContent>
                 </AccordionItem>
 
                 <AccordionItem value="methodology">
                   <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                     ⚙️ Process and Methodology
                   </AccordionTrigger>
                   <AccordionContent className="text-base leading-relaxed bg-blue-50 p-4 rounded-lg">
                     The development follows a modular approach using React, TypeScript, and Tailwind CSS for the frontend. AI integration is handled through secure backend functions that communicate with Google Gemini AI models. The application uses a step-by-step resume builder with live preview and section management.
                   </AccordionContent>
                 </AccordionItem>
 
                 <AccordionItem value="tool">
                   <AccordionTrigger className="text-lg font-semibold hover:text-indigo-600">
                     🛠️ Developed Tool
                   </AccordionTrigger>
                   <AccordionContent className="text-base leading-relaxed bg-indigo-50 p-4 rounded-lg">
                     The final tool is a comprehensive web-based resume builder featuring AI assistance, multiple templates, live preview, ATS scoring, and export capabilities. Users can create professional resumes without any technical knowledge while benefiting from AI-powered suggestions.
                   </AccordionContent>
                 </AccordionItem>
 
                 <AccordionItem value="conclusion">
                   <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                     ✅ Conclusion
                   </AccordionTrigger>
                   <AccordionContent className="text-base leading-relaxed bg-purple-50 p-4 rounded-lg">
                     This project successfully demonstrates the practical application of AI in career development tools. By combining intuitive UI design with intelligent AI assistance, it provides users with a powerful yet accessible solution for creating professional resumes that meet modern hiring standards.
                   </AccordionContent>
                 </AccordionItem>
               </Accordion>
             </DialogContent>
           </Dialog>
 
             <Link to="/admin">
             <Button size="lg" variant="ghost" className="text-lg px-8 text-gray-600 hover:text-purple-600">
                 Admin Login
               </Button>
             </Link>
           </div>
       </div>
 
       {/* Features */}
       <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
         <Card className="border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl bg-white/90 backdrop-blur-sm">
           <CardHeader>
             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
               <Sparkles className="h-6 w-6 text-white" />
             </div>
             <CardTitle className="text-xl text-purple-900">AI Assisted Writing</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-gray-600">Get professional AI-powered suggestions for your resume content in real-time</p>
           </CardContent>
         </Card>
         <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-xl bg-white/90 backdrop-blur-sm">
           <CardHeader>
             <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
               <FileText className="h-6 w-6 text-white" />
             </div>
             <CardTitle className="text-xl text-blue-900">Premium Templates</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-gray-600">Choose from beautiful, ATS-optimized free and premium resume templates</p>
           </CardContent>
         </Card>
         <Card className="border-2 border-indigo-200 hover:border-indigo-400 transition-all hover:shadow-xl bg-white/90 backdrop-blur-sm">
           <CardHeader>
             <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
               <Award className="h-6 w-6 text-white" />
             </div>
             <CardTitle className="text-xl text-indigo-900">ATS Score Analysis</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-gray-600">Get detailed ATS compatibility scores and improvement suggestions</p>
           </CardContent>
         </Card>
       </div>
    </div>
  );
 }
