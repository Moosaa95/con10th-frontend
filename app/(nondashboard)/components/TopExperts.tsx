"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ExpertCardLink } from "./cards/TopExpertCard"
import type { ExpertProps } from "./cards/ExpertCard"

export default function TopExperts() {
  const experts: ExpertProps[] = [
    {
      expert_id: "muhammad-basheer-1",
      first_name: "Muhammad",
      last_name: "Basheer",
      profile_picture: "/assets/images/experts/muhammad-basheer-1.jpg",
      verifiedIn: "Design",
      title: "Product Designer",
      skills: [{ name: "Figma" }, { name: "Illustration" }, { name: "Aftereffect" }, { name: "Blender" }, { name: "Machinery Learning" }],
    },
    {
      expert_id: "muhammad-basheer-2",
      first_name: "Muhammad",
      last_name: "Basheer",
      profile_picture: "/assets/images/experts/muhammad-basheer-2.jpg",
      verifiedIn: "Design",
      title: "Graphic Designer",
      skills: [{ name: "Adobe Photoshop" }, { name: "Illustration" }, { name: "Aftereffect" }],
    },
    {
      expert_id: "muhammad-basheer-3",
      first_name: "Muhammad",
      last_name: "Basheer",
      profile_picture: "/assets/images/experts/muhammad-basheer-3.jpg",
      verifiedIn: "Project Management",
      title: "IT Project Manager",
      skills: [{ name: "Scrum Management" }, { name: "Agile Project Management" }],
    },
    {
      expert_id: "muhammad-basheer-4",
      first_name: "Muhammad",
      last_name: "Basheer",
      profile_picture: "/assets/images/experts/muhammad-basheer-4.jpg",
      verifiedIn: "Project Management",
      title: "Agile Project Manager",
      skills: [{ name: "Agile Project Management" }, { name: "Scrum Master Consulting" }],
    },
    {
      expert_id: "muhammad-basheer-5",
      first_name: "Muhammad",
      last_name: "Basheer",
      profile_picture: "/assets/images/hero/hero-two.png",
      verifiedIn: "Project Management",
      title: "Agile Project Manager",
      skills: [{ name: "Agile Project Management" }, { name: "Scrum Master Consulting" }],
    },
    {
      expert_id: "muhammad-basheer-6",
      first_name: "Muhammad",
      last_name: "Basheer",
      profile_picture: "/assets/images/hero/hero-two.png",
      verifiedIn: "Project Management",
      title: "Agile Project Manager",
      skills: [{ name: "Agile Project Management" }, { name: "Scrum Master Consulting" }],
    },
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="w-full py-8 md:py-12 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary-900">Top Experts</h2>
          <div className="flex space-x-2">
            <Button
              onClick={scrollLeft}
              variant="outline"
              size="sm"
              className="rounded-sm border-gray-300 hover:bg-gray-100 h-7 w-7 p-0"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              onClick={scrollRight}
              variant="outline"
              size="sm"
              className="rounded-sm border-gray-300 hover:bg-gray-100 h-7 w-7 p-0"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {experts.map((expert) => (
            <ExpertCardLink key={expert.expert_id} {...expert} />
          ))}
        </div>

        <div className="mt-4">
          <Link
            href="/experts"
            className="inline-flex items-center text-xs text-primary-700 font-medium hover:underline"
          >
            See all Experts
            <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}

