
"use client";

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownLeft, PlusCircle, Search, Calendar, IndianRupee, Filter } from "lucide-react";
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" // Import Select components
import { FormattedDate } from '@/components/formatted-date'; // Import the safe date formatting component

// Mock transaction data - replace with actual data fetching and state management
const allTransactions = [
  { id: 't1', type: 'given', customerId: '1', customerName: 'Anil Kumar', amount: 2000.00, date: '2024-07-20', notes: 'Groceries' },
  { id: 't2', type: 'received', customerId: '1', customerName: 'Anil Kumar', amount: 500.00, date: '2024-07-22', notes: 'Partial payment' },
  { id: 't3', type: 'given', customerId: '2', customerName: 'Sunita Devi', amount: 1000.00, date: '2024-07-19', notes: 'Advance' },
  { id: 't4', type: 'received', customerId: '2', customerName: 'Sunita Devi', amount: 1500.00, date: '2024-07-21', notes: 'Full payment received' },
  { id: 't5', type: 'given', customerId: '4', customerName: 'Priya Sharma', amount: 5000.00, date: '2024-07-18', notes: 'Initial Credit' },
  { id: 't6', type: 'received', customerId: '4', customerName: 'Priya Sharma', amount: 1749.50, date: '2024-07-23', notes: 'Payment' },
   { id: 't7', type: 'given', customerId: '7', customerName: 'Deepak Verma', amount: 1200.00, date: '2024-07-24', notes: '' },
   { id: 't8', type: 'received', customerId: '6', customerName: 'Aisha Khan', amount: 800.00, date: '2024-07-25', notes: 'Paid for items' },
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending


type TransactionType = 'all' | 'given' | 'received';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState<TransactionType>('all');
   // Add state for date range filter later
   // const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const filteredTransactions = React.useMemo(() => {
      return allTransactions.filter(tx => {
          const lowerCaseSearch = searchTerm.toLowerCase();
          const matchesSearch = tx.customerName.toLowerCase().includes(lowerCaseSearch) ||
                                tx.notes?.toLowerCase().includes(lowerCaseSearch) ||
                                tx.amount.toString().includes(searchTerm); // Allow searching by amount

          const matchesType = filterType === 'all' || tx.type === filterType;

          // Add date range filter logic here when implemented
          // const matchesDate = !dateRange || (new Date(tx.date) >= dateRange.from && new Date(tx.date) <= dateRange.to);

          return matchesSearch && matchesType // && matchesDate;
      });
  }, [searchTerm, filterType]); // Add dateRange to dependency array later

   const formatCurrency = (amount: number) => {
       return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);
   };

   // Removed formatDate as we now use FormattedDate component

   const handleTabChange = (value: string) => {
       setFilterType(value as TransactionType);
   }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 flex flex-col shadow-sm">
        <CardHeader>
           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
               <div>
                 <CardTitle>Transaction Ledger</CardTitle>
                 <CardDescription>View all credit and payment transactions.</CardDescription>
               </div>
                <div className="flex gap-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700" asChild>
                         <Link href={`/transactions/add?type=given`}>
                            <ArrowUpRight className="mr-2 h-4 w-4" /> Add Credit
                         </Link>
                     </Button>
                     <Button size="sm" className="bg-green-600 hover:bg-green-700" asChild>
                         <Link href={`/transactions/add?type=received`}>
                            <ArrowDownLeft className="mr-2 h-4 w-4" /> Add Payment
                        </Link>
                     </Button>
                 </div>
           </div>
           {/* Filters Row */}
           <div className="mt-4 flex flex-col md:flex-row gap-2">
                <div className="relative flex-1">
                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                   <Input
                     type="search"
                     placeholder="Search by customer, notes, amount..."
                     className="pl-8 w-full"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                   />
                 </div>
                  {/* Date Range Picker - Placeholder */}
                  {/* <Button variant="outline" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                       <Calendar className="h-4 w-4" />
                       <span>Filter by Date</span>
                   </Button> */}
                 {/* Filter Button for more options - Placeholder */}
                  {/* <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">More Filters</span>
                  </Button> */}
           </div>
        </CardHeader>
         <Tabs value={filterType} onValueChange={handleTabChange} className="w-full">
             <TabsList className="grid w-full grid-cols-3 mb-0 px-4 border-b rounded-none">
                 <TabsTrigger value="all">All Transactions</TabsTrigger>
                 <TabsTrigger value="given">Credit Given</TabsTrigger>
                 <TabsTrigger value="received">Payment Received</TabsTrigger>
             </TabsList>

             <TabsContent value={filterType} className="m-0 p-0 flex-1">
                 <ScrollArea className="h-[calc(100vh-18rem)] md:h-[calc(100vh-16rem)]"> {/* Adjust height */}
                     {filteredTransactions.length > 0 ? (
                      <ul className="divide-y divide-border">
                        {filteredTransactions.map((tx) => (
                           <li key={tx.id} className="px-4 py-3 hover:bg-muted/50 transition-colors">
                              <Link href={`/customers/${tx.customerId}`} className="flex flex-col sm:flex-row justify-between gap-2">
                                 <div className="flex-1 min-w-0">
                                     <p className={`text-sm font-medium ${tx.type === 'received' ? 'text-green-700' : 'text-red-700'}`}>
                                        {tx.type === 'received' ? 'Payment Received' : 'Credit Given'}
                                      </p>
                                     <p className="text-sm font-semibold mt-0.5">{tx.customerName}</p>
                                     {tx.notes && <p className="text-xs text-muted-foreground mt-1">{tx.notes}</p>}
                                 </div>
                                 <div className="text-sm text-left sm:text-right mt-1 sm:mt-0 shrink-0">
                                     <p className={`font-semibold ${tx.type === 'received' ? 'text-green-700' : 'text-red-700'}`}>
                                        {formatCurrency(tx.amount)}
                                    </p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 justify-start sm:justify-end mt-0.5">
                                         <Calendar className="h-3 w-3"/>
                                         {/* Replace direct formatting with the client component */}
                                         <FormattedDate dateString={tx.date} formatStyle="PP" /> {/* Using PP for shorter date format */}
                                     </p>
                                 </div>
                              </Link>
                           </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="flex items-center justify-center h-full p-10">
                        <p className="text-muted-foreground">
                           {searchTerm || filterType !== 'all' ? 'No transactions match your filters.' : 'No transactions recorded yet.'}
                        </p>
                      </div>
                    )}
                  </ScrollArea>
             </TabsContent>
         </Tabs>
      </Card>
    </div>
  );
}
