"use client"

import { cn } from "@/lib/utils"

interface SettingsTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const tabs = [
    { id: "profile", label: "Profile Settings" },
    { id: "personal", label: "Personal Info" },
    { id: "security", label: "Login & Security" },
    { id: "billing", label: "Billing Account" },
  ]

  return (
    <div className="border-b border-gray-200">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "pb-2 text-base font-medium relative",
              activeTab === tab.id ? "text-[#ff5d00]" : "text-gray-600 hover:text-gray-900",
            )}
          >
            {tab.label}
            {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff5d00]"></div>}
          </button>
        ))}
      </div>
    </div>
  )
}
