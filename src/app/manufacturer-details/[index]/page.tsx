'use client';
import React, { useState } from 'react';
import { useFetch } from '@/app/Hooks/useFetch';
import { useParams } from 'next/navigation';
import Loading from '@/app/components/Loading';
import { MapPin, Tags } from 'lucide-react';
import Header from '@/app/components/Header';

type Product = {
  id: string;
  name: string;
  price: number;
};

type Manufacturer = {
  name: string;
  category: string;
  city: string;
};

const ManufacturerDetails = () => {
  const { index } = useParams<{ index: string }>();

  const {
    data: products,
    loading,
    error,
  } = useFetch<Product[]>(index ? `/manufacturers/${index}/products` : null);

  const {
    data: manufacturer,
  } = useFetch<Manufacturer>(index ? `/manufacturers/${index}` : null);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center hex-pattern-bg">
        <Loading />
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center hex-pattern-bg">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-md max-w-md text-center">
          <h1 className="text-2xl font-semibold mb-2">Error</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  const totalPages = products ? Math.ceil(products.length / productsPerPage) : 1;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct) || [];

  return (
    <>
      <Header />
      <div className=" p-6 h-[75dvh] mt-10 ">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{manufacturer?.name}</h1>

          <div className="flex justify-center gap-6 mb-10 text-xl text-neutral-500">
            {manufacturer?.category && (
              <div className="flex items-center gap-2">
                <Tags className="w-5 h-5" />
                <span>{manufacturer.category}</span>
              </div>
            )}
            {manufacturer?.city && (
              <div className="flex items-center gap-2 ">
                <MapPin className="w-5 h-5" />
                <span>{manufacturer.city}</span>
              </div>
            )}
          </div>

          {currentProducts.length > 0 ? (
            <>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 ">
                {currentProducts.map((product) => (
                  <li
                    key={product.id}
                    className="hover:bg-gradient-to-r from-gray-200 to-gray-300 bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition"
                  >
                    <h2 className="text-xl font-semibold mb-2 text-black">{product.name}</h2>
                    <p className="text-gray-600">${product.price}</p>
                  </li>
                ))}
              </ul>

              {/* ✅ Pagination controls */}
              <div className="flex fixed justify-center items-center gap-4 mt-52  right-1/2 translate-x-1/2 bottom-5 ">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 mr-5 py-1 text-black rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
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
                  className="text-black px-2 mr-5 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-yellow-800 shadow-md">
              <p>No products found for this manufacturer.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManufacturerDetails;
