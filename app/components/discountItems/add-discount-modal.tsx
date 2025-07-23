'use client'

import { X } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface AddDiscountModalProps {
  onClose: () => void
  product: Product
}

type Product = {
  id: string
  name?: string
  category_id?: string
  price?: number
  discountPrice?: number
  startDate?: string
  endDate?: string
  // add other fields as needed
}

export default function AddDiscountModal({
  onClose,
  product,
}: AddDiscountModalProps) {
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

    const data = Object.fromEntries(formData.entries()) // Convert to object
    mutation.mutate(data)
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
                  name="productId"
                  type="text"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                  defaultValue={product?.id || ''}
                />
              </div>
              <div className="flex flex-col ms-5 w-full">
                <label className="mb-3">Product Name</label>
                <input
                  name="name"
                  type="text"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                  defaultValue={product?.name || ''}
                />
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
            </div>

            <div className="flex mt-5 w-full">
              <div className="flex flex-col w-full">
                <label className="mb-3">Original Price</label>
                <input
                  name="originalPrice"
                  type="text"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                  defaultValue={product?.price || ''}
                />
              </div>
              <div className="flex flex-col ms-5 w-full">
                <label className="mb-3">Discount Percent</label>
                <input
                  name="disPercent"
                  type="text"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                />
              </div>
            </div>

            <div className="flex flex-col mt-5">
              <label className="mb-3">Start Date</label>
              <input
                name="disStartDate"
                type="text"
                className="bg-[#F5F5F5] p-2 rounded-[10px]"
                defaultValue={product?.startDate || ''}
              />
            </div>

            <div className="flex flex-col mt-5">
              <label className="mb-3">End Date</label>
              <input
                name="disEndDate"
                type="text"
                className="bg-[#F5F5F5] p-2 rounded-[10px]"
                defaultValue={product?.endDate || ''}
              />
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
