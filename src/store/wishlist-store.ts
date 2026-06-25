import { create } from "zustand";

import { persist } from "zustand/middleware";

import { Product } from "@/types/product";


interface WishlistStore {

  items: Product[];

  addWishlist:(item:Product)=>void;

  removeWishlist:(id:string)=>void;

  isWishlisted:(id:string)=>boolean;

}



export const useWishlistStore = create<WishlistStore>()(

persist(


(set,get)=>(


{

items: [],



addWishlist:(item)=>{


const exists =

get().items.some(

(product)=>

product._id === item._id

);



if(!exists){


set({

items:[

...get().items,

item

]

});


}


},




removeWishlist:(id)=>{


set({

items:

get().items.filter(

(product)=>

product._id !== id

)

});


},




isWishlisted:(id)=>{


return get().items.some(

(product)=>

product._id === id

);


}



}

),



{

name:"wishlist-storage"

}


)

);