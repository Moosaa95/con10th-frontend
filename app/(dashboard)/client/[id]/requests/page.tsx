"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/use-auth';
import { RequestsSkeleton } from './components/request-skeleton';
import { useGetClientRequestsQuery } from '@/states/features/endpoints/client/clientApiSlice';
import { serviceOfferedData } from '@/testData';


export default function OrdersPage() {
  const { user } = useAuth();
  const { 
    data, 
    isLoading, 
    isError 
  } = useGetClientRequestsQuery(user?.id ?? '', {
    skip: !user?.id
  });

  if (isLoading) {
    return <RequestsSkeleton />;
  }

  // if (!serviceOfferedData || isError) {
  //   return isError ? (
  //     <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
  //       <div className="text-center">
  //         <h2 className="text-lg sm:text-xl font-semibold text-red-600 mb-4">
  //           Error Loading Service Requests
  //         </h2>
  //         <p className="text-gray-500 mb-6">
  //           There was an error loading your service requests. Please try again later.
  //         </p>
  //         <Button
  //           className="bg-secondary-700 text-white hover:bg-secondary-800 transition-colors"
  //           onClick={() => {/* TODO: Implement retry logic */}}
  //         >
  //           Retry
  //         </Button>
  //       </div>
  //     </div>
  //   ):(
  //     <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
  //       <div className="text-center">
  //         <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
  //           No Service Requests Found
  //         </h2>
  //         <p className="text-gray-500 mb-6">
  //           You haven`&apos;`t made any service requests yet. Start by requesting a new service.
  //         </p>
  //         <Button
  //           className="bg-secondary-700 text-white hover:bg-secondary-800 transition-colors"
  //           onClick={() => {/* TODO: Implement new service request */}}
  //         >
  //           Request New Service
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  // Count orders by status
  const serviceStats = {
    total: serviceOfferedData!.length,
    completed: serviceOfferedData!.filter(service => service.status === 'completed').length,
    active: serviceOfferedData!.filter(service => ['pending', 'in_progress'].includes(service.status)).length,
    cancelled: serviceOfferedData!.filter(service => service.status === 'cancelled').length,
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-primary-600">
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-primary-900">
              {serviceStats.total}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-primary-600">
              Active Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-blue-600">
              {serviceStats.active}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-primary-600">
              Completed Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              {serviceStats.completed}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 space-y-0">
            <CardTitle className="text-xs sm:text-sm font-medium text-primary-600">
              Cancelled Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-red-600">
              {serviceStats.cancelled}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-primary-100">
          <CardTitle className='text-lg sm:text-xl text-primary-900 font-bold'>
            <div className='flex items-center justify-between'>
              <p>Service Requests</p>
              <Button 
                className='bg-secondary-700 text-white hover:bg-secondary-800 transition-colors'
                onClick={() => {/* TODO: Implement new service request */}}
              >
                Request New Service
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="overflow-auto">
            <DataTable columns={columns} data={serviceOfferedData!} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}