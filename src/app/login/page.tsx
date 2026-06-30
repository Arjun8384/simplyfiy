"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";


export default function LoginPage(){

const [form,setForm]=useState({
email:"",
password:""
});


const [error,setError]=useState("");
const [loading,setLoading]=useState(false);


function validateEmail(email:string){

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}



async function handleLogin(){

setError("");


if(!form.email){

setError("Email is required");
return;

}


if(!validateEmail(form.email)){

setError("Enter a valid email address");
return;

}


if(!form.password){

setError("Password is required");
return;

}



try{


setLoading(true);


const res = await fetch(
"/api/auth/login",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

});


const data = await res.json();



if(data.success){


useCartStore
.getState()
.setUserCart(data.user.email);



useWishlistStore
.getState()
.setUserWishlist(data.user.email);



if(data.user.role==="admin"){

window.location.href="/admin/dashboard";

}

else{

window.location.href="/account";

}


}


else{

setError(
data.message || "Invalid credentials"
);

}



}

catch{

setError(
"Something went wrong"
);

}

finally{

setLoading(false);

}


}



return(

<div className="mx-auto max-w-md bg-white px-4 py-12">


<h1 className="mb-6 text-3xl font-bold">
Login
</h1>



{
error &&
<div className="mb-4 rounded bg-red-100 p-3 text-red-700">

{error}

</div>
}



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

disabled={loading}

onClick={handleLogin}

className="w-full rounded-lg bg-slate-900 py-3 text-white disabled:opacity-50"

>

{
loading?
"Logging in..."
:
"Login"
}


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