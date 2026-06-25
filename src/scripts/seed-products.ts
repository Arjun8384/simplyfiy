import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

import mongoose from "mongoose";

import Product from "@/models/Product";

import { products } from "@/data/products";


const MONGODB_URI = process.env.MONGODB_URI!;


async function seed() {

  try {

    await mongoose.connect(MONGODB_URI);

    console.log("Database connected");


    await Product.deleteMany();


    await Product.insertMany(products);


    console.log("Products inserted successfully");


    process.exit();


  } catch(error) {

    console.error(error);

    process.exit(1);

  }

}


seed();