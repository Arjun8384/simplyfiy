"use client";

import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";


export default function AccountPage(){


const {user,loading}=useAuth();

const router=useRouter();



if(loading){

return <div className="p-10">
Loading...
</div>

}



if(!user){

router.push("/login");

return null;

}




return(

<section className="mx-auto max-w-xl bg-white p-8">


<h1 className="mb-6 text-3xl font-bold">

My Account

</h1>


<div className="space-y-3">


<p>

Name:
{user.name}

</p>



<p>

Email:
{user.email}

</p>



</div>


{/* 
<button

onClick={()=>router.push("/settings")}

className="mt-6 rounded bg-slate-900 px-5 py-3 text-white"

>

Settings

</button> */}



{

user.role==="admin" &&

<button

onClick={()=>router.push("/admin/dashboard")}

className="ml-3 rounded bg-red-600 px-5 py-3 text-white"

>

Admin Panel

</button>

}



</section>


)

}