"use client";


import {useState} from "react";

import {useRouter} from "next/navigation";



export default function RegisterPage(){


const router = useRouter();



const [name,setName]=useState("");

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [message,setMessage]=useState("");





async function register(){


const res =
await fetch("/api/auth/register",{


method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

name,

email,

password

})


});



const data =
await res.json();



if(data.success){


setMessage(
"Account created. Redirecting..."
);



setTimeout(()=>{


router.push("/login");


},1000);



}

else{


setMessage(

data.message || "Registration failed"

);


}



}






return (

<section className="mx-auto max-w-md bg-white px-4 py-12">


<h1 className="mb-8 text-3xl font-bold">

Create Account

</h1>




<div className="space-y-4">



<input

placeholder="Full name"

value={name}

onChange={(e)=>
setName(e.target.value)
}

className="w-full rounded-xl border p-3"

/>




<input

placeholder="Email"

type="email"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

className="w-full rounded-xl border p-3"

/>





<input

placeholder="Password"

type="password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

className="w-full rounded-xl border p-3"

/>




<button

onClick={register}

className="w-full rounded-xl bg-slate-900 py-3 text-white"

>

Register

</button>



<p>

{message}

</p>



</div>


</section>

)


}