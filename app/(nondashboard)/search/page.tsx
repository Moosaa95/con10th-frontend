"use client";

import { useEffect, useState } from 'react';
import { SearchHeader } from './SearchHeader';
import { Filters, useFilters } from '@/hooks/use-filters';
import { useSearch } from '@/hooks/use-search';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExpertFilters } from './FiltersBar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExpertList } from './ExpertList';
import { Pagination } from '@/components/ui/pagination';
import SearchInput from './SearchInput';
// import { useFetchExperts } from '@/hooks/useExpertProfile';
import { experts } from '@/testData';

export default function SearchResults() {
   
  // const [experts, setExperts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const expertsPerPage = 6

  // Initialize filters and search
  const { filters, updateFilter, resetFilters } = useFilters()
  const { searchQuery, setSearchQuery, searchResults } = useSearch(experts)
  // const { fetchExperts, data, isLoading, error } = useFetchExperts();

  // const getApiFilters = () => {
  //   const apiFilters:Filters = {};
    
  //   // Handle availability
  //   if (filters.availability === "open") {
  //     apiFilters.availability = true;
  //   } else if (filters.availability === "busy") {
  //     apiFilters.availability = false;
  //   }
    
  //   // Handle experience level
  //   if (filters.experience && filters.experience.length > 0 && !filters.experience.includes("all")) {
  //     const experienceLevels = {
  //       "beginner": { min: 0, max: 2 },
  //       "intermediate": { min: 2, max: 5 },
  //       "expert": { min: 5, max: 100 }
  //     };
      
  //     // Use the minimum years for the lowest selected level
  //     const selectedLevels = filters.experience.filter(level => level !== "all");
  //     const lowestLevel = selectedLevels.reduce((lowest, level) => {
  //       if (experienceLevels[level].min < experienceLevels[lowest].min) {
  //         return level;
  //       }
  //       return lowest;
  //     }, selectedLevels[0]);
      
  //     apiFilters.years_of_experience = experienceLevels[lowestLevel].min;
  //   }
    
  //   // Handle rating
  //   if (filters.rating && filters.rating.length > 0 && !filters.rating.includes("all")) {
  //     // Extract minimum rating from the lowest selected rating filter
  //     const minRating = Math.min(...filters.rating.map((r) => Number.parseInt(r.split("-")[0])));
  //     apiFilters.min_rating = minRating;
  //   }
    
  //   // Handle category
  //   if (filters.category && filters.category !== "all") {
  //     apiFilters.category = filters.category;
  //   }
    
  //   // Handle skills
  //   if (filters.skills && filters.skills !== "all") {
  //     apiFilters.skills = [filters.skills]; // Expects an array of skill IDs
  //   }
    
  //   // Handle location
  //   if (filters.location && filters.location.trim() !== "") {
  //     apiFilters.location = filters.location.trim();
  //   }
    
  //   return apiFilters;
  // };

  // Load experts data
  // useEffect(() => {
    
  //   const apiFilters = getApiFilters();
    
  //   fetchExperts(apiFilters);
  // }, [])

  // useEffect(() => {
  //   if (data ) {
  //     setExperts(data);
  //   }
  // }, [data]);


  // console.log("EXPERTS", data, 'api filters', experts);

  


  // Calculate pagination
  const indexOfLastExpert = currentPage * expertsPerPage
  const indexOfFirstExpert = indexOfLastExpert - expertsPerPage
  const currentExperts = searchResults.slice(indexOfFirstExpert, indexOfLastExpert)
  const totalPages = Math.ceil(searchResults.length / expertsPerPage)

  // Change page
  const paginate = (pageNumber:number) => setCurrentPage(pageNumber)

  
  return (
    <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#09233e]">Experts for Hire</h1>
          <div className="w-48">
            <Select value={filters.expertType || "all"} onValueChange={(value) => updateFilter("expertType", value)}>
              <SelectTrigger className="border-[#e0e4ea] bg-white text-[#09233e]">
                <SelectValue placeholder="Experts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Experts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Sidebar Filters */}
          {/* <div className="md:col-span-1">
            <ExpertFilters filters={filters} updateFilter={updateFilter} resetFilters={resetFilters} />
          </div> */}

          {/* Main Content */}
          <div className="md:col-span-3">
            <SearchHeader />
            <SearchInput value='' onChange={()=>{}} />

            {/* Results count */}
            <div className="mb-4 text-[#8292aa]">
              Showing {searchResults.length > 0 ? indexOfFirstExpert + 1 : 0} -{" "}
              {Math.min(indexOfLastExpert, searchResults.length)} of {searchResults.length} experts
            </div>

            {/* Expert Cards Grid */}
            <ExpertList experts={experts} />

            {/* Pagination */}
            {searchResults.length > 0 ? (
              // <Pagination
              //   className="mt-8"
              //   currentPage={1}
              //   totalPages={totalPages}
              //   onPageChange={paginate}
              //   prevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              //   nextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            // />
            <div>Pagination</div>
            ) : (
              <Card className="mt-8 text-center py-12 bg-white">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-medium text-[#09233e]">No experts found</h3>
                  <p className="mt-2 text-[#8292aa]">Try adjusting your filters or search term</p>
                  <Button onClick={resetFilters} className="mt-4 bg-[#ff5d00] hover:bg-[#ff5d00]/90">
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
  );
}

