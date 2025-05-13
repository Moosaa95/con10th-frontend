import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface Availability {
//     open: boolean;
//     busy: boolean;
// }

// export interface Experience {
//     all: boolean;
//     entry: boolean;
//     intermediate: boolean;
//     expert: boolean;
// }
// export interface FiltersState {
//     priceRange: [number, number] | [null, null]; 
//     skill?: string; 
//     category?: string; 
//     serviceType?: string; 
//     rating?: number; 
//     availability?: Availability; 
//     experience?: Experience;

//     // location?: string; 
//     sortBy?: "price" | "rating" | "newest"; // Sorting preference
//     // experienceLevel?: "beginner" | "intermediate" | "expert"; // Level of expertise
    
// }

// interface InitialStateTypes {
//     filters: FiltersState;
//     isFilterFullOpen: boolean;
//     viewMode: "grid" | "list"
// }


// export const initialState: InitialStateTypes  = {
//     isFilterFullOpen: false,
//     filters: {
//         skill: "Plumber",
//         priceRange: [null, null],
//         category: "any",
//         sortBy: "price",
//     },
//     viewMode: "grid"
// };


// export const globalSlice = createSlice({
//     name: 'global',
//     initialState,
//     reducers: {
//         setFilters: (state, action:PayloadAction<Partial<FiltersState>>) => {
//             state.filters = {...state.filters, ...action.payload}
//         },
//         toggleFilterFullOpen: (state) => {
//             state.isFilterFullOpen = !state.isFilterFullOpen
//         },
//         setViewMode: (state, action:PayloadAction<"grid" | "list">) => {
//             state.viewMode = action.payload
//         }
//     }
// })

// export const {setFilters, toggleFilterFullOpen, setViewMode} = globalSlice.actions;

// export default globalSlice.reducer;

interface FilterState {
    categories: string[];
    skills: string[];
    isAvailable: boolean | null;
    experienceLevel: string[];
    minRating: number | null;
    location: string;
    searchTerm: string;
    ordering: string;
    page: number;
}


const initialState: FilterState = {
    categories: [],
    skills: [],
    isAvailable: null,
    experienceLevel: [],
    minRating: null,
    location: '',
    searchTerm: '',
    ordering: '',
    page: 1,
  };

  

  const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
      setCategories: (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
        state.page = 1; // Reset to first page on filter change
      },
      setSkills: (state, action: PayloadAction<string[]>) => {
        state.skills = action.payload;
        state.page = 1;
      },
      setAvailability: (state, action: PayloadAction<boolean | null>) => {
        state.isAvailable = action.payload;
        state.page = 1;
      },
      setExperienceLevel: (state, action: PayloadAction<string[]>) => {
        state.experienceLevel = action.payload;
        state.page = 1;
      },
      setMinRating: (state, action: PayloadAction<number | null>) => {
        state.minRating = action.payload;
        state.page = 1;
      },
      setLocation: (state, action: PayloadAction<string>) => {
        state.location = action.payload;
        state.page = 1;
      },
      setSearchTerm: (state, action: PayloadAction<string>) => {
        state.searchTerm = action.payload;
        state.page = 1;
      },
      setOrdering: (state, action: PayloadAction<string>) => {
        state.ordering = action.payload;
      },
      setPage: (state, action: PayloadAction<number>) => {
        state.page = action.payload;
      },
      resetFilters: () => initialState,
    },
  });

  export const {
    setCategories,
    setSkills,
    setAvailability,
    setExperienceLevel,
    setMinRating,
    setLocation,
    setSearchTerm,
    setOrdering,
    setPage,
    resetFilters,
  } = globalSlice.actions;
  
  export default globalSlice.reducer;
  