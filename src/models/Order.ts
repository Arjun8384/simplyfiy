import mongoose from "mongoose";

const OrderSchema =
new mongoose.Schema({
userId:{
    type: String,
    required: true
},

customerName:{
type:String,
required:true
},

email:{
type:String,
required:true
},

phone:{
type:String,
required:true
},

address:{
type:String,
required:true
},

items:[
{
productId:String,
name:String,
price:Number,
quantity:Number,
image:String
}],

subtotal:Number,
gst:Number,
shipping:Number,
total:Number,

status:{
type:String,
default:"PENDING"
},

createdAt:{
type:Date,
default:Date.now
}
});

export default mongoose.models.Order ||mongoose.model(
"Order",
OrderSchema
);