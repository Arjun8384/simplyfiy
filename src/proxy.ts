import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function proxy(
req: NextRequest
){

// const adminCookie =
// req.cookies.get("admin");


const path =
req.nextUrl.pathname;



if(path.startsWith("/admin")){


if(path === "/admin/login"){

return NextResponse.next();

}


// if(!adminCookie){

// return NextResponse.redirect(

// new URL(
// "/admin/login",
// req.url
// )

// );

// }


}


return NextResponse.next();

}



export const config = {

matcher:[

"/admin/:path*"

]

};