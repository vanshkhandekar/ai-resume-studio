 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { Card } from "@/components/ui/card";
 import { Checkbox } from "@/components/ui/checkbox";
 import { useResumeStore } from "@/hooks/useResumeStore";
 import { Plus, Trash2 } from "lucide-react";
 import { Experience } from "@/types/resume";
 
 export function ExperienceForm() {
   const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
 
   const handleAdd = () => {
     const newExp: Experience = {
       id: Date.now().toString(),
       company: '',
       position: '',
       startDate: '',
       endDate: '',
       current: false,
       description: '',
     };
     addExperience(newExp);
   };
 
   return (
     <div className="space-y-4">
       {resumeData.experience.map((exp) => (
         <Card key={exp.id} className="p-4">
           <div className="flex justify-between items-start mb-4">
             <h4 className="font-semibold">Work Experience</h4>
             <Button
               variant="ghost"
               size="icon"
               onClick={() => removeExperience(exp.id)}
             >
               <Trash2 className="h-4 w-4" />
             </Button>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <Label>Company</Label>
               <Input
                 value={exp.company}
                 onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                 placeholder="Google Inc."
               />
             </div>
             <div>
               <Label>Position</Label>
               <Input
                 value={exp.position}
                 onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                 placeholder="Software Engineer"
               />
             </div>
             <div className="grid grid-cols-2 gap-2">
               <div>
                 <Label>Start Date</Label>
                 <Input
                   type="month"
                   value={exp.startDate}
                   onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                 />
               </div>
               <div>
                 <Label>End Date</Label>
                 <Input
                   type="month"
                   value={exp.endDate}
                   onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                   disabled={exp.current}
                 />
               </div>
             </div>
             <div className="flex items-center space-x-2">
               <Checkbox
                 id={`current-${exp.id}`}
                 checked={exp.current}
                 onCheckedChange={(checked) =>
                   updateExperience(exp.id, { current: checked as boolean })
                 }
               />
               <Label htmlFor={`current-${exp.id}`}>Currently working here</Label>
             </div>
             <div className="col-span-2">
               <Label>Description</Label>
               <Textarea
                 value={exp.description}
                 onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                 placeholder="Key responsibilities and achievements..."
                 rows={4}
               />
             </div>
           </div>
         </Card>
       ))}
       <Button onClick={handleAdd} variant="outline" className="w-full">
         <Plus className="h-4 w-4 mr-2" />
         Add Experience
       </Button>
     </div>
   );
 }