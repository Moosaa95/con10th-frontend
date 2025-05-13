"use client"

import { Search } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FilterSection } from "./FilterSection"
import { useFetchCategories } from '@/hooks/useFetchCategories';
import { Filters } from "@/hooks/use-filters"

interface ExpertFiltersProps {
  filters: Filters
  updateFilter: (key: string, value: any) => void
  resetFilters: () => void
}

export function ExpertFilters({ filters, updateFilter, resetFilters }: ExpertFiltersProps) {
  // Get unique categories from experts
  // const categories = ["Design", "Development", "Project Management", "Marketing", "Content"]
    const {  categories = [] } = useFetchCategories();
    console.log("CATEGORY", categories);
    
  // Get unique skills from experts
  const skills = [
    "Figma",
    "Illustration",
    "AfterEffect",
    "Blender",
    "Adobe Photoshop",
    "Program Management",
    "Agile Project Management",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "Express",
    "MongoDB",
    "SEO",
    "Content Marketing",
  ]

  return (
    <Card className="border-[#e0e4ea] bg-white">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium text-[#09233e]">Filter</CardTitle>
          <Button
            onClick={resetFilters}
            variant="ghost"
            className="h-auto p-0 text-sm text-[#ff5d00] hover:text-[#ff5d00]/80 hover:bg-transparent"
          >
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-4">
        <FilterSection title="Category">
          <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
            <SelectTrigger className="border-[#e0e4ea] bg-white text-[#09233e]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>

        <FilterSection title="Skills">
          <Select value={filters.skills} onValueChange={(value) => updateFilter("skills", value)}>
            <SelectTrigger className="border-[#e0e4ea] bg-white text-[#09233e]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {skills.map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FilterSection>

        <FilterSection title="Availability">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="availability-all"
                checked={filters.availability === "all"}
                onCheckedChange={() => updateFilter("availability", "all")}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="availability-all" className="text-sm text-[#384853]">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="availability-open"
                checked={filters.availability === "open"}
                onCheckedChange={() => updateFilter("availability", "open")}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="availability-open" className="text-sm text-[#384853]">
                Open for new projects
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="availability-busy"
                checked={filters.availability === "busy"}
                onCheckedChange={() => updateFilter("availability", "busy")}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="availability-busy" className="text-sm text-[#384853]">
                Busy
              </Label>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Experience level">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="experience-all"
                checked={filters.experience.includes("all")}
                onCheckedChange={() => {
                  if (filters.experience.includes("all")) {
                    updateFilter(
                      "experience",
                      filters.experience.filter((exp) => exp !== "all"),
                    )
                  } else {
                    updateFilter("experience", ["all"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="experience-all" className="text-sm text-[#384853]">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="experience-entry"
                checked={filters.experience.includes("entry")}
                onCheckedChange={() => {
                  if (filters.experience.includes("entry")) {
                    updateFilter(
                      "experience",
                      filters.experience.filter((exp) => exp !== "entry"),
                    )
                  } else {
                    updateFilter("experience", [...filters.experience.filter((exp) => exp !== "all"), "entry"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="experience-entry" className="text-sm text-[#384853]">
                Entry-level
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="experience-expert"
                checked={filters.experience.includes("expert")}
                onCheckedChange={() => {
                  if (filters.experience.includes("expert")) {
                    updateFilter(
                      "experience",
                      filters.experience.filter((exp) => exp !== "expert"),
                    )
                  } else {
                    updateFilter("experience", [...filters.experience.filter((exp) => exp !== "all"), "expert"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="experience-expert" className="text-sm text-[#384853]">
                Expert
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="experience-junior"
                checked={filters.experience.includes("junior")}
                onCheckedChange={() => {
                  if (filters.experience.includes("junior")) {
                    updateFilter(
                      "experience",
                      filters.experience.filter((exp) => exp !== "junior"),
                    )
                  } else {
                    updateFilter("experience", [...filters.experience.filter((exp) => exp !== "all"), "junior"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="experience-junior" className="text-sm text-[#384853]">
                Junior
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="experience-intermediate"
                checked={filters.experience.includes("intermediate")}
                onCheckedChange={() => {
                  if (filters.experience.includes("intermediate")) {
                    updateFilter(
                      "experience",
                      filters.experience.filter((exp) => exp !== "intermediate"),
                    )
                  } else {
                    updateFilter("experience", [...filters.experience.filter((exp) => exp !== "all"), "intermediate"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="experience-intermediate" className="text-sm text-[#384853]">
                Intermediate
              </Label>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Response Time">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="response-all"
                checked={filters.responseTime.includes("all")}
                onCheckedChange={() => {
                  if (filters.responseTime.includes("all")) {
                    updateFilter(
                      "responseTime",
                      filters.responseTime.filter((rt) => rt !== "all"),
                    )
                  } else {
                    updateFilter("responseTime", ["all"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="response-all" className="text-sm text-[#384853]">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="response-24h"
                checked={filters.responseTime.includes("24h")}
                onCheckedChange={() => {
                  if (filters.responseTime.includes("24h")) {
                    updateFilter(
                      "responseTime",
                      filters.responseTime.filter((rt) => rt !== "24h"),
                    )
                  } else {
                    updateFilter("responseTime", [...filters.responseTime.filter((rt) => rt !== "all"), "24h"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="response-24h" className="text-sm text-[#384853]">
                Within 24 hours
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="response-fast"
                checked={filters.responseTime.includes("fast")}
                onCheckedChange={() => {
                  if (filters.responseTime.includes("fast")) {
                    updateFilter(
                      "responseTime",
                      filters.responseTime.filter((rt) => rt !== "fast"),
                    )
                  } else {
                    updateFilter("responseTime", [...filters.responseTime.filter((rt) => rt !== "all"), "fast"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="response-fast" className="text-sm text-[#384853]">
                Fast responder
              </Label>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Location">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8292aa]" />
            <Input
              type="text"
              placeholder="Search Location"
              value={filters.location}
              onChange={(e) => updateFilter("location", e.target.value)}
              className="pl-10 border-[#e0e4ea] bg-white text-[#09233e] placeholder-[#8292aa]"
            />
          </div>
        </FilterSection>

        <FilterSection title="Ratings">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rating-all"
                checked={filters.rating.includes("all")}
                onCheckedChange={() => {
                  if (filters.rating.includes("all")) {
                    updateFilter(
                      "rating",
                      filters.rating.filter((r) => r !== "all"),
                    )
                  } else {
                    updateFilter("rating", ["all"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="rating-all" className="text-sm text-[#384853]">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rating-5"
                checked={filters.rating.includes("5-5")}
                onCheckedChange={() => {
                  if (filters.rating.includes("5-5")) {
                    updateFilter(
                      "rating",
                      filters.rating.filter((r) => r !== "5-5"),
                    )
                  } else {
                    updateFilter("rating", [...filters.rating.filter((r) => r !== "all"), "5-5"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="rating-5" className="text-sm text-[#384853]">
                5 Stars
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rating-4"
                checked={filters.rating.includes("4-5")}
                onCheckedChange={() => {
                  if (filters.rating.includes("4-5")) {
                    updateFilter(
                      "rating",
                      filters.rating.filter((r) => r !== "4-5"),
                    )
                  } else {
                    updateFilter("rating", [...filters.rating.filter((r) => r !== "all"), "4-5"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="rating-4" className="text-sm text-[#384853]">
                4 Stars
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rating-3"
                checked={filters.rating.includes("3-5")}
                onCheckedChange={() => {
                  if (filters.rating.includes("3-5")) {
                    updateFilter(
                      "rating",
                      filters.rating.filter((r) => r !== "3-5"),
                    )
                  } else {
                    updateFilter("rating", [...filters.rating.filter((r) => r !== "all"), "3-5"])
                  }
                }}
                className="text-[#ff5d00] border-[#c8ced9] data-[state=checked]:bg-[#ff5d00] data-[state=checked]:border-[#ff5d00]"
              />
              <Label htmlFor="rating-3" className="text-sm text-[#384853]">
                3 Stars
              </Label>
            </div>
          </div>
        </FilterSection>
      </CardContent>
    </Card>
  )
}
