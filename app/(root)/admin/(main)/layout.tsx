import Sidebar from '@/app/components/admin-sidebar';
import Header from '@/app/components/app-header';

export default function AdminMainLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
            <div>
                <Header />
                <div className='flex overflow-hidden pt-20'>
                    <Sidebar />
                    <main className='flex-1 overflow-y-auto ps-[250px] pe-9 pt-7 pb-10'>{children}</main>
                </div>
            </div>
    )
}
