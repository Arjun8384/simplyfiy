"use client";

import Link from "next/link";

export default function OrderSuccessPage(){

return (
<div className="mx-auto bg-white flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center">

<h1 className="mb-4 text-4xl font-bold text-green-600">
Order Placed Successfully 🎉
</h1>

<p className="mb-8 text-slate-600">
Thank you for shopping with Simplyfiy Toy Store.
Your order has been received.
</p>

<Link
href="/"
className="rounded-xl bg-slate-900 px-6 py-3 text-white cursor-pointer hover:bg-slate-700"
>
Continue Shopping
</Link>
</div>
);

}