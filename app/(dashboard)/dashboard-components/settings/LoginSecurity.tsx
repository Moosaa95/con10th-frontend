"use client"

import { useState } from "react"
import ChangePasswordDialog from "./ChangePassword"
import DeleteAccountDialog from "./DeleteAccount"


export default function LoginSecurity() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)

  return (
    <div>
      <div className="flex justify-between items-start py-5 border-b border-gray-200">
        <div>
          <h3 className="text-base font-medium text-gray-900">Name</h3>
          <p className="text-gray-600 mt-1">mymail@example.com</p>
        </div>
      </div>

      <div className="py-5 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <h3 className="text-base font-medium text-gray-900">Password</h3>
          <button
            onClick={() => setShowChangePasswordDialog(true)}
            className="text-[#ff5d00] hover:text-[#e65400] text-sm font-medium"
          >
            Change password
          </button>
        </div>
        <p className="text-gray-600 mt-1">••••••••••••</p>
      </div>

      <div className="py-5">
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="text-[#ff5d00] hover:text-[#e65400] text-sm font-medium"
        >
          Delete your account
        </button>
      </div>

      <DeleteAccountDialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} />
      <ChangePasswordDialog open={showChangePasswordDialog} onClose={() => setShowChangePasswordDialog(false)} />
    </div>
  )
}
