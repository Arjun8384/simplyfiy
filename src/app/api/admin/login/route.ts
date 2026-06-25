import { NextResponse } from "next/server";

import connectDB from "@/lib/db/connect";

import User from "@/models/User";

import bcrypt from "bcryptjs";


export async function POST(req:Request){


try{


await connectDB();


const body = await req.json();


const admin = await User.findOne({

email:body.email,

role:"ADMIN"

});


if(!admin){

const response =
NextResponse.json({

success:true,

admin:{

name:admin.name,

email:admin.email,

role:admin.role

}

});


response.cookies.set(

"admin",

JSON.stringify({

id:admin._id,

role:admin.role

}),

{

httpOnly:true,

sameSite:"lax",

secure:false,

path:"/"

});

return response;

}



const match =
await bcrypt.compare(

body.password,

admin.password

);



if(!match){

return NextResponse.json({

success:false,

message:"Invalid password"

},

{
status:401
}

);

}



return NextResponse.json({

success:true,

admin:{


_id:admin._id,

name:admin.name,

email:admin.email,

role:admin.role


}

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