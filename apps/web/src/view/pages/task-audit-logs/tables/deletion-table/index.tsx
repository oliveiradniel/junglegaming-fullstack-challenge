import { useListTaskDeletionAuditLogQuery } from '@/app/hooks/queries/use-list-task-deletion-audit-log-query';
import { useColumns } from './use-columns';

import { DataTable } from '@/view/components/data-table';
import { DataTableColumnsVisibilityDropdown } from '@/view/components/data-table/data-table-columns-visibility-dropdown';
import { DataTableContent } from '@/view/components/data-table/data-table-content';
import { DataTableFallback } from '@/view/components/data-table/data-table-fallback';
import { EmptyLog } from './empty-log';
import { DataTableTextFilter } from '@/view/components/data-table/data-table-text-filter';

export function TaskDeletionAuditLogTable() {
  const { taskDeletionAuditLogsList, isTaskDeletionAuditLogsLoading } =
    useListTaskDeletionAuditLogQuery();

  const columns = useColumns();

  return (
    <>
      {!isTaskDeletionAuditLogsLoading &&
        taskDeletionAuditLogsList.length === 0 && <EmptyLog />}

      {isTaskDeletionAuditLogsLoading && (
        <DataTableFallback
          fallbackColumns={[
            'Autor',
            'Título',
            'Valores na exclusão',
            'Data/hora da exclusão',
          ]}
        />
      )}

      <DataTable data={taskDeletionAuditLogsList} columns={columns}>
        {taskDeletionAuditLogsList.length > 0 && (
          <div className="flex items-center gap-4">
            <DataTableTextFilter placeholder="Procurar por autor ou título" />

            <DataTableColumnsVisibilityDropdown />
          </div>
        )}

        {!isTaskDeletionAuditLogsLoading &&
          taskDeletionAuditLogsList.length > 0 && <DataTableContent />}
      </DataTable>
    </>
  );
}
