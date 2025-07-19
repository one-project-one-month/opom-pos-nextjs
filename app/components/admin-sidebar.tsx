"use client"
import { BarChart, ClipboardCopy, ClipboardList, DollarSign, Home, List, ListCollapseIcon, ListTodo, Settings, Tag, User, UsersRound } from 'lucide-react';
import { useState } from 'react';
import NavLink from './navlink';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const styleClass = 'flex flex-col items-center gap-1';

    return (
        <aside className={`bg-white text-gray-800 border-r border-gray-300 shadow transition-all duration-300 ease-in-out ${isOpen ? 'w-52' : 'w-18'} flex flex-col justify-between items-center py-6`}>
            <nav className='flex flex-col px-4 space-y-3'>
                <NavLink href='/admin'>
                    {
                        isOpen ? <div className={styleClass}><Home />Dashboard</div> : <Home />
                    }
                </NavLink>
                <NavLink href='/admin/sale-reports'>
                    {
                        isOpen ? <div className={styleClass}><ClipboardList />Sale Reports</div> : <ClipboardList />
                    }
                </NavLink>
                <NavLink href='/admin/inventory'>
                    {
                        isOpen ? <div className={styleClass}><ListTodo />Inventory Items</div> : <ListTodo />
                    }
                </NavLink>
                <NavLink href='/admin/discount-items'>
                    {
                        isOpen ? <div className={styleClass}><Tag /> Discount Items</div> : <Tag />
                    }
                </NavLink>
                <NavLink href='/admin/staff-lists'>
                    {
                        isOpen ? <div className={styleClass}><User />Staff Lists</div> : <User />
                    }
                </NavLink>
                <NavLink href='/admin/member-lists'>
                    {
                        isOpen ? <div className={styleClass}><UsersRound />Member Lists</div> : <UsersRound />
                    }
                </NavLink>
                {/* <NavLink href='/admin/settings'>
                    {
                        isOpen ? <div className='flex align-center gap-3'><Settings />Settings</div> : <Settings />
                    }
                </NavLink> */}
            </nav>
            <button className='cursor-pointer' onClick={() => setIsOpen(prev => !prev)}><ListCollapseIcon /></button>
        </aside>
    )
}
