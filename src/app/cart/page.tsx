"use client";


import Image from "next/image";

import Link from "next/link";

import { useCartStore } from "@/store/cart-store";



export default function CartPage(){


const items = useCartStore(

(state)=>state.items

);


const removeItem = useCartStore(

(state)=>state.removeItem

);


const addItem = useCartStore(

(state)=>state.addItem

);


const updateQuantity = useCartStore(
  (state)=>state.updateQuantity
);


const subtotal = items.reduce(

(sum,item)=>

sum + item.price * item.quantity,

0

);



if(items.length === 0){


return (

<div className="mx-auto max-w-7xl px-4 py-20 text-center">


<h1 className="text-3xl font-bold">

Your cart is empty 🛒

</h1>


<p className="mt-3 text-slate-500">

Looks like the toys are waiting for someone.

</p>


<Link

href="/products"

className="mt-8 inline-block rounded-xl bg-slate-900 px-6 py-3 text-white cursor-pointer"

>

Continue Shopping

</Link>


</div>

)

}




return (


<div className="mx-auto max-w-7xl px-4 py-10">


<h1 className="mb-8 text-3xl font-bold">

Shopping Cart

</h1>




<div className="grid gap-8 lg:grid-cols-3">



{/* Products */}


<div className="space-y-5 lg:col-span-2">


{items.map((item)=>(


<div

key={item._id}

className="flex gap-5 rounded-xl border p-4"


>


<div className="relative h-28 w-28"

>


<Image

src={item.images}

alt={item.name}

fill

sizes="120px"

className="object-contain"

/>


</div>





<div className="flex-1">


<h2 className="font-semibold">

{item.name}

</h2>


<p className="mt-2">

₹{item.price}

</p>





<div className="mt-4 flex items-center gap-3">


<button

onClick={()=>updateQuantity(item._id, item.quantity-1)}

className="rounded border px-3 py-1 cursor-pointer"

>

-

</button>



<span>

{item.quantity}

</span>



<button

onClick={()=>addItem(item)}

className="rounded border px-3 py-1 cursor-pointer"

>

+

</button>



</div>



<button

onClick={()=>removeItem(item._id)}

className="mt-4 text-sm text-red-600 cursor-pointer"

>

Remove

</button>



</div>


</div>


))}


</div>






{/* Summary */}


<div className="rounded-xl border p-6 h-fit">


<h2 className="text-xl font-bold mb-5">

Order Summary

</h2>



<div className="flex justify-between">


<span>

Subtotal

</span>


<span>

₹{subtotal}

</span>


</div>




<hr className="my-5"/>



<div className="flex justify-between text-xl font-bold">


<span>

Total

</span>


<span>

₹{subtotal}

</span>


</div>




<Link

href="/checkout"

className="mt-6 block rounded-xl bg-slate-900 py-3 text-center text-white cursor-pointer hover:bg-slate-700"

>

Proceed To Checkout

</Link>



</div>



</div>



</div>

)

}