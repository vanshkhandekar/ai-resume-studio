 import { useState } from "react";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { generateLicenseKey } from "@/hooks/usePremium";
 import { Copy, Key } from "lucide-react";
 import { useToast } from "@/hooks/use-toast";
 import { Link } from "react-router-dom";
 
 export default function Admin() {
   const [password, setPassword] = useState("");
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [duration, setDuration] = useState<'1month' | '2months' | '3months'>('1month');
   const [generatedKey, setGeneratedKey] = useState("");
   const { toast } = useToast();
 
   const ADMIN_PASSWORD = "admin123"; // Simple password for college demo
 
   const handleLogin = () => {
     if (password === ADMIN_PASSWORD) {
       setIsAuthenticated(true);
       toast({ title: "Success", description: "Admin access granted" });
     } else {
       toast({ variant: "destructive", title: "Error", description: "Invalid password" });
     }
   };
 
   const handleGenerateKey = () => {
     const key = generateLicenseKey(duration);
     setGeneratedKey(key);
     toast({ title: "Key Generated", description: "License key created successfully" });
   };
 
   const copyToClipboard = () => {
     navigator.clipboard.writeText(generatedKey);
     toast({ title: "Copied", description: "License key copied to clipboard" });
   };
 
   if (!isAuthenticated) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-background">
         <Card className="w-[400px]">
           <CardHeader>
             <CardTitle>Admin Panel</CardTitle>
             <CardDescription>Enter admin password to continue</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div>
               <Label>Password</Label>
               <Input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                 placeholder="Enter admin password"
               />
             </div>
             <Button onClick={handleLogin} className="w-full">Login</Button>
             <Link to="/">
               <Button variant="outline" className="w-full">Back to Home</Button>
             </Link>
           </CardContent>
         </Card>
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-background p-8">
       <div className="max-w-4xl mx-auto space-y-6">
         <div className="flex justify-between items-center">
           <h1 className="text-3xl font-bold">Admin Panel</h1>
           <Link to="/">
             <Button variant="outline">Back to Home</Button>
           </Link>
         </div>
 
         <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Key className="h-5 w-5" />
               License Key Generator
             </CardTitle>
             <CardDescription>
               Generate premium license keys for users. Keys are time-based and expire automatically.
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div>
               <Label>License Duration</Label>
               <Select value={duration} onValueChange={(v) => setDuration(v as any)}>
                 <SelectTrigger>
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent>
                   <SelectItem value="1month">1 Month</SelectItem>
                   <SelectItem value="2months">2 Months</SelectItem>
                   <SelectItem value="3months">3 Months</SelectItem>
                 </SelectContent>
               </Select>
             </div>
 
             <Button onClick={handleGenerateKey} className="w-full">
               Generate License Key
             </Button>
 
             {generatedKey && (
               <div className="p-4 bg-muted rounded-lg">
                 <Label className="text-sm font-semibold">Generated License Key</Label>
                 <div className="flex items-center gap-2 mt-2">
                   <code className="flex-1 p-2 bg-background rounded text-sm font-mono">
                     {generatedKey}
                   </code>
                   <Button size="icon" variant="outline" onClick={copyToClipboard}>
                     <Copy className="h-4 w-4" />
                   </Button>
                 </div>
                 <p className="text-xs text-muted-foreground mt-2">
                   Valid for {duration.replace('month', ' month').replace('s', 's')} from activation
                 </p>
               </div>
             )}
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <CardTitle>Premium Features</CardTitle>
           </CardHeader>
           <CardContent className="space-y-2">
             <div className="flex justify-between items-center p-3 bg-muted rounded">
               <span>Premium Templates</span>
               <span className="text-sm text-muted-foreground">Unlocked with license</span>
             </div>
             <div className="flex justify-between items-center p-3 bg-muted rounded">
               <span>Resume Score & ATS Analysis</span>
               <span className="text-sm text-muted-foreground">Unlocked with license</span>
             </div>
             <div className="flex justify-between items-center p-3 bg-muted rounded">
               <span>DOCX Export</span>
               <span className="text-sm text-muted-foreground">Unlocked with license</span>
             </div>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <CardTitle>Support Contact</CardTitle>
             <CardDescription>For manual payment and premium activation</CardDescription>
           </CardHeader>
           <CardContent>
             <p className="text-sm">
               Users can contact via <strong>Telegram</strong> for premium license purchase.
               After payment confirmation, provide them with a generated license key.
             </p>
           </CardContent>
         </Card>
       </div>
     </div>
   );
 }