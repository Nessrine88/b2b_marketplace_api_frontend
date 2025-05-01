// components/ManufacturersList.tsx
import React from 'react'
import ManufacturersCard from './ManufacturersCard'

const infos = [
  {
    imageSrc: '/cars.jpeg',
    description: 'vsjhgkughzdcuzch'
  },
  {
    imageSrc: '/cars.jpeg',
    description: 'vsjhgkughzdcuzch'
  },
  {
    imageSrc: '/cars.jpeg',
    description: 'vsjhgkughzdcuzch'
  },
  {
    imageSrc: '/cars.jpeg',
    description: 'vsjhgkughzdcuzch'
  },
]

const ManufacturersList = () => {
  return (
    <div className="grid grid-cols-4 gap-16">
      {infos.map((info, index) => (
        <ManufacturersCard key={index} info={info} />
      ))}
    </div>
  )
}

export default ManufacturersList
