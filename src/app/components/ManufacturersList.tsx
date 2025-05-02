'use client'
import React from 'react'
import ManufacturersCard from './ManufacturersCard'
import { useFetch } from '../Hooks/useFetch'
import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import Loading from './Loading'

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // You can adjust this number
  const { data, loading, error } = useFetch<Manufacturer[]>("/manufacturers");

  // Reset to first page when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  if (loading) {
    return <div className="text-center py-8"><Loading /> </div>;
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

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredManufacturers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredManufacturers.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="">
      <SearchBar 
        onSearch={setSearchQuery} 
        onCategoryChange={setSelectedCategory} 
      />
      {filteredManufacturers.length === 0 ? (
        <div className="text-center py-8">No manufacturers match your search criteria</div>
      ) : (
        <>
          <div className='flex justify-center  items-center'>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {currentItems.map((info) => (
                <ManufacturersCard key={info.id} info={info} />
              ))}
            </div>
          </div>
          
{/* Pagination controls */}
<div className="fixed bottom-10 right-1/2 translate-x-1/2 flex flex-col items-center gap-4">
  <div className="flex items-center gap-4">
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-4 py-2 text-black rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Previous
    </button>

    <div className="flex items-center gap-2">
    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
      <button
        key={number}
        onClick={() => setCurrentPage(number)}
        className={`px-4 py-2 border rounded ${
          currentPage === number
            ? 'bg-neutral-500 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        {number}
      </button>
    ))}
  </div>

    <button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-4 py-2 text-black rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Next
    </button>
  </div>


</div>

          
        </>
      )}
    </div>
  );
}

export default ManufacturersList;