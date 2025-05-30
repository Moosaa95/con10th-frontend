"use client"

import { Button } from "@/components/ui/button"
import {  BellIcon, SearchIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import MobileSidebar from "./MobileSidebar"
// import { useSidebar } from "@/states/sidebar-context"


export default function DashboardNavbar() {
  // const { isOpen, toggleSidebar } = useSidebar()
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/80 backdrop-blur-md transition-all">
      <div className="flex h-16 items-center">
        {/* Sidebar Toggle */}
        {/* <div className="flex-shrink-0 px-4">
          {!isOpen && (
            <button 
              onClick={toggleSidebar} 
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-color-500 transition-all"
            >
              <ArrowRightSquareIcon className="h-5 w-5" />
            </button>
          )}
        </div> */}

        <div className="flex-1 flex items-center justify-between px-4 md:px-6">
          {/* Mobile Logo + Menu */}
          <div className="flex md:hidden items-center gap-4">
            <Link href="/" className="flex-shrink-0">
              <Image src="/assets/images/logo.png" width={92} height={48} alt="Con10th" priority className="h-8 w-auto" />
            </Link>
            <MobileSidebar />
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="flex-shrink-0">
              <Image src="/assets/images/logo.png" width={192} height={48} alt="Con10th" priority className="h-10 w-auto" />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 justify-center max-w-2xl px-4">
            <div className="relative w-full max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for experts..."
                className="h-10 w-full rounded-full border border-gray-200 bg-gray-50/50 pl-10 pr-4 text-sm 
                         placeholder:text-gray-500 focus:border-accent-color-500 focus:outline-none focus:ring-1 
                         focus:ring-accent-color-500 transition-all"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Link 
              href="/notifications" 
              className="p-2 rounded-full text-gray-500 hover:text-accent-color-600 hover:bg-accent-color-50 transition-all"
            >
              <div className="relative">
                <BellIcon className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent-color-500 ring-2 ring-white" />
              </div>
            </Link>

            {/* Look for Experts - Desktop */}
            <div className="hidden md:block">
              <Link href="/experts">
                <Button className="h-10 rounded-full bg-accent-color-600 px-6 text-sm font-medium text-white 
                                 hover:bg-accent-color-700 transition-all">
                  Look for Experts
                </Button>
              </Link>
            </div>

            {/* Profile Menu */}
            <button className="flex-shrink-0 rounded-full p-1 focus:ring-2 focus:ring-accent-color-500 focus:ring-offset-2">
              <img
                src="/placeholder.svg?height=32&width=32&query=person"
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search - Shown below header on mobile */}
      <div className="border-t border-gray-200/80 p-2 md:hidden">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for experts..."
            className="h-10 w-full rounded-full border border-gray-200 bg-gray-50/50 pl-10 pr-4 text-sm 
                     placeholder:text-gray-500 focus:border-accent-color-500 focus:outline-none focus:ring-1 
                     focus:ring-accent-color-500"
          />
        </div>
      </div>
    </header>
  )
}

