"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

// import { useRouter } from "next/navigation";



export default function LoginPage(){


// const router = useRouter();



const [form,setForm]=useState({

email:"",
password:""

});



async function handleLogin(){


const res =

await fetch(

"/api/auth/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(form)

}

);



const data =
await res.json();

if(data.success){
const cart =
useCartStore.getState();


const wishlist =
useWishlistStore.getState();



cart.setUserCart(
data.user.email
);


wishlist.setUserWishlist(
data.user.email
);


if(data.user.role === "admin"){


window.location.href="/admin/orders";


}

else{


window.location.href="/account";


}


}
else{


console.log(data.message);


}

}



return (

<div className="mx-auto max-w-md px-4 py-12">


<h1 className="mb-6 text-3xl font-bold">

Login

</h1>



<input

placeholder="Email"

className="mb-4 w-full border p-3"

onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}

/>



<input

placeholder="Password"

type="password"

className="mb-4 w-full border p-3"

onChange={(e)=>

setForm({

...form,

password:e.target.value

})

}

/>



<button

onClick={handleLogin}

className="w-full rounded-lg bg-slate-900 py-3 text-white cursor-pointer"

>

Login

</button>

<p className="mt-5 text-center text-sm">


New here?


<Link

href="/register"

className="ml-2 font-semibold underline"

>

Create account

</Link>


</p>


</div>

)

}