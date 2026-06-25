import { NextResponse } from "next/server";

import Product from "@/models/Product";

import connectDB from "@/lib/db/connect";



export async function GET(
req:Request,
{
params,
}:{
params:{
slug:string
}
}
){


try{


await connectDB();



const product =
await Product.findOne({
slug:params.slug
});



if(!product){

return NextResponse.json(
{
success:false,
message:"Product not found"
},
{
status:404
}
);

}



return NextResponse.json(
{
success:true,
product
}
);



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