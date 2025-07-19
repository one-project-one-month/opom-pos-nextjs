'use client'
import Loading from '@/app/(root)/(staff)/(main)/loading';
import CategoryList from '@/app/components/category-list';
import CustomBtn from '@/app/components/custom-btn';
import { FilterSvg } from '@/app/components/custom-svg';
import CustomTable from '@/app/components/custom-table';
import Modal from '@/app/components/modal';
import ModalTitle from '@/app/components/modal-title';
import TableTitle from '@/app/components/table-title';
import { useFetchProducts } from '@/app/hooks/useFetchProduct';
import { Product } from '@/app/type/product';
import ProductImg from '@/public/assets/total-product.png';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

function InventoryPage() {
  const { error, isLoading, data } = useFetchProducts<Product[]>()
  const [showModal, setShowModal] = useState(false);

  const columns = [
    {
      title: 'No',
      key: 'id',
      dataIndex: 'id'
    },
    {
      title: 'SKU',
      key: 'sku',
      dataIndex: 'sku'
    },
    {
      title: 'Product name',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Quantity',
      key: 'stock',
      dataIndex: 'stock'
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price'
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status'
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'id',
      render: () => {
        return (
          <div className='flex gap-2 font-bold'>
            <button className='text-blue-500'>
              Edit
            </button> {" / "}
            <button className='text-red-500'>
              Delete
            </button>
          </div>
        )
      }
    },

  ]

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
    <div>
      <p className='text-xl'>Inventory Management</p>
      <div className='w-[220] p-5 shadow-md flex justify-center items-center gap-5 my-7'>
        <div className='bg-success-300 w-[45] h-[45] rounded-sm flex justify-center items-center'>
          <Image src={ProductImg} alt='total products' />
        </div>
        <div>
          <p className='mb-1'>Total Products</p>
          <p className='font-semibold text-lg'>50, 309</p>
        </div>
      </div>
      <div className='grid grid-cols-4 gap-2'>
        <div className='border border-primary-400 rounded-md p-5'>
          <div className='mb-3'>
            <p>Fruits & Vegetables</p>
          </div>
          <p>120</p>
        </div>
      </div>
      <div className='flex justify-between mt-10 mb-5'>
        <TableTitle>Product Lists</TableTitle>
        <div className='flex gap-5'>
          <CustomBtn className="bg-[#FB9E3A] hover:bg-[#E28E34] flex gap-2" onClick={() => setShowModal(true)}><Plus /> Add product</CustomBtn>
          <CustomBtn className="border border-primary-300 text-black flex gap-2"><FilterSvg width={18} height={18} /> Filters</CustomBtn>
        </div>
      </div>
      <CategoryList />
      <br />
      <CustomTable columns={columns} data={data} />
      {
        showModal &&
        <Modal onClose={() => setShowModal(false)} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto">
          <ModalTitle>Product Information</ModalTitle>
        </Modal>
      }
    </div>
  )
}

export default InventoryPage