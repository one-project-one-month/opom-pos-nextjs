'use client'
import CategoryList from '@/app/components/category-list'
import Loading from '@/app/(root)/(staff)/(main)/loading'
import { useFetchProducts } from '@/app/hooks/useFetchProduct'
import DiscountItemsLists from '@/app/components/discountItems/discount-items-lists'

export default function Page() {
  return (
    <div className="w-full relative h-screen p-5 flex flex-col">
      <div className="flex justify-between">
        <h1 className="font-light text-2xl">Discount Item Lists</h1>
        <p className="text-red-600 underline">Discount rules</p>
      </div>
      <div className="my-8">
        <CategoryList></CategoryList>
      </div>
      <DiscountItemsLists />

      <div className="shadow-lg fixed p-10 bg-white  top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center font-bold text-[20px] mb-4">
          Product Information
        </h1>
        <form action="">
          <div className="flex">
            <div className="flex flex-col">
              <label htmlFor="">Product ID</label>
              <input type="text" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Product Name</label>
              <input type="text" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Category</label>
            <input type="text" />
          </div>

          <div className="flex">
            <div className="flex flex-col">
              <label htmlFor="">Original Price</label>
              <input type="text" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Discount Price</label>
              <input type="text" />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">StartDate</label>
            <input type="text" />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">End Date</label>
            <input type="text" />
          </div>
        </form>
      </div>
    </div>
  )
}
