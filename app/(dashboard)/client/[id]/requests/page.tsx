/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DynamicTable from '@/app/(dashboard)/dashboard-components/Table';
import { ordersData } from '@/testData';


export default function OrdersPage() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);



  // Calculate pagination
  const totalItems = ordersData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Get current page data
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return ordersData.slice(start, end);
  }, [currentPage, pageSize,]);

  // Count orders by status
  const orderCounts = {
    total: ordersData.length,
    completed: ordersData.filter(order => order.status === 'Completed').length,
    active: ordersData.filter(order => order.status === 'In Progress' || order.status === 'New Order').length,
    cancelled: ordersData.filter(order => order.status === 'Cancelled').length,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const columns = [
    { header: 'Order ID', accessorKey: 'id' },
    { header: 'Expert Name', accessorKey: 'expertName' },
    { header: 'Service Ordered', accessorKey: 'serviceOrdered' },
    {
      header: 'Price',
      accessorKey: 'price',
      cell: (value: any) => `$${value}`,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (value: any) => {
        const styles = {
          'In Progress': 'bg-yellow-100 text-yellow-800',
          'Completed': 'bg-green-100 text-green-800',
          'Cancelled': 'bg-red-100 text-red-800',
          'New Order': 'bg-blue-100 text-blue-800',
        };

        return <Badge className={styles[value as keyof typeof styles] || ''}>{value}</Badge>;
      },
    },
    { header: 'Order Date', accessorKey: 'orderDate' },
    { header: 'Delivery Deadline', accessorKey: 'deliveryDeadline' },
  ];

  const actions = [
    {
      label: 'Open',
      onClick: (row: any) => {
        console.log('Open order:', row.id);
        // Handle opening the order details
      },
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderCounts.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{orderCounts.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{orderCounts.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cancelled Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{orderCounts.cancelled}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DynamicTable
            data={currentData}
            columns={columns}
            actions={actions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </CardContent>
      </Card>
    </div>
  );
}