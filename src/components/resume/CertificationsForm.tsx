 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Card } from "@/components/ui/card";
 import { useResumeStore } from "@/hooks/useResumeStore";
 import { Plus, Trash2 } from "lucide-react";
 import { Certification } from "@/types/resume";
 
 export function CertificationsForm() {
   const { resumeData, addCertification, updateCertification, removeCertification } = useResumeStore();
 
   const handleAdd = () => {
     const newCert: Certification = {
       id: Date.now().toString(),
       name: '',
       issuer: '',
       date: '',
       credentialId: '',
     };
     addCertification(newCert);
   };
 
   return (
     <div className="space-y-4">
       {resumeData.certifications.map((cert) => (
         <Card key={cert.id} className="p-4">
           <div className="flex justify-between items-start mb-4">
             <h4 className="font-semibold">Certification</h4>
             <Button
               variant="ghost"
               size="icon"
               onClick={() => removeCertification(cert.id)}
             >
               <Trash2 className="h-4 w-4" />
             </Button>
           </div>
           <div className="grid grid-cols-2 gap-4">
             <div>
               <Label>Certification Name</Label>
               <Input
                 value={cert.name}
                 onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                 placeholder="AWS Certified Solutions Architect"
               />
             </div>
             <div>
               <Label>Issuing Organization</Label>
               <Input
                 value={cert.issuer}
                 onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                 placeholder="Amazon Web Services"
               />
             </div>
             <div>
               <Label>Issue Date</Label>
               <Input
                 type="month"
                 value={cert.date}
                 onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
               />
             </div>
             <div>
               <Label>Credential ID (Optional)</Label>
               <Input
                 value={cert.credentialId}
                 onChange={(e) => updateCertification(cert.id, { credentialId: e.target.value })}
                 placeholder="ABC123XYZ"
               />
             </div>
           </div>
         </Card>
       ))}
       <Button onClick={handleAdd} variant="outline" className="w-full">
         <Plus className="h-4 w-4 mr-2" />
         Add Certification
       </Button>
     </div>
   );
 }