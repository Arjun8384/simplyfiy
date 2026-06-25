import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import User from "@/models/User";

import connectDB from "@/lib/db/connect";

import { cookies } from "next/headers";



export async function PUT(req: Request){


try{


await connectDB();



const {
oldPassword,
newPassword

}=await req.json();




const cookieStore = await cookies();


const email =
cookieStore.get("email")?.value;



if(!email){


return NextResponse.json({

success:false,

message:"Unauthorized"

});


}





const user =
await User.findOne({

email

});



if(!user){


return NextResponse.json({

success:false,

message:"User not found"

});


}





const valid =
await bcrypt.compare(

oldPassword,

user.password

);



if(!valid){


return NextResponse.json({

success:false,

message:"Old password incorrect"

});


}





user.password =
await bcrypt.hash(

newPassword,

10

);



await user.save();




return NextResponse.json({

success:true,

message:"Password updated successfully"

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