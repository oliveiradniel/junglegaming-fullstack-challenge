import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';

import { AppSidebar } from './app-sidebar';

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
