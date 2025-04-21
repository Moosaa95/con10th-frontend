import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}


export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    if (totalPages <= 1) {
        return null; // No pagination needed if there's only one page
    }
    if (currentPage < 1 || currentPage > totalPages) {
        throw new Error("Invalid current page number");
    }
    if (totalPages < 1) {
        throw new Error("Total pages must be at least 1");
    }
    if (currentPage < 1 || currentPage > totalPages) {
        throw new Error("Current page must be between 1 and total pages");
    }
    
    return (
      <div className="flex items-center space-x-2">
        <button
          className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
  
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`w-8 h-8 rounded-md flex items-center justify-center ${
              currentPage === index + 1 ? "bg-orange-500 text-white" : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {index + 1}
          </button>
        ))}
  
        <button
          className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    )
  }
  