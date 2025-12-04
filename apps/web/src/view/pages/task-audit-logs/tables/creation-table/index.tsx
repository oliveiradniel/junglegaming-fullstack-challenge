import { useListTaskCreationAuditLogQuery } from '@/app/hooks/queries/use-list-task-creation-audit-log-query';
import { useColumns } from './use-columns';

import { DataTable } from '@/view/components/data-table';
import { DataTableColumnsVisibilityDropdown } from '@/view/components/data-table/data-table-columns-visibility-dropdown';
import { DataTableContent } from '@/view/components/data-table/data-table-content';
import { DataTableFallback } from '@/view/components/data-table/data-table-fallback';
import { EmptyLog } from './empty-log';

export function TaskCreationAuditLogTable() {
  const { taskCreationAuditLogsList, isTaskCreationAuditLogsLoading } =
    useListTaskCreationAuditLogQuery();

  const columns = useColumns();

  return (
    <div className="h-full">
      {!isTaskCreationAuditLogsLoading &&
        taskCreationAuditLogsList.length === 0 && <EmptyLog />}

      {isTaskCreationAuditLogsLoading && (
        <DataTableFallback
          fallbackColumns={[
            'Autor',
            'Título',
            'Valores na criação',
            'Data/hora da criação',
          ]}
        />
      )}

      <DataTable data={taskCreationAuditLogsList} columns={columns}>
        {taskCreationAuditLogsList.length > 0 && (
          <div className="mb-8 flex justify-end">
            <DataTableColumnsVisibilityDropdown />
          </div>
        )}

        {!isTaskCreationAuditLogsLoading &&
          taskCreationAuditLogsList.length > 0 && <DataTableContent />}
      </DataTable>
    </div>
  );
}
