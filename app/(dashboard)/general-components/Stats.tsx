import { Card, CardContent } from "@/components/ui/card"
import { twMerge } from "tailwind-merge"

interface StatCardProps {
  icon: string
  count: number
  label: string
  className?: string
}

export default function StatCard({ icon, count, label, className }: StatCardProps) {
  const getBgColor = () => {
    if (label.includes("Total")) return "bg-blue-50 text-blue-500"
    if (label.includes("Active")) return "bg-green-50 text-green-500"
    if (label.includes("Money")) return "bg-orange-50 text-orange-500"
    return "bg-gray-50 text-gray-500"
  }

  return (
    <Card className={twMerge("transition-all duration-200 hover:shadow-md min-h-[100px] w-full h-auto", className)}>
      <CardContent className="flex items-start p-3 sm:p-4 space-x-3 sm:space-x-4">
        <div className={`flex-shrink-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full ${getBgColor()}`}>
          <span className="text-base sm:text-lg">{icon}</span>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
            {typeof count === 'number' ? count.toLocaleString() : count}
          </div>
          <div className="text-sm text-gray-500 truncate">
            {label}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
