"use client"

import { useState } from "react"
import { Search, Plus, MoreVertical, X, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IConversation } from "@/types/expert"
import { testConvarsations } from "@/testData"
import ConversationList from "@/app/(dashboard)/dashboard-components/messages/ConversationList"
import MessageThread from "@/app/(dashboard)/dashboard-components/messages/MessageThreads"
import MessageEmptyState from "@/app/(dashboard)/dashboard-components/messages/MessageEmpty"
import { conversations } from "@/lib/data"

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("unread")
  const [activeConversation, setActiveConversation] = useState<IConversation | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter conversations based on search query and active tab
  // const filteredConversations = testConvarsations.filter(
  //   (conversation) =>
  //     (activeTab === "unread" ? conversation.unread > 0 : conversation.archived) &&
  //     (conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())),
  // )

  const handleCloseConversation = () => {
    setActiveConversation(null)
  }

  return (
    <div className="container flex bg-white mx-auto h-full max-h-screen min-h-screen overflow-hidden">

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">{activeTab === "unread" ? "Unread" : "Archived"}</h1>
            <div className="flex items-center">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Plus className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus-visible:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="hidden">
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>

            <TabsContent value="unread" className="flex-1 overflow-y-auto mt-0">
              {testConvarsations.length > 0 ? (
                <ConversationList
                  conversations={testConvarsations}
                  activeId={activeConversation?.id}
                  onSelect={setActiveConversation}
                  type="archived"
                />
              ) : (
                <div className="p-4 text-center text-gray-500">No unread messages</div>
              )}
            </TabsContent>

            <TabsContent value="archived" className="flex-1 overflow-y-auto mt-0">
              {testConvarsations.length > 0 ? (
                <ConversationList
                  conversations={testConvarsations}
                  activeId={activeConversation?.id}
                  onSelect={setActiveConversation}
                  type="archived"
                />
              ) : (
                <div className="p-4 text-center text-gray-500">No archived messages</div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Message Thread or Empty State */}
        <div className="flex-1 flex flex-col ">
          {activeConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-3">
                    <img
                      src={activeConversation.avatar || "/placeholder.svg?height=40&width=40&query=person"}
                      alt={activeConversation.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  {/* <div>
                    <h3 className="font-medium">{activeConversation.name}</h3>
                    <p className="text-xs text-gray-500">
                      Last online {activeConversation.lastOnline || "20 hours ago"}
                    </p>
                  </div> */}
                </div>
                <button onClick={handleCloseConversation} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages */}
              {/* <MessageThread conversation={activeConversation} /> */}

              {/* Message Input */}
              <div className="p-3 border-t border-gray-200 ">
                <div className="flex items-center">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z"
                        fill="currentColor"
                      />
                      <path
                        d="M6.5 13.5C7.32843 13.5 8 12.8284 8 12C8 11.1716 7.32843 10.5 6.5 10.5C5.67157 10.5 5 11.1716 5 12C5 12.8284 5.67157 13.5 6.5 13.5Z"
                        fill="currentColor"
                      />
                      <path
                        d="M17.5 13.5C18.3284 13.5 19 12.8284 19 12C19 11.1716 18.3284 10.5 17.5 10.5C16.6716 10.5 16 11.1716 16 12C16 12.8284 16.6716 13.5 17.5 13.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <Input
                    type="text"
                    placeholder="Type message"
                    className="mx-2 border-gray-300 focus-visible:ring-orange-500"
                  />
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Send className="h-5 w-5" />
                  </button>
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
