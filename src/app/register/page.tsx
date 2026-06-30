"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage(){

const router = useRouter();


const [form,setForm]=useState({

name:"",
email:"",
password:""

});


const [message,setMessage]=useState("");

const [loading,setLoading]=useState(false);



function validateEmail(email:string){

return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}



function validatePassword(password:string){

return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

}




async function register(){


setMessage("");



if(!form.name.trim()){

setMessage("Full name is required");
return;

}



if(!validateEmail(form.email)){

setMessage("Enter a valid email address");
return;

}



if(!validatePassword(form.password)){

setMessage(
"Password must contain minimum 8 characters, uppercase, lowercase, number and special character"
);

return;

}



try{


setLoading(true);



const res =
await fetch(
"/api/auth/register",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

});


const data =
await res.json();



if(data.success){


setMessage(
"Account created. Redirecting to login..."
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

catch{

setMessage(
"Something went wrong"
);

}


finally{

setLoading(false);

}


}




return(

<section className="mx-auto max-w-md bg-white px-4 py-12">


<h1 className="mb-8 text-3xl font-bold">

Create Account

</h1>



<div className="space-y-4">


<input

placeholder="Full name"

value={form.name}

onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}

className="w-full rounded-xl border p-3"

/>




<input

placeholder="Email"

type="email"

value={form.email}

onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}

className="w-full rounded-xl border p-3"

/>





<input

placeholder="Password"

type="password"

value={form.password}

onChange={(e)=>

setForm({

...form,

password:e.target.value

})

}

className="w-full rounded-xl border p-3"

/>



<p className="text-xs text-gray-500">

Password: 8+ chars, uppercase, lowercase, number and symbol

</p>



<button

disabled={loading}

onClick={register}

className="w-full rounded-xl bg-slate-900 py-3 text-white disabled:opacity-50"

>

{
loading?
"Creating..."
:
"Register"
}


</button>




<p className="text-sm text-red-600">

{message}

</p>



</div>


</section>


)

}