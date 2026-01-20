 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Textarea } from "@/components/ui/textarea";
 import { Button } from "@/components/ui/button";
 import { useResumeStore } from "@/hooks/useResumeStore";
 import { Upload } from "lucide-react";
 import { useState } from "react";
 
 export function PersonalInfoForm() {
   const { resumeData, updatePersonalInfo } = useResumeStore();
   const [photoPreview, setPhotoPreview] = useState<string | undefined>(resumeData.personalInfo.photo);
 
   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
       const reader = new FileReader();
       reader.onloadend = () => {
         const base64 = reader.result as string;
         setPhotoPreview(base64);
         updatePersonalInfo({ photo: base64 });
       };
       reader.readAsDataURL(file);
     }
   };
 
   return (
     <div className="space-y-4">
       <div className="flex items-center gap-4">
         <div className="flex-shrink-0">
           <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
             {photoPreview ? (
               <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
             ) : (
               <Upload className="w-8 h-8 text-muted-foreground" />
             )}
           </div>
           <input
             type="file"
             accept="image/*"
             onChange={handlePhotoUpload}
             className="hidden"
             id="photo-upload"
           />
           <Label htmlFor="photo-upload" className="cursor-pointer">
             <Button variant="outline" size="sm" className="mt-2" asChild>
               <span>Upload Photo</span>
             </Button>
           </Label>
         </div>
         <div className="flex-1 grid grid-cols-2 gap-4">
           <div>
             <Label>Full Name</Label>
             <Input
               value={resumeData.personalInfo.fullName}
               onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
               placeholder="John Doe"
             />
           </div>
           <div>
             <Label>Email</Label>
             <Input
               type="email"
               value={resumeData.personalInfo.email}
               onChange={(e) => updatePersonalInfo({ email: e.target.value })}
               placeholder="john@example.com"
             />
           </div>
         </div>
       </div>
 
       <div className="grid grid-cols-2 gap-4">
         <div>
           <Label>Phone</Label>
           <Input
             value={resumeData.personalInfo.phone}
             onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
             placeholder="+1 234 567 8900"
           />
         </div>
         <div>
           <Label>Location</Label>
           <Input
             value={resumeData.personalInfo.location}
             onChange={(e) => updatePersonalInfo({ location: e.target.value })}
             placeholder="New York, NY"
           />
         </div>
       </div>
 
       <div className="grid grid-cols-2 gap-4">
         <div>
           <Label>LinkedIn</Label>
           <Input
             value={resumeData.personalInfo.linkedIn}
             onChange={(e) => updatePersonalInfo({ linkedIn: e.target.value })}
             placeholder="linkedin.com/in/johndoe"
           />
         </div>
         <div>
           <Label>Website</Label>
           <Input
             value={resumeData.personalInfo.website}
             onChange={(e) => updatePersonalInfo({ website: e.target.value })}
             placeholder="johndoe.com"
           />
         </div>
       </div>
 
       <div>
         <Label>Professional Summary</Label>
         <Textarea
           value={resumeData.personalInfo.summary}
           onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
           placeholder="Brief professional summary..."
           rows={4}
         />
       </div>
     </div>
   );
 }