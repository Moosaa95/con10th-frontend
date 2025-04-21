import { Button } from "@/components/ui/button"
import { BellIcon, SearchIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import MobileSidebar from "./MobileSidebar"


export default function DashboardNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100 bg-white md:px-[100px] py-[24px] shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="md:hidden px-3 flex items-center justify-between w-full">
            <Link href="/" className="cursor-pointer">
              <Image src="/assets/images/logo.png" width={92} height={48} alt="Con10th" />
            </Link>
            <MobileSidebar />
        </div>
        <div className="hidden md:flex items-center gap-4 md:gap-6">
          <Link href="/" className="cursor-pointer">
            <Image src="/assets/images/logo.png" width={192} height={48} alt="Con10th" />
          </Link>
        </div>
        <div>
          {/* search for experts */}
          <div className="hidden md:flex items-center">
            {/* put a search icon by the left of the search box */}
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-accent-color-700" />
              <input
                type="text"
                placeholder="Search for experts"
                className="
                  flex h-[56px] border border-input bg-background px-3 
                  py-2 text-sm ring-offset-background file:border-0 
                  file:bg-transparent file:text-sm file:font-medium 
                  placeholder:text-muted-foreground focus-visible:outline-none 
                  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  disabled:cursor-not-allowed disabled:opacity-50
                  w-[529px] rounded-[8px] border-gray-200 bg-gray-50 pl-9 
                  focus-visible:ring-accent-color-700"
              />
              {/* <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              </div> */}
            </div>

          </div>
        </div>
        {/* buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/notifications" className="bg-accent-color-400 w-[38.87px] h-[37.53px] flex items-center justify-center rounded-full p-[6.7] gap-[1.34px] hover:bg-accent-color-500 transition duration-300">
            <BellIcon className="h-6 w-6 text-accent-color-700 hover:text-accent-color-800" />
          </Link>
          <Link href="/experts">
            <Button className="gap-2 w-[196px] h-[56px] bg-accent-color-700 rounded-[100px] py-4 px-8 text-white hover:bg-accent-color-800">Look for Experts</Button>
          </Link>
        </div>

        {/* <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/hire" className="text-sm font-medium hover:text-primary">
            Hire a Talent
          </Link>
          <Link href="/jobs" className="text-sm font-medium hover:text-primary">
            Jobs
          </Link>
        </nav> */}

        {/* <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost" className="text-sm">
              Login Now
            </Button>
          </Link>
          <Link href="/join">
            <Button className="bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90">Join Com10th</Button>
          </Link>
        </div> */}
        {/* <div className="flex items-cetner gap-5">
          <Link href="/login">
            <Button variant="outline" className="text-sm bg-transparent hover:bg-white hover:text-primary-700 rounded-lg">
              Login
            </Button>
          </Link>
          <Link href="/join">
            <Button variant="secondary" className="bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90">Join Con10th</Button>
          </Link>
        </div> */}
      </div>
    </header>
  )
}

