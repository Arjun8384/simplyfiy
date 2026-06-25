"use client";


import {useEffect} from "react";

import {useRouter} from "next/navigation";

import {useAuth} from "@/context/AuthContext";



export default function AccountPage(){


const {
user,
loading,
logout

}=useAuth();


const router =
useRouter();



useEffect(()=>{


if(!loading && !user){

router.replace("/login");

}


},[
loading,
user,
router
]);





if(loading){

return (

<div className="p-10">

Loading...

</div>

)

}





if(!user){

return null;

}




return (

<div className="max-w-xl mx-auto py-10">


<h1 className="text-3xl font-bold">

My Account

</h1>



<div className="mt-6 space-y-3">


<p>

Name:
{user.name}

</p>


<p>

Email:
{user.email}

</p>



<p>

Role:
{user.role}

</p>



</div>



<button

onClick={()=>router.push("/settings")}

className="mt-6 rounded bg-black px-5 py-2 text-white"

>

Settings

</button>




<button

onClick={logout}

className="mt-4 block rounded bg-red-600 px-5 py-2 text-white"

>

Logout

</button>



</div>


)


}