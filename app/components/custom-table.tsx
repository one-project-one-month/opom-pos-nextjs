import React from 'react';
import { NextSvg, PrevSvg } from './custom-svg';

interface ColumnType<T> {
    title: string;
    key: string;
    dataIndex?: string;
    render?: (value: any, record: T, index: number) => React.ReactNode;
}

interface PaginationProps {
    pageSize?: number;
    currentPage?: number;
    lastPage?: number;
    total?: number;
    handleOnChange?: (page: number, size: number) => void;
}

interface TableProps<T> {
    columns: ColumnType<T>[],
    data?: T[],
    pagination?: PaginationProps
}

const CustomTable = <T extends Record<string, any>>({ columns, data, pagination }: TableProps<T>) => {

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = Number(e.target.value);
        const currentPage = pagination?.currentPage || 1;
        pagination?.handleOnChange?.(currentPage, newSize);
    }

    const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPage = Number(e.target.value);
        const pageSize = pagination?.pageSize || 10;
        pagination?.handleOnChange?.(newPage, pageSize);
    }

    return (
        <>
            <table className="min-w-full divide-y-2 divide-gray-200">
                <thead className="ltr:text-left rtl:text-right">
                    <tr className="*:font-bold *:text-gray-900">
                        {
                            columns.map((column) => (
                                <th key={column.key} className="px-3 py-2 whitespace-nowrap">
                                    <span>
                                        {column.title}
                                    </span>
                                </th>
                            )
                            )
                        }
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
                    {
                        data?.map((item, rowIndex) => (
                            <tr key={rowIndex} className="*:text-gray-900 *:first:font-medium h-[56px]">
                                {
                                    columns.map((column) => (
                                        <td key={column.key} className="px-3 whitespace-nowrap">
                                            {
                                                column.render ? column.render(item[column.dataIndex], item, rowIndex)
                                                    : item[column.dataIndex]
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
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
                                    value={pagination?.pageSize}
                                    className="pr-2.5 h-8 text-sm focus-within:outline-none cursor-pointer"
                                    onChange={handlePageSizeChange}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <span className="text-gray-600 text-sm">1-5 of {pagination?.total} items</span>
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
                                min={1}
                                value={pagination?.currentPage || 1}
                                onChange={handlePageChange}
                                className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
                            />
                            <span className="text-gray-600 text-sm"> of {pagination?.lastPage} pages </span>
                        </label>
                    </li>
                    <li>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                if (pagination && pagination.currentPage && pagination.currentPage > 1) {
                                    pagination?.handleOnChange?.(
                                        pagination.currentPage - 1,
                                        pagination.pageSize || 5
                                    )
                                }
                            }}
                            disabled={pagination?.currentPage === 1}
                            className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 cursor-pointer"
                            aria-label="Previous page"
                        >
                            <PrevSvg />
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={(e) => {
                                // e.preventDefault();
                                if (pagination && pagination.currentPage && pagination.lastPage && (pagination?.currentPage < pagination?.lastPage)) {
                                    pagination?.handleOnChange?.(
                                        pagination.currentPage + 1,
                                        pagination.pageSize || 5
                                    )
                                }
                            }}
                            disabled={pagination?.currentPage === pagination?.lastPage}
                            className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 cursor-pointer"
                            aria-label="Next page"
                        >
                            <NextSvg />
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default CustomTable