import React from 'react'

const ProductSearch = () => {
  return (
    <div className='flex-1 flex justify-end min-w-[120px] lg:min-w-[230px] '>
      <label htmlFor="Search" className="w-full">
        <span className="sr-only">Search</span>
        <div className="relative">
             <span className="absolute inset-y-0 left-7 flex items-center text-[#939393CC]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
          </span>
          <input
            type="text"
            id="Search"
            className="w-full rounded-[40px] border border-[#939393] h-[48px] pl-14 pr-8 text-xs md:text-sm lg:text-[16px] focus:outline-none"
            placeholder="search products"
          />
       
        </div>
      </label>
    </div>
  )
}

export default ProductSearch