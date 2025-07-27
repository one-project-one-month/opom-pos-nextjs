'use client'
// import { useFetchProducts } from '@/app/hooks/useFetchProduct'
import { useFetchDiscountProducts } from '@/app/hooks/useFetchDiscountProduct'
import Loading from '@/app/(root)/(staff)/(main)/loading'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

// Define Product type or import it from your models
type Product = {
  id: string
  name: string
  price: number
  discountPrice: number
  category_id: number
  startDate: string
  endDate: string
  dis_percent: number
  sku: number
  // Add other fields as needed
}

interface PaginationResult {
  paginatedItems: any
  totalPages: number
  startedIndex: number
  lastIndex: number
}

const pagination = (
  currentPage: number,
  itemsPerPage: number,
  items: any
): PaginationResult => {
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startedIndex = (currentPage - 1) * itemsPerPage
  const lastIndex = startedIndex + itemsPerPage
  const paginatedItems = items.slice(startedIndex, lastIndex)
  return { paginatedItems, totalPages, startedIndex, lastIndex }
}

interface DiscountItemsListsProps {
  category: string | null
  showAddDiscountModal: (product: Product) => void
}

interface CancelDiscountProduct {
  id: string
  name: string
  price: number
  discountPrice: number
  category_id: number
  startDate: string
  endDate: string
  dis_percent: number
  sku: number
}
export default function DiscountItemsLists({
  category,
  showAddDiscountModal,
}: DiscountItemsListsProps) {
  const queryClient = useQueryClient()

  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)

  const { error, isLoading, data } = useFetchDiscountProducts<Product[]>(
    category,
    currentPage
  )

  const mutation = useMutation<any, Error, CancelDiscountProduct>({
    mutationFn: async (product: CancelDiscountProduct) => {
      const { sku, ...withoutSku } = product
      const url = `https://4f802d48e955.ngrok-free.app/api/v1/products/${product.id}`
      const res = await axios.post(
        url,
        { ...withoutSku, dis_percent: 0 },
        {
          headers: {
            Authorization: `Bearer 155|4pVGieDrkgFQ1ofBdIzfQrN8m0NSkLIYFHJEirC77e2c7bcb`,
          },
        }
      )
      return res.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      alert('Discount Cancel')
    },
    onError: (error: any) => {
      alert(`Error: ${error?.message || 'Something went wrong'}`)
    },
  })

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

  const { paginatedItems, totalPages, startedIndex, lastIndex } = pagination(
    currentPage,
    itemsPerPage,
    data
  )

  const cancelDiscount = (product: CancelDiscountProduct): void => {
    mutation.mutate(product)
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
            {/* <th className="px-3 py-2 whitespace-nowrap">
              <span className="flex items-center gap-1">Start Date</span>
            </th>
            <th className="px-3 py-2 whitespace-nowrap">
              <span className="flex items-center gap-1">End Date</span>
            </th> */}
            <th className="px-3 py-2 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
          {paginatedItems?.map((product: Product) => (
            <tr
              key={product.id}
              className="*:text-gray-900 *:first:font-medium h-12 py-9 hover:bg-gray-100 transition-colors cursor-pointer">
              <td className="px-3 py-2 whitespace-nowrap">{product.sku}</td>
              <td className="px-3 py-2 whitespace-nowrap">{product.name}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                {product.price} <span className="font-bold">MMK</span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap">
                {product.dis_percent
                  ? Math.floor(
                      product.price -
                        product.price * (product.dis_percent / 100)
                    ) + ' MMK'
                  : 'N/A'}
              </td>
              {/* <td className="px-3 py-2 whitespace-nowrap"></td>
              <td className="px-3 py-2 whitespace-nowrap"></td> */}
              <td className="px-3 py-2 whitespace-nowrap">
                <button
                  onClick={() =>
                    product.dis_percent > 0
                      ? cancelDiscount(product)
                      : showAddDiscountModal(product)
                  }>
                  <span
                    className={`underline ${
                      product.dis_percent > 0
                        ? 'text-red-400 '
                        : 'text-[#9E9E9E]'
                    } `}>
                    {product.dis_percent > 0 ? 'Cancel ' : 'Add '}Discount
                  </span>
                </button>
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
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
              />
              <span className="text-gray-600 text-sm">
                {startedIndex + 1}-{lastIndex} of {data?.length} items
              </span>
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
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
              />
              <span className="text-gray-600 text-sm">
                {' '}
                of {totalPages} pages{' '}
              </span>
            </label>
          </li>

          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
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
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
