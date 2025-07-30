<<<<<<< HEAD
'use client'
import { useFetchDiscountProducts } from '@/app/hooks/useFetchDiscountProduct'
import Loading from '@/app/(root)/(staff)/loading'
import { useState } from 'react'
import { useDiscountCancelMutation } from '@/app/hooks/useFetchDiscountProduct'
import Modal from '@/app/components/modal'
import CustomBtn from '@/app/components/custom-btn'
import ModalTitle from '@/app/components/modal-title'
import AddDiscountModal from '@/app/components/discountItems/add-discount-modal'
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
      alert(`Error: ${error?.message || 'Something went wrong'}`)
    },
    params,
  })
=======
"use client";
import { useFetchProducts } from "@/app/hooks/useFetchProduct";
import Loading from "@/app/(root)/staff/loading";
import { useState } from "react";

// Define Product type or import it from your models
type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  startDate: string;
  endDate: string;
  dis_percent: number;
  // Add other fields as needed
};

interface PaginationResult {
  paginatedItems: any;
  totalPages: number;
  startedIndex: number;
  lastIndex: number;
}

const pagination = (
  currentPage: number,
  itemsPerPage: number,
  items: any
): PaginationResult => {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startedIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = startedIndex + itemsPerPage;
  const paginatedItems = items.slice(startedIndex, lastIndex);
  return { paginatedItems, totalPages, startedIndex, lastIndex };
};

interface DiscountItemsListsProps {
  category: string | null;
  showAddDiscountModal: (product: Product) => void;
}

export default function DiscountItemsLists({
  category,
  showAddDiscountModal,
}: DiscountItemsListsProps) {
  const { error, isLoading, data } = useFetchProducts<Product[]>(category);

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
>>>>>>> dev

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

<<<<<<< HEAD
  const cancelDiscount = (product: CancelDiscountProduct): void => {
    mutation.mutate({ product })
  }

  return (
    <>
      <div className="overflow-x-auto ">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="flex items-center gap-1">No</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="flex items-center gap-1">Sku</span>
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
=======
  const { paginatedItems, totalPages, startedIndex, lastIndex } = pagination(
    currentPage,
    itemsPerPage,
    data
  );

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
          {paginatedItems?.map((product: Product) => (
            <tr
              key={product.id}
              className="*:text-gray-900 *:first:font-medium h-12 py-9 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <td className="px-3 py-2 whitespace-nowrap">{product.id}</td>
              <td className="px-3 py-2 whitespace-nowrap">{product.name}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                {product.price}MMK
              </td>
              <td className="px-3 py-2 whitespace-nowrap"></td>
              <td className="px-3 py-2 whitespace-nowrap"></td>
              <td className="px-3 py-2 whitespace-nowrap"></td>
              <td className="px-3 py-2 whitespace-nowrap">
                <button onClick={() => showAddDiscountModal(product)}>
                  <span
                    className={`underline ${
                      product.dis_percent > 0
                        ? "text-red-400 "
                        : "text-[#9E9E9E]"
                    } `}
                  >
                    {product.dis_percent > 0 ? "Cancel " : "Add "}Discount
                  </span>
                </button>
              </td>
>>>>>>> dev
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {products?.data.map((product: Product, index: number) => (
              <tr
                key={product.id}
                className="*:text-gray-900 *:first:font-medium h-12 py-9 hover:bg-gray-100 transition-colors cursor-pointer">
                <td className="px-3 py-2 whitespace-nowrap">{index + 1}</td>
                <td className="px-3 py-2 whitespace-nowrap">{product.sku}</td>
                <td className="px-3 py-2 whitespace-nowrap">{product.name}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {product.price} <span className="font-bold">MMK</span>
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

<<<<<<< HEAD
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
                className={`grid size-8 place-content-center rounded border transition-colors rtl:rotate-180 ${
                  products?.current_page === 1
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
                  setPage((prev) =>
                    Math.min(prev + 1, products?.last_page || 1)
                  )
                }
                disabled={products?.current_page === products?.last_page}
                className={`grid size-8 place-content-center rounded border transition-colors rtl:rotate-180 ${
                  products?.current_page === products?.last_page
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
        </div>
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
              className={`border border-success-400 hover:bg-success-500 hover:text-white text-black flex gap-2 justify-center items-center ${
                mutation.isPending ? 'bg-success-500 text-white' : ''
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
=======
              <input
                type="number"
                id="Page"
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
              />
              <span className="text-gray-600 text-sm">
                {" "}
                of {totalPages} pages{" "}
              </span>
            </label>
          </li>

          <li>
            <a
              href="#"
              className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
              aria-label="Previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
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
              aria-label="Next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
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
  );
>>>>>>> dev
}
