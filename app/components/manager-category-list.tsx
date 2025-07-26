import React, { useState } from 'react'
import CategoryCard from './category-card';
import { Category } from '../type/type';
import { CategoriesResponse } from '../type/product';

type ManagerCategoryListProps = {
  categoryData: CategoriesResponse[];
  handleCategoryClick: (name: string) => void
};
//  ${isActive ? 'bg-[#FB9E3A] text-white' : ''} ${className}

const ManagerCategoryList = ({ categoryData, handleCategoryClick }: ManagerCategoryListProps) => {
  const [name, setName] = useState('');

  const categories = [
    {
      "id": 0,
      "name": "All"
    },
    ...categoryData
  ]

  const handleCategory = (name: string) => {
    handleCategoryClick(name)
    setName(name)
  }
  
  return (
    <div className='flex gap-[10px] overflow-x-auto no-scrollbar'>
      {categories.map((cat) => {
        const isActive = (cat.name === 'All' && !name) || cat.name === name;
        console.log(isActive, name === 'All', !name);
        
        return ((
        <div
          key={cat.id}
          onClick={() => handleCategory(cat.name)}
          className={`w-fit h-[48px] rounded-[5px] p-2.5 text-center text-[#9E9E9E] flex-shrink-0 text-xs md:text-sm lg:text-[16px] flex justify-center items-center cursor-pointer ${isActive && 'bg-[#FB9E3A] text-white'} `}
        >
          {cat.name}
        </div>
      ))
      })}
    </div>
  )
}

export default ManagerCategoryList;