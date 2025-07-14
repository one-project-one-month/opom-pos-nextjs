'use client'
import { useFetchProducts } from '@/app/hooks/useFetchProduct'
import Loading from '@/app/(root)/(staff)/(main)/loading'
import { useState } from 'react'

// Define Product type or import it from your models
type Product = {
  id: string
  name: string
  price: number
  discountPrice: number
  startDate: string
  endDate: string
  // Add other fields as needed
}

export default function DiscountItemsLists() {
  const { error, isLoading, data } = useFetchProducts<Product[]>()
  console.log(data)

  const [value, setValue] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

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
    <div className="overflow-x-auto ">
      <table className="min-w-full divide-y-2 divide-gray-200">
        <thead className="ltr:text-left rtl:text-right">
          <tr className="*:font-medium *:text-gray-900">
            <th className="px-3 py-2 whitespace-nowrap">
              <span className="flex items-center gap-1">Product ID</span>
            </th>
            <th className="px-3 py-2 whitespace-nowrap">
              <span className="flex items-center gap-1">Product Name</span>
            </th>
            <th className="px-3 py-2 whitespace-nowrap">
              <span className="flex items-center gap-1">Original Price</span>
            </th>
            <th className="px-3 py-2 whitespace-nowrap">
              <span className="flex items-center gap-1">Discount Price</span>
            </th>
            <th className="px-3 py-2 whitespace-nowrap">
              <span className="flex items-center gap-1">Start Date</span>
            </th>
            <th className="px-3 py-2 whitespace-nowrap">
              <span className="flex items-center gap-1">End Date</span>
            </th>
            <th className="px-3 py-2 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
          {data?.map((product, index) => (
            <tr
              key={product.id}
              className="*:text-gray-900 *:first:font-medium h-12 hover:bg-gray-100 transition-colors cursor-pointer">
              <td className="px-3 py-2 whitespace-nowrap">{product.id}</td>
              <td className="px-3 py-2 whitespace-nowrap">{product.name}</td>
              <td className="px-3 py-2 whitespace-nowrap">{product.price}</td>
              <td className="px-3 py-2 whitespace-nowrap">discountPrice</td>
              <td className="px-3 py-2 whitespace-nowrap">
                {product.startDate}
              </td>
              <td className="px-3 py-2 whitespace-nowrap">{product.endDate}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <button>Add Discount</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-3 justify-between items-center mt-5 px-5">
        <ul className="flex justify-start gap-1 text-gray-900">
          <li>
            <label htmlFor="Page" className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">Items per page:</span>
              <span className="sr-only"> Page </span>

              <input
                type="number"
                id="Page"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
              />
              <span className="text-gray-600 text-sm">1-5 of 100 items</span>
            </label>
          </li>
        </ul>

        <ul className="flex items-center gap-3 text-gray-900">
          <li>
            <label htmlFor="Page">
              <span className="sr-only"> Page </span>

              <input
                type="number"
                id="Page"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
              />
              <span className="text-gray-600 text-sm"> of 40 pages </span>
            </label>
          </li>

          <li>
            <a
              href="#"
              className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
              aria-label="Previous page">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
              aria-label="Next page">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
