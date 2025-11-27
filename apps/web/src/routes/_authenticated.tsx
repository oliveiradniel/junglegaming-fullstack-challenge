import { useTasks } from '@/app/hooks/use-tasks';
import { createFileRoute, redirect } from '@tanstack/react-router';

import { DeleteTaskDialog } from '@/view/components/delete-task-dialog';
import { NewTaskSheet } from '@/view/components/new-task-sheet';

import { Layout } from '@/view/components/layout';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  component: () => <RouteComponent />,
});

function RouteComponent() {
  const { taskToDelete, pageForDelete } = useTasks();
  return (
    <>
      <DeleteTaskDialog
        task={{
          id: taskToDelete?.id!,
          title: taskToDelete?.title!,
          status: taskToDelete?.status!,
          createdAt: taskToDelete?.createdAt!,
        }}
        page={pageForDelete!}
      />

      <NewTaskSheet />

      <Layout />
    </>
  );
}
