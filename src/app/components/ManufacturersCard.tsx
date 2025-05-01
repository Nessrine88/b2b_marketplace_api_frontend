import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Info {
  imageSrc: string
  description: string
  name: string
  category: string
  city: string
  id:number
}

const ManufacturersCard: React.FC<{ info: Info }> = ({ info }) => {
  return (
    <Link href={`/manufacturer-details/${info.id}`} passHref>
      <div className="relative w-[300px] h-[200px] bg-gray-200 rounded-[5px] flex items-center justify-center overflow-hidden perspective-[1000px] shadow-[0_0_0_5px_rgba(255,255,255,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:scale-105 hover:shadow-[0_8px_16px_rgba(255,255,255,0.2)] group">
        <Image src={info.imageSrc} width={300} height={200} alt="car industry" className="object-cover" />
        <div className="absolute top-0 left-0 w-full h-full p-5 box-border bg-gray-200 rotate-x-[-90deg] origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:rotate-x-0">
          <p className="m-0 text-2xl text-[#333] font-bold">{info.name}</p>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">{info.category}</p>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">{info.city}</p>
        </div>
      </div>
    </Link>
  )
}

export default ManufacturersCard
