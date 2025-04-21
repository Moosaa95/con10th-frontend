"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  timestamp: string
  sender: "user" | "other"
  read?: boolean
}

interface Conversation {
  id: string
  name: string
  avatar: string
  messages: Message[]
  lastOnline?: string
}

interface MessageThreadProps {
  conversation: Conversation
}

export default function MessageThread({ conversation }: MessageThreadProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation.messages])

  return (
    <div className="p-4 space-y-6">
      {/* Date separator */}
      <div className="flex justify-center">
        <div className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">Today</div>
      </div>

      {conversation.messages.map((message) => (
        <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
          {message.sender === "other" && (
            <div className="mr-3 self-end">
              <img
                src={conversation.avatar || "/placeholder.svg?height=40&width=40&query=person"}
                alt={conversation.name}
                className="h-8 w-8 rounded-full"
              />
            </div>
          )}
          <div className={cn("max-w-md", message.sender === "user" ? "text-right" : "")}>
            <div
              className={cn(
                "rounded-lg px-4 py-2",
                message.sender === "user"
                  ? "bg-white text-gray-800 border border-gray-200"
                  : "bg-gray-100 text-gray-800",
              )}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            <div className="mt-1 text-xs text-gray-500 flex items-center">
              <span>{message.sender === "other" ? "Now" : "Now"}</span>
              {message.sender === "user" && message.read && (
                <svg className="h-4 w-4 text-green-500 ml-1" viewBox="0 0 24 24" fill="none">
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
      <div ref={messagesEndRef} />
    </div>
  )
}
