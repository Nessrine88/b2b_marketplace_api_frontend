import React from 'react'

const SearchBar = () => {
  return (
    <div className=' flex mt-28 justify-center items-center '>
        <button
  className=" [--background:#000000] [--color:#ffffff] [--muted:#242424] [--muted-foreground:#9c9c9c] [--border:#2e2e2e] relative inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-[--border] bg-[--background] hover:bg-[--muted] text-[--muted-foreground] hover:text-[--color] px-4 py-2 justify-start rounded-[0.5rem] text-sm font-normal shadow-none h-8 w-md"
  type="button"
>
  <span className="hidden lg:inline-flex">Search docs...</span>
  <span className="inline-flex lg:hidden">Search...</span>
  <kbd
    className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] flex h-5 select-none items-center gap-1 rounded border border-[--border] bg-[--muted] px-1.5 font-mono text-[10px] font-medium opacity-100 [&amp;_span]:text-xs"
  >
    <span>⌘</span>K
  </kbd>
</button>

    </div>
  )
}

export default SearchBar