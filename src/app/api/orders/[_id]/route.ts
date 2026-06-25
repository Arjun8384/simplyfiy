import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/db/connect";

import Order from "@/models/Order";


export async function PATCH(

  req: NextRequest,

  context: {
    params: Promise<{
      _id: string;
    }>;
  }

) {


try {


await connectDB();



const { _id } =
await context.params;



const body =
await req.json();



const updatedOrder =
await Order.findByIdAndUpdate(

_id,

body,

{
new:true
}

);



if(!updatedOrder){


return NextResponse.json(

{
success:false,
message:"Order not found"
},

{
status:404
}

);


}




return NextResponse.json(

{
success:true,
order:updatedOrder
}

);



}

catch(error){


console.error(error);



return NextResponse.json(

{
success:false,
message:"Server error"
},

{
status:500
}

);


}


}