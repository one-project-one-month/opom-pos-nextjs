'use client';
import React, { useState } from 'react';
import MemberModal from './MemberModal';
import Link from 'next/link';
import { useFetchCustomers } from '@/app/hooks/useFetchCustomer';
import { Waveform } from 'ldrs/react';
import 'ldrs/react/Waveform.css';
import toast from 'react-hot-toast';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const startIndex = (page - 1) * size;
  const endIndex = page * size;

  const { data: customers, isLoading, error } = useFetchCustomers();
  const customerCount = customers?.length || 0;
  // Handle API errors
  if (error) {
    toast.error('Failed to load customers');
    console.error('Error loading customers:', error);
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mt-7 mb-10">
        <p className="font-[400px] text-[25px]">Loyal Member List</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FB9E3A] py-4 px-2 text-white rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#E28E34] transition-colors cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Vip Member
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="">User Id</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="">Name</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="">Email</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="">Phone Number</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  <div className="flex justify-center">
                    <Waveform size="35" stroke="3.5" speed="1" color="orange" />
                  </div>
                </td>
              </tr>
            ) : customers?.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              customers?.slice(startIndex, endIndex).map((item, i) => (
                <tr
                  key={i}
                  className="*:text-gray-900 *:first:font-medium h-[68px]"
                >
                  <td className="px-3 py-2 whitespace-nowrap">{item.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.email || '-'}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.phone || '-'}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <Link
                      className="text-blue-500 font-bold"
                      href={`/admin/member-lists/${item.id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex gap-3 justify-between items-center mt-5 px-5">
          <ul className="flex justify-start gap-1 text-gray-900">
            <li>
              <label htmlFor="Page" className="flex items-center gap-2">
                <span className="text-gray-600 text-sm">Items per page:</span>
                <span className="sr-only">Page</span>
                <div className="px-2 border-[1px] rounded border-[#E1E2E3]">
                  <select
                    name="number-of-items"
                    id="number-of-items"
                    className="pr-2.5 h-8 text-sm focus-within:outline-none"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <span className="text-gray-600 text-sm">
                  1-5 of {customers?.length} items
                </span>
              </label>
            </li>
          </ul>
          <ul className="flex items-center gap-3 text-gray-900">
            <li>
              <label htmlFor="Page">
                <span className="sr-only">Page</span>
                <input
                  type="number"
                  id="Page"
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                  className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
                  max={Math.ceil(customerCount / size)}
                  min={1}
                />
                <span className="text-gray-600 text-sm">
                  {' '}
                  of {Math.ceil(customerCount / size)} pages{' '}
                </span>
              </label>
            </li>
            <li>
              <a
                href="#"
                className={
                  'grid size-8 place-content-center rounded border border-gray-200 transition-colors rtl:rotate-180' +
                  (page === 1
                    ? ' bg-gray-200 cursor-not-allowed hover:bg-gray-200'
                    : ' hover:bg-gray-50')
                }
                aria-label="Previous page"
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
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
                className={
                  'grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180' +
                  (page === Math.ceil(customerCount / size)
                    ? ' bg-gray-200 cursor-not-allowed hover:bg-gray-200'
                    : ' hover:bg-gray-50')
                }
                aria-label="Next page"
                onClick={() => {
                  if (page < Math.ceil(customerCount / size)) {
                    setPage(page + 1);
                  }
                }}
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

      <MemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Page;
