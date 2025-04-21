import { ReactNode } from "react";
import DashboardNavbar from "./dashboard-components/DashNav";
import DashboardSidebar from "./dashboard-components/Sidebar";
import MobileSidebar from "./dashboard-components/MobileSidebar";


export default function Layout({ children }:{children: ReactNode}) {
    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            {/* Top Navbar */}
            <DashboardNavbar />

            {/* Main body (sidebar + content) */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <DashboardSidebar />

                {/* Main content area */}
                <main className="flex-1 p-6 overflow-y-auto">
                {children}
                </main>
            </div>
        </div>
    )
}