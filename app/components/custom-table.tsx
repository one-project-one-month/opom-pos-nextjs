import React from 'react';

interface ColumnType<T> {
    title: string;
    key: string;
    dataIndex: string;
    render?: (value: any, record: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
    columns: ColumnType<T>[],
    data: T[],
}

const CustomTable = <T extends Record<string, any>>({ columns, data }: TableProps<T>) => {

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
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex} className="*:text-gray-900 *:first:font-medium h-[56px]">
                                {
                                    columns.map(column => (
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
        </>
    )
}

export default CustomTable