import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  icon: string
  count: number
  label: string
}

export default function StatCard({ icon, count, label }: StatCardProps) {
  const getBgColor = () => {
    if (label.includes("Total Orders")) return "bg-blue-50 text-blue-500"
    if (label.includes("Active Orders")) return "bg-green-50 text-green-500"
    if (label.includes("Money")) return "bg-orange-50 text-orange-500"
    return "bg-gray-50 text-gray-500"
  }

  return (
    <Card className="transition-all duration-200 hover:shadow-md w-[395px]  h-[116px]">
      <CardContent className="flex items-center p-4 rounded-lg m-4">
        <div className={`mr-4 flex h-[52px] w-[52px] items-center justify-center rounded-[100px] p-4 gap-2 ${getBgColor()}`}>
          <span className="text-xl">{icon}</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-[#0f2d52]">{count}</p>
          <p className="text-sm text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
