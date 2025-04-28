
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
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';


const OTPSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits."),
});

type OTPFormProps = {
  phoneNumber: string;
  onVerifySuccess: () => void; // Callback for successful verification
};

export function OTPForm({ phoneNumber, onVerifySuccess }: OTPFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [resendTimer, setResendTimer] = React.useState(30);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const form = useForm<z.infer<typeof OTPSchema>>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: "",
    },
  });

  const startResendTimer = () => {
    setResendTimer(30);
    intervalRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  React.useEffect(() => {
    startResendTimer(); // Start timer on mount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Clear interval on unmount
      }
    };
  }, []);

  async function onSubmit(values: z.infer<typeof OTPSchema>) {
    setIsLoading(true);
    console.log("Verifying OTP:", values.otp, "for number:", phoneNumber);

    // --- Mock OTP Verification ---
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

    if (values.otp === "123456") { // Simulate successful verification
      toast({
        title: "Success",
        description: "Phone number verified successfully.",
      });
       onVerifySuccess(); // Call the success callback
       // No redirection here, handled by the parent component
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid OTP. Please try again.",
      });
      form.setError("otp", { message: "Invalid OTP." });
    }
    // --- End Mock ---

    setIsLoading(false);
  }

  async function handleResendOtp() {
      if (resendTimer > 0) return; // Don't allow resend if timer is active

      console.log("Resending OTP to:", phoneNumber);
       // --- Mock Resend OTP ---
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
       toast({
         title: "OTP Resent",
         description: "A new OTP has been sent to your phone number.",
       });
       startResendTimer(); // Restart the timer
       // --- End Mock ---
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter OTP</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter 6-digit OTP"
                  type="number" // Use number type for OTP
                  maxLength={6} // Ensure max length
                  {...field}
                  onChange={(e) => { // Restrict input length
                     if (e.target.value.length <= 6) {
                        field.onChange(e);
                     }
                  }}
                />
              </FormControl>
              <FormDescription>
                Enter the 6-digit code sent to {phoneNumber}.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify OTP
        </Button>
         <Button
            type="button"
            variant="link"
            className="w-full text-sm text-muted-foreground"
            onClick={handleResendOtp}
            disabled={resendTimer > 0 || isLoading}
          >
            {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
          </Button>
      </form>
    </Form>
  );
}
