import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "@/types/product";


export interface CartItem extends Product {

  quantity:number;

}



interface CartStore {

  items:CartItem[];

  addItem:(product:Product)=>void;

  removeItem:(_id:string)=>void;

  increaseQuantity:(_id:string)=>void;

  decreaseQuantity:(_id:string)=>void;

  updateQuantity:(_id:string, quantity:number)=>void;

  clearCart:()=>void;

}




function getCartKey(){

if(typeof window === "undefined"){

return "guest-cart";

}


const user =
localStorage.getItem("user");



if(!user){

return "guest-cart";

}



const parsed =
JSON.parse(user);



return `cart-${parsed.email}`;

}





export const useCartStore =
create<CartStore>()(

persist(

(set)=>(

{


items:[],



addItem:(product)=>

set((state)=>{


const existing =
state.items.find(

(item)=>

item._id === product._id

);



if(existing){


return {

items:

state.items.map(

(item)=>

item._id === product._id

?

{

...item,

quantity:item.quantity+1

}

:

item


)

};


}



return {

items:[

...state.items,

{

...product,

quantity:1

}

]

};


}),





removeItem:(_id)=>

set((state)=>(


{

items:

state.items.filter(

(item)=>

item._id !== _id

)

}


)),





increaseQuantity:(_id)=>

set((state)=>(


{

items:

state.items.map(

(item)=>

item._id === _id

?

{

...item,

quantity:item.quantity+1

}

:

item

)

}


)),







decreaseQuantity:(_id)=>

set((state)=>(


{

items:

state.items

.map(

(item)=>

item._id === _id

?

{

...item,

quantity:item.quantity-1

}

:

item


)

.filter(

(item)=>

item.quantity>0

)

}


)),







updateQuantity:(_id,quantity)=>

set((state)=>(


{

items:

state.items.map(

(item)=>

item._id === _id

?

{

...item,

quantity:Math.max(1,quantity)

}

:

item


)

}


)),







clearCart:()=>


set({

items:[]

})



}

),



{

name:getCartKey()

}


)

);