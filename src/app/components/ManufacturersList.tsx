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
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {currentItems.map((info) => (
                <ManufacturersCard key={info.id} info={info} />
              ))}
            </div>
          </div>
          
          {/* Pagination controls */}
          <div className="flex justify-center mt-8 mb-12 absolute bottom-0 right-1/2 translate-x-1/2">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`text-[var(--c1)] relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
              >
                <span className="sr-only">Previous</span>
                &larr; Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`relative inline-flex items-center px-4 py-2 border ${currentPage === number ? 'bg-neutral-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center text-[var(--c1)] px-2 py-2 rounded-r-md border border-gray-300 ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-50'}`}
              >
                <span className="sr-only">Next</span>
                Next &rarr;
              </button>
            </nav>
          </div>
          
        </>
      )}
    </div>
  );
}

export default ManufacturersList;