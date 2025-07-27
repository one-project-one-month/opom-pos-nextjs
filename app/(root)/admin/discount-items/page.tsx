'use client'
import CategoryList from '@/app/components/discountItems/category-lists'
import Loading from '@/app/(root)/(staff)/loading'
import { useFetchProducts } from '@/app/hooks/useFetchProduct'
import DiscountItemsLists from '@/app/components/discountItems/discount-items-lists'
import AddDiscountModal from '@/app/components/discountItems/add-discount-modal'
import { useState } from 'react'

type Product = {
  id: string
  name?: string
  category_id?: string
  price?: number
  discountPrice?: number
  startDate?: string
  endDate?: string
  dis_percent?: number
}

export default function Page() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  return (
    <div className="w-full relative  p-5 flex flex-col">
      <div className="flex justify-between">
        <h1 className="font-light text-2xl">Discount Item Lists</h1>
        <p className="text-red-600 underline">Discount rules</p>
      </div>
      <div className="my-8">
        <CategoryList setCategory={setCategory}></CategoryList>
      </div>
      <DiscountItemsLists
        category={category}
        showAddDiscountModal={(product) => setSelectedProduct(product)}
      />

      {selectedProduct && (
        <AddDiscountModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}
