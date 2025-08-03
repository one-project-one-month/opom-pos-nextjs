"use client";
import CategoryList from "@/app/components/discountItems/category-lists";
import DiscountItemsLists from "@/app/components/discountItems/discount-items-lists";
import { useState } from "react";

export default function Page() {
  // const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [category, setCategory] = useState<string | null>(null)

  return (
    <div className="w-full relative flex flex-col">
      <div className="flex justify-between">
        <h1 className="font-light text-2xl">Discount Item Lists</h1>
        {/* <p className="text-red-600 underline">Discount rules</p> */}
      </div>
      <div className="my-8">
        <CategoryList setCategory={setCategory}></CategoryList>
      </div>
      <DiscountItemsLists
        categoryName={category}
      // showAddDiscountModal={(product) => setSelectedProduct(product)}
      />
    </div>
  );
}
