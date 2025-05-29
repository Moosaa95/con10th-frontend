"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RequestsSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader className="pb-2 space-y-0">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b border-primary-100">
          <CardTitle className='text-lg sm:text-xl'>
            <div className='flex items-center justify-between'>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-9 w-40" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-[200px]" />
              <Skeleton className="h-10 w-[100px]" />
            </div>
            <div className="rounded-lg border border-primary-100 overflow-hidden">
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="px-4 py-3 flex items-center gap-4">
                    <Skeleton className="h-4 w-[40%]" />
                    <Skeleton className="h-4 w-[20%]" />
                    <Skeleton className="h-4 w-[15%]" />
                    <Skeleton className="h-6 w-[80px]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-[150px]" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-[70px]" />
                <Skeleton className="h-8 w-[70px]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
