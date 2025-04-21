import { Skeleton } from "@/components/ui/skeleton"

export default function ExpertCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Card header with avatar and name */}
      <div className="p-4 flex items-center space-x-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Card body */}
      <div className="px-4 pb-4">
        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Skeleton className="h-4 w-16 mr-2" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Card footer */}
      <div className="border-t p-4 flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>
    </div>
  )
}
