"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditDialogProps {
  open: boolean
  title: string
  initialValue: string
  onClose: () => void
  onSave: (value: string) => void
  isTextarea?: boolean
  isSelect?: boolean
  options?: { value: string; label: string }[]
}

export default function EditDialog({
  open,
  title,
  initialValue,
  onClose,
  onSave,
  isTextarea = false,
  isSelect = false,
  options = [],
}: EditDialogProps) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (open) {
      setValue(initialValue)
    }
  }, [open, initialValue])

  const handleSave = () => {
    onSave(value)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isTextarea ? (
            <Textarea value={value} onChange={(e) => setValue(e.target.value)} className="w-full" rows={4} />
          ) : isSelect ? (
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input value={value} onChange={(e) => setValue(e.target.value)} className="w-full" />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#ff5d00] hover:bg-[#e65400] text-white">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
