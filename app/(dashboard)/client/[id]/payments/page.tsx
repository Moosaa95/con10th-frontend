"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DynamicTable from '@/app/(dashboard)/dashboard-components/Table';

// Define your data type
interface Payment {
  id: string;
  serviceSold: string;
  expertName: string;
  amountPaid: number;
  datePaid: string;
  status: string;
}

export default function PaymentsPage() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample data - in a real app, this would come from an API
  const paymentsData: Payment[] = [
    {
      id: '#202503010A',
      serviceSold: 'Logo Design',
      expertName: 'Boye Wonoluko',
      amountPaid: 150,
      datePaid: 'Mar 10, 2025',
      status: 'Paid',
    },
    {
      id: '#202503009B',
      serviceSold: 'Landing Page Design',
      expertName: 'Boye Koala',
      amountPaid: 150,
      datePaid: 'Mar 9, 2025',
      status: 'Pending',
    },
    {
      id: '#202503008C',
      serviceSold: 'UI/UX Review',
      expertName: 'Victor Made',
      amountPaid: 150,
      datePaid: 'Mar 8, 2025',
      status: 'Paid',
    },
    {
      id: '#202503007D',
      serviceSold: 'Video Editing',
      expertName: 'Musa Sule',
      amountPaid: 150,
      datePaid: 'Mar 8, 2025',
      status: 'Paid',
    },
    {
      id: '#202503007D',
      serviceSold: 'Website Design',
      expertName: 'Alex Mercer',
      amountPaid: 150,
      datePaid: 'Mar 8, 2025',
      status: 'Paid',
    },
  ];

  // Count payments by status
  const paymentCounts = {
    totalSpent: 0,
    paidToExperts: 0,
    pendingPayouts: 0,
  };
  
  // Calculate summary values
  paymentsData.forEach(payment => {
    if (payment.status === 'Paid') {
      paymentCounts.totalSpent += payment.amountPaid;
      paymentCounts.paidToExperts += payment.amountPaid;
    } else if (payment.status === 'Pending') {
      paymentCounts.pendingPayouts += payment.amountPaid;
    }
  });

  // Define your columns
  const columns = [
    { header: 'Order ID', accessorKey: 'id' },
    { header: 'Service Sold', accessorKey: 'serviceSold' },
    { header: 'Expert Name', accessorKey: 'expertName' },
    { 
      header: 'Amount Paid', 
      accessorKey: 'amountPaid',
      cell: (value) => `$${value}` 
    },
    { header: 'Date Paid', accessorKey: 'datePaid' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (value) => {
        const styles = {
          'Paid': 'bg-green-100 text-green-800',
          'Pending': 'bg-yellow-100 text-yellow-800',
        };
        
        return <Badge className={styles[value as keyof typeof styles] || ''}>{value}</Badge>;
      }
    },
  ];

  // Define your actions (if needed)
  const actions = [
    {
      label: 'View',
      onClick: (row) => {
        console.log('View payment:', row.id);
        // Handle viewing payment details
      },
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payments</h1>
      
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold">0</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-2">
                <svg className="w-4 h-4 text-blue-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                  <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path>
                </svg>
              </div>
              <p className="text-gray-500">Total Spent</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl font-bold">0</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-2">
                <svg className="w-4 h-4 text-green-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8z"></path>
                  <path d="M12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"></path>
                </svg>
              </div>
              <p className="text-gray-500">Payout to experts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="bg-red-100 p-2 rounded-full mr-2">
                <svg className="w-4 h-4 text-red-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center flex-col">
            <CardTitle className="text-4xl font-bold">0</CardTitle>
              <p className="text-gray-500">Pending Payouts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-500 text-white">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path>
              </svg>
              <div>
                <p className="text-sm">COMMUNITY FEDERAL SAVINGS BANK US</p>
                <p className="text-sm">******098213</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <p>Muhammad Bashir Hassan</p>
              <span className="bg-white text-orange-500 text-xs font-medium px-2 py-1 rounded">DEFAULT</span>
            </div>
          </CardHeader>
        </Card>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      
      <DynamicTable
        data={paymentsData}
        columns={columns}
        actions={actions}
        currentPage={currentPage}
        totalPages={1}
        onPageChange={setCurrentPage}
      />
      
      <div className="flex justify-between mt-4 items-center">
        <div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded mr-2">Previous</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded">Next</button>
        </div>
        <div className="text-gray-500">Page 1</div>
      </div>
    </div>
  );
}