"use client";


import { useSearchParams } from "next/navigation";


export default function SearchContent(){


const searchParams =
useSearchParams();


const query =
searchParams.get("q") || "";



return (

<div className="max-w-7xl mx-auto p-6">


<h1 className="text-2xl font-bold">

Search Results

</h1>


<p className="mt-3 text-slate-500">

Showing results for:
{query}

</p>



{/* your existing product rendering here */}



</div>

)

}