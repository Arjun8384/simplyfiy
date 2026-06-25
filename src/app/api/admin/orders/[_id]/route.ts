import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Order from "@/models/Order";


export async function PATCH(
  request: NextRequest,
  context: {
    params: Promise<{
      _id:string;
    }>;
  }
){

try{

await connectDB();


const { _id } = await context.params;


const body = await request.json();



await Order.findByIdAndUpdate(
_id,
body
);



return NextResponse.json({

success:true

});


}
catch(error){

console.error(error);


return NextResponse.json({

success:false

},
{
status:500
});


}

}