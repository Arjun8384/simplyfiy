import {NextRequest,NextResponse} from "next/server";

import connectDB from "@/lib/db/connect";

import Product from "@/models/Product";


export async function GET(

req:NextRequest,

context:{
params:Promise<{
slug:string
}>
}

){


try{


await connectDB();


const {
slug
}=await context.params;



const product =
await Product.findOne({
slug
});



return NextResponse.json({

success:true,

product

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