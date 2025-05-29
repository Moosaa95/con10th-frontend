"use client"

import { useState } from "react"
import { Search, Plus, MoreVertical, X, Send, Smile, Paperclip, Phone, Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IConversation } from "@/types/expert"
import { testConvarsations } from "@/testData"
import { cn } from "@/lib/utils"
import ConversationList from "@/app/(dashboard)/dashboard-components/messages/ConversationList"
import MessageThread from "@/app/(dashboard)/dashboard-components/messages/MessageThreads"
import MessageEmptyState from "@/app/(dashboard)/dashboard-components/messages/MessageEmpty"

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState<IConversation | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter conversations based on search query
  const filteredConversations = testConvarsations.filter((conversation) =>
    `${conversation.expert.first_name} ${conversation.expert.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    conversation.messages[conversation.messages.length - 1].content
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const handleCloseConversation = () => {
    setActiveConversation(null)
  }

  return (
    <div className="h-[calc(100vh-10rem)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex h-full">
        {/* Conversations List - Hide on mobile when conversation is active */}
        <div className={cn(
          "w-full sm:w-[380px] border-r border-gray-200 flex flex-col bg-gray-50/50",
          activeConversation ? "hidden sm:flex" : "flex"
        )}>
          <div className="p-4 flex justify-between items-center bg-white border-b border-gray-200">
            <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                <Plus className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="px-4 py-3 bg-white border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search conversations..."
                className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-50 border-gray-200 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length > 0 ? (
              <ConversationList
                conversations={filteredConversations}
                activeId={activeConversation?.id}
                onSelect={setActiveConversation}
              />
            ) : (
              <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-3 mb-3">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <p>No conversations found</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Thread or Empty State - Show on mobile when conversation is active */}
        <div className={cn(
          "flex-1 flex flex-col bg-gray-50",
          activeConversation ? "flex" : "hidden sm:flex"
        )}>
          {activeConversation ? (
            <>
              {/* Conversation Header */}
              <div className="px-6 py-4 bg-white border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    {/* Back button on mobile */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="sm:hidden mr-2"
                      onClick={handleCloseConversation}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                    
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={activeConversation.expert.profile_picture || "/placeholder.svg?height=40&width=40&query=person"}
                          alt={activeConversation.expert.first_name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {activeConversation.expert.first_name} {activeConversation.expert.last_name}
                        </h3>
                        <p className="text-sm text-green-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
                          Online
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto bg-[#F8FAFC] backdrop-blur-sm">
                <MessageThread conversation={activeConversation} />
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center gap-0.5">
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 rounded-full h-9 w-9">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 rounded-full h-9 w-9">
                      <Smile className="h-5 w-5" />
                    </Button>
                  </div>
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-base"
                  />
                  <Button 
                    size="icon" 
                    className="rounded-full bg-orange-500 hover:bg-orange-600 text-white h-9 w-9 shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <MessageEmptyState />
          )}
        </div>
      </div>
    </div>
  )
}
