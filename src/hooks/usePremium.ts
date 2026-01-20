 import { create } from 'zustand';
 import { persist } from 'zustand/middleware';
 import { PremiumLicense } from '@/types/resume';
 
 interface PremiumStore {
   license: PremiumLicense | null;
   activateLicense: (key: string) => boolean;
   isPremium: () => boolean;
   isExpired: () => boolean;
   deactivateLicense: () => void;
 }
 
 // Secret versioning for admin-generated keys
 const SECRET_VERSION = 'v1';
 const SECRET_PREFIX = 'RB_';
 
 export const usePremium = create<PremiumStore>()(
   persist(
     (set, get) => ({
       license: null,
 
       activateLicense: (key: string) => {
         // Validate key format
         if (!key.startsWith(SECRET_PREFIX)) {
           return false;
         }
 
         try {
           // Parse key: RB_v1_DURATION_TIMESTAMP
           const parts = key.split('_');
           if (parts.length !== 4 || parts[1] !== SECRET_VERSION) {
             return false;
           }
 
           const duration = parts[2] as '1month' | '2months' | '3months';
           const timestamp = parseInt(parts[3]);
 
           if (isNaN(timestamp)) {
             return false;
           }
 
           const activatedAt = new Date().toISOString();
           const durationMs = duration === '1month' ? 30 * 24 * 60 * 60 * 1000 
                           : duration === '2months' ? 60 * 24 * 60 * 60 * 1000
                           : 90 * 24 * 60 * 60 * 1000;
           
           const expiresAt = new Date(Date.now() + durationMs).toISOString();
 
           set({
             license: {
               key,
               activatedAt,
               expiresAt,
               duration,
             },
           });
 
           return true;
         } catch {
           return false;
         }
       },
 
       isPremium: () => {
         const license = get().license;
         if (!license) return false;
         return !get().isExpired();
       },
 
       isExpired: () => {
         const license = get().license;
         if (!license) return true;
         return new Date(license.expiresAt) < new Date();
       },
 
       deactivateLicense: () => set({ license: null }),
     }),
     {
       name: 'premium-license',
     }
   )
 );
 
 // Admin key generator (client-side for demo/college project)
 export const generateLicenseKey = (duration: '1month' | '2months' | '3months'): string => {
   const timestamp = Date.now();
   return `${SECRET_PREFIX}${SECRET_VERSION}_${duration}_${timestamp}`;
 };