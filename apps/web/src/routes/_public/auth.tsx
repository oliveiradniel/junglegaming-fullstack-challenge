import { createFileRoute } from '@tanstack/react-router';

import { AuthForm } from '@/view/pages/auth-form';

export const Route = createFileRoute('/_public/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return <AuthForm />;
}
