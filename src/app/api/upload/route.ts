/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";


export async function POST(
  request: Request
) {

  try {

    const formData =
      await request.formData();


    const file =
      formData.get("image") as File;



    if(!file){

      return NextResponse.json(
        {
          success:false,
          message:"No image provided"
        },
        {
          status:400
        }
      );

    }



    const bytes =
      await file.arrayBuffer();


    const buffer =
      Buffer.from(bytes);



    const upload =
      await new Promise(
        (resolve,reject)=>{


          cloudinary.uploader.upload_stream(

            {
              folder:"simplyfiy/products"
            },

            (error,result)=>{

              if(error){

                reject(error);

              }

              else{

                resolve(result);

              }

            }

          ).end(buffer);


        }

      );



    return NextResponse.json({

      success:true,

      url:
      (upload as any).secure_url


    });


  }

  catch(error){


    console.log(
      "UPLOAD ERROR",
      error
    );


    return NextResponse.json(
      {
        success:false,
        message:"Image upload failed"
      },
      {
        status:500
      }
    );


  }


}