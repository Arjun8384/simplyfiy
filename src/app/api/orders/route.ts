import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Order from "@/models/Order";

export async function GET() {

  try {

    await connectDB();

    const orders =
      await Order
      .find({})
      .sort({
        createdAt:-1
      });


    return NextResponse.json({
      success:true,
      orders
    });


  } catch(error){

    console.log(error);

    return NextResponse.json(
      {
        success:false,
        message:"Failed to fetch orders"
      },
      {
        status:500
      }
    );

  }

}