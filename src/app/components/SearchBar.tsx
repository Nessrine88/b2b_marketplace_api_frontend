'use client'
import React from 'react';

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
    'Machinery',
  ];

  return (
    <div className="md:mt-28 mt-20 px-4 w-full flex justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row rounded-lg overflow-hidden shadow-sm border border-[var(--c4)] bg-[var(--c1)]">
          {/* Dropdown */}
          <div className="relative w-full sm:w-1/3 border-b sm:border-b-0 sm:border-r border-[var(--c4)]">
            <select
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full h-12 pl-4 pr-10 text-sm bg-[var(--c1)] text-neutral-500 appearance-none focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Input */}
          <input
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search manufacturers..."
            className="w-full h-12 px-4 text-sm bg-[var(--c1)] focus:outline-none"
          />

          {/* Button */}
          <button
            type="button"
            className="w-full sm:w-auto h-12 px-6 text-white bg-[var(--c1)] hover:bg-gray-800 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
