'use client'

import { X } from 'lucide-react'
import * as z from 'zod'
import { useState } from 'react'
import { useDiscountAddMutation } from '@/app/hooks/useFetchDiscountProduct'
import { useFetchCategoriesById } from '@/app/hooks/useFetchCategory'
import ModalTitle from '../modal-title'
import toast from 'react-hot-toast'

const discountProducts = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product Name is required'),
  category_id: z.string().min(1, 'Category ID is required'),
  price: z.string().min(1, 'Original Price is required'),
  dis_percent: z.string().min(1, 'Discount Percent is required'),
})

interface AddDiscountModalProps {
  onClose: () => void
  product: Product
  params: any
}

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

export default function AddDiscountModal({
  params,
  onClose,
  product,
}: AddDiscountModalProps) {
  const [validationError, setValidationError] = useState<
    Record<string, string>
  >({})

  const { data: categoryName, isLoading: categoryLoading } =
    useFetchCategoriesById<string>(product.category_id)

  const mutation = useDiscountAddMutation({
    onSuccessCallback: () => {
      onClose()
    },
    onErrorCallback: (error) => {
      toast.error(`Error: ${error?.message || 'Something went wrong'}`)
    },
    params,
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    try {
      const validation = discountProducts.parse(data)
      setValidationError({})

      mutation.mutate({
        product,
        discountPercent: Number(validation.dis_percent),
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        err.issues.forEach((error) => {
          const field = error.path[0] as string
          fieldErrors[field] = error.message
        })
        setValidationError(fieldErrors)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative z-50 bg-white shadow-lg rounded-[10px]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer">
          <X />
        </button>

        <div className="w-full p-10">
          <ModalTitle>
            Product Information
          </ModalTitle>

          <form onSubmit={handleSubmit}>
            <div className="flex mt-3 w-full">
              <div className="flex flex-col w-full">
                <label className="mb-3">SKU</label>
                <input
                  name="id"
                  type="text"
                  className="p-2 rounded-[10px] bg-gray-200 text-gray-400 cursor-not-allowed"
                  defaultValue={product?.sku || ''}
                  readOnly
                />
                {validationError.id && (
                  <span className="text-red-500 text-sm">
                    {validationError.id}
                  </span>
                )}
              </div>
              <div className="flex flex-col ms-5 w-full">
                <label className="mb-3">Product Name</label>
                <input
                  name="name"
                  type="text"
                  className="bg-gray-200 text-gray-400 cursor-not-allowed p-2 rounded-[10px]"
                  defaultValue={product?.name || ''}
                  readOnly
                />
                {validationError.name && (
                  <span className="text-red-500 text-sm">
                    {validationError.name}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col mt-5">
              <label className="mb-3">Category</label>
              <input
                key={categoryName}
                name="category_id"
                type="text"
                className="bg-gray-200 text-gray-400 cursor-not-allowed p-2 rounded-[10px]"
                defaultValue={categoryLoading ? 'loading...' : categoryName}
                readOnly
              />
              {validationError.category_id && (
                <span className="text-red-500 text-sm">
                  {validationError.category_id}
                </span>
              )}
            </div>

            <div className="flex mt-5 w-full">
              <div className="flex flex-col w-full">
                <label className="mb-3">Original Price</label>
                <input
                  name="price"
                  type="text"
                  className="bg-gray-200 text-gray-400 cursor-not-allowed p-2 rounded-[10px]"
                  defaultValue={product?.price || ''}
                  readOnly
                />
                {validationError.price && (
                  <span className="text-red-500 text-sm">
                    {validationError.price}
                  </span>
                )}
              </div>
              <div className="flex flex-col ms-5 w-full">
                <label className="mb-3">Discount Percent</label>
                <input
                  name="dis_percent"
                  type="number"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                />
                {validationError.dis_percent && (
                  <span className="text-red-500 text-sm">
                    {validationError.dis_percent}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-[#FB9E3A] text-white p-3 rounded-[10px] mt-5 text-center cursor-pointer">
              {mutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
