"use client";


import Image from "next/image";
import Link from "next/link";
import { Search, Heart, User, House } from "lucide-react";

import CartIcon from "./CartIcon";

import { useAuth } from "@/context/AuthContext";



export default function Navbar(){


const { user } = useAuth();



return (

<header className="sticky top-0 z-50 border-b bg-white">


<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">



{/* Logo */}

<Link

href="/"

className="flex items-center gap-3"

>


<Image

src="/simplyfiy-logo.png"

alt="Simplyfiy Toy Store"

width={220}

height={70}

priority

className="h-14 w-auto"

/>



<div>

<h1 className="text-lg font-bold">

Simplyfiy Toy Store

</h1>


<p className="text-xs text-slate-500">

Play • Learn • Grow

</p>


</div>


</Link>





{/* Search */}


<div className="hidden w-full max-w-xl items-center rounded-xl border bg-slate-50 px-4 md:flex">


<Search size={18}/>


<form

action="/search"

className="w-full"

>


<input

name="q"

placeholder="Search toys..."

className="w-full bg-transparent px-3 outline-none"

/>


</form>


</div>





{/* Actions */}


<div className="flex items-center gap-5">


<Link href="/">

<House

className="h-6 w-6 cursor-pointer"

/>

</Link>



<Link href="/wishlist">

<Heart

className="h-6 w-6 cursor-pointer"

/>

</Link>



<CartIcon />





{
user ? (


<Link href="/account">


<div className="flex items-center gap-2">


<User

className="h-6 w-6 cursor-pointer"

/>



<span className="hidden md:block text-sm">

{user.name}

</span>


</div>


</Link>


)

:

(


<Link href="/login">


<User

className="h-6 w-6 cursor-pointer"

/>


</Link>


)

}



</div>



</div>


</header>

)

}