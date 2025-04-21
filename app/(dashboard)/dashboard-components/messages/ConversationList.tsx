"use client"

import { MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  archived?: boolean
}

interface ConversationListProps {
  conversations: Conversation[]
  activeId: string | undefined
  onSelect: (conversation: Conversation) => void
  type: "unread" | "archived"
}

export default function ConversationList({ conversations, activeId, onSelect, type }: ConversationListProps) {
  return (
    <div className="divide-y divide-gray-100">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className={cn("p-4 hover:bg-gray-50 cursor-pointer", activeId === conversation.id ? "bg-gray-50" : "")}
          onClick={() => onSelect(conversation)}
        >
          <div className="flex">
            <div className="mr-3">
              <img
                src={conversation.avatar || "/placeholder.svg?height=40&width=40&query=person"}
                alt={conversation.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h3 className="font-medium text-sm">{conversation.name}</h3>
                  <span
                    className={cn(
                      "ml-2 text-xs px-2 py-0.5 rounded-sm text-white",
                      type === "unread" ? "bg-red-500" : "bg-yellow-500",
                    )}
                  >
                    {type === "unread" ? "Unread" : "Archived"}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{conversation.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700 truncate mt-1">{conversation.lastMessage}</p>
            </div>
            <button className="ml-2 text-gray-400 hover:text-gray-600 self-start">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
