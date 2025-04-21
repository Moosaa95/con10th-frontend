// components/DynamicTable.tsx
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type ColumnDefinition = {
  header: string;
  accessorKey: string;
  cell?: (value: any, row: any) => React.ReactNode;
};

export type Action = {
  label: string;
  onClick: (row: any) => void;
};

type DynamicTableProps = {
  data: any[];
  columns: ColumnDefinition[];
  actions?: Action[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

const statusVariants: Record<string, string> = {
  'In Progress': 'bg-yellow-100 text-yellow-800',
  'Completed': 'bg-green-100 text-green-800',
  'Cancelled': 'bg-red-100 text-red-800',
  'New Order': 'bg-blue-100 text-blue-800',
  // Add more status variants as needed
};

const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  columns,
  actions = [],
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  // Default cell renderer for status values
  const defaultStatusCell = (value: string) => {
    const variant = statusVariants[value] || 'bg-gray-100 text-gray-800';
    return (
      <Badge className={variant}>
        {value}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>{column.header}</TableHead>
            ))}
            {actions.length > 0 && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="text-center py-6">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={`${rowIndex}-${column.accessorKey}`}>
                    {column.cell ? 
                      column.cell(row[column.accessorKey], row) : 
                      column.accessorKey === 'status' ? 
                        defaultStatusCell(row[column.accessorKey]) : 
                        row[column.accessorKey]}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell>
                    <div className="flex gap-2">
                      {actions.map((action, actionIndex) => (
                        <Button 
                          key={actionIndex} 
                          variant="outline" 
                          size="sm"
                          onClick={() => action.onClick(row)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <div className="flex justify-end px-2 py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => onPageChange && currentPage > 1 && onPageChange(currentPage - 1)}
                  className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => onPageChange && onPageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => onPageChange && currentPage < totalPages && onPageChange(currentPage + 1)}
                  className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DynamicTable;