"use client";


import {
createContext,
useContext,
useEffect,
useState,
useCallback,
} from "react";


import {useCartStore} from "@/store/cart-store";

import {useWishlistStore} from "@/store/wishlist-store";



interface User {

id:string;

name:string;

email:string;

role:string;

}




interface AuthContextType {


user:User | null;

loading:boolean;


logout:()=>Promise<void>;


refetch:()=>Promise<void>;



}




const AuthContext =
createContext<AuthContextType | null>(null);






export function AuthProvider({

children,

}:{

children:React.ReactNode;

}){



const [user,setUser] =
useState<User | null>(null);



const [loading,setLoading] =
useState(true);








const checkAuth = useCallback(async()=>{


try{


const res =
await fetch(
"/api/auth/me",
{

cache:"no-store",

credentials:"include"

}

);



const data =
await res.json();





if(data.success && data.user){



setUser(data.user);



useCartStore
.getState()
.setUserCart(data.user.email);



useWishlistStore
.getState()
.setUserWishlist(data.user.email);



}


else{


setUser(null);



}



}

catch(error){


console.log(
"Auth check failed",
error
);


setUser(null);


}

finally{


setLoading(false);


}



},[]);









useEffect(()=>{


checkAuth();


},[checkAuth]);









const refetch =
useCallback(async()=>{


await checkAuth();


},[checkAuth]);











const logout =
async()=>{



await fetch(
"/api/auth/logout",
{

method:"POST",

credentials:"include"

}

);





// only remove active session
// DO NOT delete cart/wishlist data


setUser(null);



useCartStore
.getState()
.logoutCart();



useWishlistStore
.getState()
.logoutWishlist();



};










return (


<AuthContext.Provider

value={{

user,

loading,

logout,

refetch

}}

>


{children}


</AuthContext.Provider>



);

}




export function useAuth(){


const context =
useContext(AuthContext);



if(!context){


throw new Error(
"useAuth must be inside AuthProvider"
);


}



return context;


}