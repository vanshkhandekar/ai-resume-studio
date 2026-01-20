 export interface ResumeSection {
   id: string;
   enabled: boolean;
   order: number;
 // Resume section metadata
 }
 
 export interface Education {
   id: string;
   school: string;
   degree: string;
   field: string;
   startDate: string;
   endDate: string;
   description: string;
 }
 
 export interface Experience {
   id: string;
   company: string;
   position: string;
   startDate: string;
   endDate: string;
   current: boolean;
   description: string;
 }
 
 export interface Project {
   id: string;
   title: string;
   startDate: string;
   endDate: string;
   description: string;
   technologies: string;
 }
 
 export interface Certification {
   id: string;
   name: string;
   issuer: string;
   date: string;
   credentialId: string;
 }
 
 export interface PersonalInfo {
   fullName: string;
   email: string;
   phone: string;
   location: string;
   linkedIn: string;
   website: string;
   summary: string;
   photo?: string;
 }
 
 export interface ResumeData {
   personalInfo: PersonalInfo;
   education: Education[];
   experience: Experience[];
   projects: Project[];
   certifications: Certification[];
   skills: string[];
   sections: {
     education: ResumeSection;
     experience: ResumeSection;
     projects: ResumeSection;
     certifications: ResumeSection;
     skills: ResumeSection;
   };
 }
 
 export interface Template {
   id: string;
   name: string;
   preview: string;
   isPremium: boolean;
   category: 'clean' | 'modern' | 'creative';
 }
 
 export interface PremiumLicense {
   key: string;
   activatedAt: string;
   expiresAt: string;
   duration: '1month' | '2months' | '3months';
 }