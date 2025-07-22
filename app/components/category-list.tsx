import React from 'react'
import CategoryCard from './category-card';
import { useFetchCategories } from '../hooks/useFetchCategory';
import { Category } from '../type/category';

const CategoryList = () => {
  const {error, isLoading, data} = useFetchCategories<Category[]>();
  return (
    <div className='flex gap-[10px] overflow-x-auto no-scrollbar'>
      <CategoryCard className='px-5' name="All" />
        {data?.map((cat, idx) => (
          <CategoryCard key={idx} name={cat.name} />
        ))}
    </div>
  )
}

export default CategoryList;