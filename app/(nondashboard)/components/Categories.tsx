"use client"
import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategoryCard } from "./cards/CategoryCard"
import { usePopularCategories } from "@/hooks/usePopularCategories"

export default function PopularCategories() {
  const { popularCategories, isLoading } = usePopularCategories()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  console.log("CAT", popularCategories);
  

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" })
  }

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" })
  }


  return (
    <div className="w-full py-8 md:py-12">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-700">Most popular skills</h2>
          <div className="flex space-x-2">
            <Button onClick={scrollLeft} variant="outline" size="icon" className="rounded-full border-gray-200 hover:bg-gray-100" aria-label="Scroll left">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button onClick={scrollRight} variant="outline" size="icon" className="rounded-full border-gray-200 hover:bg-gray-100" aria-label="Scroll right">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[220px] rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div ref={scrollContainerRef} className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x">
            {popularCategories.map((category) => (
              <CategoryCard key={category.id} id={category.id} name={category.name} image={category.image} />
            ))}
          </div>
        )}

        <div className="mt-6 bg-primary-100 py-2 px-6 rounded-full w-fit">
          <Link href="/categories" className="inline-flex items-center text-primary-700 font-semibold md:text-lg hover:text-primary-800 transition-colors">
            See all Categories
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
