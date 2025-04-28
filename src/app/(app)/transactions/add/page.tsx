
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
import { Loader2, Calendar as CalendarIcon, ArrowUpRight, ArrowDownLeft, IndianRupee, Users, Upload } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock customer data for dropdown - replace with actual data fetching
const MOCK_CUSTOMERS = [
  { id: '1', name: 'Anil Kumar' },
  { id: '2', name: 'Sunita Devi' },
  { id: '3', name: 'Ramesh Gupta' },
  { id: '4', name: 'Priya Sharma' },
  { id: '5', name: 'Vikram Singh' },
  { id: '6', name: 'Aisha Khan' },
  { id: '7', name: 'Deepak Verma' },
];

const TransactionSchema = z.object({
  customerId: z.string().min(1, "Please select a customer."),
  amount: z.coerce.number().positive("Amount must be positive."), // Use coerce for string input
  date: z.date({ required_error: "Please select a date." }),
  notes: z.string().optional(),
  attachment: z.any().optional(), // For file upload
  type: z.enum(['given', 'received']), // Transaction type
});

export default function AddTransactionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  // Determine transaction type from URL query params or default
  const initialType = searchParams.get('type') === 'received' ? 'received' : 'given';
  const customerIdParam = searchParams.get('customerId');

  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      customerId: customerIdParam || "",
      amount: undefined, // Use undefined for number input placeholder
      date: new Date(),
      notes: "",
      attachment: null,
      type: initialType,
    },
  });

  async function onSubmit(values: z.infer<typeof TransactionSchema>) {
    setIsLoading(true);
    console.log("Submitting Transaction:", values);

    // --- Mock Transaction Save ---
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    toast({
      title: "Transaction Saved",
      description: `Transaction of ${values.amount} for customer ID ${values.customerId} recorded successfully.`,
    });
    // --- End Mock ---

    setIsLoading(false);
    // Redirect back to customer detail page if customerId exists, otherwise to transactions list
    if(values.customerId && MOCK_CUSTOMERS.find(c => c.id === values.customerId)) {
       router.push(`/customers/${values.customerId}`);
    } else {
       router.push('/transactions');
    }
  }

  const transactionType = form.watch('type'); // Watch the type field

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
         <div className="flex items-center gap-2">
            {transactionType === 'given' ?
               <ArrowUpRight className="h-6 w-6 text-red-600" /> :
               <ArrowDownLeft className="h-6 w-6 text-green-600" />}
             <CardTitle className={`text-xl ${transactionType === 'given' ? 'text-red-700' : 'text-green-700'}`}>
               {transactionType === 'given' ? 'Add Credit Given (Udhaar)' : 'Add Payment Received'}
             </CardTitle>
         </div>
        <CardDescription>
          Record a new transaction for a customer.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             {/* Transaction Type Toggle Buttons */}
              <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                  <FormItem className="space-y-3">
                      <FormLabel>Transaction Type</FormLabel>
                      <FormControl>
                          <div className="grid grid-cols-2 gap-2">
                              <Button
                                  type="button"
                                  variant={field.value === 'given' ? 'destructive' : 'outline'}
                                  onClick={() => field.onChange('given')}
                                  className="flex items-center gap-2"
                              >
                                  <ArrowUpRight className="h-4 w-4"/> Credit Given
                              </Button>
                              <Button
                                  type="button"
                                  variant={field.value === 'received' ? 'default' : 'outline'}
                                  onClick={() => field.onChange('received')}
                                   className={`flex items-center gap-2 ${field.value === 'received' ? 'bg-green-600 hover:bg-green-700 text-white': ''}`}
                              >
                                  <ArrowDownLeft className="h-4 w-4"/> Payment Received
                              </Button>
                          </div>
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />

            {/* Customer Selection */}
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Users className="h-4 w-4"/> Customer</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_CUSTOMERS.map(customer => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                      {/* Add option to add new customer */}
                       <SelectItem value="add_new" disabled>+ Add New Customer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><IndianRupee className="h-4 w-4"/> Amount</FormLabel>
                  <FormControl>
                     <div className="relative">
                       <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                       <Input type="number" placeholder="0.00" step="0.01" className="pl-8" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)}/>
                     </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
             <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="flex items-center gap-1"><CalendarIcon className="h-4 w-4"/> Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP") // PPP format e.g., Jul 26, 2024
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />


            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes / Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter any details about the transaction..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Attachment - Basic File Input */}
            <FormField
              control={form.control}
              name="attachment"
              render={({ field }) => (
                 <FormItem>
                   <FormLabel className="flex items-center gap-1"><Upload className="h-4 w-4"/> Attach Bill/Photo (Optional)</FormLabel>
                   <FormControl>
                       {/* Basic file input - enhance later if needed */}
                      <Input type="file" accept="image/*,application/pdf"
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
              Save Transaction
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
