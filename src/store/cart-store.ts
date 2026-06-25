import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "@/types/product";


export interface CartItem extends Product {
  quantity:number;
}


interface CartStore {

items:CartItem[];

userEmail:string | null;


setUserCart:(email:string)=>void;

logoutCart:()=>void;


addItem:(product:Product)=>void;

removeItem:(id:string)=>void;

increaseQuantity:(id:string)=>void;

decreaseQuantity:(id:string)=>void;

clearCart:()=>void;

}



export const useCartStore = create<CartStore>()(

persist(

(set,get)=>({


items:[],

userEmail:null,



setUserCart:(email)=>{


const saved =
localStorage.getItem(
`simplyfiy-cart-${email}`
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




logoutCart:()=>{


set({

items:[],

userEmail:null

});


},





addItem:(product)=>{


const {
items,
userEmail
}=get();



if(!userEmail)
return;



const exists =
items.find(
item=>item._id===product._id
);



const updated = exists

?

items.map(item=>

item._id===product._id

?

{
...item,
quantity:item.quantity+1
}

:

item

)


:

[

...items,

{
...product,
quantity:1
}

];



localStorage.setItem(

`simplyfiy-cart-${userEmail}`,

JSON.stringify(updated)

);



set({

items:updated

});


},






removeItem:(id)=>{


const {
userEmail
}=get();



if(!userEmail)
return;



set(state=>{


const updated =
state.items.filter(
item=>item._id!==id
);



localStorage.setItem(

`simplyfiy-cart-${userEmail}`,

JSON.stringify(updated)

);



return {

items:updated

};


});


},






increaseQuantity:(id)=>{


const {
userEmail
}=get();



if(!userEmail)
return;



set(state=>{


const updated =
state.items.map(item=>

item._id===id

?

{
...item,
quantity:item.quantity+1
}

:

item

);



localStorage.setItem(

`simplyfiy-cart-${userEmail}`,

JSON.stringify(updated)

);



return {

items:updated

};


});


},






decreaseQuantity:(id)=>{


const {
userEmail
}=get();



if(!userEmail)
return;



set(state=>{


const updated =
state.items

.map(item=>

item._id===id

?

{
...item,
quantity:item.quantity-1
}

:

item

)

.filter(
item=>item.quantity>0
);



localStorage.setItem(

`simplyfiy-cart-${userEmail}`,

JSON.stringify(updated)

);



return {

items:updated

};


});


},






clearCart:()=>{


const {
userEmail
}=get();



if(userEmail){

localStorage.removeItem(

`simplyfiy-cart-${userEmail}`

);

}


set({

items:[]

});


}



}),

{


name:"simplyfiy-cart"

}


)

);