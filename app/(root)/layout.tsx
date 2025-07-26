import type { Metadata } from 'next'
import '../globals.css'
import Providers from '../provider'
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from '../components/ProtectRoute';

export const metadata: Metadata = {
  title: 'OPOMPOS',
  description: 'One Project One Month POS System',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster
          toastOptions={{
            className: 'bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg px-4 py-2 text-sm',
            duration: 3000,
          }}
        />
        <Providers>
          {/* <ProtectedRoute> */}
            {children}
          {/* </ProtectedRoute> */}
        </Providers>
      </body>
    </html>
  )
}
