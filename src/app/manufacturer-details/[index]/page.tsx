'use client';
import React from 'react';
import { useFetch } from '@/app/Hooks/useFetch';
import { useParams } from 'next/navigation';
import Loading from '@/app/components/Loading';
import { MapPin, Tags } from 'lucide-react';


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

  if (loading) {
    return (
      <div className="p-6 hex-pattern-bg w-full h-screen">
        <h1 className="text-2xl font-bold mb-6">Products for Manufacturer #{index}</h1>
        <h2>{manufacturer?.name}</h2>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-gray-500"></p>
        </div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 mt-28 hex-pattern-bg w-full h-screen">
        <h1 className="text-2xl font-bold mb-6">Products for Manufacturer #{index}</h1>
        <div className="bg-red-50 p-4 rounded-lg text-center text-red-600">
          <p>Error: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full flex justify-center hex-pattern-bg h-full">
      <div className="md:m-28 w-full text-center">
        <h1 className="text-5xl lg:text-7xl text-center font-bold mb-10">
          {manufacturer?.name ? `${manufacturer.name}` : ''}
        </h1>
      
          <ul className='flex justify-center text-bold text-xl mb-10'>
          <li className='flex items-center mr-4'>
          <Tags className="w-5 h-5 mx-2" />
              {manufacturer?.category} 
            </li>
           
            <li className='flex items-center'>
            <MapPin className="w-5 h-5 mx-2" />
              {`${ manufacturer?.city}` }
            </li>
          </ul>
 
        {products && products.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li
                key={product.id}
                className="bg-[var(--c1)] border p-4 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div className="font-semibold text-lg mb-2">{product.name}</div>
                <div className="text-[var(--c4)] ">${product.price}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-[var(--c1)] p-4 rounded-lg text-center">
            <p className=" text-[var(--c4)] ">No products found for this manufacturer.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManufacturerDetails;
