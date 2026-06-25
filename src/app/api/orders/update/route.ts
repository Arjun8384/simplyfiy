import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Order from "@/models/Order";


export async function PATCH(
request:Request
){

try{

await connectDB();


const {
_id,
status
}=await request.json();



const order =
await Order.findByIdAndUpdate(

_id,

{
status
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