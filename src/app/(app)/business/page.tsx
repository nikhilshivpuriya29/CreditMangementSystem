
"use client";

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, PlusCircle, Edit, Trash2, ChevronRight } from "lucide-react";
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation'; // Import useRouter

// Mock business data - replace with actual data fetching and state management
const businesses = [
  { id: '1', name: 'My Kirana Store', type: 'Retail', isActive: true },
  { id: '2', name: 'General Store', type: 'Retail', isActive: false },
  { id: '3', name: 'Freelance Services', type: 'Service', isActive: false },
];

export default function BusinessManagementPage() {
   const { toast } = useToast();
   const router = useRouter(); // Initialize router

   // Mock active business state
   const [activeBusinessId, setActiveBusinessId] = React.useState(businesses.find(b => b.isActive)?.id || businesses[0]?.id);


   const handleDeleteBusiness = async (businessId: string, businessName: string) => {
      if (businesses.length <= 1) {
         toast({
            variant: "destructive",
            title: "Cannot Delete",
            description: "You must have at least one business profile.",
         });
         return;
      }
      if (businessId === activeBusinessId) {
           toast({
            variant: "destructive",
            title: "Cannot Delete Active Business",
            description: "Please switch to another business before deleting this one.",
         });
         return;
      }

      console.log("Deleting business:", businessId);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
         title: "Business Deleted",
         description: `${businessName} has been removed.`,
      });
       // Update local state (in a real app, refetch or update based on API response)
       // setBusinesses(prev => prev.filter(b => b.id !== businessId));
      router.refresh(); // Refresh the page to reflect changes (simple way for mock)
   }

   const handleSwitchBusiness = (businessId: string) => {
       console.log("Switching active business to:", businessId);
       setActiveBusinessId(businessId);
        toast({
         title: "Business Switched",
         description: `You are now managing ${businesses.find(b => b.id === businessId)?.name}.`,
      });
       // TODO: Update backend/global state about the active business
       // Redirect or refresh might be needed depending on app structure
       router.push('/dashboard'); // Redirect to dashboard after switching
   }

  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
           <div>
            <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5"/> Manage Businesses</CardTitle>
            <CardDescription>Switch between, edit, or add new business profiles.</CardDescription>
           </div>
            <Button asChild size="sm">
              <Link href="/business/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Business
              </Link>
            </Button>
        </CardHeader>
        <CardContent>
           {businesses.length > 0 ? (
              <ul className="divide-y divide-border">
                {businesses.map((business) => (
                   <li key={business.id} className={`px-1 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${activeBusinessId === business.id ? 'bg-muted/50 rounded-md' : ''}`}>
                     <div className="flex-1 min-w-0">
                         <p className="text-sm font-medium">{business.name} {activeBusinessId === business.id && <span className="text-xs text-primary ml-2">(Active)</span>}</p>
                         <p className="text-xs text-muted-foreground">{business.type}</p>
                     </div>
                     <div className="flex gap-2 mt-2 sm:mt-0 shrink-0 self-end sm:self-center">
                        {activeBusinessId !== business.id && (
                           <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSwitchBusiness(business.id)}
                           >
                               Switch to this
                           </Button>
                         )}
                         <Button variant="ghost" size="sm" asChild>
                              <Link href={`/business/${business.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                              </Link>
                         </Button>
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                               <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  disabled={businesses.length <= 1 || activeBusinessId === business.id} // Disable delete for single or active business
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                               </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Delete {business.name}?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the business profile
                                    and all associated data (customers, transactions, reports). Are you absolutely sure?
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteBusiness(business.id, business.name)} className="bg-destructive hover:bg-destructive/90">
                                    Delete Business
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                     </div>
                   </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                 <Building className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">You haven't added any business profiles yet.</p>
                 <Button asChild size="sm" className="mt-4">
                   <Link href="/business/add">
                     <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Business
                   </Link>
                 </Button>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
