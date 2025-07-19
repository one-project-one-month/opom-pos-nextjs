import React, { ReactNode } from 'react'

const TableTitle = ({ children }: { children: ReactNode }) => {
    return (
        <h3 className='text-2xl font-medium'>{children}</h3>
    )
}

export default TableTitle