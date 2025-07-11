'use client'
import React from 'react'
import { ProductCard } from './product-card'
import { useDispatch } from 'react-redux'
import { addOrder } from '../store/slices/orderSummarySlice'
import { Product } from '../type/product'
import { useFetchProducts } from '../hooks/useFetchProduct'
import Loading from '../(root)/(staff)/(main)/loading'

const ProductList = () => {
  const { error, isLoading, data } = useFetchProducts<Product[]>()

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
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="h-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[17px] lg:gap-[20px] overflow-y-auto no-scrollbar">
      {data?.map((product, i) => (
        <ProductCard
          key={i}
          photo={product?.photo || ''}
          name={product?.name}
          price={product?.price}
          ordersClick={() => dispatch(addOrder(product))}
        />
      ))}
    </div>
  )
}

export default ProductList
