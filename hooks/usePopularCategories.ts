import { useEffect, useState } from "react"
import { useGetPopularCategoriesMutation } from "@/states/features/endpoints/general/generalApiSlice"
import { toast } from "sonner"

interface Category {
  id: string
  name: string;
  code: string;
  image?: string;
}

export function usePopularCategories() {
  const [getPopularCategories, { isLoading }] = useGetPopularCategoriesMutation()
  const [popularCategories, setPopularCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getPopularCategories().unwrap()
        if (response.status) {
            setPopularCategories(response.data)
        } else {
          toast.error("Cannot fetch skills")
        }
      } catch {
        toast.error("Failed to fetch skills. Please try again.")
      }
    }

    fetchCategories()
  }, [getPopularCategories])

  return { popularCategories, isLoading }
}
