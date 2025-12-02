import { useTasks } from '@/app/hooks/use-tasks';
import { useListTaskCreationAuditLogQuery } from '@/app/hooks/queries/use-list-task-creation-audit-log-query';
import { useColumns } from './use-columns';

import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Button } from '@/view/components/ui/button';
import { DataTable } from '@/view/components/data-table';
import { EmptyData } from '@/view/components/empty-data';
import { DataTableColumnsVisibilityDropdown } from '@/view/components/data-table/data-table-columns-visibility-dropdown';
import { DataTableContent } from '@/view/components/data-table/data-table-content';
import { DataTableFallback } from '@/view/components/data-table/data-table-fallback';

export function TaskCreationAuditLogTable() {
  const { handleOpenNewTaskSheet } = useTasks();

  const { taskCreationAuditLogsList, isTaskCreationAuditLogsLoading } =
    useListTaskCreationAuditLogQuery();

  const columns = useColumns();

  const textStyles = 'text-primary font-medium';

  return (
    <div className="h-full">
      {!isTaskCreationAuditLogsLoading &&
        taskCreationAuditLogsList.length === 0 && (
          <EmptyData>
            <p className="max-w-[500px] text-center">
              Não há registro de nenhuma tarefa criada para ser listada na
              auditoria de criação. Que tal adicionar uma agora e melhorar o seu
              <span className={cn(textStyles)}> fluxo de trabalho</span> e o seu
              <span className={cn(textStyles)}> controle de prazos</span>?
            </p>

            <Button onClick={handleOpenNewTaskSheet} className="p-6!">
              <Plus className="size-4!" /> Adicionar tarefa
            </Button>
          </EmptyData>
        )}

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
