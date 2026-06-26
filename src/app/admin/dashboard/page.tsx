"use client";

import { useEffect, useState } from "react";


interface DashboardData {

orders:number;

revenue:number;

customers:number;

products:number;

}



export default function DashboardPage(){


const [data,setData]=useState<DashboardData>({

orders:0,

revenue:0,

customers:0,

products:0

});



useEffect(()=>{


async function fetchDashboard(){


try{


const ordersRes =
await fetch("/api/orders",{
cache:"no-store"
});


const ordersData =
await ordersRes.json();



const productsRes =
await fetch("/api/products",{
cache:"no-store"
});


const productsData =
await productsRes.json();



setData({

orders:
ordersData.orders?.length || 0,


revenue:

ordersData.orders?.reduce(

(
sum:number,
order:any
)=>

sum + order.total,

0

) || 0,



customers:

new Set(

ordersData.orders?.map(

(order:any)=>

order.userId

)

).size || 0,



products:

productsData.products?.length || 0

});


}

catch(error){

console.log(
"Dashboard error",
error
);

}


}


fetchDashboard();


},[]);




return (

<div>


<h1 className="text-3xl font-bold">

Dashboard

</h1>



<div className="mt-8 grid grid-cols-4 gap-6">



<div className="rounded-lg border p-6">

<p>Total Orders</p>

<h2 className="text-3xl font-bold">

{data.orders}

</h2>

</div>




<div className="rounded-lg border p-6">

<p>Revenue</p>

<h2 className="text-3xl font-bold">

₹{data.revenue}

</h2>

</div>




<div className="rounded-lg border p-6">

<p>Customers</p>

<h2 className="text-3xl font-bold">

{data.customers}

</h2>

</div>




<div className="rounded-lg border p-6">

<p>Products</p>

<h2 className="text-3xl font-bold">

{data.products}

</h2>

</div>




</div>


</div>

);


}