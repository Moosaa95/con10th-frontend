"use client"

import { useRef, useEffect } from "react"
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

  const options: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric" }
  if (messageDate.toDateString() === now.toDateString()) {
    return messageDate.toLocaleTimeString(undefined, options)
  }

  if (messageDate.getFullYear() === now.getFullYear()) {
    return messageDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  return messageDate.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
}

interface MessageThreadProps {
  conversation: IConversation
}

export default function MessageThread({ conversation }: MessageThreadProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation.messages])

  return (
    <div className="p-4 space-y-4">
      {/* Date separator */}
      <div className="flex justify-center sticky top-0 z-10 py-2">
        <div className="bg-gray-100/80 backdrop-blur-sm text-gray-500 text-xs px-4 py-1.5 rounded-full shadow-sm">
          Today
        </div>
      </div>

      <div className="space-y-3">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-end gap-2 group transition-opacity",
              message.senderId === "client" ? "justify-end" : "justify-start"
            )}
          >
            {message.senderId === "expert" && (
              <div className="flex-shrink-0 mb-1">
                <img
                  src={conversation.expert.profile_picture || "/placeholder.svg?height=40&width=40&query=person"}
                  alt={conversation.expert.first_name}
                  className="h-8 w-8 rounded-full ring-2 ring-white shadow-sm"
                />
              </div>
            )}
            
            <div className={cn("max-w-[85%] flex flex-col", message.senderId === "client" ? "items-end" : "items-start")}>
              <div
                className={cn(
                  "px-4 py-2.5 rounded-2xl shadow-sm",
                  message.senderId === "client"
                    ? "bg-secondary-700 text-white rounded-br-sm"
                    : "bg-white border border-gray-100 rounded-bl-sm",
                )}
              >
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </div>
              
              <div className={cn(
                "flex items-center gap-1.5 px-1 mt-1",
                message.senderId === "client" ? "flex-row" : "flex-row-reverse"
              )}>
                <span className="text-[11px] text-gray-400 group-hover:text-gray-600 transition-colors">
                  {formatMessageTime(message.timestamp)}
                </span>
                {message.senderId === "client" && (
                  <svg className="h-4 w-4 text-blue-500" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div ref={messagesEndRef} className="h-4" />
    </div>
  )
}
