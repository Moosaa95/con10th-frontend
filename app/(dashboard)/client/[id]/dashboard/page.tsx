"use client";

import { useEffect, useState } from "react";
import InfoCard from "@/app/(dashboard)/general-components/InfoCard";
import StatCard from "@/app/(dashboard)/general-components/Stats";
import { useFetchClientServiceRequest } from "@/hooks/useClientServiceRequestSummary";
import { useParams } from "next/navigation";
import useAuth from "@/hooks/use-auth";

export default function ClientDashboard() {

    const {
        fetchClientService,
        data,
        isLoading,
        error,
    } = useFetchClientServiceRequest();

    const {fetchUserProfile, user} = useAuth();

    const params = useParams();
    console.log("Params:", params);
    const clientId = params.id as string;

    console.log("Client ID:", clientId);

    useEffect(() => {
        fetchClientService({ client_id: clientId });
    }, []);

    useEffect(() => {
        fetchUserProfile({client_id: clientId});
    }, [clientId]);


    console.log("User Profile:", user);
    


    const summary = data?.data.summary || {};

  

  return (
    <main className="container mx-auto p-6 w-full overflow-hidden">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="col-span-1 space-y-6 lg:col-span-4">
          <h1 className="mb-6 text-4xl font-bold text-primary-700">Welcome, {user?.first_name} {user?.last_name}</h1>

          <div>
            <h2 className="mb-4 text-2xl font-medium text-primary-700">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:col-span-3 gap-4">
              <StatCard icon="📊" count={summary?.total_requests || 0} label="Total Offers" />
              <StatCard icon="🔄" count={summary?.active_requests || 0} label="Active Offers" />
              <StatCard icon="💰" count={summary?.total_spent || 0} label="Total Money Spent" />
            </div>
          </div>

          <InfoCard className="bg-primary-100" title="Suggested Experts" data={[]}>
            {/* Render expert list here */}
          </InfoCard>
        </div>

        <div className="space-y-6 lg:col-span-1">
          <InfoCard className="bg-white w-full" title="Recent Messages" data={[]}>
            {/* Render message list here */}
          </InfoCard>

          <InfoCard className="bg-white w-full" title="Notification" data={[]}>
            {/* Render notifications here */}
          </InfoCard>
        </div>
      </div>
    </main>
  );
}
