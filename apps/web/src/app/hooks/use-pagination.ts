import { useRouter, useSearch } from '@tanstack/react-router';

interface UsePaginationProps {
  from: string;
  to: string;
}

export function usePagination({ from, to }: UsePaginationProps) {
  const search = useSearch({ from });
  const router = useRouter();

  const page = Number(search.page) || 1;
  const size = Number(search.size) || 10;

  function goToPage(page: number) {
    router.navigate({
      to,
      search: { ...search, page },
    });
  }

  function handlePreviousTasksPage() {
    router.navigate({
      to,
      search: { page: page - 1 },
    });
  }

  function handleNextTasksPage() {
    router.navigate({
      to,
      search: {
        page: page + 1,
      },
    });
  }

  return { page, size, goToPage, handlePreviousTasksPage, handleNextTasksPage };
}
