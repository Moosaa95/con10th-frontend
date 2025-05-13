import { useDispatch, useSelector } from 'react-redux';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RootState } from '@/states/store';
import { setSearchTerm } from '@/states/features/slices/global/globalSlice';


export function SearchHeader() {
  const dispatch = useDispatch();
  const { searchTerm } = useSelector((state: RootState) => state.global);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the onChange of Input
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
  };
  
  return (
    <div className="bg-primary-700 p-8 text-white">
      <h1 className="mb-6 text-2xl font-bold">Search Expert Service Providers For Any Project</h1>
      <h2 className="mb-4 text-sm">Looking for Experienced Professionals? ClubHQ is here to help!</h2>
    </div>
  );
}