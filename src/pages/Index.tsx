 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
 
 export default function Index() {
  return (
     <div className="min-h-screen bg-background">
       {/* Academic Header */}
       <Card className="max-w-4xl mx-auto mt-8 mb-6">
         <CardHeader>
           <CardTitle className="text-2xl text-center">AI Resume Builder</CardTitle>
           <CardDescription className="text-center">
             <div className="space-y-2 mt-4">
               <p className="font-semibold text-lg text-foreground">Group Members:</p>
               <p>1) Vansh Khandekar</p>
               <p>2) Shubham Chandekar</p>
               <p>3) Pranay Mende</p>
               <p className="font-semibold mt-4 text-foreground">Class: BCA 3rd Year</p>
               <p className="font-semibold text-foreground">College: Janaprabha College, Ramtek</p>
               <p className="font-semibold text-foreground">Topic: Resume Maker (AI-Based Application)</p>
             </div>
           </CardDescription>
         </CardHeader>
       </Card>
 
       {/* Hero Section */}
       <div className="max-w-4xl mx-auto text-center py-12 px-4">
         <h1 className="text-5xl font-bold mb-4">AI Resume Builder</h1>
         <p className="text-xl text-muted-foreground mb-8">
           Create professional resumes with AI assistance
         </p>
         <Link to="/dashboard">
           <Button size="lg" className="text-lg px-8">
             Start Building Resume
           </Button>
         </Link>
       </div>
 
       {/* Features */}
       <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
         <Card>
           <CardHeader>
             <CardTitle>AI Assisted Writing</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground">Get professional suggestions for your resume content</p>
           </CardContent>
         </Card>
         <Card>
           <CardHeader>
             <CardTitle>Premium Templates</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground">Choose from free and premium resume designs</p>
           </CardContent>
         </Card>
         <Card>
           <CardHeader>
             <CardTitle>ATS Score</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground">Analyze your resume for ATS compatibility (Premium)</p>
           </CardContent>
         </Card>
       </div>
 
       {/* Project Details Accordion */}
       <div className="max-w-4xl mx-auto px-4 py-12">
         <h2 className="text-3xl font-bold text-center mb-8">Project Overview</h2>
         <Accordion type="single" collapsible className="w-full">
           <AccordionItem value="introduction">
             <AccordionTrigger>Introduction</AccordionTrigger>
             <AccordionContent>
               <p>This AI Resume Builder is a modern web application designed to help users create professional resumes with the assistance of artificial intelligence. The project demonstrates the integration of frontend technologies with AI capabilities to streamline the resume creation process.</p>
             </AccordionContent>
           </AccordionItem>
           
           <AccordionItem value="abstract">
             <AccordionTrigger>Abstract</AccordionTrigger>
             <AccordionContent>
               <p>The AI Resume Builder leverages cutting-edge AI technology to provide intelligent suggestions and improvements for resume content. It combines user input with AI-generated recommendations to create compelling, professional resumes that stand out to recruiters and pass ATS screening.</p>
             </AccordionContent>
           </AccordionItem>
 
           <AccordionItem value="objectives">
             <AccordionTrigger>Objectives</AccordionTrigger>
             <AccordionContent>
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
             <AccordionTrigger>Scope of the Project</AccordionTrigger>
             <AccordionContent>
               <p>The project covers the complete resume building lifecycle including data entry, AI content enhancement, template selection, ATS scoring, and export functionality. It is designed as a frontend-only application with AI integration for intelligent assistance.</p>
             </AccordionContent>
           </AccordionItem>
 
           <AccordionItem value="methodology">
             <AccordionTrigger>Process and Methodology</AccordionTrigger>
             <AccordionContent>
               <p>The development follows a modular approach using React, TypeScript, and Tailwind CSS for the frontend. AI integration is handled through secure backend functions that communicate with Google Gemini AI models. The application uses a step-by-step resume builder with live preview and section management.</p>
             </AccordionContent>
           </AccordionItem>
 
           <AccordionItem value="tool">
             <AccordionTrigger>Developed Tool</AccordionTrigger>
             <AccordionContent>
               <p>The final tool is a comprehensive web-based resume builder featuring AI assistance, multiple templates, live preview, ATS scoring, and export capabilities. Users can create professional resumes without any technical knowledge while benefiting from AI-powered suggestions.</p>
             </AccordionContent>
           </AccordionItem>
 
           <AccordionItem value="conclusion">
             <AccordionTrigger>Conclusion</AccordionTrigger>
             <AccordionContent>
               <p>This project successfully demonstrates the practical application of AI in career development tools. By combining intuitive UI design with intelligent AI assistance, it provides users with a powerful yet accessible solution for creating professional resumes that meet modern hiring standards.</p>
             </AccordionContent>
           </AccordionItem>
         </Accordion>
      </div>
    </div>
  );
 }
