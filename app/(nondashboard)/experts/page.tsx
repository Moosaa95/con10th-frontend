/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import { offersData, promos } from "@/testData"
import { Filter, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SearchInput from "../search/SearchInput"
import { ExpertCard } from "../components/cards/ExpertCard"
import PromoSection from "../components/cards/PromoCard"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import type { Expert } from "@/types/expert"
import { useFetchExpertQuery } from "@/states/features/endpoints/general/generalApiSlice"
import OfferCard from "@/components/offers/OfferCard"

const CheckboxDiv = ({id, label}:{id:string; label:string}) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} className="cursor-pointer" />
      <label htmlFor={id} className="text-sm">{label}</label>
    </div>
  )
}

export interface Filters {
  availability: string
  experience: string[]
  responseTime: string[]
  rating: string[]
  category: string
  skills: string
  location: string
  expertType?: string
}

const initialFilters: Filters = {
  availability: "all",
  experience: ["all"],
  responseTime: ["all"],
  rating: ["all"],
  category: "all",
  skills: "all",
  location: "",
  expertType: "all"
}

interface FilterSidebarProps {
  className?: string;
  filters: Filters;
  updateFilter: (key: keyof Filters, value: any) => void;
  resetFilters: () => void;
}

const FilterSidebar = ({ className, filters, updateFilter, resetFilters }: FilterSidebarProps) => (
  <div className={cn("space-y-4", className)}>
    <div className="flex justify-between items-center border-b border-primary-200 mb-2 pb-2">
      <h2 className="text-xl text-primary-700">Filter</h2>
      <Button
        variant="ghost"
        className="text-sm text-primary-600 hover:text-primary-800"
        onClick={resetFilters}
      >
        Reset All
      </Button>
    </div>
    
    <div className="space-y-4">
      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Category</h3>
        <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Development">Development</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Writing">Writing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Availability</h3>
        <div className="p-3 border border-primary-100 rounded-2xl flex flex-col gap-4 shadow-md">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="availability-open" 
              checked={filters.availability === "open"}
              onCheckedChange={() => updateFilter("availability", filters.availability === "open" ? "all" : "open")} 
            />
            <label htmlFor="availability-open" className="text-sm">Open for new projects</label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="availability-busy" 
              checked={filters.availability === "busy"}
              onCheckedChange={() => updateFilter("availability", filters.availability === "busy" ? "all" : "busy")} 
            />
            <label htmlFor="availability-busy" className="text-sm">Busy</label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Experience Level</h3>
        <div className="p-3 border border-primary-100 rounded-2xl flex flex-col gap-4 shadow-md">
          <div className="grid grid-cols-2 gap-4">
            {['all', 'entry', 'junior', 'expert'].map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox 
                  id={`experience-${level}`}
                  checked={filters.experience.includes(level)}
                  onCheckedChange={() => {
                    if (level === 'all') {
                      updateFilter('experience', filters.experience.includes('all') ? [] : ['all']);
                    } else {
                      const newExp = filters.experience.includes(level)
                        ? filters.experience.filter(e => e !== level)
                        : [...filters.experience.filter(e => e !== 'all'), level];
                      updateFilter('experience', newExp.length ? newExp : ['all']);
                    }
                  }}
                />
                <label htmlFor={`experience-${level}`} className="text-sm capitalize">
                  {level === 'all' ? 'All' : `${level} Level`}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Response Time</h3>
        <div className="p-3 border border-primary-100 rounded-2xl flex flex-col gap-4 shadow-md">
          <div className="grid grid-cols-2 gap-4">
            {['all', '24h', 'fast'].map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox 
                  id={`response-${time}`}
                  checked={filters.responseTime.includes(time)}
                  onCheckedChange={() => {
                    if (time === 'all') {
                      updateFilter('responseTime', filters.responseTime.includes('all') ? [] : ['all']);
                    } else {
                      const newTimes = filters.responseTime.includes(time)
                        ? filters.responseTime.filter(t => t !== time)
                        : [...filters.responseTime.filter(t => t !== 'all'), time];
                      updateFilter('responseTime', newTimes.length ? newTimes : ['all']);
                    }
                  }}
                />
                <label htmlFor={`response-${time}`} className="text-sm">
                  {time === 'all' ? 'All' : time === '24h' ? 'Within 24h' : 'Fast responder'}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Location</h3>
        <SearchInput 
          value={filters.location} 
          placeholder="Search Location" 
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFilter("location", e.target.value)} 
        />
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Ratings</h3>
        <div className="p-3 border border-primary-100 rounded-2xl flex flex-col gap-4 shadow-md">
          <div className="grid grid-cols-2 gap-4">
            {['all', '5-5', '4-5', '3-5'].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox 
                  id={`rating-${rating}`}
                  checked={filters.rating.includes(rating)}
                  onCheckedChange={() => {
                    if (rating === 'all') {
                      updateFilter('rating', filters.rating.includes('all') ? [] : ['all']);
                    } else {
                      const newRatings = filters.rating.includes(rating)
                        ? filters.rating.filter(r => r !== rating)
                        : [...filters.rating.filter(r => r !== 'all'), rating];
                      updateFilter('rating', newRatings.length ? newRatings : ['all']);
                    }
                  }}
                />
                <label htmlFor={`rating-${rating}`} className="text-sm">
                  {rating === 'all' ? 'All' : `${rating.split('-')[0]}+ Stars`}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

function Experts() {
  const [isExperts, setIsExperts] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const itemsPerPage = 8
  const { data: experts } = useFetchExpertQuery()
  console.log(experts, 'data')
  const [filteredExperts, setFilteredExperts] = useState(experts || [])

  // Apply filters to experts
  const applyFilters = useCallback(() => {
    let result = [...experts || []];

    // Filter by availability
    if (filters.availability !== "all") {
      result = result.filter(expert => 
        filters.availability === "open" ? expert.is_available : !expert.is_available
      );
    }

    // Filter by experience level
    if (!filters.experience.includes("all")) {
      result = result.filter(expert => 
        filters.experience.includes(expert.experience_level.toLowerCase())
      );
    }

    // Filter by response time
    if (!filters.responseTime.includes("all")) {
      result = result.filter(expert => {
        if (filters.responseTime.includes("fast")) {
          return expert.response_time === "fast";
        }
        if (filters.responseTime.includes("24h")) {
          return expert.response_time === "Within 24 hours";
        }
        return true;
      });
    }

    // Filter by rating
    if (!filters.rating.includes("all")) {
      result = result.filter(expert => {
        return filters.rating.some(rating => {
          const [min] = rating.split("-").map(Number);
          return expert.rating >= min;
        });
      });
    }

    // Filter by category
    if (filters.category !== "all") {
      result = result.filter(expert => expert.category === filters.category);
    }

    // Filter by skills
    if (filters.skills !== "all") {
      result = result.filter(expert => 
        expert.skills.some(skill => skill.name === filters.skills)
      );
    }

    // Filter by location
    if (filters.location.trim()) {
      const searchLocation = filters.location.trim().toLowerCase();
      result = result.filter(expert => 
        expert.location.toLowerCase().includes(searchLocation)
      );
    }

    setFilteredExperts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, experts]);

  // Update filters
  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  // Calculate pagination values based on filtered experts
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExperts = filteredExperts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredExperts.length / itemsPerPage);

  // Handle page change with loading state
  const handlePageChange = async (page: number) => {
    setIsLoading(true)
    setCurrentPage(page)
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Simulate loading delay for smoother transition
    await new Promise<void>(resolve => setTimeout(resolve, 300))
    setIsLoading(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        handlePageChange(currentPage - 1)
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        handlePageChange(currentPage + 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, totalPages])

  // Close mobile filter when screen size becomes large
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMobileFilterOpen(false)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Generate array of page numbers to show
  const getPageNumbers = () => {
    const pageNumbers: (number | 'ellipsis')[] = []
    if (totalPages <= 7) {
      // If 7 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always show first page
      pageNumbers.push(1)
      
      if (currentPage > 3) {
        pageNumbers.push('ellipsis')
      }
      
      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pageNumbers.push(i)
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push('ellipsis')
      }
      
      // Always show last page
      pageNumbers.push(totalPages)
    }
    return pageNumbers
  }

  return (
    <section className="flex flex-col gap-4 px-4 py-4 md:px-6 lg:px-8 bg-primary-50 min-h-screen">
      <section className="flex items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700">Experts For Hire</h1>
        <Select 
          onValueChange={(value: string) => setIsExperts(value === "experts")}
          defaultValue="experts"
        >
          <SelectTrigger className="w-[120px] md:w-[150px]">
            <SelectValue placeholder="Experts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="experts">Experts</SelectItem>
            <SelectItem value="offers">Offers</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 bg-white shadow-md rounded-lg p-4">
          <FilterSidebar 
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
          />
        </aside>

        {/* Mobile Filter Button & Sheet */}
        <div className="lg:hidden">
          <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] sm:w-[400px] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <FilterSidebar
                filters={filters}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
              />
            </SheetContent>
          </Sheet>
        </div>

        <main className="lg:col-span-9 xl:col-span-10 flex flex-col gap-4">
          <section id="experts-header" className="p-4 pt-8 bg-primary-700 flex flex-col gap-6 rounded-md">
            <h2 className="text-2xl md:text-3xl text-primary-50">Search Expert Service Providers For Any Project</h2>
            <p className="text-sm text-primary-100">Searching For Exceptional Professionals? CON10TH Is Here To Help.</p>
          </section>

          <section id="experts-header-search" className="w-full">
            <SearchInput 
              value={filters.skills} 
              placeholder="Search for experts, services, or skills" 
              onChange={(e) => updateFilter("skills", e.target?.value || "all")}
              className="w-full"
            />
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {isExperts && isLoading ? (
              // Add loading state for cards
              Array(itemsPerPage).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-[420px]" />
              ))
            ) : (
              isExperts && currentExperts.map((expert: Expert) => (
                <ExpertCard expert={expert} key={expert.expert_id} />
              ))
            )}
            {!isExperts && offersData.map((offer, id) => (
              <OfferCard
                key={id}
                offer={offer}
              />
            ))}
          </section>

          {/* Pagination */}
          {(isExperts && experts && experts) && experts.length > itemsPerPage && (
            <div className="mt-8">
              <Pagination aria-label="Navigate experts pages">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                      className={cn(
                        "cursor-pointer",
                        currentPage <= 1 ? "pointer-events-none opacity-50" : "hover:bg-primary-100"
                      )}
                      aria-disabled={currentPage <= 1}
                      aria-label="Go to previous page"
                    />
                  </PaginationItem>
                  
                  {getPageNumbers().map((pageNumber, index) => (
                    <PaginationItem key={index}>
                      {pageNumber === 'ellipsis' ? (
                        <PaginationEllipsis aria-hidden="true" />
                      ) : (
                        <PaginationLink
                          onClick={() => handlePageChange(pageNumber)}
                          isActive={currentPage === pageNumber}
                          className={cn(
                            "cursor-pointer",
                            "hover:bg-primary-100",
                            currentPage === pageNumber && "bg-primary-200"
                          )}
                          aria-current={currentPage === pageNumber ? "page" : undefined}
                          aria-label={`Page ${pageNumber}`}
                        >
                          {pageNumber}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                      className={cn(
                        "cursor-pointer",
                        currentPage >= totalPages ? "pointer-events-none opacity-50" : "hover:bg-primary-100"
                      )}
                      aria-disabled={currentPage >= totalPages}
                      aria-label="Go to next page"
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>

              <div className="mt-4 text-center text-sm text-gray-600">
                Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, experts?.length)} of {experts?.length} experts
              </div>
            </div>
          )}
        </main>
      </div>
    </section>
  )
}

export default Experts