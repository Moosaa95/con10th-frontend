import Link from "next/link"
import Image from "next/image"
import { Briefcase, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Expert } from "@/types/expert"

interface ExpertCardProps {
  expert: Expert
}

export function ExpertCard({ expert }: ExpertCardProps) {
  const fullName = `${expert.first_name} ${expert.last_name}`

  return (
    <Link href={`/expert/${expert.expert_id}/detail`} className="block w-full transition-transform hover:scale-[1.02]">
      <Card className="overflow-hidden border-gray-400 bg-white w-full h-full">
        <div className="relative p-4 md:p-5">
          <Image
            src={expert.profile_picture || "/placeholder.svg"}
            alt={fullName}
            width={269}
            height={232}
            className="w-full h-[200px] md:h-[232px] object-cover rounded-lg"
          />
        </div>
        <CardContent className="px-4 md:px-5 space-y-4 md:space-y-5 pb-5">
          <div className="space-y-2">
            <h3 className="text-base md:text-lg font-bold text-accent-color-700 line-clamp-1">{fullName}</h3>

            <div className="flex items-center gap-2">
              <div className="text-[#1FC16B]">
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="text-sm font-normal text-[#1FC16B] line-clamp-1">Verified Expert in {expert.title}</span>
            </div>

            <div className="flex items-center text-sm text-[#384853] gap-2">
              <div className="text-primary-700">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm line-clamp-1">{expert.title}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm text-[#384853]">Skills</h4>
            <div className="flex flex-wrap gap-[5px]">
              {expert.skills.slice(0, 3).map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="rounded-[100px] border-accent-color-700 px-3 py-1 text-xs md:text-sm text-accent-color-700 font-normal bg-white truncate max-w-[150px]"
                >
                  {skill.name}
                </Badge>
              ))}
              {expert.skills.length > 3 && (
                <Badge
                  variant="outline"
                  className="rounded-[100px] border-accent-color-700 px-3 py-1 text-xs md:text-sm text-accent-color-700 font-normal bg-white"
                >
                  +{expert.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
