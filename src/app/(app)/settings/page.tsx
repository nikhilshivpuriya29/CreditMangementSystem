
"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { User, Bell, Palette, Lock, LogOut, Trash2, Building, Sun, Moon, Laptop } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function SettingsPage() {
    const { setTheme, theme } = useTheme();
    const { toast } = useToast();
    const router = useRouter();

    // Mock user data - replace with actual data
    const user = { name: 'Shopkeeper Name' };
    const businesses = [
        { id: '1', name: 'My Kirana Store' },
        { id: '2', name: 'General Store' },
    ];
    const currentBusiness = businesses[0]; // Example

    const handleDeleteAccount = async () => {
        console.log("Deleting account...");
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast({
            title: "Account Deleted",
            description: "Your account and all associated data have been permanently deleted.",
            variant: "destructive",
        });
        // Redirect to login page after deletion
        router.push('/login');
    }

    return (
        <div className="space-y-6">
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2"><User className="h-5 w-5" /> Profile Settings</CardTitle>
                    <CardDescription>Manage your personal and business information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="userName">User Name</Label>
                        <p id="userName" className="text-sm text-muted-foreground">{user.name} (from login)</p>
                    </div>
                     <Separator />
                    <div className="flex flex-col space-y-1.5">
                        <Label>Business Profile</Label>
                        <p className="text-sm text-muted-foreground">Currently managing: <strong>{currentBusiness.name}</strong></p>
                        <Button variant="outline" size="sm" className="mt-2 w-fit" asChild>
                            <Link href="/business">
                                <Building className="mr-2 h-4 w-4"/> Manage Businesses
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Notification Preferences</CardTitle>
                    <CardDescription>Choose how you receive alerts and reminders.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     {/* Placeholder toggles */}
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
                            <span>SMS Reminders</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Receive payment reminders via SMS (charges may apply).
                            </span>
                        </Label>
                        <Switch id="sms-notifications" disabled aria-label="SMS Reminders" />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="whatsapp-notifications" className="flex flex-col space-y-1">
                            <span>WhatsApp Reminders</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Receive payment reminders via WhatsApp.
                            </span>
                        </Label>
                        <Switch id="whatsapp-notifications" disabled aria-label="WhatsApp Reminders" />
                    </div>
                    <Separator />
                     <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                            <span>Email Reports</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Receive periodic summary reports via Email.
                            </span>
                        </Label>
                        <Switch id="email-notifications" disabled aria-label="Email Reports" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button size="sm" disabled>Save Notification Preferences</Button>
                </CardFooter>
            </Card>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Palette className="h-5 w-5" /> Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1.5">
                        <Label>Theme</Label>
                        <Select onValueChange={(value) => setTheme(value)} value={theme}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">
                                    <div className="flex items-center gap-2">
                                        <Sun className="h-4 w-4"/> Light
                                    </div>
                                </SelectItem>
                                <SelectItem value="dark">
                                     <div className="flex items-center gap-2">
                                        <Moon className="h-4 w-4"/> Dark
                                     </div>
                                </SelectItem>
                                <SelectItem value="system">
                                     <div className="flex items-center gap-2">
                                        <Laptop className="h-4 w-4"/> System
                                     </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm border-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive"><Lock className="h-5 w-5" /> Account Management</CardTitle>
                    <CardDescription className="text-destructive/90">Manage your account security and data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Logout Button */}
                    <div className="flex items-center justify-between">
                         <Label className="text-foreground">Logout</Label>
                         <Button variant="outline" size="sm" onClick={() => router.push('/login')}>
                            <LogOut className="mr-2 h-4 w-4"/> Logout
                         </Button>
                    </div>
                     <Separator />
                    {/* Delete Account Button */}
                    <div className="flex items-center justify-between">
                         <Label className="text-destructive">Delete Account</Label>
                         <AlertDialog>
                             <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete My Account
                                </Button>
                             </AlertDialogTrigger>
                             <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account, all associated business profiles, customer data, and transaction history.
                                    Please be certain before proceeding.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90">
                                    Yes, Delete My Account
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                     <p className="text-xs text-muted-foreground">
                         Deleting your account is permanent and cannot be reversed.
                     </p>
                </CardContent>
            </Card>
        </div>
    );
}
