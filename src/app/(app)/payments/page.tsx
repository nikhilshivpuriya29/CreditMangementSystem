
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Link as LinkIcon } from "lucide-react"; // Use LinkIcon to avoid conflict with next/link

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5"/> Online Payments</CardTitle>
          <CardDescription>Collect payments online from your customers.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-md p-6 text-center">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium text-foreground">Online Payment Collection Coming Soon!</p>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Soon, you'll be able to connect your payment gateway (like Razorpay, PayU, etc.)
              to generate payment links and accept online payments directly through Vyapar Sahayak.
            </p>
             <Button disabled className="mt-6">
                 <LinkIcon className="mr-2 h-4 w-4" /> Connect Payment Gateway (Coming Soon)
             </Button>
          </div>

          {/* Placeholder for generated links or settings */}
           {/*
           <Separator />
           <div>
             <h3 className="text-md font-medium mb-2">Payment Gateway Settings</h3>
             <p className="text-sm text-muted-foreground">Configure your payment provider details here.</p>
           </div>
           <div>
             <h3 className="text-md font-medium mb-2">Generated Payment Links</h3>
             <p className="text-sm text-muted-foreground">View and manage your active payment links.</p>
           </div>
           */}
        </CardContent>
      </Card>
    </div>
  );
}
