import {create} from "zustand";
import {persist} from "zustand/middleware";

import {Product} from "@/types/product";



interface WishlistStore {


items:Product[];

userEmail:string | null;


setUserWishlist:(email:string)=>void;


logoutWishlist:()=>void;


addWishlist:(product:Product)=>void;


removeWishlist:(id:string)=>void;


}




export const useWishlistStore=create<WishlistStore>()(

persist(

(set,get)=>({


items:[],

userEmail:null,



setUserWishlist:(email)=>{


const saved =
localStorage.getItem(

`simplyfiy-wishlist-${email}`

);



set({

userEmail:email,

items:saved
?
JSON.parse(saved)
:
[]

});


},




logoutWishlist:()=>{


set({

items:[],

userEmail:null

});


},






addWishlist:(product)=>{


const {
items,
userEmail
}=get();



if(!userEmail)
return;



if(
items.some(
item=>item._id===product._id
)

)
return;



const updated=[
...items,
product
];



localStorage.setItem(

`simplyfiy-wishlist-${userEmail}`,

JSON.stringify(updated)

);



set({

items:updated

});


},







removeWishlist:(id)=>{


const {
userEmail
}=get();



if(!userEmail)
return;



const updated =
get().items.filter(
item=>item._id!==id
);



localStorage.setItem(

`simplyfiy-wishlist-${userEmail}`,

JSON.stringify(updated)

);



set({

items:updated

});


}



}),


{

name:"simplyfiy-wishlist"

}


)

);