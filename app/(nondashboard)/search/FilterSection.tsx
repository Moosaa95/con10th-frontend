import type { ReactNode } from "react"

interface FilterSectionProps {
  title: string
  children: ReactNode
}

export function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm text-[#09233e]">{title}</h3>
      {children}
    </div>
  )
}
