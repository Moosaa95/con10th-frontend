"use client"

import LoginSecurity from "@/app/(dashboard)/dashboard-components/settings/LoginSecurity"
import PersonalInfo from "@/app/(dashboard)/dashboard-components/settings/PersonalInfo"
import ProfileSettings from "@/app/(dashboard)/dashboard-components/settings/ProfileSettings"
import SettingsTabs from "@/app/(dashboard)/dashboard-components/settings/SettingTab"
import { useState } from "react"


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-[#09233e] text-3xl font-bold mb-6">Settings</h1>

      <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "personal" && <PersonalInfo />}
        {activeTab === "security" && <LoginSecurity />}
      </div>
    </div>
  )
}
