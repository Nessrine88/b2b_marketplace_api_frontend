import React from 'react'

const ManufacturerDetails = async ({params}:{params: Promise<{index:string}>} ) => {
    const index = (await params).index
  return (
    <div>params :{[index]} </div>
  )
}

export default ManufacturerDetails