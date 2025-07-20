'use client'
import React from 'react'
import { ProductCard } from './product-card'
import { useDispatch } from 'react-redux'
import { addOrder } from '../../store/slices/orderSummarySlice'
import { Product } from '../../type/product'
import { useFetchProducts } from '../../hooks/useFetchProduct'
import Loading from '../../(root)/(staff)/(main)/loading'
import { useSearchParams } from 'next/navigation'

const ProductList = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";
  const { error, isLoading, data } = useFetchProducts<Product[]>({ name, category })

  const dispatch = useDispatch()

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
        <div className="text-red-500 font-bold flex space-x-1 md:space-x-2">
          <p>Something went wrong. Please try again later.</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[17px] lg:gap-[20px] overflow-y-auto no-scrollbar items-start">
      {data && data.length > 0 ? (
        data.map((product, i) => (
          <ProductCard
            key={i}
            photo={product?.photo || '/logo.svg'}
            name={product?.name}
            price={product?.price}
            ordersClick={() => dispatch(addOrder(product))}
          />
        ))
      ) : (
        <div className="col-span-full flex justify-center items-center text-lg font-semibold h-32">
          No products found
        </div>
      )}
    </div>
  )
}

export default ProductList
