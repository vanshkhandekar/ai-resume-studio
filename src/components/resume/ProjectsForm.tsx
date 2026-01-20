 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { Card } from "@/components/ui/card";
 import { useResumeStore } from "@/hooks/useResumeStore";
 import { Plus, Trash2 } from "lucide-react";
 import { Project } from "@/types/resume";
 
 export function ProjectsForm() {
   const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
 
   const handleAdd = () => {
     const newProj: Project = {
       id: Date.now().toString(),
       title: '',
       startDate: '',
       endDate: '',
       description: '',
       technologies: '',
     };
     addProject(newProj);
   };
 
   return (
     <div className="space-y-4">
       {resumeData.projects.map((proj) => (
         <Card key={proj.id} className="p-4">
           <div className="flex justify-between items-start mb-4">
             <h4 className="font-semibold">Project</h4>
             <Button
               variant="ghost"
               size="icon"
               onClick={() => removeProject(proj.id)}
             >
               <Trash2 className="h-4 w-4" />
             </Button>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div className="col-span-2">
               <Label>Project Title</Label>
               <Input
                 value={proj.title}
                 onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                 placeholder="E-Commerce Platform"
               />
             </div>
             <div>
               <Label>Start Date</Label>
               <Input
                 type="month"
                 value={proj.startDate}
                 onChange={(e) => updateProject(proj.id, { startDate: e.target.value })}
               />
             </div>
             <div>
               <Label>End Date</Label>
               <Input
                 type="month"
                 value={proj.endDate}
                 onChange={(e) => updateProject(proj.id, { endDate: e.target.value })}
               />
             </div>
             <div className="col-span-2">
               <Label>Technologies Used</Label>
               <Input
                 value={proj.technologies}
                 onChange={(e) => updateProject(proj.id, { technologies: e.target.value })}
                 placeholder="React, Node.js, MongoDB"
               />
             </div>
             <div className="col-span-2">
               <Label>Description</Label>
               <Textarea
                 value={proj.description}
                 onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                 placeholder="Project details, your role, outcomes..."
                 rows={4}
               />
             </div>
           </div>
         </Card>
       ))}
       <Button onClick={handleAdd} variant="outline" className="w-full">
         <Plus className="h-4 w-4 mr-2" />
         Add Project
       </Button>
     </div>
   );
 }