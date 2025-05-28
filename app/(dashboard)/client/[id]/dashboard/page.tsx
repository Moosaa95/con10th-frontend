"use client";

import { useEffect } from "react";
import InfoCard from "@/app/(dashboard)/general-components/InfoCard";
import StatCard from "@/app/(dashboard)/general-components/Stats";
import { useFetchClientServiceRequest } from "@/hooks/useClientServiceRequestSummary";
import { useParams } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { experts, testConvarsations, notifications   } from "@/testData";
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
    return({
      id: conv.id,
      name: expert.first_name + ' ' + expert.last_name,
      avatar: expert.profile_picture || '/default-avatar.png',
      message:lastMessage.content,
      time: new Date(lastMessage.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    })
  }
);
  return (
    <ul className="space-y-4">
      {messages.map((msg) => (
        <li key={msg.id} className="flex items-start space-x-3">
          <img
            src={msg.avatar}
            alt={msg.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{msg.name}</span>
              <span className="text-xs text-gray-500">{msg.time}</span>
            </div>
            <p className="text-sm text-gray-700">{msg.message}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

const NotificationList = () => {
  return (
      <ul className="space-y-4">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex items-start space-x-3 border-b pb-3 last:border-none">
            <div className="p-2 rounded-full bg-blue-100">
              <Bell className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{notification.title}</p>
              <p className="text-sm text-gray-600">{notification.message}</p>
              {notification.readMore && (
                <span className="text-xs text-orange-500 font-medium cursor-pointer hover:underline">
                  Read more
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
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

  useEffect(() => {
    fetchClientService({ client_id: clientId });
  }, []);

  useEffect(() => {
    fetchUserProfile({ client_id: clientId });
  }, [clientId]);

  console.log("User Profile:", user);

  const summary = data?.data.summary || {};

  return (
    <main className="container mx-auto p-6 w-full overflow-hidden">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="col-span-1 space-y-6 lg:col-span-4">
          <h1 className="mb-6 text-4xl font-bold text-primary-700">
            Welcome, {user?.first_name} {user?.last_name}
          </h1>

          <div>
            <h2 className="mb-4 text-2xl font-medium text-primary-700">
              Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:col-span-3 gap-4">
              <StatCard
                icon="📊"
                count={summary?.total_requests || 0}
                label="Total Offers"
              />
              <StatCard
                icon="🔄"
                count={summary?.active_requests || 0}
                label="Active Offers"
              />
              <StatCard
                icon="💰"
                count={summary?.total_spent || 0}
                label="Total Money Spent"
              />
            </div>
          </div>

          <InfoCard
            className="bg-primary-100"
            title="Suggested Experts"
            data={experts}
          >
            {/* Render expert list here */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {experts.slice(0, 4).map((expert) => (
                <ExpertCard expert={expert} key={expert.expert_id} />
              ))
              }
            </section>
          </InfoCard>
        </div>

        <div className="space-y-6 lg:col-span-1">
          <InfoCard
            className="bg-white w-full"
            title="Recent Messages"
            data={[testConvarsations]}
          >
            {/* Render message list here */}
            <RecentMessages conversations={testConvarsations} />
          </InfoCard>

          <InfoCard className="bg-white w-full" title="Notification" data={[notifications]}>
            {/* Render notifications here */}
            <NotificationList />
          </InfoCard>
        </div>
      </div>
    </main>
  );
}
