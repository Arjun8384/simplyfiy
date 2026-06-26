import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-slate-50">
        <div className="p-6">
          <h2 className="font-bold text-xl">
            Simplyfiy Admin
          </h2>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <Link href="/admin/dashboard">
            Dashboard
          </Link>

          <Link href="/admin/orders">
            Orders
          </Link>

          <Link href="/admin/products">
            Products
          </Link>

          <Link href="/admin/settings">
            Settings
          </Link>
        </nav>
      </aside>

      <main className="bg-white flex-1 p-8">
        {children}
      </main>
    </div>
  );
}