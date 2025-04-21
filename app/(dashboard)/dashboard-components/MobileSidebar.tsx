"use client"

import type React from "react"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, MessageSquare, Users, ShoppingCart, CreditCard, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  href: string
  onClick: () => void
}

function NavItem({ icon, label, active, href, onClick }: NavItemProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
        active ? "bg-blue-50 text-[#0f2d52]" : "text-gray-600 hover:bg-gray-100",
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  )
}

export default function MobileSidebar() {
  const [activeItem, setActiveItem] = useState("dashboard")
  const [open, setOpen] = useState(false)

  const handleNavItemClick = (item: string) => {
    setActiveItem(item)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-7 w-7" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] p-0">
        <div className="px-2 py-8">
          <div className="space-y-1 p-2">
            <NavItem
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={activeItem === "dashboard"}
              href="/dashboard"
              onClick={() => handleNavItemClick("dashboard")}
            />
            <NavItem
              icon={<Users size={20} />}
              label="Experts"
              active={activeItem === "experts"}
              href="/experts"
              onClick={() => handleNavItemClick("experts")}
            />
            <NavItem
              icon={<Users size={20} />}
              label="Offers"
              active={activeItem === "offers"}
              href="/offers"
              onClick={() => handleNavItemClick("offers")}
            />
            <NavItem
              icon={<MessageSquare size={20} />}
              label="Messages"
              active={activeItem === "messages"}
              href="/messages"
              onClick={() => handleNavItemClick("messages")}
            />
            <NavItem
              icon={<ShoppingCart size={20} />}
              label="Orders"
              active={activeItem === "orders"}
              href="/client/656/orders"
              onClick={() => handleNavItemClick("orders")}
            />
            <NavItem
              icon={<CreditCard size={20} />}
              label="Payments"
              active={activeItem === "payments"}
              href="/payments"
              onClick={() => handleNavItemClick("payments")}
            />
            <NavItem
              icon={<Settings size={20} />}
              label="Settings"
              active={activeItem === "settings"}
              href="/settings"
              onClick={() => handleNavItemClick("settings")}
            />
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center gap-3 p-6">
          <Avatar className="h-10 w-10 border-2 border-[#0f2d52]">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
            <AvatarFallback>MB</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-[#0f2d52]">Mike Brown</p>
            <p className="text-xs text-gray-500">User</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
