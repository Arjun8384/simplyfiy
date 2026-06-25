import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Product } from "@/types/product";


export interface CartItem extends Product {
  quantity:number;
}



interface CartStore {

items:CartItem[];

setUserCart:(email:string)=>void;

addItem:(product:Product)=>void;

removeItem:(id:string)=>void;

increaseQuantity:(id:string)=>void;

decreaseQuantity:(id:string)=>void;

updateQuantity:(id:string,quantity:number)=>void;

logoutCart:()=>void;

clearCart:()=>void;

}


let currentUser="guest";



export const useCartStore=create<CartStore>()(

persist(

(set)=>(


{


items:[],


setUserCart:(email)=>{


currentUser=email;


const saved =
localStorage.getItem(
`simplyfiy-cart-${email}`
);



set({

items:
saved
?
JSON.parse(saved)
:
[]

});


},




addItem:(product)=>

set((state)=>{


const exists =
state.items.find(
item=>item._id===product._id
);



const updated =
exists

?

state.items.map(item=>

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

...state.items,

{
...product,
quantity:1
}

];



localStorage.setItem(

`simplyfiy-cart-${currentUser}`,

JSON.stringify(updated)

);



return {

items:updated

};


}),






removeItem:(id)=>

set((state)=>{


const updated =
state.items.filter(

item=>item._id!==id

);



localStorage.setItem(

`simplyfiy-cart-${currentUser}`,

JSON.stringify(updated)

);



return {

items:updated

};


}),







increaseQuantity:(id)=>

set((state)=>{


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

`simplyfiy-cart-${currentUser}`,

JSON.stringify(updated)

);



return {

items:updated

};


}),







decreaseQuantity:(id)=>

set((state)=>{


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

.filter(item=>item.quantity>0);



localStorage.setItem(

`simplyfiy-cart-${currentUser}`,

JSON.stringify(updated)

);



return {

items:updated

};


}),

updateQuantity:(id,quantity)=>

set((state)=>{

const updated =
state.items.map(item=>

item._id===id

?

{
...item,
quantity:Math.max(1,quantity)
}

:

item

);


localStorage.setItem(

`simplyfiy-cart-${currentUser}`,

JSON.stringify(updated)

);


return {
items:updated
};


}),


logoutCart:()=>{


set({

items:[]

});


currentUser="guest";


},



clearCart:()=>{


localStorage.removeItem(

`simplyfiy-cart-${currentUser}`

);



set({

items:[]

});


}
}

),

{

name:"simplyfiy-cart"

}

)

);