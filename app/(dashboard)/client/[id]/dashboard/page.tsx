"use client";

import { useEffect } from "react";
import Image from "next/image";
import InfoCard from "@/app/(dashboard)/general-components/InfoCard";
import StatCard from "@/app/(dashboard)/general-components/Stats";
import { useFetchClientServiceRequest } from "@/hooks/useClientServiceRequestSummary";
import { useParams } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { experts, testConvarsations, notifications } from "@/testData";
import { ExpertCard } from "@/app/(nondashboard)/components/cards/ExpertCard";
import { IConversation } from "@/types/expert";
import { Bell } from "lucide-react";

const RecentMessages = ({ conversations }: {
  conversations: IConversation[]
}) => {
  const messages = conversations.map((conv) => {
    const expert = conv.expert
    const lastMessage = conv.messages[conv.messages.length - 1];
    // const isMe = lastMessage.senderId === 'client'
    return ({
      id: conv.id,
      name: expert.first_name + ' ' + expert.last_name,
      avatar: expert.profile_picture || '/default-avatar.png',
      message: lastMessage.content,
      time: new Date(lastMessage.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    })
  }
  );
  return (
    <div className="overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent pr-2">
      <ul className="space-y-4">
        {messages.map((msg) => (
          <li key={msg.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <Image
              src={msg.avatar}
              alt={msg.name}
              width={40}
              height={40}
              className="rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-gray-900 truncate">{msg.name}</span>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const NotificationList = () => {
  return (
    <div className="overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent pr-2">
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification.id}
            className="flex items-start space-x-3 p-3 border-b border-gray-100 last:border-none hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <div className="p-2 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 mb-0.5">{notification.title}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{notification.message}</p>
              {notification.readMore && (
                <button className="mt-2 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors duration-200">
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
  const { fetchClientService, data, isLoading, error } =
    useFetchClientServiceRequest();

  const { fetchUserProfile, user } = useAuth();

  const params = useParams();
  console.log("Params:", params);
  const clientId = params.id as string;

  console.log("Client ID:", clientId);

  // useEffect(() => {
  //   fetchClientService({ client_id: clientId });
  // }, [fetchClientService, clientId]);

  // useEffect(() => {
  //   fetchUserProfile({ client_id: clientId });
  // }, [fetchUserProfile, clientId]);

  console.log("User Profile:", user);

  const summary = data?.data.summary || {};

  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 w-full overflow-x-hidden">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="col-span-1 space-y-8 lg:col-span-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
              Welcome back, {user?.first_name} {user?.last_name}
            </h1>
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-medium text-gray-900">
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard
                icon="📊"
                count={summary?.total_requests || 0}
                label="Total Offers"
                className="transform hover:scale-105 transition-transform duration-200"
              />
              <StatCard
                icon="🔄"
                count={summary?.active_requests || 0}
                label="Active Offers"
                className="transform hover:scale-105 transition-transform duration-200"
              />
              <StatCard
                icon="💰"
                count={summary?.total_spent || 0}
                label="Total Money Spent"
                className="transform hover:scale-105 transition-transform duration-200"
              />
            </div>
          </div>

          <InfoCard
            className="bg-gradient-to-br from-primary-50 to-primary-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            title="Suggested Experts"
            data={experts}
          >
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {experts.slice(0, 4).map((expert) => (
                <ExpertCard
                  expert={expert}
                  key={expert.expert_id}
                  className="transform hover:scale-105 transition-all duration-200 hover:shadow-lg"
                />
              ))}
            </section>
          </InfoCard>
        </div>

        <div className="space-y-8 lg:col-span-1">
          <InfoCard
            className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            title="Recent Messages"
            data={[testConvarsations]}
          >
            <RecentMessages conversations={testConvarsations} />
          </InfoCard>

          <InfoCard
            className="bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            title="Notifications"
            data={[notifications]}
          >
            <NotificationList />
          </InfoCard>
        </div>
      </div>
    </main>
  );
}
