"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/order";


export default function OrdersPage(){

const [orders,setOrders]=useState<Order[]>([]);

const [loading,setLoading]=useState(true);



useEffect(()=>{

async function loadOrders(){

try{

const res =
await fetch("/api/orders",{
cache:"no-store"
});


const data =
await res.json();


if(data.success){

setOrders(data.orders);

}


}

catch(error){

console.log(
"Orders error",
error
);

}

finally{

setLoading(false);

}


}


loadOrders();


},[]);





async function updateStatus(
id:string,
status:string
){


await fetch(

`/api/admin/orders/${id}`,

{

method:"PATCH",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
status
})

}

);



setOrders(prev=>

prev.map(order=>

order._id===id

?

{
...order,
status
}

:

order

)

);


}






if(loading){

return(

<div className="p-10">

Loading orders...

</div>

);

}





return(

<div className="space-y-8">


<div>

<h1 className="text-3xl font-bold">

Orders

</h1>


<p className="text-gray-500 mt-2">

Manage customer orders and delivery status

</p>


</div>





<div className="space-y-5">


{

orders.length===0

?

<div className="rounded-xl border p-8 text-center text-gray-500">

No orders received yet

</div>


:


orders.map(order=>(


<div

key={order._id}

className="
rounded-2xl
border
bg-white
p-5
shadow-sm
transition
hover:shadow-md
"

>


<div className="flex flex-col gap-3 md:flex-row md:justify-between">


<div>


<h2 className="font-bold text-lg">

{order.customerName}

</h2>


<p className="text-sm text-gray-500">

Order ID:
{order._id}

</p>


<p className="mt-2">

Total:
<span className="font-bold">

 ₹{order.total}

</span>

</p>


</div>





<div>


<select


value={order.status}


onChange={(e)=>

updateStatus(

order._id,

e.target.value

)

}


className="
rounded-lg
border
px-4
py-2
"

>


<option value="PENDING">

Pending

</option>


<option value="PROCESSING">

Processing

</option>


<option value="SHIPPED">

Shipped

</option>


<option value="DELIVERED">

Delivered

</option>


</select>


</div>


</div>






<div className="
mt-5
rounded-xl
bg-gray-50
p-4
">


<p className="font-semibold">

Delivery Address

</p>


<p className="text-gray-600">

{order.address}

</p>


</div>




</div>


))

}



</div>


</div>


);


}