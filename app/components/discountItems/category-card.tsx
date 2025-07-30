import React from 'react'

type CategoryCardProps = {
  active: boolean
  title: string
  setCategory: () => void
}

const CategoryCard = ({ active, title, setCategory }: CategoryCardProps) => {
  return (
    <div
      onClick={setCategory}
      className={`w-fit h-[48px] rounded-[5px] p-2.5 text-center text-[#9E9E9E] flex-shrink-0 text-xs md:text-sm lg:text-[16px] flex justify-center items-center ${
        active ? 'bg-[#FB9E3A] text-white' : ''
      }`}>
      {title}
    </div>
  )
}

export default CategoryCard
