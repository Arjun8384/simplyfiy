import { NextResponse } from "next/server";

import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

import connectDB from "@/lib/db/connect";

import User from "@/models/User";



export async function GET(){


try{


await connectDB();



const cookieStore =
await cookies();



const token =
cookieStore.get("token")?.value;



if(!token){


return NextResponse.json({

success:false

});


}




const decoded =
jwt.verify(

token,

process.env.JWT_SECRET!

) as {
id:string;
};



const user =
await User.findById(decoded.id)
.select("-password");




if(!user){


return NextResponse.json({

success:false

});


}





return NextResponse.json({

success:true,

user:{

id:user._id.toString(),

name:user.name,

email:user.email,

role:user.role

}

});


}



catch(error){


console.log(error);



return NextResponse.json({

success:false

});


}


}