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
  console.log("CARDS===========", expert)
  const fullName = `${expert.first_name} ${expert.last_name}`

  return (
    <Link href={`/expert/${expert.expert_id}`} className="block transition-transform hover:scale-[1.02]">
      <Card className="overflow-hidden border-gray-400 bg-white w-[309px]" style={{ minHeight: "480px" }}>
        <div className="aspect-w-4 aspect-h-3 p-5">
          <Image
            src={expert.profile_picture || "/placeholder.svg"}
            alt={fullName}
            width={269}
            height={232}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="px-5 space-y-5">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-accent-color-700">{fullName}</h3>

            <div className="flex items-center gap-2">
              <div className="text-[#1FC16B]">
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="text-sm font-normal text-[#1FC16B]">Verified Expert in {expert.title}</span>
            </div>

            <div className="flex items-center text-sm text-[#384853] gap-2">
              <div className="text-primary-700">
                <Briefcase className="h-4 w-4" />
              </div>
              <span className="font-medium text-sm">{expert.title}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm text-[#384853]">Skills</h4>
            <div className="flex flex-wrap gap-[5px]">
              {expert.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="rounded-[100px] border-accent-color-700 px-4 py-2 text-sm  text-accent-color-700 font-normal bg-white"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
