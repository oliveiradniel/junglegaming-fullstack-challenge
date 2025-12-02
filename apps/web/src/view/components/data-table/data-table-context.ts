import type { Table } from '@tanstack/react-table';
import { createContext } from 'react';

interface DataTableContextValues {
  table: Table<any>;
}

export const DataTableContext = createContext({} as DataTableContextValues);
