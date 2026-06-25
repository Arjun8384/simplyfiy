import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Order from "@/models/Order";


export async function PATCH(
req:Request,
{
params
}:{
params:{
_id:string
}
}

){

try{


await connectDB();


const body =
await req.json();


const order =
await Order.findByIdAndUpdate(

params._id,

{
status:
body.status
},

{
new:true
}

);



return NextResponse.json({

success:true,
order

});


}
catch(error){

console.log(error);


return NextResponse.json(

{
success:false
},

{
status:500
}

);


}

}