'use client'
import { useState, useEffect } from 'react';

interface Expert {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  skills?: Array<{
    id: string;
    name: string;
    category?: string;
  }>;
  [key: string]: any; 
}

export function useSearch(experts: Expert[]) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Expert[]>(experts);
  
  useEffect(() => {
    if (!searchQuery.trim()) {
      // If search query is empty, return all experts
      setSearchResults(experts);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    
    // Filter experts based on search query
    const filtered = experts.filter(expert => {
      // Search in basic profile information
      if (expert.username?.toLowerCase().includes(query)) return true;
      if (expert.first_name?.toLowerCase().includes(query)) return true;
      if (expert.last_name?.toLowerCase().includes(query)) return true;
      
      // Check if full name contains query
      const fullName = `${expert.first_name || ''} ${expert.last_name || ''}`.toLowerCase().trim();
      if (fullName && fullName.includes(query)) return true;
      
      // Search in bio
      if (expert.bio?.toLowerCase().includes(query)) return true;
      
      // Search in skills
      if (expert.skills?.some(skill => 
        skill.name.toLowerCase().includes(query) || 
        (skill.category && skill.category.toLowerCase().includes(query))
      )) {
        return true;
      }
      
      if (expert.location?.toLowerCase().includes(query)) return true;
      if (expert.experienceLevel?.toLowerCase().includes(query)) return true;
      
      return false;
    });
    
    setSearchResults(filtered);
  }, [experts, searchQuery]);
  
  return {
    searchQuery,
    setSearchQuery,
    searchResults
  };
}