"use client"

import { useState } from "react"
import EditDialog from "./EditDialog"


interface SettingItemProps {
  label: string
  value: string
  onEdit: () => void
}

function SettingItem({ label, value, onEdit }: SettingItemProps) {
  return (
    <div className="py-5 border-b border-gray-200">
      <div className="flex justify-between items-start">
        <h3 className="text-base font-medium text-gray-900">{label}</h3>
        <button onClick={onEdit} className="text-[#ff5d00] hover:text-[#e65400] text-sm font-medium">
          Edit
        </button>
      </div>
      <p className="text-gray-600 mt-1">{value}</p>
    </div>
  )
}

export default function ProfileSettings() {
  const [editField, setEditField] = useState<string | null>(null)
  const [fieldValues, setFieldValues] = useState({
    projectNeeds: "Hiring for fa project",
    companyName: "Dasheer Creative Agency",
    website: "www.mywebsite.com",
  })

  const handleSave = (field: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [field]: value }))
    setEditField(null)
  }

  return (
    <div>
      <SettingItem
        label="Project or Hiring Needs"
        value={fieldValues.projectNeeds}
        onEdit={() => setEditField("projectNeeds")}
      />

      <SettingItem
        label="Company Name (If applicable)"
        value={fieldValues.companyName}
        onEdit={() => setEditField("companyName")}
      />

      <SettingItem
        label="Website / Social link (If applicable)"
        value={fieldValues.website}
        onEdit={() => setEditField("website")}
      />

      <EditDialog
        open={editField === "projectNeeds"}
        title="Project or Hiring Needs"
        initialValue={fieldValues.projectNeeds}
        onClose={() => setEditField(null)}
        onSave={(value) => handleSave("projectNeeds", value)}
      />

      <EditDialog
        open={editField === "companyName"}
        title="Company Name"
        initialValue={fieldValues.companyName}
        onClose={() => setEditField(null)}
        onSave={(value) => handleSave("companyName", value)}
      />

      <EditDialog
        open={editField === "website"}
        title="Website / Social link"
        initialValue={fieldValues.website}
        onClose={() => setEditField(null)}
        onSave={(value) => handleSave("website", value)}
      />
    </div>
  )
}
