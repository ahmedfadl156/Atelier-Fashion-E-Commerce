import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopBar from "@/components/admin/AdminTopBar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="min-h-screen bg-[#F9F8F6]"
            style={{
                color: "#1A1A1A",
                fontFamily: "'Liberation Serif', Georgia, serif",
            }}
        >
            {/* Sidebar */}
            <AdminSidebar />

            <div className="lg:pl-60 flex flex-col min-h-screen">
                {/* Top bar */}
                <AdminTopBar />

                {/* Page content */}
                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
