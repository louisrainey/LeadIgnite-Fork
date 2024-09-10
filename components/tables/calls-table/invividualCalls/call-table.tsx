import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';
import { GetCallResponse } from '@/types/vapiAi/api/calls/get';
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from '@tanstack/react-table';
import { Table } from 'lucide-react';
import { callResponseColumns } from './individualCallsColumns';

// Table component to display call response data
export function CallResponseTable({ data }: { data: GetCallResponse[] }) {
  const table = useReactTable({
    data,
    columns: callResponseColumns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[1000px]">
        {' '}
        {/* Adjust min-width based on the number of columns */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-left">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={callResponseColumns.length}
                className="h-24 text-center"
              >
                No call data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
