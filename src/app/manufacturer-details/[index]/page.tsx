'use client';
import React from 'react';
import { useFetch } from '@/app/utils/useFetch';
import { useParams } from 'next/navigation';

type Product = {
  id: string;
  name: string;
  price: number;
};

type ManufacturerData = Product[];

const ManufacturerDetails = () => {
  const { index } = useParams<{ index: string }>();
  
  const { data, loading, error } = useFetch<ManufacturerData>(
    index ? `/manufacturers/${index}/products` : null
  );

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Products for Manufacturer #{index}</h1>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Products for Manufacturer #{index}</h1>
        <div className="bg-red-50 p-4 rounded-lg text-center text-red-600">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products for Manufacturer #{index}</h1>
      {data && data.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((product) => (
            <li key={product.id} className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="font-semibold text-lg mb-2">{product.name}</div>
              <div className="text-gray-600">${product.price}</div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-500">No products found for this manufacturer.</p>
        </div>
      )}
    </div>
  );
};

export default ManufacturerDetails;