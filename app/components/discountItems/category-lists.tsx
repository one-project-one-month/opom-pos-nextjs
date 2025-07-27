'use client'
import React, { useState, useEffect } from 'react'
import CategoryCard from './category-card'
import { useFetchCategories } from '@/app/hooks/useFetchCategory'
import Loading from '@/app/(root)/(staff)/loading'

type Props = {
  setCategory: (val: string | null) => void
}

const CategoryList = ({ setCategory }: Props) => {
  const { data: categories, isLoading, error } = useFetchCategories()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    setCategory(selectedCategory)
  }, [selectedCategory])

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
      <div
        onClick={() => setSelectedCategory(null)}
        className={`w-fit h-[48px] rounded-[5px] p-2.5 text-center flex-shrink-0 text-xs md:text-sm lg:text-[16px] flex justify-center items-center ${
          selectedCategory === null
            ? 'bg-[#FB9E3A] text-white'
            : 'text-[#9E9E9E]'
        }`}>
        All
      </div>
      {Array.isArray(categories) &&
        categories.map((cat, idx) => (
          <CategoryCard
            key={idx}
            title={cat.name}
            active={selectedCategory === cat.name}
            setCategory={() => setSelectedCategory(cat.name)}
          />
        ))}
    </div>
  )
}

export default CategoryList
