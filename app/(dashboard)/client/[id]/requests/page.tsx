"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DynamicTable from '@/app/(dashboard)/dashboard-components/Table';


interface Order {
  id: string;
  expertName: string;
  serviceOrdered: string;
  price: number;
  status: string;
  orderDate: string;
  deliveryDeadline: string;
}

export default function OrdersPage() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  
  const ordersData: Order[] = [
    {
      id: '#ORD1234',
      expertName: 'John Doe',
      serviceOrdered: 'Logo Design',
      price: 150,
      status: 'In Progress',
      orderDate: 'Mar 10, 2025',
      deliveryDeadline: 'Mar 15, 2025',
    },
    {
      id: '#ORD1235',
      expertName: 'Jane Smith',
      serviceOrdered: 'Website Design',
      price: 500,
      status: 'Cancelled',
      orderDate: 'Mar 8, 2025',
      deliveryDeadline: 'Mar 14, 2025',
    },
    {
      id: '#ORD1236',
      expertName: 'Mike Brown',
      serviceOrdered: 'Video Editing',
      price: 250,
      status: 'New Order',
      orderDate: 'Mar 9, 2025',
      deliveryDeadline: 'Mar 13, 2025',
    },
    {
      id: '#ORD1237',
      expertName: 'Victor Sule',
      serviceOrdered: 'Social Media Ads',
      price: 200,
      status: 'Completed',
      orderDate: 'Mar 7, 2025',
      deliveryDeadline: 'Mar 13, 2025',
    },
    {
      id: '#ORD1238',
      expertName: 'Sarah Johnson',
      serviceOrdered: 'Graphic Design',
      price: 150,
      status: 'Completed',
      orderDate: 'Mar 7, 2025',
      deliveryDeadline: 'Mar 12, 2025',
    },
  ];

  // Count orders by status
  const orderCounts = {
    total: ordersData.length,
    completed: ordersData.filter(order => order.status === 'Completed').length,
    active: ordersData.filter(order => order.status === 'In Progress' || order.status === 'New Order').length,
    cancelled: ordersData.filter(order => order.status === 'Cancelled').length,
  };

  
  const columns = [
    { header: 'Order ID', accessorKey: 'id' },
    { header: 'Expert Name', accessorKey: 'expertName' },
    { header: 'Service Ordered', accessorKey: 'serviceOrdered' },
    { 
      header: 'Price', 
      accessorKey: 'price',
      cell: (value:any) => `$${value}` 
    },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value:any) => {
        const styles = {
          'In Progress': 'bg-yellow-100 text-yellow-800',
          'Completed': 'bg-green-100 text-green-800',
          'Cancelled': 'bg-red-100 text-red-800',
          'New Order': 'bg-blue-100 text-blue-800',
        };
        
        return <Badge className={styles[value as keyof typeof styles] || ''}>{value}</Badge>;
      }
    },
    { header: 'Order Date', accessorKey: 'orderDate' },
    { header: 'Delivery Deadline', accessorKey: 'deliveryDeadline' },
  ];

  const actions = [
    {
      label: 'Open',
      onClick: (row:any) => {
        console.log('Open order:', row.id);
        // Handle opening the order details
      },
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      
      <h2 className="text-xl font-semibold mb-4">Orders Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold">{orderCounts.total}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Total Orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold">{orderCounts.completed}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Completed Orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold">{orderCounts.active}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Active Orders</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold">{orderCounts.cancelled}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">Cancelled Orders</p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      
      <DynamicTable
        data={ordersData}
        columns={columns}
        actions={actions}
        currentPage={currentPage}
        totalPages={1} // In a real app, calculate based on total records and page size
        onPageChange={setCurrentPage}
      />
    </div>
  );
}