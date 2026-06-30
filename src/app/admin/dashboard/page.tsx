/* eslint-disable @typescript-eslint/no-explicit-any */
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

<div className="space-y-8">

  <div>
    <h1 className="text-3xl font-bold">
      Dashboard
    </h1>

    <p className="mt-2 text-gray-500">
      Overview of your store performance
    </p>
  </div>


  <div
    className="
    grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-4
    gap-6
    "
  >


    <div
      className="
      rounded-2xl
      bg-gradient-to-br
      from-red-500
      to-red-700
      p-6
      text-white
      shadow-lg
      transition
      hover:-translate-y-1
      hover:shadow-xl
      "
    >

      <div className="flex justify-between items-center">

        <p className="text-sm opacity-90">
          Total Orders
        </p>

        <span className="text-2xl">
          📦
        </span>

      </div>


      <h2 className="mt-5 text-4xl font-bold">
        {data.orders}
      </h2>


      <p className="mt-2 text-sm opacity-80">
        Orders received
      </p>


    </div>





    <div
      className="
      rounded-2xl
      bg-gradient-to-br
      from-green-500
      to-green-700
      p-6
      text-white
      shadow-lg
      transition
      hover:-translate-y-1
      hover:shadow-xl
      "
    >

      <div className="flex justify-between items-center">

        <p className="text-sm opacity-90">
          Revenue
        </p>

        <span className="text-2xl">
          💰
        </span>

      </div>


      <h2 className="mt-5 text-4xl font-bold">
        ₹{data.revenue}
      </h2>


      <p className="mt-2 text-sm opacity-80">
        Total earnings
      </p>


    </div>






    <div
      className="
      rounded-2xl
      bg-gradient-to-br
      from-blue-500
      to-blue-700
      p-6
      text-white
      shadow-lg
      transition
      hover:-translate-y-1
      hover:shadow-xl
      "
    >

      <div className="flex justify-between items-center">

        <p className="text-sm opacity-90">
          Customers
        </p>

        <span className="text-2xl">
          👥
        </span>

      </div>


      <h2 className="mt-5 text-4xl font-bold">
        {data.customers}
      </h2>


      <p className="mt-2 text-sm opacity-80">
        Registered buyers
      </p>


    </div>






    <div
      className="
      rounded-2xl
      bg-gradient-to-br
      from-purple-500
      to-purple-700
      p-6
      text-white
      shadow-lg
      transition
      hover:-translate-y-1
      hover:shadow-xl
      "
    >

      <div className="flex justify-between items-center">

        <p className="text-sm opacity-90">
          Products
        </p>


        <span className="text-2xl">
          🧸
        </span>


      </div>


      <h2 className="mt-5 text-4xl font-bold">
        {data.products}
      </h2>


      <p className="mt-2 text-sm opacity-80">
        Active inventory
      </p>


    </div>



  </div>



</div>

);

}