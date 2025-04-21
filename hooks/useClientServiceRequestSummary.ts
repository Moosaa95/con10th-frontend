// hooks/useFetchExperts.ts
import { useState } from 'react';
import { CategoriesProps, useFetchExpertMutation } from '@/states/features/endpoints/general/generalApiSlice';
import { useFetchClientServiceRequestSummaryMutation } from '@/states/features/endpoints/client/clientApiSlice';


export const useFetchClientServiceRequest = () => {
  const [fetchClientServiceRequestSummary, { isLoading, error }] = useFetchClientServiceRequestSummaryMutation();
  const [data, setData] = useState<CategoriesProps | null>(null);

  const fetchClientService = async (filters: any = {}) => {
    console.log("FILTERS HOOKS", filters);
    
    try {
      const response = await fetchClientServiceRequestSummary(filters).unwrap();
      setData(response);
    } catch (err) {
      console.error('Failed to fetch experts:', err);
    }
  };

  return {
    fetchClientService, // function you call with filters
    data,         // response data
    isLoading,
    error,
  };
};
