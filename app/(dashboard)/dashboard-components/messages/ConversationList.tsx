"use client"

import { MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { IConversation } from "@/types/expert"

const formatMessageTime = (timestamp: string) => {
  const messageDate = new Date(timestamp)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`

  if (messageDate.toDateString() === now.toDateString()) {
    return messageDate.toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" })
  }

  if (now.getTime() - messageDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
    return messageDate.toLocaleDateString(undefined, { weekday: "short" })
  }

  return messageDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

interface ConversationListProps {
  conversations: IConversation[]
  activeId: string | undefined
  onSelect: (conversation: IConversation) => void
}

export default function ConversationList({ conversations, activeId, onSelect }: ConversationListProps) {
  return (
    <div className="divide-y divide-gray-100">
      {conversations.map((conversation) => {
        const lastMessage = conversation.messages[conversation.messages.length - 1]
        return (
          <div
            key={conversation.id}
            className={cn(
              "hover:bg-gray-50 cursor-pointer transition-colors",
              activeId === conversation.id ? "bg-secondary-100" : ""
            )}
            onClick={() => onSelect(conversation)}
          >
            <div className="p-3 flex gap-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={conversation.expert.profile_picture || "/placeholder.svg?height=40&width=40&query=person"}
                  alt={conversation.expert.first_name + " " + conversation.expert.last_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 relative">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conversation.expert.first_name} {conversation.expert.last_name}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatMessageTime(lastMessage.timestamp)}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm text-gray-600 line-clamp-2 leading-snug">
                    {lastMessage.senderId === "client" && "You: "}
                    {lastMessage.content}
                  </p>
                  <button
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle menu click
                    }}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
