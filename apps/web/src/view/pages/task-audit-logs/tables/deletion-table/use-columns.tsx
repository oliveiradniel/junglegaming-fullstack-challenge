import { useMemo } from 'react';
import { useTaskAuditLog } from '../../context/use-task-audit-log';

import { truncateString } from '@/app/utils/truncate-string';
import {
  formatDateToBR,
  formatDateToBRWithHour,
} from '@/app/utils/format-date-br';

import { EllipsisIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/view/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/view/components/ui/popover';
import { Separator } from '@/view/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/view/components/ui/dropdown-menu';
import { AuthorCell } from '../../author-cell';
import { PriorityBadge } from '@/view/components/ui/priority-badge';
import { StatusBadge } from '@/view/components/ui/status-badge';

import type { ColumnDef } from '@tanstack/react-table';
import type { ListDeletionTaskAuditLogWithAuthorData } from '@challenge/shared';

export function useColumns(): ColumnDef<ListDeletionTaskAuditLogWithAuthorData>[] {
  const { handleOpenDeleteTaskDialog } = useTaskAuditLog();

  return useMemo<ColumnDef<ListDeletionTaskAuditLogWithAuthorData>[]>(
    () => [
      {
        id: 'author',
        accessorFn: (row) =>
          `${row.authorData.username} ${row.authorData.email}`,
        header: 'Autor',
        cell: ({ row }) => <AuthorCell row={row} />,
        meta: {
          nameInFilters: 'Autor',
        },
      },
      {
        accessorKey: 'taskTitle',
        header: 'Título',
        cell: ({ row }) => truncateString(row.original.taskTitle, 40),
        meta: {
          nameInFilters: 'Título',
        },
      },
      {
        accessorKey: 'values',
        enableColumnFilter: false,
        header: 'Valores na exclusão',
        cell: ({ row }) => {
          const values = JSON.parse(row.original.values);

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Veja os valores</Button>
              </PopoverTrigger>

              <PopoverContent>
                <div className="flex items-center justify-between text-sm">
                  <span>Título:</span>
                  <span>{truncateString(values.title, 20)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span>Descrição:</span>
                  <span>{truncateString(values.description, 20)}</span>
                </div>

                <Separator className="my-2" />

                <span className="text-sm">
                  Prazo: {formatDateToBR(values.term)}
                </span>

                <div className="mt-2 flex items-center gap-2">
                  <PriorityBadge priority={values.priority} />

                  <StatusBadge status={values.status} />
                </div>
              </PopoverContent>
            </Popover>
          );
        },
        meta: {
          nameInFilters: 'Valores',
        },
      },
      {
        accessorKey: 'changedAt',
        enableColumnFilter: false,
        header: 'Data/horário da exclusão',
        cell: ({ row }) => formatDateToBRWithHour(row.original.changedAt),
        meta: {
          nameInFilters: 'Data/horário',
        },
      },
      {
        id: 'Actions',
        enableHiding: false,
        enableColumnFilter: false,
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="sm">
                    <EllipsisIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <Button
                    variant="ghost"
                    onClick={() =>
                      handleOpenDeleteTaskDialog({
                        selectedLogId: row.original.id,
                        type: 'deletion',
                      })
                    }
                    className="flex w-full items-center gap-2 font-normal"
                  >
                    <Trash2Icon className="size-4 text-red-400" />
                    Excluir log
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [],
  );
}
