import mongoose, { Schema } from "mongoose";


const ProductSchema = new Schema(
  {

    productId:{
    type:String,
    required:true,
    unique:true
    },

    name:{
      type:String,
      required:true,
    },

    slug:{
      type:String,
      required:true,
      unique:true,
    },

    category:{
      type:String,
      required:true,
    },

    price:{
      type:Number,
      required:true,
    },

    originalPrice:{
      type:Number,
    },

    images:{
      type:String,
      required:true,
    },

    description:{
      type:String,
      required:true,
    },

    stock:{
      type:Number,
      default:0,
    },

    featured:{
      type:Boolean,
      default:false,
    },

    bestseller:{
      type:Boolean,
      default:false,
    },

  },

  {
    timestamps:true,
  }

);


const Product =
mongoose.models.Product ||
mongoose.model(
  "Product",
  ProductSchema
);


export default Product;