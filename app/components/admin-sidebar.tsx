"use client"
import { BarChart, ClipboardCopy, ClipboardList, DollarSign, Home, List, ListCollapseIcon, ListTodo, Settings, Tag, User, UsersRound } from 'lucide-react';
import { useState } from 'react';
import NavLink from './navlink';

export default function Sidebar() {

    const styleClass = 'flex flex-col items-center gap-1';

    return (
        <aside className={`bg-white text-gray-800 border-r h-screen border-gray-300 shadow transition-all duration-300 ease-in-out w-52 flex flex-col gap-[150px] fixed items-center py-6`}>
            <nav className='flex flex-col px-4 space-y-3'>
                <NavLink href='/admin'>
                    <div className={styleClass}><Home />Dashboard</div>
                </NavLink>
                <NavLink href='/admin/sale-reports'>
                    <div className={styleClass}><ClipboardList />Sale Reports</div>
                </NavLink>
                <NavLink href='/admin/inventory'>
                    <div className={styleClass}><ListTodo />Inventory Items</div>
                </NavLink>
                <NavLink href='/admin/discount-items'>
                    <div className={styleClass}><Tag /> Discount Items</div>
                </NavLink>
                <NavLink href='/admin/staff-lists'>
                    <div className={styleClass}><User />Staff Lists</div>
                </NavLink>
                <NavLink href='/admin/member-lists'>
                    <div className={styleClass}><UsersRound />Member Lists</div>
                </NavLink>
                {/* <NavLink href='/admin/settings'>
                    {
                        isOpen ? <div className='flex align-center gap-3'><Settings />Settings</div> : <Settings />
                    }
                </NavLink> */}
            </nav>
        </aside>
    )
}
