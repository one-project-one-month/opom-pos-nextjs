import Sidebar from "@/app/components/admin-sidebar";
import Header from "@/app/components/app-header";
import { ProtectedRoute } from "@/app/components/ProtectRoute";

export default function AdminMainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div>
        <Header />
        <div className="flex h-screen overflow-hidden pt-20">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-10">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
