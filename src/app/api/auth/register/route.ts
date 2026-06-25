import {NextResponse} from "next/server";

import bcrypt from "bcryptjs";

import User from "@/models/User";

import connectDB from "@/lib/db/connect";



export async function POST(req:Request){


try{


await connectDB();



const {

name,

email,

password


}=await req.json();




const existingUser =
await User.findOne({

email

});



if(existingUser){


return NextResponse.json({

success:false,

message:"User already exists"

});


}




const hashedPassword =
await bcrypt.hash(

password,

10

);




const user =
await User.create({

name,

email,

password:hashedPassword,

role:"user"

});





return NextResponse.json({

success:true,

user:{


name:user.name,

email:user.email,

role:user.role


}


});



}

catch(error){


console.error(error);



return NextResponse.json({

success:false,

message:"Server error"

});


}



}