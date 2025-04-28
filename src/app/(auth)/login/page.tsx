
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OTPForm } from "@/components/auth/otp-form";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';

// Indian phone number validation (basic - 10 digits)
const phoneRegex = /^[6-9]\d{9}$/;
const LoginSchema = z.object({
  phoneNumber: z.string().regex(phoneRegex, "Invalid Indian phone number."),
});

export default function LoginPage() {
  const [showOTPForm, setShowOTPForm] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
   const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);
    console.log("Requesting OTP for:", values.phoneNumber);

    // --- Mock OTP Request ---
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
    // In a real app, call your backend API to send OTP here
    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to ${values.phoneNumber}.`,
    });
    // --- End Mock ---

    setPhoneNumber(values.phoneNumber);
    setShowOTPForm(true);
    setIsLoading(false);
  }

   const handleOtpVerificationSuccess = () => {
    console.log('OTP Verified, navigating to dashboard...');
    // Simulate setting auth state/token here
    router.push('/dashboard'); // Redirect after successful OTP verification
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
             Vyapar Sahayak
          </CardTitle>
          <CardDescription>
            {showOTPForm
              ? `Enter the OTP sent to ${phoneNumber}`
              : "Login or Sign Up with your phone number"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showOTPForm ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter 10-digit mobile number" {...field} type="tel" maxLength={10} />
                      </FormControl>
                      <FormDescription>
                        We'll send an OTP to verify your number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isLoading}>
                   {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Get OTP
                </Button>
              </form>
            </Form>
          ) : (
            <OTPForm phoneNumber={phoneNumber} onVerifySuccess={handleOtpVerificationSuccess} />
          )}
           {showOTPForm && (
            <Button
              variant="link"
              size="sm"
              className="mt-4 w-full text-muted-foreground"
              onClick={() => {
                setShowOTPForm(false);
                setPhoneNumber('');
                form.reset(); // Reset the phone number form
              }}
            >
              Change phone number?
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
