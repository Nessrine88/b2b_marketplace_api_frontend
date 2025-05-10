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
      <div className="card">
        <Image src={info.imageSrc} width={200} height={200} alt="car industry" className="object-cover rounded-4xl" />
        <div className="my-10">
          <p className="m-0 text-2xl text-[#333] font-bold">{info.name}</p>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">{info.category}</p>
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">{info.city}</p>
        </div>
      </div>
    </Link>
  )
}

export default ManufacturersCard
