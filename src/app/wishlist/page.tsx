"use client";


import ProductCard from "@/components/products/ProductCard";
import { useWishlistStore } from "@/store/wishlist-store";



export default function WishlistPage(){


const items =
useWishlistStore(
(state)=>state.items
);



return (

<div className="mx-auto max-w-7xl px-4 py-10">


<h1 className="mb-8 text-3xl font-bold">

My Wishlist ❤️

</h1>



{
items.length===0 ?


<p>
Your wishlist is empty
</p>


:


<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">


{

items.map(product=>(

<ProductCard

key={product._id}

product={product}

/>

))

}


</div>


}


</div>

);


}