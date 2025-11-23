import { createFileRoute } from '@tanstack/react-router';

import { NotFound } from '@/view/pages/not-found';

export const Route = createFileRoute('/$')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFound />;
}
