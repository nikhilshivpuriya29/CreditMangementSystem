
"use client"; // Mark as client component for state and event handling

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, User, Phone, IndianRupee } from "lucide-react";
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// Mock customer data - replace with actual data fetching and state management
const allCustomers = [
  { id: '1', name: 'Anil Kumar', phone: '9876543210', balance: 1500.00, type: 'receivable' },
  { id: '2', name: 'Sunita Devi', phone: '8765432109', balance: -500.00, type: 'payable' },
  { id: '3', name: 'Ramesh Gupta', phone: '7654321098', balance: 0.00, type: 'settled' },
  { id: '4', name: 'Priya Sharma', phone: '6543210987', balance: 3250.50, type: 'receivable' },
  { id: '5', name: 'Vikram Singh', phone: '9123456789', balance: 0.00, type: 'settled' },
  { id: '6', name: 'Aisha Khan', phone: '9988776655', balance: 800.00, type: 'receivable' },
   { id: '7', name: 'Deepak Verma', phone: '7766554433', balance: -1200.00, type: 'payable' },
   { id: '8', name: 'Meena Patel', phone: '8899001122', balance: 200.00, type: 'receivable' },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredCustomers, setFilteredCustomers] = React.useState(allCustomers);

  React.useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = allCustomers.filter(customer =>
      customer.name.toLowerCase().includes(lowerCaseSearch) ||
      customer.phone.includes(lowerCaseSearch)
    );
    setFilteredCustomers(results);
  }, [searchTerm]);

  const formatCurrency = (amount: number) => {
    const absAmount = Math.abs(amount);
    const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(absAmount);
     return amount === 0 ? 'Settled' : formatted;
  };

   const getBalanceColor = (balance: number, type: string) => {
     if (type === 'receivable' && balance > 0) return 'text-green-600';
     if (type === 'payable' && balance < 0) return 'text-red-600';
     return 'text-muted-foreground'; // Settled or zero balance
   };

   const getBalanceText = (type: string) => {
      if (type === 'receivable') return 'Receivable';
      if (type === 'payable') return 'Payable';
      return ''; // Settled
   }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex-1 flex flex-col shadow-sm">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
           <div>
            <CardTitle>Customers</CardTitle>
            <CardDescription>Manage your customer list and view balances.</CardDescription>
           </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:flex-initial">
               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
               <Input
                 type="search"
                 placeholder="Search by name or phone..."
                 className="pl-8 w-full"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
            <Button asChild size="sm" className="shrink-0">
              <Link href="/customers/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Customer
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <ScrollArea className="h-[calc(100vh-14rem)] md:h-[calc(100vh-12rem)]"> {/* Adjust height as needed */}
             {filteredCustomers.length > 0 ? (
              <ul className="divide-y divide-border">
                {filteredCustomers.map((customer) => (
                   <li key={customer.id} className="px-4 py-3 hover:bg-muted/50 transition-colors">
                      <Link href={`/customers/${customer.id}`} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                         <div className="flex items-center gap-3 flex-1 min-w-0">
                             {/* Simple initial avatar */}
                             <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xs font-medium">
                                {customer.name.substring(0, 2).toUpperCase()}
                            </div>
                             <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{customer.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                   <Phone className="h-3 w-3" /> {customer.phone}
                                </p>
                            </div>
                         </div>
                         <div className="text-sm text-right sm:text-right mt-1 sm:mt-0 shrink-0">
                            <p className={`font-semibold ${getBalanceColor(customer.balance, customer.type)}`}>
                                {formatCurrency(customer.balance)}
                           </p>
                            <p className={`text-xs ${getBalanceColor(customer.balance, customer.type)}`}>
                               {getBalanceText(customer.type)}
                           </p>
                         </div>
                      </Link>
                   </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                 <User className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                   {searchTerm ? 'No customers found matching your search.' : 'No customers added yet.'}
                </p>
                 {!searchTerm && (
                    <Button asChild size="sm" className="mt-4">
                       <Link href="/customers/add">
                         <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Customer
                       </Link>
                     </Button>
                 )}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
