'use client'
import CustomBtn from '@/app/components/custom-btn'
import AddDiscountModal from '@/app/components/discountItems/add-discount-modal'
import Modal from '@/app/components/modal'
import ModalTitle from '@/app/components/modal-title'
import { useDiscountCancelMutation, useFetchDiscountProducts } from '@/app/hooks/useFetchDiscountProduct'
import NoData from '@/public/assets/no-data.png'
import Image from 'next/image'
import { useState } from 'react'
import toast from 'react-hot-toast';

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
}

interface DiscountItemsListsProps {
  categoryName: string | null
  // showAddDiscountModal: (product: Product) => void
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

interface DiscountProductsResponse {
  data: Product[]
  total: number
  totalPages: number
  current_page: number
  last_page: number
}

export default function DiscountItemsLists({
  categoryName,
}: // showAddDiscountModal,
  DiscountItemsListsProps) {
  const [confirmModal, setConfirmModal] = useState<
    CancelDiscountProduct | false
  >(false)
  const [showAddDiscountModal, setShowAddDiscountModal] =
    useState<Product | null>(null)
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)

  const params = {
    ...(page !== 0 && { page }),
    ...(size !== 0 && { pageSize: size }),
    ...(categoryName && { category_name: categoryName }),
  }

  const {
    error,
    isLoading,
    data: products,
  } = useFetchDiscountProducts<DiscountProductsResponse>(params)

  const mutation = useDiscountCancelMutation({
    onSuccessCallback: () => {
      setConfirmModal(false)
    },
    onErrorCallback: (error) => {
      toast.error(`Error: ${error?.message || 'Something went wrong'}`)
    },
    params,
  })

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-full">
  //       <Loading />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  const cancelDiscount = (product: CancelDiscountProduct): void => {
    mutation.mutate({ product })
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right bg-gray-50">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="flex items-center gap-1">No</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="flex items-center gap-1">SKU</span>
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
              <th className="px-3 py-2 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          {
            isLoading ?
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={7} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      {/* <div className="w-4 h-4 bg-gray-200 round/ed animate-pulse"></div> */}
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
              :
              <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                {products?.data.map((product: Product, index: number) => (
                  <tr
                    key={product.id}
                    className="*:text-gray-900 *:first:font-medium h-12 py-9 hover:bg-gray-100 transition-colors">
                    <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{product.sku}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{product.name}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {product.price} MMK
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {product.dis_percent ? (
                        <>
                          {Math.floor(
                            product.price -
                            product.price * (product.dis_percent / 100)
                          )}{' '}
                          <span className="font-bold">MMK</span>
                        </>
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>

                    <td className="px-3 py-2 whitespace-nowrap">
                      <button
                        onClick={() =>
                          product.dis_percent > 0
                            ? setConfirmModal(product)
                            : setShowAddDiscountModal(product)
                        }>
                        <span
                          className={`underline cursor-pointer ${product.dis_percent > 0
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
          }
        </table>
        {
          products?.data?.length !== 0 ?
            <div className="flex gap-3 justify-between items-center mt-5 px-5">
              <ul className="flex justify-start gap-1 text-gray-900">
                <li>
                  <label htmlFor="Page" className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">Items per page:</span>
                    <span className="sr-only"> Page </span>

                    <div className="px-2 border-[1px] rounded border-[#E1E2E3]">
                      <select
                        name="number-of-items"
                        id="number-of-items"
                        value={size}
                        className="pr-2.5 h-8 text-sm focus-within:outline-none cursor-pointer"
                        onChange={(e) => setSize(Number(e.target.value))}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                    <span className="text-gray-600 text-sm">
                      1-{size} of {products?.total} items
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
                      min={1}
                      value={page}
                      onChange={(e) => setPage(Number(e.target.value))}
                      className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
                    />
                    <span className="text-gray-600 text-sm">
                      {' '}
                      of {products?.last_page} pages{' '}
                    </span>
                  </label>
                </li>

                <li>
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={products?.current_page === 1}
                    className={`grid size-8 place-content-center rounded border transition-colors rtl:rotate-180 ${products?.current_page === 1
                      ? 'border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    aria-label="Previous page">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"i
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      setPage((prev) =>
                        Math.min(prev + 1, products?.last_page || 1)
                      )
                    }
                    disabled={products?.current_page === products?.last_page}
                    className={`grid size-8 place-content-center rounded border transition-colors rtl:rotate-180 ${products?.current_page === products?.last_page
                      ? 'border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 hover:bg-gray-50'
                      }`}
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
            </div> : 
            <div className="col-span-full flex flex-col justify-center items-center text-lg font-semibold h-60">
              <Image src={NoData} width={60} height={60} alt="no data img" />
              <span className='font-semibold text-md mt-2'>No Data Found</span>
            </div>
        }
      </div>

      {confirmModal && (
        <Modal
          onClose={() => setConfirmModal(false)}
          className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto">
          <ModalTitle>Confirmation</ModalTitle>
          <span className="text-center">
            Are you sure to delete this product?
          </span>
          <div className="flex justify-center gap-2 mt-5">
            <CustomBtn
              className="border border-alert-400 hover:bg-alert-500 hover:text-white text-black"
              onClick={() => setConfirmModal(false)}>
              No
            </CustomBtn>
            <CustomBtn
              className={`border border-success-400 hover:bg-success-500 hover:text-white text-black flex gap-2 justify-center items-center ${mutation.isPending ? 'bg-success-500 text-white' : ''
                }`}
              onClick={() => cancelDiscount(confirmModal)}>
              {mutation.isPending ? 'Loading...' : 'Yes'}
            </CustomBtn>
          </div>
        </Modal>
      )}
      {showAddDiscountModal && (
        <AddDiscountModal
          params={params}
          product={showAddDiscountModal}
          onClose={() => setShowAddDiscountModal(null)}
        />
      )}
    </>
  )
}
