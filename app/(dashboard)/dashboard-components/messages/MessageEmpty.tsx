import { Button } from "@/components/ui/button"

export default function MessageEmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="mb-6">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="10" fill="#0A243F" />
          <path
            d="M60 30H20V55L25 50H60V30Z"
            fill="white"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M30 40H50" stroke="#0A243F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 45H40" stroke="#0A243F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="text-xl font-medium mb-2">Start new message</h2>
      <p className="text-gray-500 text-center mb-6">Messages sent after connecting with a client will appear here.</p>
      <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">Write a message</Button>
    </div>
  )
}
