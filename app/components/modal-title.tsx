import React, { ReactNode } from 'react'

const ModalTitle = ({ children }: { children: ReactNode }) => {
    return (
        <h3 className='text-xl font-bold text-center'>{children}</h3>
    )
}

export default ModalTitle