"use client"
import Loading from '@/app/(root)/(staff)/(main)/loading';
import CustomTable from '@/app/components/custom-table';
import React, { Suspense, useState } from 'react'
import { StaffList } from '@/app/type/staffList';
import { useFetchStaffs } from '@/app/hooks/useFetchStaff';

const Page = () => {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const {error, isLoading, data} = useFetchStaffs<StaffList[]>();

  // Calculate total pages
  const total = data?.length || 0;
  const lastPage = Math.ceil(total / pageSize);

  // Handle pagination changes
  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Define table columns
  const columns = [
    {
      title: 'No',
      key: 'id',
      dataIndex: 'id',
      render: (value: string, record: StaffList, index: number) => <span>{(currentPage - 1) * pageSize + index + 1}</span>
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name"
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email"
    },
    {
      title: "Confirmed At",
      key: "confirmed_at",
      dataIndex: "confirmed_at",
      render: (confirmedAt: string) => {
        return confirmedAt ? new Date(confirmedAt).toLocaleDateString() : 'Not Confirmed';
      }
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "suspended",
      render: (suspended: number) => (
        <p className={`${suspended === 1 ? "text-orange-600" : "text-green-600"}`}>
          {suspended === 1 ? "Suspended" : "Active"}
        </p>
      )
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (_: any, record: StaffList) => (
        <>
        { record.suspended === 1 ? (
          <button className='text-white font-medium px-3 py-1 bg-green-600 hover:bg-green-700 duration-300 rounded-lg cursor-pointer'>
            <p className='text-sm'>Unsuspend</p>
          </button>
        ) : (
          <button className='text-white font-medium px-3 py-1 bg-red-600 hover:bg-red-700 duration-300 rounded-lg cursor-pointer'>
            <p className='text-sm'>Suspend</p>
          </button>
        )}
        </>
      )
    }
  ];

  // Get paginated data
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data?.slice(startIndex, endIndex);

  return (
    <div className='p-5'>
      <div className="flex justify-between items-center mt-7 mb-10">
          <p className='font-[400px] text-[25px]'>
            Staff Lists
          </p>
      </div>
      <div className="overflow-x-auto">
        {isLoading && <div className="text-center"><Loading /></div>}
        {error && <p className='text-alert-400'>Error loading staffs</p>}
        {
          !isLoading && !error && (
            <CustomTable 
              columns={columns} 
              data={paginatedData} 
              pagination={{
                pageSize,
                currentPage,
                lastPage,
                total,
                handleOnChange: handlePaginationChange
              }}
            />
          )
        }
      </div>
    </div>
  )
}

export default Page;