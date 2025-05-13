import { useState, useCallback } from 'react';
import { CategoriesProps, useFetchExpertMutation } from '@/states/features/endpoints/general/generalApiSlice';

export interface ExpertFilters {
  availability?: boolean;
  skills?: string[];
  category?: string;
  years_of_experience?: number;
  min_rating?: number;
  location?: string;
  count?: number;
}

export const useFetchExperts = () => {
  const [fetchExpertMutation, { isLoading, error }] = useFetchExpertMutation();
  const [data, setData] = useState<CategoriesProps | null>(null);

  // Use useCallback to prevent unnecessary re-renders
  const fetchExperts = useCallback(async (filters: ExpertFilters = {}) => {
    try {
      // Format the request payload according to the API expectation
      const payload = { filters };
      
      const response = await fetchExpertMutation(payload).unwrap();
      setData(response);
      return response;
    } catch (err) {
      console.error('Failed to fetch experts:', err);
      return null;
    }
  }, [fetchExpertMutation]);

  return {
    fetchExperts,
    data,
    isLoading,
    error,
  };
};