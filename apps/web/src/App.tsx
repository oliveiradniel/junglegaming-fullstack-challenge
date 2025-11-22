import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

import { useAuth } from './app/hooks/use-auth';

import { Toaster } from 'sonner';

import { AuthProvider } from './app/providers/auth-provider';
import { TasksProvider } from './app/providers/tasks-provider';

// To activate typing, uncomment these lines.

// const router = createRouter({
//   routeTree: routeTree,
//   context: {
//     auth: undefined!,
//   },
// });

// declare module '@tanstack/react-router' {
//   interface Register {
//     router: typeof router;
//   }
// }

function InnerApp() {
  const auth = useAuth();

  const router = createRouter({
    routeTree: routeTree,
    context: {
      auth,
    },
  });

  return <RouterProvider router={router} context={{ auth }} />;
}

export function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <InnerApp />

        <Toaster duration={6000} position="top-center" />
      </TasksProvider>
    </AuthProvider>
  );
}
