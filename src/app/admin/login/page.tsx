"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";


export default function AdminLogin(){


const router = useRouter();


const [form,setForm]=useState({

email:"",
password:""

});


const [error,setError]=useState("");

const [loading,setLoading]=useState(false);

const [showPassword,setShowPassword]=useState(false);




function validateEmail(email:string){

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}



function validatePassword(password:string){

return password.length >= 8;

}





async function handleLogin(){


setError("");



if(!validateEmail(form.email)){


setError(
"Enter a valid admin email"
);

return;

}



if(!validatePassword(form.password)){


setError(
"Password must contain minimum 8 characters"
);

return;

}



try{


setLoading(true);



const res =
await fetch(

"/api/admin/login",

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




if(!data.success){


setError(
data.message || "Invalid credentials"
);

return;

}



localStorage.setItem(

"admin",

JSON.stringify(data.admin)

);



router.push("/admin/dashboard");



}

catch{

setError(
"Server error"
);

}

finally{

setLoading(false);

}



}



return(

<div className="mx-auto max-w-md px-4 py-20">


<h1 className="mb-6 text-3xl font-bold">

Admin Login

</h1>




{

error &&

<div className="mb-4 rounded bg-red-100 p-3 text-red-700">

{error}

</div>

}




<input

className="mb-4 w-full border p-3"

placeholder="Admin Email"

value={form.email}

onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}

/>




<input

className="mb-4 w-full border p-3"

placeholder="Password"

type={showPassword?"text":"password"}

value={form.password}

onChange={(e)=>

setForm({

...form,

password:e.target.value

})

}

/>




<label className="mb-4 flex gap-2 text-sm">

<input

type="checkbox"

onChange={()=>setShowPassword(!showPassword)}

/>

Show password

</label>




<button

disabled={loading}

onClick={handleLogin}

className="w-full rounded bg-slate-900 p-3 text-white disabled:opacity-50"

>

{

loading?
"Logging in..."
:
"Login"

}


</button>


</div>

)

}