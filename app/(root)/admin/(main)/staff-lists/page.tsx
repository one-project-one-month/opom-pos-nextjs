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
        <div className="text-red-500 font-bold flex space-x-1 md:space-x-2">
          <p>Something went wrong. Please try again later.</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.0} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
      </div>
    );
  }

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
      title: "Id",
      key: "id",
      dataIndex: "id"
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name"
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (_: any, record: StaffList) => record?.role?.name
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
    // {
    //   title: "Status",
    //   key: "status",
    //   dataIndex: "suspended",
    //   render: (suspended: number) => (
    //     <p className={`${suspended === 1 ? "text-orange-600" : "text-green-600"}`}>
    //       {suspended === 1 ? "Suspended" : "Active"}
    //     </p>
    //   )
    // },
    {
      title: "Action",
      key: "action",
      dataIndex: "id",
      render: (_: any, record: StaffList) => (
        <>
        { record.suspended === 1 ? (
          <button className='text-green-500 font-bold'>
            Unsuspend
          </button>
        ) : (
          <button className='text-red-500 font-bold'>
            Suspend
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
              Admin And Staff Lists
          </p>
          {/* <button className='w-[133px] h-[54px] bg-[#FB9E3A] text-white rounded-[5px] flex items-center justify-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Admin
          </button> */}
      </div>
      <div className="overflow-x-auto">
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
      </div>
    </div>
  )
}

export default Page;