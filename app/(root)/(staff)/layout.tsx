import Header from '@/app/components/app-header'
import { ProtectedRoute } from '@/app/components/ProtectRoute'

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
    {/* <ProtectedRoute> */}
      <Header />
      <main className="pt-[100px]">{children}</main>
    {/* </ProtectedRoute> */}
    </>
  )
}
