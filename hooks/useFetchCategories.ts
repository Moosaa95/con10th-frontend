import { useEffect, useState } from "react"
import { useFetchCategoriesMutation } from "@/states/features/endpoints/general/generalApiSlice"
import { toast } from "sonner"

interface Category {
  id: string
  name: string;
  code: string;
  image?: string;
}

export function useFetchCategories() {
  const [fetchCategories, { isLoading }] = useFetchCategoriesMutation()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await fetchCategories().unwrap()
        if (response.status) {
          setCategories(response.data)
        } else {
          toast.error("Cannot fetch skills")
        }
      } catch {
        toast.error("Failed to fetch skills. Please try again.")
      }
    }

    fetchCategoriesData()
  }, [fetchCategories])

  return { categories, isLoading }
}
