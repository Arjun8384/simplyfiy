/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";


import { useSearchParams } from "next/navigation";
import { useEffect,useState } from "react";

import ProductCard from "@/components/products/ProductCard";

export default function SearchPage(){


const params =
useSearchParams();


const query =
params.get("q");


const [products,setProducts] =
useState<any[]>([]);



useEffect(()=>{


async function fetchProducts(){


const res =
await fetch(
`/api/products?q=${query}`
);


const data =
await res.json();


setProducts(
data.products
);


}


if(query){

fetchProducts();

}


},[query]);



return (

<div className="mx-auto max-w-7xl px-4 py-10">


<h1 className="mb-8 text-3xl font-bold">

Search results for &quot;{query}&quot;

</h1>


<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">


{
products.map(product=>(

<ProductCard

key={product._id}

product={product}

/>

))
}


</div>


{
products.length===0 && (

<p>
No toys found 😢
</p>

)

}


</div>

);


}