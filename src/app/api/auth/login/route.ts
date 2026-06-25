import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import connectDB from "@/lib/db/connect";

import User from "@/models/User";

export async function POST(req:Request){

try{

await connectDB();

const {

email,

password

}=await req.json();

const user =
await User.findOne({

email

});


if(!user){

return NextResponse.json({

success:false,

message:"Invalid credentials"

});

}


const matched =
await bcrypt.compare(

password,

user.password

);

if(!matched){

return NextResponse.json({

success:false,

message:"Invalid credentials"

});
}

const token =
jwt.sign(
{
id:user._id.toString(),

role:user.role
},

process.env.JWT_SECRET!,
{
expiresIn:"7d"
});

const response =
NextResponse.json({
success:true,
user:{
name:user.name,
email:user.email
}
});

response.cookies.set(

"token",

token,

{

httpOnly:true,

secure:false,

sameSite:"lax",

maxAge:60*60*24*7,

path:"/"

}

);

return response;
}

catch(error){

console.log(error);

return NextResponse.json({

success:false,

message:"Server error"
});
}
}