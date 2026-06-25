import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Order from "@/models/Order";

export async function POST(
  request: Request
) {

  try {

    await connectDB();


    const body =
      await request.json();

    console.log("Order received", body);

    const order =
      await Order.create({
        userId: body.userId,
        
        customerName:
          body.customerName,

        email:
          body.email,

        phone:
          body.phone,

        address:
          body.address,


        items:
          body.items,


        subtotal:
          body.subtotal,


        gst:
          body.gst,


        shipping:
          body.shipping,


        total:
          body.total,


        status:
          "PENDING"

      });



    return NextResponse.json(

      {
        success:true,

        orderId:
          order._id

      },

      {
        status:201
      }

    );


  }

  catch(error){


    console.log(
      "ORDER ERROR:",
      error
    );


    return NextResponse.json(

      {
        success:false,

        message:
          "Order creation failed"

      },

      {
        status:500
      }

    );


  }

}