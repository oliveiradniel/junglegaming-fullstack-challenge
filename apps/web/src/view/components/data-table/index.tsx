import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';

import { DataTableContext } from './data-table-context';
import { DataTableFallback } from './data-table-fallback';

interface DataTableProps<TData> {
  children: React.ReactNode;
  data: TData[];
  columns: ColumnDef<TData>[];
  fallbackColumns: string[];
  isLoading: boolean;
}

export function DataTable<TData>({
  children,
  data,
  columns,
  fallbackColumns,
  isLoading,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <DataTableContext.Provider value={{ table }}>
      {isLoading && <DataTableFallback fallbackColumns={fallbackColumns} />}

      {children}
    </DataTableContext.Provider>
  );
}
