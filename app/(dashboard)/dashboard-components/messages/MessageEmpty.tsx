"use client"

import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MessageEmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 text-center">
      <div className="max-w-md">
        <div className="bg-white rounded-full p-4 mb-6 inline-block shadow-sm">
          <MessageSquare className="h-8 w-8 text-orange-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          No conversation selected
        </h3>
        <p className="text-gray-500 mb-6">
          Choose a conversation from the sidebar or start a new one to begin messaging with experts.
        </p>
        <Button className="bg-orange-500 hover:bg-orange-600">
          Start a New Chat
        </Button>
      </div>
    </div>
  )
}
