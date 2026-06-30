"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";


export default function SettingsPage(){


const router=useRouter();


const [oldPassword,setOldPassword]=useState("");

const [newPassword,setNewPassword]=useState("");

const [confirmPassword,setConfirmPassword]=useState("");

const [message,setMessage]=useState("");





function validatePassword(password:string){

return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password);

}





async function changePassword(){


setMessage("");



if(newPassword!==confirmPassword){

setMessage(
"New passwords do not match"
);

return;

}



if(!validatePassword(newPassword)){


setMessage(
"Password must contain uppercase, lowercase, number and symbol"
);

return;

}



const res =
await fetch(

"/api/auth/change-password",

{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

oldPassword,

newPassword

})

}

);



const data =
await res.json();



if(data.success){


setMessage(
"Password updated successfully"
);



setTimeout(()=>{

router.push("/account");

},1000);


}

else{


setMessage(
data.message || "Failed"
);


}



}



return(

<section className="mx-auto max-w-md px-4 py-12">


<h1 className="mb-8 text-3xl font-bold">

Change Password

</h1>



<div className="space-y-4">


<input

type="password"

placeholder="Current password"

value={oldPassword}

onChange={(e)=>setOldPassword(e.target.value)}

className="w-full border p-3"

/>


<input

type="password"

placeholder="New password"

value={newPassword}

onChange={(e)=>setNewPassword(e.target.value)}

className="w-full border p-3"

/>



<input

type="password"

placeholder="Confirm password"

value={confirmPassword}

onChange={(e)=>setConfirmPassword(e.target.value)}

className="w-full border p-3"

/>



<button

onClick={changePassword}

className="w-full rounded bg-slate-900 py-3 text-white"

>

Update Password

</button>



<p>{message}</p>



</div>


</section>


)

}