// hooks/useFetchExperts.ts
import { useState } from 'react';
import { CategoriesProps, useFetchExpertMutation } from '@/states/features/endpoints/general/generalApiSlice';


export const useFetchExperts = () => {
  const [fetchExpert, { isLoading, error }] = useFetchExpertMutation();
  const [data, setData] = useState<CategoriesProps | null>(null);

  const fetchExperts = async (filters: any = {}) => {
    console.log("FILTERS HOOKS", filters);
    
    try {
      const response = await fetchExpert(filters).unwrap();
      setData(response);
    } catch (err) {
      console.error('Failed to fetch experts:', err);
    }
  };

  return {
    fetchExperts, // function you call with filters
    data,         // response data
    isLoading,
    error,
  };
};
