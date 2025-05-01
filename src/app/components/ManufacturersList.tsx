'use client'
import React from 'react'
import ManufacturersCard from './ManufacturersCard'
import { useFetch } from '../utils/useFetch'
import { useState } from 'react'
import SearchBar from './SearchBar'

interface Manufacturer {
  imageSrc: string;
  description: string;
  name: string;
  category: string;
  city: string;
  id: number;
}

const ManufacturersList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const { data, loading, error } = useFetch<Manufacturer[]>("/manufacturers");

  if (loading) {
    return <div className="text-center py-8">Loading manufacturers...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Failed to load manufacturers. Please try again later.</div>;
  }

  if (!data || data.length === 0) {
    return <div className="text-center py-8">No manufacturers found</div>;
  }

  const manufacturers = data.map((item: any) => ({
    imageSrc: item.image_url || '',
    description: item.description || '',
    name: item.name || '',
    category: item.category || '',
    city: item.city || '',
    id: item.id || 0
  }));

  // Filter manufacturers with safe property access
  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    const searchLower = searchQuery.toLowerCase();
    const nameLower = manufacturer.name?.toLowerCase() || '';
    const descLower = manufacturer.description?.toLowerCase() || '';
    const cityLower = manufacturer.city?.toLowerCase() || '';
    
    const matchesSearch = nameLower.includes(searchLower) || 
                         descLower.includes(searchLower) ||
                         cityLower.includes(searchLower);
    
    const matchesCategory = selectedCategory === 'All Categories' || 
                          manufacturer.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4">
      <SearchBar 
        onSearch={setSearchQuery} 
        onCategoryChange={setSelectedCategory} 
      />
      {filteredManufacturers.length === 0 ? (
        <div className="text-center py-8">No manufacturers match your search criteria</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {filteredManufacturers.map((info) => (
            <ManufacturersCard key={info.id} info={info} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ManufacturersList;