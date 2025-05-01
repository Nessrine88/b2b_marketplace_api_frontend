'use client'
import React, { useEffect, useState } from 'react'
import ManufacturersCard from './ManufacturersCard'
import axios from 'axios'

interface Manufacturer {
  imageSrc: string;
  description: string;
  name: string;
  category: string;
  city: string;
  id:number;
}

const ManufacturersList = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchManufacturerData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/manufacturers");
        
        const transformedData = res.data.map((item: any) => ({
          imageSrc: item.image_url,
          description: item.description,
          name: item.name,
          category: item.category,
          city: item.city,
          id: item.id
        }));
        console.log(transformedData);
        
        setManufacturers(transformedData);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
        setError("Failed to load manufacturers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchManufacturerData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading manufacturers...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (manufacturers.length === 0) {
    return <div className="text-center py-8">No manufacturers found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
      {manufacturers.map((info, id) => (
        <ManufacturersCard key={`${info.name}-${id}`} info={info} />
      ))}
    </div>
  );
}

export default ManufacturersList;