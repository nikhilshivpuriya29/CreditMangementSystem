
"use client"; // Add use client directive as FormattedDate is a client component

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, PlusCircle, Users, BookOpen, FileText, BarChart3, IndianRupee } from "lucide-react";
import Link from 'next/link';
import { FormattedDate } from "@/components/formatted-date"; // Import the safe date formatting component

// Mock data - replace with actual data fetching
const dashboardData = {
  totalReceivable: 15230.50,
  totalPayable: 4850.00,
  customersDue: 12,
  suppliersDue: 3,
  recentTransactions: [
    { id: 1, type: 'received', customer: 'Anil Kumar', amount: 500, date: '2024-07-26' }, // Use ISO format dates
    { id: 2, type: 'given', customer: 'Sunita Devi', amount: 1200, date: '2024-07-25' },
    { id: 3, type: 'received', customer: 'Ramesh Gupta', amount: 250, date: '2024-07-24' },
  ]
};

export default function DashboardPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 }).format(amount);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Total Receivable</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{formatCurrency(dashboardData.totalReceivable)}</div>
            <p className="text-xs text-muted-foreground">
              From {dashboardData.customersDue} Customers
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-600">Total Payable</CardTitle>
             <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{formatCurrency(dashboardData.totalPayable)}</div>
            <p className="text-xs text-muted-foreground">
              To {dashboardData.suppliersDue} Suppliers/Expenses
            </p>
          </CardContent>
        </Card>
         <Card className="shadow-sm hover:shadow-md transition-shadow col-span-1 md:col-span-2 lg:col-span-1">
             <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col gap-2">
                 <Button asChild variant="outline" size="sm" className="justify-start">
                     <Link href="/customers/add">
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Customer
                     </Link>
                 </Button>
                 <Button asChild variant="outline" size="sm" className="justify-start">
                     <Link href="/transactions/add?type=given">
                         <ArrowUpRight className="mr-2 h-4 w-4 text-red-500" /> Add Credit Given
                     </Link>
                 </Button>
                <Button asChild variant="outline" size="sm" className="justify-start">
                     <Link href="/transactions/add?type=received">
                         <ArrowDownLeft className="mr-2 h-4 w-4 text-green-500" /> Add Payment Received
                     </Link>
                 </Button>
             </CardContent>
         </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow col-span-1 md:col-span-2 lg:col-span-1">
             <CardHeader className="pb-2">
                 <CardTitle className="text-sm font-medium">Explore</CardTitle>
             </CardHeader>
             <CardContent className="flex flex-col gap-2">
                 <Button asChild variant="ghost" size="sm" className="justify-start text-muted-foreground hover:text-primary">
                     <Link href="/customers">
                        <Users className="mr-2 h-4 w-4" /> View Customers
                     </Link>
                 </Button>
                  <Button asChild variant="ghost" size="sm" className="justify-start text-muted-foreground hover:text-primary">
                     <Link href="/transactions">
                         <BookOpen className="mr-2 h-4 w-4" /> View Ledger
                     </Link>
                 </Button>
                 <Button asChild variant="ghost" size="sm" className="justify-start text-muted-foreground hover:text-primary">
                     <Link href="/reports">
                         <BarChart3 className="mr-2 h-4 w-4" /> View Reports
                     </Link>
                 </Button>
             </CardContent>
         </Card>
      </div>

      {/* Recent Transactions (Placeholder) */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Last few entries in your ledger.</CardDescription>
        </CardHeader>
        <CardContent>
           {dashboardData.recentTransactions.length > 0 ? (
            <ul className="divide-y divide-border">
                {dashboardData.recentTransactions.map((tx) => (
                <li key={tx.id} className="py-3 flex justify-between items-center">
                    <div>
                        <p className="text-sm font-medium">{tx.customer}</p>
                         <p className={`text-xs ${tx.type === 'received' ? 'text-green-600' : 'text-red-600'}`}>
                            {tx.type === 'received' ? 'Payment Received' : 'Credit Given'}
                        </p>
                    </div>
                     <div className="text-right">
                       <p className={`text-sm font-semibold ${tx.type === 'received' ? 'text-green-700' : 'text-red-700'}`}>
                            {tx.type === 'received' ? '+' : '-'} {formatCurrency(tx.amount)}
                        </p>
                        {/* Use FormattedDate component */}
                        <p className="text-xs text-muted-foreground">
                           <FormattedDate dateString={tx.date} formatStyle="PP" />
                        </p>
                    </div>
                </li>
                ))}
            </ul>
             ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No recent transactions found.</p>
             )}
          <Button variant="link" size="sm" className="mt-4 w-full" asChild>
             <Link href="/transactions">View All Transactions</Link>
          </Button>
        </CardContent>
      </Card>

       {/* Placeholder for other potential dashboard sections */}
       {/* <Card>
         <CardHeader><CardTitle>Notifications/Reminders</CardTitle></CardHeader>
         <CardContent><p className="text-muted-foreground">Upcoming payment reminders or notifications will appear here.</p></CardContent>
       </Card> */}
    </div>
  );
}
