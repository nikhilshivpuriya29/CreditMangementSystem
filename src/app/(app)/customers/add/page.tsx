
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
import { Loader2, User, Phone, Mail, MapPin, Import } from "lucide-react";
import { useRouter } from 'next/navigation';

// Indian phone number validation (basic - 10 digits)
const phoneRegex = /^[6-9]\d{9}$/;

const CustomerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Indian phone number."),
  email: z.string().email("Invalid email address.").optional().or(z.literal('')), // Optional and allow empty string
  address: z.string().optional(),
});

export default function AddCustomerPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof CustomerSchema>>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
    },
  });

   // Placeholder function for importing contacts
   const handleImportContact = () => {
      toast({
         title: "Feature Coming Soon",
         description: "Importing from contacts is not yet implemented.",
         variant: "default", // Use default or a custom variant for info
      });
      // In a real app:
      // 1. Check for contact permissions.
      // 2. Request permissions if needed.
      // 3. Use a native module or browser API (if available) to access contacts.
      // 4. Let the user select a contact.
      // 5. Populate the form fields (name, phone, maybe email).
   };

  async function onSubmit(values: z.infer<typeof CustomerSchema>) {
    setIsLoading(true);
    console.log("Adding Customer:", values);

    // --- Mock Customer Save ---
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    const newCustomerId = Math.random().toString(36).substring(7); // Generate mock ID
     toast({
      title: "Customer Added",
      description: `${values.name} has been added successfully.`,
    });
    // --- End Mock ---

    setIsLoading(false);
    // Redirect to the newly created customer's detail page (or list if needed)
     router.push(`/customers/${newCustomerId}`); // Use the mock ID for redirection
     // Alternatively: router.push('/customers');
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
           <User className="h-5 w-5" /> Add New Customer
        </CardTitle>
        <CardDescription>
          Enter the details for your new customer. Phone number is required.
          <Button variant="link" size="sm" className="pl-1 h-auto py-0" onClick={handleImportContact}>
             <Import className="mr-1 h-3.5 w-3.5" /> Import from Contacts?
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><User className="h-4 w-4"/> Customer Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter customer's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Phone className="h-4 w-4"/> Phone Number *</FormLabel>
                  <FormControl>
                     <Input type="tel" placeholder="Enter 10-digit mobile number" maxLength={10} {...field} />
                  </FormControl>
                   <FormDescription>
                     Used for sending reminders (SMS/WhatsApp).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email (Optional) */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Mail className="h-4 w-4"/> Email (Optional)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter customer's email" {...field} />
                  </FormControl>
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
                  <FormLabel className="flex items-center gap-1"><MapPin className="h-4 w-4"/> Address (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter customer's address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Customer
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
