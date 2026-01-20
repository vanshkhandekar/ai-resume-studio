 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { Card } from "@/components/ui/card";
 import { useResumeStore } from "@/hooks/useResumeStore";
 import { Plus, Trash2 } from "lucide-react";
 import { Education } from "@/types/resume";
 
 export function EducationForm() {
   const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
 
   const handleAdd = () => {
     const newEdu: Education = {
       id: Date.now().toString(),
       school: '',
       degree: '',
       field: '',
       startDate: '',
       endDate: '',
       description: '',
     };
     addEducation(newEdu);
   };
 
   return (
     <div className="space-y-4">
       {resumeData.education.map((edu) => (
         <Card key={edu.id} className="p-4">
           <div className="flex justify-between items-start mb-4">
             <h4 className="font-semibold">Education Entry</h4>
             <Button
               variant="ghost"
               size="icon"
               onClick={() => removeEducation(edu.id)}
             >
               <Trash2 className="h-4 w-4" />
             </Button>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <Label>School/University</Label>
               <Input
                 value={edu.school}
                 onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                 placeholder="Harvard University"
               />
             </div>
             <div>
               <Label>Degree</Label>
               <Input
                 value={edu.degree}
                 onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                 placeholder="Bachelor of Science"
               />
             </div>
             <div>
               <Label>Field of Study</Label>
               <Input
                 value={edu.field}
                 onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                 placeholder="Computer Science"
               />
             </div>
             <div className="grid grid-cols-2 gap-2">
               <div>
                 <Label>Start Date</Label>
                 <Input
                   type="month"
                   value={edu.startDate}
                   onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                 />
               </div>
               <div>
                 <Label>End Date</Label>
                 <Input
                   type="month"
                   value={edu.endDate}
                   onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                 />
               </div>
             </div>
             <div className="col-span-2">
               <Label>Description</Label>
               <Textarea
                 value={edu.description}
                 onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                 placeholder="GPA, achievements, relevant coursework..."
                 rows={3}
               />
             </div>
           </div>
         </Card>
       ))}
       <Button onClick={handleAdd} variant="outline" className="w-full">
         <Plus className="h-4 w-4 mr-2" />
         Add Education
       </Button>
     </div>
   );
 }