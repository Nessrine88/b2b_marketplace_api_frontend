import ManufacturersList from "./ManufacturersList"
import SearchBar from "./SearchBar"

const Hero = () => {
  return (
    <>
      <SearchBar />
    <div className="max-w-screen mx-auto w-7xl mt-28 flex  justify-center items-center">
    
      <ManufacturersList />
    </div>
    </>
    
  )
}

export default Hero