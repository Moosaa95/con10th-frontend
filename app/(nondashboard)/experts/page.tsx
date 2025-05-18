"use client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import SearchInput from "../search/SearchInput"
import { ExpertCard } from "../components/cards/ExpertCard"
import { experts, promos } from "@/testData"
import { Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import PromoSection from "../components/cards/PromoCard"

const CheckboxDiv = ({id, label}:{id:string; label:string}) => {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} className="cursor-pointer" />
      <label htmlFor={id} className="text-sm">{label}</label>
    </div>
  )
}

export interface Filters {
  availability: string; // "all" | "open" | "busy"
  experience: string[]; // ["all"] | ["beginner", "intermediate", "expert"]
  responseTime: string[]; // ["all"] | ["fast", "normal", "slow"]
  rating: string[]; // ["all"] | ["1-2", "3-4", "4-5"]
  category: string; // "all" | specific category ID
  skills: string; // "all" | specific skill ID
  location: string; // location search string
  expertType?: string; 
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

const FilterSidebar = ({ className }: { className?: string }) => (
  <div className={cn("space-y-4", className)}>
    <div className="border-b border-primary-200 mb-2">
      <h2 className="text-xl text-primary-700">Filter</h2>
    </div>
    
    <div className="space-y-4">
      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Category</h3>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Skills</h3>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Availability</h3>
        <div className="p-3 border border-primary-100 rounded-2xl flex flex-col gap-4 shadow-md">
          <CheckboxDiv id="available" label="Open for new projects" />
          <CheckboxDiv id="busy" label="Busy" />
        </div>
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Experience Level</h3>
        <div className="p-3 border border-primary-100 rounded-2xl flex flex-col gap-4 shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <CheckboxDiv id="all" label="All" />
            <CheckboxDiv id="entry" label="Entry Level" />
            <CheckboxDiv id="Expert" label="Expert" />
            <CheckboxDiv id="Junior" label="Junior" />
          </div>
          <CheckboxDiv id="Intermediate" label="Intermediate" />
        </div>
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Response Time</h3>
        <div className="p-3 border border-primary-100 rounded-2xl flex flex-col gap-4 shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <CheckboxDiv id="all" label="All" />
            <CheckboxDiv id="24h" label="Within 24h" />
          </div>
          <CheckboxDiv id="fast" label="Fast responder" />
        </div>
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Location</h3>
        <SearchInput value="" placeholder="Search Location" onChange={()=>{}} />
      </div>

      <div>
        <h3 className="text-lg text-primary-700 font-bold mb-2">Ratings</h3>
        <div className="p-3 border border-primary-100 rounded-2xl flex flex-col gap-4 shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <CheckboxDiv id="all" label="All" />
            <CheckboxDiv id="5star" label="5 Stars" />
            <CheckboxDiv id="4star" label="4 Stars" />
            <CheckboxDiv id="3star" label="3 Stars" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

function Experts() {
  const [isExperts, setIsExperts] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  // Close mobile filter when screen size becomes large
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsMobileFilterOpen(false)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

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
          <FilterSidebar />
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
              <FilterSidebar />
            </SheetContent>
          </Sheet>
        </div>

        <main className="lg:col-span-9 xl:col-span-10 flex flex-col gap-4">
          <section className="p-4 pt-8 bg-primary-700 flex flex-col gap-6 rounded-md">
            <h2 className="text-2xl md:text-3xl text-primary-50">Search Expert Service Providers For Any Project</h2>
            <p className="text-sm text-primary-100">Searching For Exceptional Professionals? CON10TH Is Here To Help.</p>
          </section>

          <section className="w-full">
            <SearchInput 
              value="" 
              placeholder="Search for experts, services, or skills" 
              onChange={()=>{}} 
              className="w-full"
            />
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {isExperts && experts.map((expert) => (
              <ExpertCard expert={expert} key={expert.expert_id} />
            ))}
            {!isExperts && promos.map(({variant,label, title, imageSrc, imageAlt,description, buttonLink, buttonText }, id) => (
              <PromoSection
                key={id}
                variant={variant}
                label={label}
                title={title}
                description={description}
                buttonText={buttonText}
                buttonLink={buttonLink}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
              />
            ))}
          </section>
        </main>
      </div>
    </section>
  )
}

export default Experts