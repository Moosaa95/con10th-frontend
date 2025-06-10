import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/hooks/use-sidebar"
import { cn } from "@/lib/utils"
import { 
  HomeIcon, 
  MessageSquareIcon, 
  UsersIcon, 
  CalendarIcon,
  SettingsIcon
} from "lucide-react"

interface NavLink {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
}

const navigationLinks: NavLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: HomeIcon,
  },
  {
    href: "/client",
    label: "Messages",
    icon: MessageSquareIcon,
    badge: "5",
  },
  {
    href: "/experts",
    label: "Find Experts",
    icon: UsersIcon,
  },
  {
    href: "/schedule",
    label: "Schedule",
    icon: CalendarIcon,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: SettingsIcon,
  },
]

export default function DashboardSidebar() {
  const { isOpen } = useSidebar()
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 -translate-x-full border-r border-gray-200/80 bg-white transition-transform duration-200 ease-in-out",
        isOpen && "translate-x-0"
      )}
    >
      <div className="flex h-full flex-col overflow-y-auto pb-4">
        {/* Navigation Links */}
        <nav className="mt-2 flex-1 space-y-1 px-3">
          {navigationLinks.map((link) => {
            const isActive = pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-accent-color-50 text-accent-color-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-accent-color-600"
                )}
              >
                <link.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 transition-colors",
                    isActive ? "text-accent-color-600" : "text-gray-400 group-hover:text-accent-color-500"
                  )}
                />
                {link.label}
                {link.badge && (
                  <span className="ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent-color-100 px-1.5 text-xs font-medium text-accent-color-700">
                    {link.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="mt-auto border-t border-gray-200/80 px-3 pt-4">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
            <img
              src="/placeholder.svg?height=32&width=32&query=person"
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-white"
            />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">User Name</p>
              <p className="truncate text-xs text-gray-500">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}