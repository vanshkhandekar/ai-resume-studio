 import { useState } from "react";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Download, FileText, Lock } from "lucide-react";
 import { ResumePreview } from "@/components/resume/ResumePreview";
 import { usePremium } from "@/hooks/usePremium";
 import { useToast } from "@/hooks/use-toast";
 import { Link } from "react-router-dom";
 import jsPDF from "jspdf";
 import html2canvas from "html2canvas";
 
 export default function Export() {
   const { isPremium } = usePremium();
   const { toast } = useToast();
   const [exporting, setExporting] = useState(false);
   const [selectedVersion, setSelectedVersion] = useState<'manual' | 'ai'>('manual');
   const hasPremium = isPremium();
 
   const exportToPDF = async () => {
     setExporting(true);
     try {
       const element = document.getElementById('resume-preview');
       if (!element) throw new Error('Resume preview not found');
 
       const canvas = await html2canvas(element, {
         scale: 2,
         useCORS: true,
         logging: false,
       });
 
       const imgData = canvas.toDataURL('image/png');
       const pdf = new jsPDF({
         orientation: 'portrait',
         unit: 'mm',
         format: 'a4',
       });
 
       const imgWidth = 210;
       const imgHeight = (canvas.height * imgWidth) / canvas.width;
 
       pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
       pdf.save(`resume-${selectedVersion}.pdf`);
 
       toast({
         title: "Success",
         description: "Resume exported as PDF successfully",
       });
     } catch (error) {
       console.error('Export error:', error);
       toast({
         variant: "destructive",
         title: "Export Failed",
         description: "Failed to export resume. Please try again.",
       });
     } finally {
       setExporting(false);
     }
   };
 
   const exportToDOCX = () => {
     if (!hasPremium) {
       toast({
         variant: "destructive",
         title: "Premium Required",
         description: "DOCX export is a premium feature. Activate a license to unlock.",
       });
       return;
     }
     toast({
       title: "Feature Coming Soon",
       description: "DOCX export will be available in the next update",
     });
   };
 
   return (
     <div className="min-h-screen bg-background p-8">
       <div className="max-w-6xl mx-auto space-y-6">
         <div className="flex justify-between items-center">
           <div>
             <h1 className="text-3xl font-bold">Export Resume</h1>
             <p className="text-muted-foreground">Choose your resume version and export format</p>
           </div>
           <Link to="/dashboard">
             <Button variant="outline">Back to Dashboard</Button>
           </Link>
         </div>
 
         {/* Version Selection */}
         <div className="grid md:grid-cols-2 gap-6">
           <Card 
             className={`cursor-pointer transition-all ${selectedVersion === 'manual' ? 'ring-2 ring-primary' : ''}`}
             onClick={() => setSelectedVersion('manual')}
           >
             <CardHeader>
               <div className="flex justify-between items-start">
                 <CardTitle>Manual Resume</CardTitle>
                 <Badge>Free</Badge>
               </div>
               <CardDescription>Your original content without AI enhancements</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="aspect-[8.5/11] bg-white border-2 rounded-lg shadow-sm overflow-hidden">
                 <div className="scale-[0.4] origin-top-left w-[250%]">
                   <ResumePreview />
                 </div>
               </div>
             </CardContent>
           </Card>
 
           <Card 
             className={`cursor-pointer transition-all ${selectedVersion === 'ai' ? 'ring-2 ring-primary' : ''}`}
             onClick={() => setSelectedVersion('ai')}
           >
             <CardHeader>
               <div className="flex justify-between items-start">
                 <CardTitle>AI Enhanced Resume</CardTitle>
                 <Badge variant="secondary">AI Powered</Badge>
               </div>
               <CardDescription>Same content with AI-improved descriptions</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="aspect-[8.5/11] bg-white border-2 rounded-lg shadow-sm overflow-hidden">
                 <div className="scale-[0.4] origin-top-left w-[250%]">
                   <ResumePreview />
                 </div>
               </div>
             </CardContent>
           </Card>
         </div>
 
         {/* Export Options */}
         <Card>
           <CardHeader>
             <CardTitle>Export Options</CardTitle>
             <CardDescription>Download your resume in different formats</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
               <div className="flex items-center gap-3">
                 <FileText className="h-8 w-8 text-red-600" />
                 <div>
                   <h4 className="font-semibold">PDF Format</h4>
                   <p className="text-sm text-muted-foreground">Universal format, best for applications</p>
                 </div>
               </div>
               <Button onClick={exportToPDF} disabled={exporting}>
                 {exporting ? (
                   <>Exporting...</>
                 ) : (
                   <>
                     <Download className="h-4 w-4 mr-2" />
                     Export PDF
                   </>
                 )}
               </Button>
             </div>
 
             <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
               <div className="flex items-center gap-3">
                 <FileText className="h-8 w-8 text-blue-600" />
                 <div>
                   <h4 className="font-semibold">DOCX Format {!hasPremium && <Badge variant="outline" className="ml-2">Premium</Badge>}</h4>
                   <p className="text-sm text-muted-foreground">Editable Word document</p>
                 </div>
               </div>
               <Button onClick={exportToDOCX} disabled={!hasPremium}>
                 {!hasPremium ? (
                   <>
                     <Lock className="h-4 w-4 mr-2" />
                     Locked
                   </>
                 ) : (
                   <>
                     <Download className="h-4 w-4 mr-2" />
                     Export DOCX
                   </>
                 )}
               </Button>
             </div>
           </CardContent>
         </Card>
       </div>
     </div>
   );
 }