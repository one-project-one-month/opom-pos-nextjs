import React from 'react'
import CategoryCard from './category-card';
import { useFetchCategories } from '../hooks/useFetchCategory';
import { Category } from '../type/category';

const CategoryList = () => {
  const {error, isLoading, data} = useFetchCategories<Category[]>();
  return (
    <div className='flex gap-[10px] overflow-x-auto no-scrollbar'>
        {data?.map((cat, idx) => (
            <CategoryCard key={idx} name={cat.name} active={false} />
        ))}
    </div>
  )
}

export default CategoryList;