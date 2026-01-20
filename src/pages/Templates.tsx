 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Badge } from "@/components/ui/badge";
 import { Lock } from "lucide-react";
 import { usePremium } from "@/hooks/usePremium";
 import { useToast } from "@/hooks/use-toast";
 import { Link } from "react-router-dom";
 
 const templates = [
   { id: 'clean', name: 'Clean Professional', isPremium: false, category: 'clean', color: 'bg-white' },
   { id: 'modern', name: 'Modern ATS', isPremium: false, category: 'clean', color: 'bg-gray-50' },
   { id: 'executive', name: 'Executive Blue', isPremium: true, category: 'modern', color: 'bg-blue-50' },
   { id: 'creative', name: 'Creative Purple', isPremium: true, category: 'modern', color: 'bg-purple-50' },
   { id: 'tech', name: 'Tech Green', isPremium: true, category: 'creative', color: 'bg-green-50' },
   { id: 'designer', name: 'Designer Orange', isPremium: true, category: 'creative', color: 'bg-orange-50' },
 ];
 
 export default function Templates() {
   const { isPremium } = usePremium();
   const { toast } = useToast();
   const hasPremium = isPremium();
 
   const handleSelectTemplate = (template: typeof templates[0]) => {
     if (template.isPremium && !hasPremium) {
       toast({
         variant: "destructive",
         title: "Premium Required",
         description: "This template requires a premium license. Contact support via Telegram to activate.",
       });
       return;
     }
     toast({ title: "Template Selected", description: `Using ${template.name} template` });
   };
 
   return (
     <div className="min-h-screen bg-background p-8">
       <div className="max-w-6xl mx-auto">
         <div className="flex justify-between items-center mb-8">
           <div>
             <h1 className="text-3xl font-bold">Resume Templates</h1>
             <p className="text-muted-foreground">Choose from professional and premium templates</p>
           </div>
           <Link to="/dashboard">
             <Button variant="outline">Back to Dashboard</Button>
           </Link>
         </div>
 
         <div className="grid md:grid-cols-3 gap-6">
           {templates.map((template) => {
             const isLocked = template.isPremium && !hasPremium;
             
             return (
               <Card key={template.id} className={`relative ${isLocked ? 'opacity-75' : ''}`}>
                 {isLocked && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm rounded-lg z-10">
                     <div className="text-center">
                       <Lock className="h-12 w-12 mx-auto mb-2 text-primary" />
                       <p className="font-semibold">Premium Required</p>
                     </div>
                   </div>
                 )}
                 
                 <CardHeader>
                   <div className="flex justify-between items-start">
                     <CardTitle>{template.name}</CardTitle>
                     {template.isPremium && (
                       <Badge variant="secondary">Premium</Badge>
                     )}
                   </div>
                   <CardDescription>
                     {template.category.charAt(0).toUpperCase() + template.category.slice(1)} style template
                   </CardDescription>
                 </CardHeader>
                 
                 <CardContent>
                   <div className={`w-full h-48 ${template.color} border rounded-lg mb-4 flex items-center justify-center`}>
                     <span className="text-gray-400">Template Preview</span>
                   </div>
                   <Button 
                     onClick={() => handleSelectTemplate(template)}
                     className="w-full"
                     disabled={isLocked}
                   >
                     {isLocked ? 'Locked' : 'Use This Template'}
                   </Button>
                 </CardContent>
               </Card>
             );
           })}
         </div>
       </div>
     </div>
   );
 }