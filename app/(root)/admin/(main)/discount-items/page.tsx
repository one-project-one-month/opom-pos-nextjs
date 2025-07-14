'use client'
import CategoryList from '@/app/components/category-list'
import Loading from '@/app/(root)/(staff)/(main)/loading'
import { useFetchProducts } from '@/app/hooks/useFetchProduct'
import DiscountItemsLists from '@/app/components/discountItems/discount-items-lists'

export default function Page() {
  return (
    <div className="w-full h-screen p-5 flex flex-col">
      <div className="flex justify-between">
        <h1 className="font-light text-2xl">Discount Item Lists</h1>
        <p className="text-red-600 ">Discount rules</p>
      </div>
      <div className="my-8">
        <CategoryList></CategoryList>
      </div>
      <DiscountItemsLists />
    </div>
  )
}
