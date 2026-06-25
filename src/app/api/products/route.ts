import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Product from "@/models/Product";


export async function GET(req: NextRequest) {

  try {

    await connectDB();


    const { searchParams } = new URL(req.url);


    const query =
      searchParams.get("q");


    let products;


    if(query){

      products = await Product.find({

        $or:[

          {
            name:{
              $regex:query,
              $options:"i"
            }
          },

          {
            category:{
              $regex:query,
              $options:"i"
            }
          }

        ]

      });

    }
    else{

      products =
      await Product.find();

    }


    return NextResponse.json({

      success:true,
      products

    });


  }
  catch(error){
    console.log(error);

    return NextResponse.json(
      {
        success:false,
        message:"Failed to fetch products"
      },
      {
        status:500
        
      }
    );

  }

}