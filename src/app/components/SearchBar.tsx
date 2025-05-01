'use client'
import React from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

const SearchBar = ({ onSearch, onCategoryChange }: SearchBarProps) => {
  const categories = [
    'All Categories',
    'Automotive',
    'Electronics',
    'Food & Beverage',
    'Pharmaceuticals',
    'Textiles',
    'Machinery'
  ];

  return (
    <div className='flex mt-28 justify-center items-center'>
      <div className="relative flex w-full max-w-xl bg-white rounded-lg shadow-sm">
        {/* Category Dropdown */}
        <div className="relative">
          <select
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-12 pl-4 pr-8 text-sm border-r-0 rounded-l-lg appearance-none bg-[#f8f8f8] border border-[#e0e0e0] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Search Input */}
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search manufacturers..."
          className="flex-1 h-12 px-4 py-2 text-sm border border-[#e0e0e0] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Search Button */}
        <button
          type="button"
          className="h-12 px-6 text-black bg-black rounded-r-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;