"use client"

import { useState } from "react"
import Image from "next/image"
import EditDialog from "./EditDialog"

interface InfoItemProps {
  label: string
  value: string
  onEdit: () => void
}

function InfoItem({ label, value, onEdit }: InfoItemProps) {
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

export default function PersonalInfo() {
  const [editField, setEditField] = useState<string | null>(null)
  const [fieldValues, setFieldValues] = useState({
    name: "Muhammad Bashir Hassan",
    gender: "Male",
    country: "Nigeria",
    about: "I am a product designer at Steamledge Limited who loves design.",
    phone: "091412345678",
  })

  const handleSave = (field: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [field]: value }))
    setEditField(null)
  }

  const handleChangeCoverPhoto = () => {
    // Implement photo change functionality
    console.log("Change cover photo")
  }

  return (
    <div>
      <div className="py-5 flex items-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-600">
            <Image
              src=""
              alt="Profile picture"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </button>
        </div>
      </div>

      <InfoItem label="Name" value={fieldValues.name} onEdit={() => setEditField("name")} />

      <InfoItem label="Gender" value={fieldValues.gender} onEdit={() => setEditField("gender")} />

      <InfoItem label="Country" value={fieldValues.country} onEdit={() => setEditField("country")} />

      <InfoItem label="About" value={fieldValues.about} onEdit={() => setEditField("about")} />

      <InfoItem label="Phone number" value={fieldValues.phone} onEdit={() => setEditField("phone")} />

      <div className="py-5 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-medium text-gray-900">Profile Cover Photo</h3>
          <button onClick={handleChangeCoverPhoto} className="text-[#ff5d00] hover:text-[#e65400] text-sm font-medium">
            Change cover photo
          </button>
        </div>
        <p className="text-gray-600 mt-1">You can upload images up to 1MB with a minimum dimension of 1274 x 418</p>
      </div>

      {/* Edit dialogs */}
      {Object.keys(fieldValues).map((field) => (
        <EditDialog
          key={field}
          open={editField === field}
          title={field.charAt(0).toUpperCase() + field.slice(1)}
          initialValue={fieldValues[field as keyof typeof fieldValues]}
          onClose={() => setEditField(null)}
          onSave={(value) => handleSave(field, value)}
          isTextarea={field === "about"}
        />
      ))}
    </div>
  )
}
