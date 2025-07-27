import React from 'react'
import CategoryCard from './category-card'
import { useFetchCategories } from '@/app/hooks/useFetchCategory'
import Loading from '@/app/(root)/(staff)/loading'

type Props = {
  setCategory: (val: string) => void
}

const CategoryList = ({ setCategory }: Props) => {
  const { data: categories, isLoading, error } = useFetchCategories()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="flex gap-[10px] overflow-x-auto no-scrollbar">
      {Array.isArray(categories) &&
        categories.map((cat, idx) => (
          <CategoryCard
            setCategory={setCategory}
            key={idx}
            title={cat.name}
            active={cat.active}
          />
        ))}
    </div>
  )
}

export default CategoryList
