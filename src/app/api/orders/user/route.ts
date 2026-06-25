import { NextResponse } from "next/server";

import connectDB from "@/lib/db/connect";

import Order from "@/models/Order";


export async function POST(req:Request){


try{


await connectDB();


const body = await req.json();


const orders = await Order.find({

userId:body.userId

}).sort({

createdAt:-1

});


return NextResponse.json({

success:true,

orders

});


}

catch(error){


console.error(error);


return NextResponse.json({

success:false

},

{
status:500
}

);


}

}