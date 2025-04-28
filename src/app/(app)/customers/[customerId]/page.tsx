
"use client"; // Mark as client component for state and interactions

import * as React from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, IndianRupee, Phone, Mail, MapPin, Edit, Trash2, MessageSquare, FileText, Calendar } from "lucide-react";
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Added Avatar
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

// Mock data - replace with actual data fetching based on customerId
const MOCK_CUSTOMERS = {
  '1': { id: '1', name: 'Anil Kumar', phone: '9876543210', email: 'anil.k@example.com', address: '123 Main St, Delhi', balance: 1500.00, type: 'receivable' },
  '2': { id: '2', name: 'Sunita Devi', phone: '8765432109', email: '', address: '456 Market Rd, Mumbai', balance: -500.00, type: 'payable' },
  '3': { id: '3', name: 'Ramesh Gupta', phone: '7654321098', email: 'ramesh@shop.com', address: '', balance: 0.00, type: 'settled' },
   '4': { id: '4', name: 'Priya Sharma', phone: '6543210987', balance: 3250.50, type: 'receivable' },
   '6': { id: '6', name: 'Aisha Khan', phone: '9988776655', balance: 800.00, type: 'receivable' },
   '7': { id: '7', name: 'Deepak Verma', phone: '7766554433', balance: -1200.00, type: 'payable' },
};

const MOCK_TRANSACTIONS = {
  '1': [
    { id: 't1', type: 'given', amount: 2000.00, date: '2024-07-15', notes: 'Groceries', balanceAfter: 2000.00 },
    { id: 't2', type: 'received', amount: 500.00, date: '2024-07-20', notes: 'Partial payment', balanceAfter: 1500.00 },
  ],
  '2': [
    { id: 't3', type: 'given', amount: 1000.00, date: '2024-07-10', notes: 'Advance', balanceAfter: 1000.00 },
    { id: 't4', type: 'received', amount: 1500.00, date: '2024-07-18', notes: 'Full payment received', balanceAfter: -500.00 }, // Example where payment exceeds credit
  ],
   '4': [
     { id: 't5', type: 'given', amount: 5000.00, date: '2024-07-01', notes: 'Initial Credit', balanceAfter: 5000.00 },
     { id: 't6', type: 'received', amount: 1749.50, date: '2024-07-22', notes: 'Payment', balanceAfter: 3250.50 },
   ],
  // Add more transactions for other customers if needed
};

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const customerId = params.customerId as string;

  // Fetch customer data and transactions based on customerId
  // In a real app, use React state and fetch data in useEffect
  const customer = MOCK_CUSTOMERS[customerId as keyof typeof MOCK_CUSTOMERS];
  const transactions = MOCK_TRANSACTIONS[customerId as keyof typeof MOCK_TRANSACTIONS] || [];

  if (!customer) {
    notFound(); // Show 404 if customer not found
  }

   const formatCurrency = (amount: number) => {
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(absAmount);
    return formatted;
  };

   const getBalanceColor = (balance: number) => {
     if (balance > 0) return 'text-green-600';
     if (balance < 0) return 'text-red-600';
     return 'text-muted-foreground'; // Settled or zero balance
   };

   const getBalanceText = (balance: number) => {
     if (balance > 0) return 'Receivable';
     if (balance < 0) return 'Payable';
     return 'Settled';
   }

   const handleDeleteCustomer = async () => {
      console.log("Deleting customer:", customerId);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
         title: "Customer Deleted",
         description: `${customer.name} has been removed.`,
      });
      router.push('/customers'); // Redirect back to customer list
   }

  return (
    <div className="flex flex-col gap-6">
      {/* Customer Header Card */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
           <div className="flex items-center gap-4">
             <Avatar className="h-12 w-12 text-lg">
                {/* Add AvatarImage if available */}
                <AvatarFallback>{customer.name.substring(0, 2).toUpperCase()}</AvatarFallback>
             </Avatar>
            <div>
               <CardTitle className="text-xl">{customer.name}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {customer.phone}</span>
                   {customer.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {customer.email}</span>}
                   {customer.address && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {customer.address}</span>}
                </div>
            </div>
           </div>
           <div className="flex gap-2 mt-2 sm:mt-0 shrink-0">
               <Button variant="outline" size="sm" asChild>
                   <Link href={`/customers/${customerId}/edit`}>
                       <Edit className="mr-2 h-4 w-4" /> Edit
                   </Link>
               </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="destructive" size="sm">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                       </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the customer
                        and all their transaction history.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteCustomer} className="bg-destructive hover:bg-destructive/90">
                           Delete Customer
                         </AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
           </div>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
           <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Current Balance</span>
               <span className={`text-2xl font-bold ${getBalanceColor(customer.balance)}`}>
                  {formatCurrency(customer.balance)}
               </span>
               <span className={`text-xs font-medium ${getBalanceColor(customer.balance)}`}>
                   {getBalanceText(customer.balance)}
               </span>
           </div>
           <div className="flex gap-2 w-full sm:w-auto">
              <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">
                  <MessageSquare className="mr-2 h-4 w-4" /> Send Reminder
              </Button>
             {/* <Button size="sm" variant="outline" className="flex-1 sm:flex-initial">
                 <FileText className="mr-2 h-4 w-4" /> View Statement
              </Button> */}
          </div>
        </CardContent>
         <CardFooter className="flex gap-2 pt-4 border-t">
             <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700" asChild>
                 <Link href={`/transactions/add?customerId=${customerId}&type=given`}>
                    <ArrowUpRight className="mr-2 h-4 w-4" /> Credit Given (Udhaar)
                 </Link>
             </Button>
             <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" asChild>
                 <Link href={`/transactions/add?customerId=${customerId}&type=received`}>
                    <ArrowDownLeft className="mr-2 h-4 w-4" /> Payment Received
                </Link>
             </Button>
         </CardFooter>
      </Card>

      {/* Transaction History Card */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Detailed log of credits and payments for {customer.name}.</CardDescription>
           {/* Add Filters here later if needed (Date Range, Type) */}
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[300px] md:h-[400px]"> {/* Adjust height */}
            {transactions.length > 0 ? (
              <ul className="divide-y divide-border">
                {transactions.map((tx) => (
                  <li key={tx.id} className="px-4 py-3 flex flex-col sm:flex-row justify-between gap-2">
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${tx.type === 'received' ? 'text-green-700' : 'text-red-700'}`}>
                        {tx.type === 'received' ? 'Payment Received' : 'Credit Given'}
                         <span className="ml-2 font-semibold"> ({formatCurrency(tx.amount)})</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Calendar className="h-3 w-3"/> {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric'})}
                      </p>
                      {tx.notes && <p className="text-xs text-foreground mt-1">{tx.notes}</p>}
                    </div>
                     <div className="text-xs text-muted-foreground text-left sm:text-right mt-1 sm:mt-0">
                        <span>Balance:</span>
                        <span className={`ml-1 font-medium ${getBalanceColor(tx.balanceAfter)}`}>
                           {formatCurrency(tx.balanceAfter)}
                         </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center justify-center h-full p-10">
                <p className="text-muted-foreground">No transactions recorded for this customer yet.</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
