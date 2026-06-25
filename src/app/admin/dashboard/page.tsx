export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="mt-8 grid grid-cols-4 gap-6">
        <div className="rounded-lg border p-6">
          Total Orders
        </div>

        <div className="rounded-lg border p-6">
          Revenue
        </div>

        <div className="rounded-lg border p-6">
          Customers
        </div>

        <div className="rounded-lg border p-6">
          Products
        </div>
      </div>
    </div>
  );
}