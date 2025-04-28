
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Building, User, Phone, MapPin, Upload, Info, Save } from "lucide-react";
import { useRouter, useParams, notFound } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Basic GSTIN validation format (example, may need refinement)
const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

// Business Types - customize as needed
const businessTypes = [
  "Retail",
  "Wholesale",
  "Service",
  "Manufacturing",
  "Freelancer",
  "Other",
];

const BusinessSchema = z.object({
  businessName: z.string().min(2, "Business name must be at least 2 characters."),
  businessType: z.string().min(1, "Please select a business type."),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters.").optional(),
  contactNumber: z.string().min(10, "Contact number seems too short.").max(15, "Contact number seems too long.").optional(), // More flexible phone validation
  address: z.string().optional(),
  gstin: z.string().regex(gstinRegex, "Invalid GSTIN format.").optional().or(z.literal('')),
  logo: z.any().optional(), // For file upload
});

// Mock business data - replace with actual data fetching based on businessId
const MOCK_BUSINESSES = {
  '1': { id: '1', businessName: 'My Kirana Store', businessType: 'Retail', ownerName: 'Shopkeeper', contactNumber: '9999988888', address: '123 Main St, Delhi', gstin: '27ABCDE1234F1Z5', logo: null },
  '2': { id: '2', businessName: 'General Store', businessType: 'Retail', ownerName: '', contactNumber: '', address: '', gstin: '', logo: null },
  '3': { id: '3', businessName: 'Freelance Services', businessType: 'Freelancer', ownerName: 'My Name', contactNumber: '7777766666', address: 'WFH', gstin: '', logo: null },
};


export default function EditBusinessPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const businessId = params.businessId as string;

  // Fetch existing business data
   const existingBusinessData = MOCK_BUSINESSES[businessId as keyof typeof MOCK_BUSINESSES];

   if (!existingBusinessData) {
      notFound();
   }

  const form = useForm<z.infer<typeof BusinessSchema>>({
    resolver: zodResolver(BusinessSchema),
    defaultValues: existingBusinessData || { // Pre-fill form with existing data
      businessName: "",
      businessType: "",
      ownerName: "",
      contactNumber: "",
      address: "",
      gstin: "",
      logo: null,
    },
  });

  async function onSubmit(values: z.infer<typeof BusinessSchema>) {
    setIsLoading(true);
    console.log("Updating Business:", businessId, values);

    // --- Mock Business Update ---
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
     toast({
      title: "Business Profile Updated",
      description: `${values.businessName} details have been saved.`,
    });
    // --- End Mock ---

    setIsLoading(false);
    // Redirect back to business management page
     router.push('/business');
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
           <Building className="h-5 w-5" /> Edit Business Profile
        </CardTitle>
        <CardDescription>
          Update the details for {existingBusinessData?.businessName || 'your business'}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Name */}
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Building className="h-4 w-4"/> Business Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Business Type */}
            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of your business" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {businessTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Owner Name (Optional) */}
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><User className="h-4 w-4"/> Owner Name (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter owner's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Number (Optional) */}
             <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Phone className="h-4 w-4"/> Contact Number (Optional)</FormLabel>
                  <FormControl>
                     <Input type="tel" placeholder="Enter business contact number" {...field} />
                  </FormControl>
                   <FormDescription>
                     A number customers can reach (if different from login).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Address (Optional) */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><MapPin className="h-4 w-4"/> Business Address (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter full business address" {...field} />
                  </FormControl>
                   <FormDescription>
                     Will be used on receipts and invoices.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* GSTIN (Optional) */}
            <FormField
              control={form.control}
              name="gstin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Info className="h-4 w-4"/> GSTIN (Optional)</FormLabel>
                  <FormControl>
                     <Input placeholder="Enter 15-digit GSTIN" {...field} maxLength={15} className="uppercase"/>
                  </FormControl>
                  <FormDescription>
                     Needed for generating GST invoices (if applicable).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Logo (Optional) */}
             <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                 <FormItem>
                   <FormLabel className="flex items-center gap-1"><Upload className="h-4 w-4"/> Business Logo (Optional)</FormLabel>
                    {/* Display existing logo preview here if available */}
                   <FormControl>
                       {/* Basic file input - enhance later with preview and removal */}
                      <Input type="file" accept="image/*"
                        // You might need custom handling for file state management
                        // onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                       />
                   </FormControl>
                   <FormMessage />
                 </FormItem>
              )}
             />


            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
