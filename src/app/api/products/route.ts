import {NextResponse} from "next/server";
import connectDB from "@/lib/db/connect";
import Product from "@/models/Product";



export async function GET(){

try{

await connectDB();


const products =
await Product.find();


return NextResponse.json({

success:true,

products

});


}

catch(error){
  console.log(error);

return NextResponse.json({

success:false

},
{
status:500
});

}

}




export async function POST(
request:Request
){


try{


await connectDB();


const body =
await request.json();



const product =
await Product.create(body);



return NextResponse.json({

success:true,

product

},
{
status:201
});


}

catch(error){

console.log(error);


return NextResponse.json({

success:false

},
{
status:500
});


}


}