"use client";
import { ReactNode } from "react";
import DashboardNavbar from "./dashboard-components/DashNav";
import DashboardSidebar from "./dashboard-components/Sidebar";
// import MobileSidebar from "./dashboard-components/MobileSidebar";
import { SidebarProvider } from "@/states/sidebar-context";


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-[#F9FAFB]">
                {/* Top Navbar */}
                <DashboardNavbar />

                {/* Main body (sidebar + content) */}
                <div className="grid grid-cols-12 gap-4">
                    {/* Sidebar */}
                    <div className="col-span-1 hidden md:block">
                        <DashboardSidebar />
                    </div>

                    {/* Main content area */}
                    <div className="col-span-11 flex-1 p-6 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}