
import { useState } from 'react';

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

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({
    availability: "all",
    experience: ["all"],
    responseTime: ["all"],
    rating: ["all"],
    category: "all",
    skills: "all",
    location: "",
    expertType: "all"
  });

  /**
   * Update a specific filter
   * @param filterName The name of the filter to update
   * @param value The new value for the filter
   */
  const updateFilter = (filterName: keyof Filters, value: any) => {
    
    if (Array.isArray(filters[filterName])) {
      if (filterName === "experience" || filterName === "responseTime" || filterName === "rating") {
        // Handle special case for multi-select filters
        setFilters(prev => {
          const currentValues = prev[filterName] as string[];
          
          // If "all" is being selected, clear other selections
          if (value === "all") {
            return {
              ...prev,
              [filterName]: ["all"]
            };
          }
          
          
          if (currentValues.includes("all")) {
            return {
              ...prev,
              [filterName]: [value]
            };
          }
          
          // If value is already selected, remove it (toggle behavior)
          if (currentValues.includes(value)) {
            const newValues = currentValues.filter(v => v !== value);
            // If removing the last value, set back to "all"
            return {
              ...prev,
              [filterName]: newValues.length === 0 ? ["all"] : newValues
            };
          }
          
          
          return {
            ...prev,
            [filterName]: [...currentValues, value]
          };
        });
      } else {
        // Default array handling for other array filters
        setFilters(prev => ({
          ...prev,
          [filterName]: value
        }));
      }
    } else {
      // Simple update for non-array filters
      setFilters(prev => ({
        ...prev,
        [filterName]: value
      }));
    }
  };

  /**
   * Reset all filters to their default values
   */
  const resetFilters = () => {
    setFilters({
      availability: "all",
      experience: ["all"],
      responseTime: ["all"],
      rating: ["all"],
      category: "all",
      skills: "all",
      location: "",
      expertType: "all"
    });
  };

  return {
    filters,
    updateFilter,
    resetFilters
  };
}