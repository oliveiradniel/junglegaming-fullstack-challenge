import { useListTaskUpdateAuditLogQuery } from '@/app/hooks/queries/use-list-task-update-audit-log-query';
import { useColumns } from './use-columns';

import { DataTable } from '@/view/components/data-table';
import { DataTableColumnsVisibilityDropdown } from '@/view/components/data-table/data-table-columns-visibility-dropdown';
import { DataTableContent } from '@/view/components/data-table/data-table-content';
import { DataTableFallback } from '@/view/components/data-table/data-table-fallback';
import { EmptyLog } from './empty-log';
import { DataTableTextFilter } from '@/view/components/data-table/data-table-text-filter';

export function TaskUpdateAuditLogTable() {
  const { taskUpdateAuditLogsList, isTaskUpdateAuditLogsLoading } =
    useListTaskUpdateAuditLogQuery();

  const columns = useColumns();

  return (
    <>
      {!isTaskUpdateAuditLogsLoading &&
        taskUpdateAuditLogsList.length === 0 && <EmptyLog />}

      {isTaskUpdateAuditLogsLoading && (
        <DataTableFallback
          fallbackColumns={[
            'Autor',
            'Título',
            'Campo',
            'Valor antigo',
            'Valor atual',
            'Data/horário da atualização',
          ]}
        />
      )}

      <DataTable data={taskUpdateAuditLogsList} columns={columns}>
        {taskUpdateAuditLogsList.length > 0 && (
          <div className="flex items-center gap-4">
            <DataTableTextFilter placeholder="Procure por autor, título, campo ou valores" />

            <DataTableColumnsVisibilityDropdown />
          </div>
        )}

        {!isTaskUpdateAuditLogsLoading &&
          taskUpdateAuditLogsList.length > 0 && <DataTableContent />}
      </DataTable>
    </>
  );
}
