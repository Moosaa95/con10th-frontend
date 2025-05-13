
import type { Expert } from "@/types/expert"
import { ExpertCard } from "../components/cards/ExpertCard"


interface ExpertListProps {
  experts: Expert[]
}

export function ExpertList({ experts }: ExpertListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {experts.map((expert) => (
        <ExpertCard key={expert.expert_id} expert={expert} />
      ))}
    </div>
  )
}
