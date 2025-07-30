"use client";
import React from "react";
import { ProductCard } from "./product-card";
import { useDispatch } from "react-redux";
import { addOrder } from "../../store/slices/orderSummarySlice";
import { Product } from "../../type/product";
import { useFetchProducts } from "../../hooks/useFetchProduct";
import Loading from "../../(root)/staff/loading";
import { useSearchParams } from "next/navigation";

const ProductList = () => {
<<<<<<< HEAD
  const searchParams = useSearchParams()
  const name = searchParams.get('name') || ''
  const category = searchParams.get('category') || ''
  const { error, isLoading, data } = useFetchProducts<Product[]>({
    name,
    category,
  })
=======
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";
  const { error, isLoading, data } = useFetchProducts<Product[]>({
    name,
    category,
  });
>>>>>>> dev

  const dispatch = useDispatch();

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.0}
            stroke="currentColor"
<<<<<<< HEAD
            className="size-6">
=======
            className="size-6"
          >
>>>>>>> dev
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[15px] px-2 py-5 overflow-y-auto no-scrollbar items-center">
      {data && data.length > 0 ? (
        data.map((product, i) => (
          <ProductCard
            key={i}
            photo={
<<<<<<< HEAD
              typeof product.photo === 'string'
                ? product.photo
                : product.photo instanceof File
                ? URL.createObjectURL(product.photo)
                : 'assets/logo.svg'
=======
              typeof product.photo === "string"
                ? product.photo
                : product.photo instanceof File
                ? URL.createObjectURL(product.photo)
                : "assets/logo.svg"
>>>>>>> dev
            }
            name={product?.name}
            price={product?.price}
            discount={product?.dis_percent}
            stock={product?.stock}
            ordersClick={() =>
              dispatch(
                addOrder({
                  id: product.id.toString(),
                  photo:
<<<<<<< HEAD
                    typeof product.photo === 'string'
                      ? product.photo
                      : product.photo instanceof File
                      ? URL.createObjectURL(product.photo)
                      : '',
=======
                    typeof product.photo === "string"
                      ? product.photo
                      : product.photo instanceof File
                      ? URL.createObjectURL(product.photo)
                      : "",
>>>>>>> dev
                  name: product.name,
                  price: product.price.toString(),
                  quantity: 1,
                })
              )
            }
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
