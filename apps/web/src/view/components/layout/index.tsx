import { Outlet } from '@tanstack/react-router';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';

import { AppSidebar } from './app-sidebar';

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full overflow-x-hidden">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
