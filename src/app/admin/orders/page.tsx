"use client";


import {useEffect,useState} from "react";

import {Order} from "@/types/order";



export default function OrdersPage(){


const [orders,setOrders]=useState<Order[]>([]);



useEffect(()=>{


fetch("/api/orders")

.then(res=>res.json())

.then(data=>{


if(data.success){

setOrders(data.orders);

}


});


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



setOrders((prev)=>

prev.map((order)=>

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



return (

<div className="mx-auto max-w-7xl px-4 py-10">


<h1 className="mb-8 text-3xl font-bold">

Orders

</h1>



<div className="space-y-5">


{orders.map((order)=>(


<div

key={order._id}

className="rounded-xl border p-5"

>


<p>

Order ID: {order._id}

</p>


<p>

Customer: {order.customerName}

</p>


<p>

Total: ₹{order.total}

</p>



<select

value={order.status}

onChange={(e)=>

updateStatus(

order._id,

e.target.value

)

}

className="mt-3 rounded border p-2"

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


))}


</div>


</div>

)

}