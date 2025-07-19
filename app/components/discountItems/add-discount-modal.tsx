import { X } from 'lucide-react'

interface AddDiscountModalProps {
  onClose: () => void
}

export default function AddDiscountModal({ onClose }: AddDiscountModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Modal */}
      <div className="relative z-50 shadow-lg bg-white rounded-[10px] w-[90%] max-w-[600px]">
        {/* X Icon (Close Button) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X />
        </button>

        <div className="w-full p-10">
          <h1 className="text-center font-bold text-[20px] mb-4">
            Product Information
          </h1>
          <form>
            <div className="flex mt-3 w-full">
              <div className="flex flex-col w-full">
                <label className="mb-3">Product ID</label>
                <input
                  type="text"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                />
              </div>
              <div className="flex flex-col ms-5 w-full">
                <label className="mb-3">Product Name</label>
                <input
                  type="text"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                />
              </div>
            </div>

            <div className="flex flex-col mt-5">
              <label className="mb-3">Category</label>
              <input type="text" className="bg-[#F5F5F5] p-2 rounded-[10px]" />
            </div>

            <div className="flex mt-5 w-full">
              <div className="flex flex-col w-full">
                <label className="mb-3">Original Price</label>
                <input
                  type="text"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                />
              </div>
              <div className="flex flex-col ms-5 w-full">
                <label className="mb-3">Discount Price</label>
                <input
                  type="text"
                  className="bg-[#F5F5F5] p-2 rounded-[10px]"
                />
              </div>
            </div>

            <div className="flex flex-col mt-5">
              <label className="mb-3">Start Date</label>
              <input type="text" className="bg-[#F5F5F5] p-2 rounded-[10px]" />
            </div>

            <div className="flex flex-col mt-5">
              <label className="mb-3">End Date</label>
              <input type="text" className="bg-[#F5F5F5] p-2 rounded-[10px]" />
            </div>

            <button className="w-full bg-[#FB9E3A] text-white p-3 rounded-[10px] mt-5 text-center">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
