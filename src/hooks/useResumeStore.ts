 import { create } from 'zustand';
 import { persist } from 'zustand/middleware';
 import { ResumeData, Education, Experience, Project, Certification } from '@/types/resume';
 
 interface ResumeStore {
   resumeData: ResumeData;
   aiEnhancedData: Partial<ResumeData>;
   updatePersonalInfo: (info: Partial<ResumeData['personalInfo']>) => void;
   addEducation: (edu: Education) => void;
   updateEducation: (id: string, edu: Partial<Education>) => void;
   removeEducation: (id: string) => void;
   addExperience: (exp: Experience) => void;
   updateExperience: (id: string, exp: Partial<Experience>) => void;
   removeExperience: (id: string) => void;
   addProject: (proj: Project) => void;
   updateProject: (id: string, proj: Partial<Project>) => void;
   removeProject: (id: string) => void;
   addCertification: (cert: Certification) => void;
   updateCertification: (id: string, cert: Partial<Certification>) => void;
   removeCertification: (id: string) => void;
   toggleSection: (section: keyof ResumeData['sections']) => void;
   reorderSections: (sections: ResumeData['sections']) => void;
   setAiEnhanced: (field: string, value: string) => void;
   clearResume: () => void;
 }
 
 const initialState: ResumeData = {
   personalInfo: {
     fullName: '',
     email: '',
     phone: '',
     location: '',
     linkedIn: '',
     website: '',
     summary: '',
   },
   education: [],
   experience: [],
   projects: [],
   certifications: [],
   skills: [],
   sections: {
     education: { id: 'education', enabled: true, order: 1 },
     experience: { id: 'experience', enabled: true, order: 2 },
     projects: { id: 'projects', enabled: true, order: 3 },
     certifications: { id: 'certifications', enabled: true, order: 4 },
     skills: { id: 'skills', enabled: true, order: 5 },
   },
 };
 
 export const useResumeStore = create<ResumeStore>()(
   persist(
     (set) => ({
       resumeData: initialState,
       aiEnhancedData: {},
       
       updatePersonalInfo: (info) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             personalInfo: { ...state.resumeData.personalInfo, ...info },
           },
         })),
 
       addEducation: (edu) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             education: [...state.resumeData.education, edu],
           },
         })),
 
       updateEducation: (id, edu) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             education: state.resumeData.education.map((e) =>
               e.id === id ? { ...e, ...edu } : e
             ),
           },
         })),
 
       removeEducation: (id) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             education: state.resumeData.education.filter((e) => e.id !== id),
           },
         })),
 
       addExperience: (exp) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             experience: [...state.resumeData.experience, exp],
           },
         })),
 
       updateExperience: (id, exp) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             experience: state.resumeData.experience.map((e) =>
               e.id === id ? { ...e, ...exp } : e
             ),
           },
         })),
 
       removeExperience: (id) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             experience: state.resumeData.experience.filter((e) => e.id !== id),
           },
         })),
 
       addProject: (proj) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             projects: [...state.resumeData.projects, proj],
           },
         })),
 
       updateProject: (id, proj) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             projects: state.resumeData.projects.map((p) =>
               p.id === id ? { ...p, ...proj } : p
             ),
           },
         })),
 
       removeProject: (id) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             projects: state.resumeData.projects.filter((p) => p.id !== id),
           },
         })),
 
       addCertification: (cert) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             certifications: [...state.resumeData.certifications, cert],
           },
         })),
 
       updateCertification: (id, cert) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             certifications: state.resumeData.certifications.map((c) =>
               c.id === id ? { ...c, ...cert } : c
             ),
           },
         })),
 
       removeCertification: (id) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             certifications: state.resumeData.certifications.filter((c) => c.id !== id),
           },
         })),
 
       toggleSection: (section) =>
         set((state) => ({
           resumeData: {
             ...state.resumeData,
             sections: {
               ...state.resumeData.sections,
               [section]: {
                 ...state.resumeData.sections[section],
                 enabled: !state.resumeData.sections[section].enabled,
               },
             },
           },
         })),
 
       reorderSections: (sections) =>
         set((state) => ({
           resumeData: { ...state.resumeData, sections },
         })),
 
       setAiEnhanced: (field, value) =>
         set((state) => ({
           aiEnhancedData: { ...state.aiEnhancedData, [field]: value },
         })),
 
       clearResume: () => set({ resumeData: initialState, aiEnhancedData: {} }),
     }),
     {
       name: 'resume-storage',
     }
   )
 );