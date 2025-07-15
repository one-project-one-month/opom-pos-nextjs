import { useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import React from 'react'

type CategoryCardProps = {
    active?: boolean
    name: string
}

const CategoryCard = ({active = false, name}: CategoryCardProps) => {
  
  const router = useRouter();

  const getCategory = () => {
    const currentQuery = queryString.parse(window.location.search);
    const updatedQuery = { ...currentQuery, category: name };

    const url = queryString.stringifyUrl(
        {
            url: window.location.pathname,
            query: updatedQuery,
        },
        { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
    console.log(`Category clicked: ${name}`);
    
  }

  return (
    <div onClick={getCategory} className={`w-fit h-[48px] rounded-[5px] p-2.5 text-center text-[#9E9E9E] flex-shrink-0 text-xs md:text-sm lg:text-[16px] flex justify-center items-center cursor-pointer ${active ? 'bg-[#FB9E3A] text-white': ''}`}>{name}</div>
  )
}

export default CategoryCard