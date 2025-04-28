
import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider, // Import SidebarProvider
  SidebarTrigger,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Home,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Building,
  ChevronDown,
  PlusCircle,
  FileText,
  BarChart3,
  CreditCard
} from 'lucide-react';
import { AppHeader } from '@/components/layout/app-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Mock user and business data - replace with actual data fetching
  const user = { name: 'Shopkeeper Name', initials: 'SN' };
  const businesses = [
    { id: '1', name: 'My Kirana Store' },
    { id: '2', name: 'General Store' },
    { id: '3', name: 'Freelance Services' },
  ];
  const currentBusiness = businesses[0]; // Assume first business is active

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-2">
          <div className="flex items-center justify-between p-2">
             <div className="flex items-center gap-2 overflow-hidden">
               <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-primary shrink-0">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path> {/* Replace with a simple logo-like SVG */}
                </svg>
                <span className="font-semibold text-lg whitespace-nowrap truncate">Vyapar Sahayak</span>
             </div>

            <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>

        <SidebarContent className="flex-1 p-2">
           {/* Business Selector - Conditional render based on sidebar state */}
           <SidebarGroup>
             <SidebarGroupLabel>Business</SidebarGroupLabel>
                <SidebarMenu>
                 <SidebarMenuItem>
                    {/* In a real app, this would be a dropdown/select */}
                    <SidebarMenuButton className="justify-between group-data-[collapsible=icon]:justify-center">
                     <div className="flex items-center gap-2 truncate">
                        <Building className="size-4" />
                        <span className="truncate">{currentBusiness.name}</span>
                      </div>
                     <ChevronDown className="size-4 ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[collapsible=icon]:hidden" />
                   </SidebarMenuButton>
                   {/* Sub menu would contain other businesses and Add New */}
                   {/* <SidebarMenuSub> ... </SidebarMenuSub> */}
                 </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Add New Business">
                       <PlusCircle className="size-4" />
                       <span>Add New Business</span>
                     </SidebarMenuButton>
                 </SidebarMenuItem>
               </SidebarMenu>
           </SidebarGroup>

           <SidebarSeparator />

           <SidebarGroup>
             <SidebarGroupLabel>Menu</SidebarGroupLabel>
             <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard" tooltip="Dashboard">
                    <Home className="size-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton href="/customers" tooltip="Customers">
                    <Users className="size-4" />
                    <span>Customers</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/transactions" tooltip="Transactions">
                    <BookOpen className="size-4" />
                    <span>Ledger</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                   <SidebarMenuButton href="/reports" tooltip="Reports">
                    <BarChart3 className="size-4" />
                     <span>Reports</span>
                   </SidebarMenuButton>
                 </SidebarMenuItem>
                 <SidebarMenuItem>
                   <SidebarMenuButton href="/payments" tooltip="Payments">
                     <CreditCard className="size-4" />
                     <span>Online Payments</span>
                   </SidebarMenuButton>
                 </SidebarMenuItem>
              </SidebarMenu>
           </SidebarGroup>

        </SidebarContent>

        <SidebarFooter className="p-4 mt-auto">
          <SidebarSeparator />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/settings" tooltip="Settings">
                <Settings className="size-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              {/* In real app, this button would trigger logout logic */}
              <SidebarMenuButton href="/login" tooltip="Logout" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="size-4" />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
           <div className="flex items-center gap-2 mt-4 p-2 rounded-md hover:bg-sidebar-accent group-data-[collapsible=icon]:justify-center">
             <Avatar className="size-7">
               <AvatarImage src={`https://avatar.vercel.sh/${user.name.replace(' ','')}.png`} alt={user.name} />
               <AvatarFallback>{user.initials}</AvatarFallback>
             </Avatar>
             <span className="text-sm font-medium truncate group-data-[collapsible=icon]:hidden">{user.name}</span>
           </div>
        </SidebarFooter>
      </Sidebar>

      <div className="flex flex-col flex-1">
        <AppHeader currentBusinessName={currentBusiness.name} />
        <SidebarInset className="p-4 md:p-6 overflow-auto">
          {children}
        </SidebarInset>
      </div>
    </div>
  );
}
