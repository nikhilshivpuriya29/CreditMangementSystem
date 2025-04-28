
"use client";

import * as React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell, Search, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppHeaderProps {
  currentBusinessName: string;
}

export function AppHeader({ currentBusinessName }: AppHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:py-4">
       <SidebarTrigger className="sm:hidden" />

      {/* Mobile view: Show Business Name */}
      {isMobile && (
         <div className="flex items-center gap-2 flex-1">
             <Building className="h-5 w-5 text-muted-foreground" />
             <span className="font-semibold text-sm truncate">{currentBusinessName}</span>
         </div>
       )}


       {/* Desktop view: Search bar */}
      {!isMobile && (
         <div className="relative ml-auto flex-1 md:grow-0">
            {/* Search bar can be added later if needed */}
             {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            /> */}
         </div>
       )}

      <div className="flex items-center gap-2 ml-auto">
         {/* Notification Bell */}
         <Button variant="outline" size="icon" className="h-8 w-8">
             <Bell className="h-4 w-4" />
             <span className="sr-only">Toggle notifications</span>
         </Button>
         {/* User menu/avatar can be added here if needed, currently in sidebar footer */}
      </div>
    </header>
  );
}
