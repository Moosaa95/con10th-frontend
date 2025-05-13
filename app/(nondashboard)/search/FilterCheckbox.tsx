"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FilterCheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: () => void
}

export function FilterCheckbox({ id, label, checked, onChange }: FilterCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
        <Checkbox
            id={id}
            checked={checked}
            onCheckedChange={(newVal) => onChange()}
        />
        <Label htmlFor={id}>{label}</Label>
    </div>
  )
}
