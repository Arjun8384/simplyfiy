"use client";


import {useState} from "react";

import {useRouter} from "next/navigation";



export default function AdminLogin(){


const router = useRouter();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");



async function handleLogin(){


const res =
await fetch(

"/api/admin/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email,

password

})

}

);



const data =
await res.json();



if(data.success){


localStorage.setItem(

"admin",

JSON.stringify(data.admin)

);


router.push("/admin/orders");


}

else{

alert(data.message);

}


}


return(

<div className="mx-auto max-w-md px-4 py-20">


<h1 className="mb-6 text-3xl font-bold">

Admin Login

</h1>



<input

className="mb-4 w-full border p-3"

placeholder="Email"

value={email}

onChange={(e)=>

setEmail(e.target.value)

}

/>



<input

className="mb-4 w-full border p-3"

placeholder="Password"

type="password"

value={password}

onChange={(e)=>

setPassword(e.target.value)

}

/>



<button

onClick={handleLogin}

className="w-full rounded bg-slate-900 p-3 text-white cursor-pointer"

>

Login

</button>


</div>

)


}