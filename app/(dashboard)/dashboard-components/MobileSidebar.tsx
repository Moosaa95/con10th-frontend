"use client"

import type React from "react"
import { useState } from "react"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useSidebar } from "@/hooks/use-sidebar"
import DashboardSidebar from "./sidebar/DashboardSidebar"

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { setSidebarOpen } = useSidebar()

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    setSidebarOpen(open)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle mobile menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pt-16">
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  )
}
