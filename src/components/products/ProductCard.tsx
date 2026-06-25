"use client";


import Image from "next/image";
import Link from "next/link";

import { Heart } from "lucide-react";

import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

import { Product } from "@/types/product";



export default function ProductCard({

product

}: {

product: Product;

}) {

const addItem =
useCartStore(
(state)=>state.addItem
);



const addWishlist =
useWishlistStore(
(state)=>state.addWishlist
);


const removeWishlist =
useWishlistStore(
(state)=>state.removeWishlist
);

const liked = useWishlistStore(
  (state)=>state.items.some(
    (item)=>
      item._id === product._id
  )
);


function handleWishlist(){


if(liked){

removeWishlist(product._id);

}

else{

addWishlist(product);

}

}



return (

<div
className="rounded-xl border bg-white p-4 transition hover:shadow-lg"
>


<div
className="relative h-64"
>


<Link href={`/products/${product.slug}`}>

{
product.images ? (

<Image

src={product.images}

alt={product.name}

fill

sizes="(max-width:768px) 100vw, 25vw"
className="object-contain"
/>

):(

<div className="flex h-full items-center justify-center bg-slate-100 text-slate-400">

No Image

</div>

)

}

</Link>



<button

type="button"

onClick={handleWishlist}

className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow cursor-pointer"

>

<Heart

size={22}

className={

liked

?

"fill-red-500 text-red-500"

:

"text-slate-700"

}

/>


</button>



</div>




<Link href={`/products/${product.slug}`}>

<h3
className="mt-4 font-semibold text-slate-900"
>

{product.name}

</h3>



<p
className="mt-1 text-slate-600"
>

₹{product.price}

</p>


</Link>




<button

type="button"

onClick={()=>addItem(product)}

className="mt-4 w-full rounded-lg bg-slate-900 py-2 text-white cursor-pointer transition hover:bg-slate-700"

>

Add To Cart

</button>



</div>

);

}