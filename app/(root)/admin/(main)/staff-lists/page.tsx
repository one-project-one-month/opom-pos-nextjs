"use client"
import React, { useState } from 'react'

const dummyData = [
  {
    id: "12458789",
    name: "John Doe",
    role: "Admin",
    email: "john@example.com",
    status: "Active",
    lastLogin: "2025-4-07 09:00",
  },
  {
    id: "12458790",
    name: "Jane Smith",
    role: "Staff",
    email: "jane@example.com",
    status: "Inactive",
    lastLogin: "2025-1-07 04:20",
  },
  {
    id: "12458791",
    name: "Alice Brown",
    role: "Admin",
    email: "alice@example.com",
    status: "Active",
    lastLogin: "2025-4-02 07:00",
  },
  {
    id: "12458792",
    name: "Bob Lee",
    role: "Staff",
    email: "bob@example.com",
    status: "Active",
    lastLogin: "2025-4-05 12:00",
  },
];

const page = () => {
  const [value, setValue] = useState(5);

  return (
    <div className='p-5'>
      <div className="flex justify-between items-center mt-7 mb-10">
          <p className='font-[400px] text-[25px]'>
              Admin And Staff Lists
          </p>
          <button className='w-[133px] h-[54px] bg-[#FB9E3A] text-white rounded-[5px] flex items-center justify-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Admin
          </button>
      </div>
      <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200">
                  <thead className="ltr:text-left rtl:text-right">
                  <tr className="*:font-medium *:text-gray-900">
                      
                      <th className="px-3 py-2 whitespace-nowrap">
                          <span className=''>
                              Admin Id
                          </span>
                      </th>
                      <th className="px-3 py-2 whitespace-nowrap">
                          <span className=''>
                              Name
                          </span>
                      </th>
                      <th className="px-3 py-2 whitespace-nowrap">
                          <span className=''>
                              Role
                          </span>
                      </th>
                      <th className="px-3 py-2 whitespace-nowrap">
                          <span className=''>
                              Email
                          </span>
                      </th>
                      <th className="px-3 py-2 whitespace-nowrap">
                          <span className=''>
                              Status
                          </span>
                      </th>
                      <th className="px-3 py-2 whitespace-nowrap">
                          <span className=''>
                              Last Login
                          </span>
                      </th>
                      <th className="px-3 py-2 whitespace-nowrap">Action</th>
                      
                  </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                  {dummyData?.map((item, i) => (
                      <tr key={i} className="*:text-gray-900 *:first:font-medium h-[68px]">
                      <td className="px-3 py-2 whitespace-nowrap">{item.id}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{item.name}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{item.role}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{item.email}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <p className={`${item.status === "Active" ? "text-green-500" : "text-orange-500"}`}>{item.status}</p>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">{item.lastLogin}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <button className='text-blue-500 font-bold'>
                          Edit
                        </button> {" / "}
                        <button className='text-red-500 font-bold'>
                          Delete
                        </button>
                      </td>
                  </tr>
                  ))}

                  </tbody>
          </table>
          <div className='flex gap-3 justify-between items-center mt-5 px-5'>
              <ul className="flex justify-start gap-1 text-gray-900">
                  
                  <li>
                      <label htmlFor="Page" className='flex items-center gap-2'>
                          <span className='text-gray-600 text-sm'>Items per page:</span>
                          <span className="sr-only"> Page </span>

                          <input
                              type="number"
                              id="Page"
                              value={value}
                              onChange={e => setValue(Number(e.target.value))}
                              className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
                          />
                          <span className='text-gray-600 text-sm'>1-5 of 100 items</span>
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
                              value={value}
                              onChange={e => setValue(Number(e.target.value))}
                              className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
                          />
                          <span className='text-gray-600 text-sm'> of 40 pages </span>
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
    </div>
  )
}

export default page