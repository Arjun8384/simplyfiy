"use client";


import {
createContext,
useContext,
useEffect,
useState
} from "react";


interface User{

name:string;

email:string;

role:string;

}



interface AuthContextType{

user:User|null;

loading:boolean;

logout:()=>Promise<void>;

}



const AuthContext =
createContext<AuthContextType | null>(null);



export function AuthProvider({

children

}:{

children:React.ReactNode

}){


const [user,setUser] =
useState<User|null>(null);



const [loading,setLoading] =
useState(true);





useEffect(()=>{


async function checkAuth(){


try{


const res =
await fetch("/api/auth/me",{

credentials:"include"

});


const data =
await res.json();



if(data.success){

setUser(data.user);

}



}

catch{

setUser(null);

}


finally{

setLoading(false);

}


}


checkAuth();


},[]);





async function logout(){


await fetch("/api/auth/logout",{

method:"POST",

credentials:"include"

});


setUser(null);


}



return (

<AuthContext.Provider

value={{

user,

loading,

logout

}}

>


{children}


</AuthContext.Provider>


)


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