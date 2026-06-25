import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";

import connectDB from "@/lib/db/connect";

import User from "@/models/User";


interface JwtPayload {

id:string;

role:string;

}



export async function GET(req:Request){


try{


await connectDB();



const cookie =
req.headers.get("cookie");



if(!cookie){


return NextResponse.json({

success:false

});


}



const token =
cookie
.split(";")
.find(

item =>
item.trim().startsWith("token=")

)
?.split("=")[1];




if(!token){


return NextResponse.json({

success:false

});


}



const decoded =
jwt.verify(

token,

process.env.JWT_SECRET!

) as JwtPayload;




const user =
await User.findById(

decoded.id

)
.select("-password");




if(!user){


return NextResponse.json({

success:false

});


}



return NextResponse.json({

success:true,

user

});


}


catch(error){


console.log(error);



return NextResponse.json({

success:false

});


}


}