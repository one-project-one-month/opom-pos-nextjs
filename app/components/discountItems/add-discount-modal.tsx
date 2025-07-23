'use client'

import { X } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import * as z from 'zod'
import { useState } from 'react'

const discountProducts = z.object({
  id: z.string().min(1, 'Product ID is required'),
  name: z.string().min(1, 'Product Name is required'),
  category_id: z.string().min(1, 'Category ID is required'),
  price: z.string().min(1, 'Original Price is required'),
  disPercent: z.string().min(1, 'Discount Percent is required'),
  disStartDate: z.string().min(1, 'Start Date is required'),
  disEndDate: z.string().min(1, 'End Date is required'),
})

interface AddDiscountModalProps {
  onClose: () => void
  product: Product
}

type Product = {
  id: string
  name?: string
  category_id?: string
  price?: number
}

export default function AddDiscountModal({
  onClose,
  product,
}: AddDiscountModalProps) {
  const [validationError, setValidationError] = useState<
    Record<string, string>
  >({})

  const mutation = useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const res = await axios.post('/api/products/discount', data)
      return res.data
    },
    onSuccess: () => {
      alert('Discount added!')
      onClose()
    },
    onError: (error: any) => {
      alert(`Error: ${error?.message || 'Something went wrong'}`)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const data = Object.fromEntries(formData.entries())
    try {
      const validation = discountProducts.parse(data)
      console.log(validation)
      setValidationError({})
      // mutation.mutate(validation)
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

      <div className="relative z-50 bg-white shadow-lg rounded-[10px] w-[90%] max-w-[600px]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X />
        </button>

        <div className="w-full p-10">
          <h1 className="text-center font-bold text-[20px] mb-4">
            Product Information
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="flex mt-3 w-full">
              <div className="flex flex-col w-full">
                <label className="mb-3">Product ID</label>
                <input
                  name="id"
                  type="text"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                  defaultValue={product?.id || ''}
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
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                  defaultValue={product?.name || ''}
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
                name="category_id"
                type="text"
                className="bg-[#F5F5F5] p-2 rounded-[10px]"
                defaultValue={product?.category_id || ''}
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
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                  defaultValue={product?.price || ''}
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
                  name="disPercent"
                  type="number"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                />
                {validationError.disPercent && (
                  <span className="text-red-500 text-sm">
                    {validationError.disPercent}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col mt-5">
              <label className="mb-3">Start Date</label>
              <input
                name="disStartDate"
                type="date"
                className="bg-[#F5F5F5] p-2 rounded-[10px]"
                // defaultValue={product?.startDate || ''}
              />
              {validationError.disStartDate && (
                <span className="text-red-500 text-sm">
                  {validationError.disStartDate}
                </span>
              )}
            </div>

            <div className="flex flex-col mt-5">
              <label className="mb-3">End Date</label>
              <input
                name="disEndDate"
                type="date"
                className="bg-[#F5F5F5] p-2 rounded-[10px]"
                // defaultValue={product?.endDate || ''}
              />
              {validationError.disEndDate && (
                <span className="text-red-500 text-sm">
                  {validationError.disEndDate}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-[#FB9E3A] text-white p-3 rounded-[10px] mt-5 text-center">
              {mutation.isPending ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
