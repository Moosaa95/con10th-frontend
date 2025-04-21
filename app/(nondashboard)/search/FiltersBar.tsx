"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFetchCategories } from "@/hooks/useFetchCategories"
import type { FiltersState } from "@/states/features/slices/global/globalSlice"
import { Search } from "lucide-react"
import { useCallback } from "react"

interface Category {
    code: string;
    name: string;
  }

interface Availability {
    open: boolean;
    busy: boolean;
  }
interface Experience {
    entry: boolean;
    intermediate: boolean;
    expert: boolean;
  }
interface Ratings {
    all: boolean;
    five: boolean;
    four: boolean;
    three: boolean;
  }
interface Filters {
    category: string;
    availability: Availability;
    experience: Experience;
    location: string;
    ratings: Ratings;
  }
interface FilterSidebarProps {
    filters: FiltersState;
    onFilterChange: (key: string, value: string, extra?: any) => void;
    categories: Category[];
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  categories,
}: FilterSidebarProps) {
//   const { categories } = useFetchCategories()

  const handleCheckboxChange = useCallback(
    (key: string, value: any, isChecked: boolean) => {
      if (isChecked) {
        onFilterChange(key, value, '')
      } else {
        onFilterChange(key, '', '')
      }
    },
    [onFilterChange]
  )

  return (
    <div className="max-w-xs w-full bg-white rounded-lg border border-gray-200 p-6 gap-6 space-y-6">
      <div className="border-b-[1px] border-b-gray-200">
        <h2 className="font-[600] text-primary-700 lg:text-lg">Filter</h2>
      </div>

      {/* Categories */}
      <div className="gap-[18px]">
        <h3 className="text-primary-700 font-[600] text-lg">Categories</h3>
        <Select
           value={filters.category}
           onValueChange={(value) => {
             console.log("Selected:", value);
             onFilterChange("category", value);
           }}
        >
          <SelectTrigger className="w-full border-gray-200">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories &&
              categories.map((category) => (
                <SelectItem key={category.code} value={category.code}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h3 className="text-primary-700 font-[600] mb-3">Availability</h3>
        <div className="flex items-start space-y-2 flex-col border border-gray-200 rounded-lg px-2 py-5">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="open-projects"
              checked={filters.availability?.open || false}
              onCheckedChange={(checked) =>
                handleCheckboxChange("availability", "open", !!checked)
              }
              className="data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700"
            />
            <Label
              htmlFor="open-projects"
              className="text-gray-700 cursor-pointer"
            >
              Open for new projects
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="busy"
              checked={filters.availability?.busy || false}
              onCheckedChange={(checked) =>
                handleCheckboxChange("availability", "busy", !!checked)
              }
              className="border-gray-300 data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700"
            />
            <Label htmlFor="busy" className="text-gray-700 cursor-pointer">
              Busy
            </Label>
          </div>
        </div>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <h3 className="text-primary-700 font-medium mb-3">Experience Level</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="entry-all"
                checked={filters.experience?.all === true}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("experience", "all", !!checked)
                }
                className="data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700"
              />
              <Label htmlFor="entry-all" className="text-gray-700 cursor-pointer">
                All
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="entry"
                checked={filters.experience?.entry === true}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("experience", "entry", !!checked)
                }
                className="data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700"
              />
              <Label htmlFor="entry" className="text-gray-700 cursor-pointer">
                Entry Level
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="intermediate"
                checked={filters.experience?.intermediate === true}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("experience", "intermediate", !!checked)
                }
                className="data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700"
              />
              <Label htmlFor="intermediate" className="text-gray-700 cursor-pointer">
                Intermediate
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      {/* <div className="mb-6">
        <h3 className="text-primary-700 font-medium mb-3">Location</h3>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-orange-500" />
          </div>
          <Input
            type="text"
            placeholder="Search Location"
            className="pl-10 border-gray-200 focus-visible:ring-orange-500"
            value={filters.location || ""}
            onChange={(e) =>
              onFilterChange("location", e.target.value, null)
            }
          />
        </div>
      </div> */}

      {/* Ratings */}
      {/* <div className="mb-6">
        <h3 className="text-primary-700 font-medium mb-3">Ratings</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="grid grid-cols-2 gap-2">
            {["all", "5", "4", "3"].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`ratings-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("rating", rating, !!checked)
                  }
                  className="data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700"
                />
                <Label
                  htmlFor={`ratings-${rating}`}
                  className="text-gray-700 cursor-pointer"
                >
                  {rating === "all" ? "All" : `${rating} Stars`}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  )
}
