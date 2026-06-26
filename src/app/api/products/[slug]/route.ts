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

return NextResponse.json({

success:false

},
{
status:500
});

}

}




export async function PATCH(

request:Request,

context:{
params:Promise<{
slug:string
}>
}

){


try{


await connectDB();


const {slug}=await context.params;


const body =
await request.json();



const product =
await Product.findOneAndUpdate(

{
slug
},

body,

{
new:true
}

);



return NextResponse.json({

success:true,

product

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





export async function DELETE(

request:Request,

context:{
params:Promise<{
slug:string
}>
}

){


try{


await connectDB();


const {slug}=await context.params;


await Product.findOneAndDelete({

slug

});



return NextResponse.json({

success:true

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