"use client";

import { ReactNode } from "react";
import DashboardNavbar from "./dashboard-components/DashNav";
import DashboardSidebar from "./dashboard-components/Sidebar";
import { SidebarProvider } from "@/states/sidebar-context";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
                <DashboardNavbar />

                <div className="flex-1 flex">
                    <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-200 bg-white">
                        <div className="sticky top-0 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
                            <DashboardSidebar />
                        </div>
                    </aside>

                    <main className="flex-1 min-w-0">
                        <div className="container mx-auto px-4 lg:px-8 py-6 max-w-[1600px]">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}