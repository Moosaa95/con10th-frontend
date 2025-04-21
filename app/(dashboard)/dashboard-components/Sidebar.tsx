"use client";

import {
  Home,
  Users,
  MessageSquare,
  ShoppingCart,
  CreditCard,
  Settings,
  GitPullRequestIcon,
} from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn helper
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function DashboardSidebar() {
  const pathname = usePathname();
  // Use useParams to get the dynamic segment from the route
  const params = useParams();
  const clientId = params?.id || "55";


  const menuItems = [
    { 
      label: "Dashboard", 
      icon: Home, 
      href: `/client/${clientId}/dashboard`,
      pattern: "/client/[id]/dashboard"
    },
    { 
      label: "Expert/Offers", 
      icon: Users, 
      href: "/experts",
      pattern: "/experts" 
    },
    { 
      label: "Messages", 
      icon: MessageSquare, 
      href: `/client/${clientId}/messages`,
      pattern: "/client/[id]/messages"
    },
    { 
      label: "Requests", 
      icon: GitPullRequestIcon, 
      href: `/client/${clientId}/requests`,
      pattern: "/client/[id]/requests"
    },
    { 
      label: "Payments", 
      icon: CreditCard, 
      href: `/client/${clientId}/payments`,
      pattern: "/client/[id]/payments"
    },
    { 
      label: "Settings", 
      icon: Settings, 
      href: `/client/${clientId}/settings`,
      pattern: "/client/[id]/settings"
    },
  ];

  const isRouteActive = (pattern:any) => {
    // Handle dynamic segments by comparing the route pattern
    if (pattern.includes("[id]")) {
      const routePattern = pattern.replace("[id]", "[^/]+");
      const routeRegex = new RegExp(`^${routePattern}$`);
      return routeRegex.test(pathname);
    }
    
    return pathname === pattern;
  };

  

  return (
    <aside className="hidden fixed left-0 top-0 bottom-0 z-40 w-16 md:w-[130px] bg-white border-r border-gray-200 lg:flex lg:flex-col justify-between">
      {/* Menu items */}
      <div className="flex flex-col items-center pt-[150px]">
        {menuItems.map(({ label, icon: Icon, href, pattern }) => {
          const isActive = isRouteActive(pattern);
          return (
            <Link href={href} key={label} className="w-full">
              <div
                className={cn(
                  "flex flex-col items-center py-3 px-1 cursor-pointer transition-colors text-xs",
                  isActive 
                    ? "text-orange-500 border-l-4 border-orange-500" 
                    : "text-gray-500 hover:text-gray-700 border-l-4 border-transparent"
                )}
              >
                <Icon size={24} className="mb-1" />
                <span className="text-center mt-1 text-xs">{label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Divider line */}
      <div className="w-full border-t border-gray-200 border-dashed"></div>

      {/* Avatar - Fixed at the bottom */}
      <div className="flex justify-center py-4">
        <Avatar className="h-10 w-10 border-2 border-blue-900">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User avatar" />
          <AvatarFallback>MB</AvatarFallback>
        </Avatar>
      </div>
    </aside>
  );
}