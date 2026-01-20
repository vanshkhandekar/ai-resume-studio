 import { useResumeStore } from "@/hooks/useResumeStore";
 import { Card } from "@/components/ui/card";
 
 export function ResumePreview() {
   const { resumeData } = useResumeStore();
   const { personalInfo, education, experience, projects, certifications, sections } = resumeData;
 
   return (
     <Card className="p-8 bg-white text-black min-h-[800px]" id="resume-preview">
       {/* Header */}
       <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
         {personalInfo.photo && (
           <img
             src={personalInfo.photo}
             alt={personalInfo.fullName}
             className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
           />
         )}
         <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || "Your Name"}</h1>
         <div className="text-sm text-gray-600 space-y-1">
           {personalInfo.email && <p>{personalInfo.email}</p>}
           {personalInfo.phone && <p>{personalInfo.phone}</p>}
           {personalInfo.location && <p>{personalInfo.location}</p>}
           {personalInfo.linkedIn && <p>{personalInfo.linkedIn}</p>}
           {personalInfo.website && <p>{personalInfo.website}</p>}
         </div>
       </div>
 
       {/* Summary */}
       {personalInfo.summary && (
         <div className="mb-6">
           <h2 className="text-xl font-bold mb-2 border-b border-gray-300">PROFESSIONAL SUMMARY</h2>
           <p className="text-sm">{personalInfo.summary}</p>
         </div>
       )}
 
       {/* Experience */}
       {sections.experience.enabled && experience.length > 0 && (
         <div className="mb-6">
           <h2 className="text-xl font-bold mb-2 border-b border-gray-300">EXPERIENCE</h2>
           {experience.map((exp) => (
             <div key={exp.id} className="mb-4">
               <div className="flex justify-between items-start">
                 <div>
                   <h3 className="font-bold">{exp.position}</h3>
                   <p className="text-sm text-gray-600">{exp.company}</p>
                 </div>
                 <p className="text-sm text-gray-600">
                   {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                 </p>
               </div>
               <p className="text-sm mt-2 whitespace-pre-line">{exp.description}</p>
             </div>
           ))}
         </div>
       )}
 
       {/* Education */}
       {sections.education.enabled && education.length > 0 && (
         <div className="mb-6">
           <h2 className="text-xl font-bold mb-2 border-b border-gray-300">EDUCATION</h2>
           {education.map((edu) => (
             <div key={edu.id} className="mb-4">
               <div className="flex justify-between items-start">
                 <div>
                   <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                   <p className="text-sm text-gray-600">{edu.school}</p>
                 </div>
                 <p className="text-sm text-gray-600">
                   {edu.startDate} - {edu.endDate}
                 </p>
               </div>
               {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
             </div>
           ))}
         </div>
       )}
 
       {/* Projects */}
       {sections.projects.enabled && projects.length > 0 && (
         <div className="mb-6">
           <h2 className="text-xl font-bold mb-2 border-b border-gray-300">PROJECTS</h2>
           {projects.map((proj) => (
             <div key={proj.id} className="mb-4">
               <div className="flex justify-between items-start">
                 <h3 className="font-bold">{proj.title}</h3>
                 <p className="text-sm text-gray-600">
                   {proj.startDate} - {proj.endDate}
                 </p>
               </div>
               {proj.technologies && (
                 <p className="text-sm text-gray-600 italic">Technologies: {proj.technologies}</p>
               )}
               <p className="text-sm mt-2 whitespace-pre-line">{proj.description}</p>
             </div>
           ))}
         </div>
       )}
 
       {/* Certifications */}
       {sections.certifications.enabled && certifications.length > 0 && (
         <div className="mb-6">
           <h2 className="text-xl font-bold mb-2 border-b border-gray-300">CERTIFICATIONS</h2>
           {certifications.map((cert) => (
             <div key={cert.id} className="mb-3">
               <div className="flex justify-between items-start">
                 <div>
                   <h3 className="font-bold">{cert.name}</h3>
                   <p className="text-sm text-gray-600">{cert.issuer}</p>
                 </div>
                 <p className="text-sm text-gray-600">{cert.date}</p>
               </div>
               {cert.credentialId && (
                 <p className="text-xs text-gray-500">Credential ID: {cert.credentialId}</p>
               )}
             </div>
           ))}
         </div>
       )}
     </Card>
   );
 }