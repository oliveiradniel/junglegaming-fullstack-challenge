import { createFileRoute } from '@tanstack/react-router';

import { PaginationSearchSchema } from '@/app/schemas/pagination-search-schema';

import { Tasks } from '@/view/pages/tasks';

export const Route = createFileRoute('/_authenticated/tasks')({
  validateSearch: PaginationSearchSchema,

  component: RouteComponent,
});

function RouteComponent() {
  return <Tasks />;
}
