"use client";

import Image from "next/image";
import StatCard from "@/app/(dashboard)/general-components/Stats";
import { useFetchClientServiceRequest } from "@/hooks/useClientServiceRequestSummary";
import { useParams } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { experts, testConvarsations, notifications } from "@/testData";
import { ExpertCard } from "@/app/(nondashboard)/components/cards/ExpertCard";
import { IConversation } from "@/types/expert";
import { Bell } from "lucide-react";

const RecentMessages = ({ conversations }: { conversations: IConversation[] }) => {
  const messages = conversations.map((conv) => {
    const expert = conv.expert;
    const lastMessage = conv.messages[conv.messages.length - 1];
    return {
      id: conv.id,
      name: expert.first_name + ' ' + expert.last_name,
      avatar: expert.profile_picture || '/default-avatar.png',
      message: lastMessage.content,
      time: new Date(lastMessage.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  });

  return (
    <div className="overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-primary-200 scrollbar-track-transparent pr-2">
      <ul className="space-y-3">
        {messages.map((msg) => (
          <li 
            key={msg.id} 
            className="flex items-start space-x-3 p-3 hover:bg-primary-50 rounded-lg transition-all duration-200 cursor-pointer group"
          >
            <div className="relative">
              <Image
                src={msg.avatar}
                alt={msg.name}
                width={40}
                height={40}
                className="rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-primary-200 transition-all duration-200"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-primary-900 truncate group-hover:text-primary-700 transition-colors duration-200">
                  {msg.name}
                </span>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2 group-hover:text-primary-600 transition-colors duration-200">
                  {msg.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-primary-800 transition-colors duration-200">
                {msg.message}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NotificationList = () => {
  return (
    <div className="overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-primary-200 scrollbar-track-transparent pr-2">
      <ul className="space-y-3">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="group flex items-start space-x-3 p-3 hover:bg-primary-50 rounded-lg transition-all duration-200"
          >
            <div className="p-2 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm group-hover:from-primary-100 group-hover:to-primary-200 transition-all duration-200">
              <Bell className="w-5 h-5 text-primary-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-primary-900 mb-0.5 group-hover:text-primary-700 transition-colors duration-200">
                {notification.title}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-primary-800 transition-colors duration-200">
                {notification.message}
              </p>
              {notification.readMore && (
                <button className="mt-2 text-xs font-medium text-secondary-600 hover:text-secondary-700 transition-colors duration-200">
                  Read more →
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function ClientDashboard() {
  
  const { data } = useFetchClientServiceRequest();
  const { user } = useAuth();

  const dashboardSummary = data?.data.summary || {};
  console.log(user, 'user data');

  return (
    <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full overflow-x-hidden">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
        {/* Main Content Column */}
        <div className="col-span-1 space-y-6 sm:space-y-8 lg:col-span-4">
          {/* Header */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                Welcome back, {user?.first_name} {user?.last_name}
              </h1>
              <span className="text-sm text-gray-500 bg-primary-50 px-4 py-2 rounded-full">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Overview Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
            <h2 className="text-xl font-semibold text-primary-900 px-2">
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <StatCard
                icon="📊"
                count={dashboardSummary?.total_requests || 0}
                label="Total Service Requests"
                className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm hover:shadow-md transform hover:scale-102 transition-all duration-200"
              />
              <StatCard
                icon="🔄"
                count={dashboardSummary?.active_requests || 0}
                label="Active Requests"
                className="bg-gradient-to-br from-green-50 to-green-100 shadow-sm hover:shadow-md transform hover:scale-102 transition-all duration-200"
              />
              <StatCard
                icon="💰"
                count={dashboardSummary?.total_spent || 0}
                label="Total Money Spent"
                className="bg-gradient-to-br from-orange-50 to-orange-100 shadow-sm hover:shadow-md transform hover:scale-102 transition-all duration-200"
              />
            </div>
          </div>

          {/* Suggested Experts Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-primary-100">
              <h2 className="text-xl font-semibold text-primary-900">Suggested Experts</h2>
              <p className="text-sm text-gray-500 mt-1">Professionals who match your requirements</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                {experts.slice(0, 4).map((expert) => (
                  <ExpertCard
                    expert={expert}
                    key={expert.expert_id}
                    className="bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm hover:shadow-md transform hover:scale-102 transition-all duration-200"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6 lg:col-span-1">
          {/* Recent Messages */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-primary-100">
              <h2 className="text-lg font-semibold text-primary-900">Recent Messages</h2>
            </div>
            <div className="p-4">
              <RecentMessages conversations={testConvarsations} />
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-primary-100">
              <h2 className="text-lg font-semibold text-primary-900">Notifications</h2>
            </div>
            <div className="p-4">
              <NotificationList />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
