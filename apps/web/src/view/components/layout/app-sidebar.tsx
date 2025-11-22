import { Link, useLocation } from '@tanstack/react-router';
import { useTasksController } from '@/view/pages/tasks/use-tasks-controller';
import { useTasks } from '@/app/hooks/use-tasks';

import { useAuth } from '@/app/hooks/use-auth';

import { BookOpenText, Calendar, LogOut, Plus, User } from 'lucide-react';
import jungleGamingLogo from '@/assets/images/logo.svg';

import { formatDateToBR } from '@/app/utils/format-date-br';
import { cn } from '@/lib/utils';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';

const items = [
  {
    title: 'Tarefas',
    url: '/tasks',
    icon: BookOpenText,
  },
];

export function AppSidebar() {
  const location = useLocation();

  const { user, handleLogout, isLogoutLoading } = useAuth();
  const { handleOpenNewTaskSheet } = useTasks();

  const { totalTasksCount, isTasksLoading } = useTasksController();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <img src={jungleGamingLogo} alt="" className="h-10 w-10" />
          <span className="text-card-foreground text-lg font-medium">
            JungleOps
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-2">
          {items.map((item) => {
            const isActive = location.pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="transition-all"
                >
                  <Link
                    to={item.url}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-md px-3 py-6 transition-all',
                      isActive && 'cursor-default',
                    )}
                  >
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                    {item.title === 'Tarefas' && isTasksLoading
                      ? '(...)'
                      : `(${totalTasksCount})`}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <Button
          disabled={isLogoutLoading}
          onClick={handleOpenNewTaskSheet}
          className="justify-start py-6 transition-all"
        >
          <Plus className="size-4!" /> Adicionar tarefa
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="lg"
              variant="outline"
              disabled={isLogoutLoading}
              className="justify-start gap-4 py-6"
            >
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
                <span className="font-normal">
                  {user?.username[0].toUpperCase()}
                </span>
              </div>

              <span className="font-normal">{user?.username}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="ml-4">
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center gap-1">
                <User className="size-4" />
                <span className="text-sm">{user?.email}</span>
              </div>

              <div className="text-muted-foreground flex items-center gap-1">
                <Calendar className="size-4" />
                <span className="flex items-center gap-2 text-sm">
                  Usuário desde: {formatDateToBR(user?.createdAt!)}
                </span>
              </div>

              <Separator />

              <Button
                variant="ghost"
                isLoading={isLogoutLoading}
                disabled={isLogoutLoading}
                onClick={() => handleLogout()}
                className="text-destructive! w-full justify-start"
              >
                <LogOut /> Sair
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </SidebarFooter>
    </Sidebar>
  );
}
