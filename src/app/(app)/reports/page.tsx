
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5"/> Reports</CardTitle>
          <CardDescription>View financial summaries and insights.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-md">
            <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Reports feature coming soon!</p>
            <p className="text-xs text-muted-foreground mt-1">Detailed financial reports will be available here.</p>
          </div>
        </CardContent>
      </Card>
       {/* Add more placeholder cards for specific report types if needed */}
        {/*
        <Card>
             <CardHeader><CardTitle>Profit & Loss</CardTitle></CardHeader>
             <CardContent><p className="text-muted-foreground">P&L report generation is under development.</p></CardContent>
        </Card>
        <Card>
             <CardHeader><CardTitle>Customer Balance Summary</CardTitle></CardHeader>
             <CardContent><p className="text-muted-foreground">Customer balance summary report is under development.</p></CardContent>
        </Card>
         */}
    </div>
  );
}
